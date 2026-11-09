import test from 'node:test';
import assert from 'node:assert/strict';
import { createProjectBrief, normalizeProjectBrief } from '../../src/project/model.ts';

const saved = new Map();
let rejectWrite = () => false;
globalThis.localStorage = {
  get length() { return saved.size; },
  key(index) { return [...saved.keys()][index] ?? null; },
  getItem(key) { return saved.get(key) ?? null; },
  setItem(key, value) { if (rejectWrite(key)) throw new Error('Storage quota'); saved.set(key, String(value)); },
  removeItem(key) { saved.delete(key); },
};
const oldBrief = createProjectBrief();
delete oldBrief.primaryAction;
const legacy = JSON.stringify({ version: 1, brief: oldBrief, shortlist: ['apple', 'swiss'], exports: 4, outcomes: Array.from({ length: 35 }, (_, index) => ({ styleId: 'apple', status: 'adopted', retries: index % 10, checks: ['business'], issue: `Older record ${index}`, updatedAt: '2026-10-18T01:00:00.000Z' })) });
saved.set('vibedesign-project-v1', legacy);
const { useProjectStore, projectFingerprint, matchesProjectOutcome, createProjectOutcome, restoreProjectState } = await import('../../src/project/store.ts');

test('migration retains all legacy records without attributing them to the current project or overwriting v1 bytes', () => {
  const state = useProjectStore.getState();
  assert.equal(state.outcomes.length, 35);
  assert.equal(state.exports, 4);
  assert.equal(state.brief.primaryAction, '');
  for (const outcome of state.outcomes) {
    assert.equal(outcome.brief, null);
    assert.equal(outcome.projectFingerprint, null);
    assert.equal(outcome.source, 'user-reported');
    assert.equal(matchesProjectOutcome(outcome, 'apple', state.brief), false);
  }
  state.toggleCandidate('bento');
  assert.equal(saved.get('vibedesign-project-v1'), legacy);
  const current = JSON.parse(saved.get('vibedesign-project-v2'));
  assert.equal(current.version, 2);
  assert.equal(current.outcomes.length, 35);
});

test('v2 snapshots created before primaryAction retain their recorded results with an empty action', () => {
  const current = { ...createProjectOutcome(createProjectBrief(), 'apple'), status: 'adopted', updatedAt: '2026-10-18T02:00:00.000Z', brief: oldBrief, projectFingerprint: JSON.stringify(oldBrief) };
  const restored = restoreProjectState(JSON.stringify({ version: 2, brief: oldBrief, outcomes: [current], shortlist: [], exports: 1 }));
  assert.equal(restored.brief.primaryAction, '');
  assert.equal(restored.outcomes[0].brief.primaryAction, '');
  assert.equal(matchesProjectOutcome(restored.outcomes[0], 'apple', createProjectBrief()), true);
});

test('outcomes match both style and canonical brief; target, scene and scope changes keep separate snapshots', () => {
  const a = normalizeProjectBrief({ target: 'Homepage hero' });
  const b = normalizeProjectBrief({ target: 'Account settings', scene: 'dashboard', scope: 'page' });
  const first = { ...createProjectOutcome(a, 'apple'), status: 'adopted', updatedAt: '2026-10-18T02:00:00.000Z' };
  useProjectStore.getState().saveOutcome(first);
  first.brief.target = 'Changed after saving';
  first.checks.push('mutated');
  const resultA = useProjectStore.getState().outcomes.find(item => matchesProjectOutcome(item, 'apple', a));
  assert.equal(resultA.brief.target, 'Homepage hero');
  assert.deepEqual(resultA.checks, []);
  assert.equal(matchesProjectOutcome(resultA, 'swiss', a), false);
  assert.equal(matchesProjectOutcome(resultA, 'apple', b), false);
  useProjectStore.getState().saveOutcome({ ...createProjectOutcome(b, 'apple'), status: 'needs-work', issue: 'Mobile table', updatedAt: '2026-10-18T03:00:00.000Z' });
  assert.equal(useProjectStore.getState().outcomes.length, 37);
  useProjectStore.getState().saveOutcome({ ...createProjectOutcome(a, 'apple'), status: 'trying', updatedAt: '2026-10-18T04:00:00.000Z' });
  assert.equal(useProjectStore.getState().outcomes.length, 37, 'only the same style + same brief is replaced');
  assert.equal(useProjectStore.getState().outcomes.find(item => matchesProjectOutcome(item, 'apple', b)).issue, 'Mobile table');
  const equivalent = { ...a, preserve: [...a.preserve].reverse() };
  assert.equal(projectFingerprint(a), projectFingerprint(equivalent));
  const snapshot = JSON.parse(saved.get('vibedesign-project-v2'));
  const restored = restoreProjectState(JSON.stringify(snapshot));
  assert.equal(restored.outcomes.length, 37);
  assert.equal(restored.outcomes.filter(item => matchesProjectOutcome(item, 'apple', a)).length, 1);
});

test('bad fingerprints and malformed records are rejected without partially replacing existing records', () => {
  const before = useProjectStore.getState().outcomes;
  const invalid = { ...createProjectOutcome(createProjectBrief(), 'apple'), projectFingerprint: 'wrong', updatedAt: '2026-10-18T04:00:00.000Z' };
  assert.throws(() => useProjectStore.getState().saveOutcome(invalid));
  assert.equal(useProjectStore.getState().outcomes, before);
  assert.throws(() => restoreProjectState(JSON.stringify({ version: 2, brief: createProjectBrief(), outcomes: [invalid] })));
  assert.throws(() => restoreProjectState(JSON.stringify({ version: 3, brief: createProjectBrief() })));
  assert.throws(() => useProjectStore.getState().saveOutcome({ ...createProjectOutcome(createProjectBrief(), 'apple'), brief: null }));
});

test('local write failure remains an explicit error while keeping the unsaved result available for backup', () => {
  const previous = saved.get('vibedesign-project-v2');
  rejectWrite = () => true;
  const brief = normalizeProjectBrief({ target: 'Quota failure' });
  useProjectStore.getState().saveOutcome({ ...createProjectOutcome(brief, 'swiss'), updatedAt: '2026-10-18T04:00:00.000Z' });
  assert.equal(useProjectStore.getState().storageError, true);
  assert.equal(saved.get('vibedesign-project-v2'), previous);
  assert.ok(useProjectStore.getState().outcomes.some(item => matchesProjectOutcome(item, 'swiss', brief)));
  rejectWrite = () => false;
  useProjectStore.getState().recordExport();
  assert.equal(useProjectStore.getState().storageError, false);
});

test('unreadable v2 storage is backed up before replacement, and a failed backup prevents overwriting it', async () => {
  saved.set('vibedesign-project-v2', '{unreadable original');
  const recovery = await import('../../src/project/store.ts?recovery');
  assert.equal(recovery.useProjectStore.getState().storageError, true);
  recovery.useProjectStore.getState().setBrief(normalizeProjectBrief({ target: 'New project' }));
  assert.ok([...saved].some(([key, value]) => key.startsWith('vibedesign-project-v2-recovery-') && value === '{unreadable original'));
  assert.equal(JSON.parse(saved.get('vibedesign-project-v2')).brief.target, 'New project');
  assert.equal(saved.get('vibedesign-project-v1'), legacy);
  saved.set('vibedesign-project-v2', '{another unreadable original');
  rejectWrite = key => key.includes('-recovery-');
  const blocked = await import('../../src/project/store.ts?blocked-recovery');
  blocked.useProjectStore.getState().setBrief(normalizeProjectBrief({ target: 'Still in memory' }));
  assert.equal(saved.get('vibedesign-project-v2'), '{another unreadable original');
  assert.equal(blocked.useProjectStore.getState().storageError, true);
  rejectWrite = () => false;
});
