import { create } from 'zustand';
import { designStyles } from '../data/styles.ts';
import type { StyleId } from '../data/styles.ts';
import { createProjectBrief, normalizeProjectBrief } from './model.ts';
import type { ProjectBrief } from './model.ts';

export type OutcomeStatus = 'trying' | 'adopted' | 'needs-work';
export interface Outcome {
  styleId: StyleId;
  status: OutcomeStatus;
  retries: number;
  checks: string[];
  issue: string;
  updatedAt: string;
  source: 'user-reported';
  /** Null on older records whose project was never recorded. Never infer it from today's brief. */
  brief: ProjectBrief | null;
  projectFingerprint: string | null;
}
interface SavedProject { brief: ProjectBrief; shortlist: StyleId[]; outcomes: Outcome[]; exports: number }
interface ProjectState extends SavedProject {
  storageError: boolean;
  setBrief: (brief: ProjectBrief) => void;
  toggleCandidate: (id: StyleId) => void;
  saveOutcome: (outcome: Outcome) => void;
  recordExport: () => void;
  clearProject: () => void;
}
const key = 'vibedesign-project-v2';
const legacyKey = 'vibedesign-project-v1';
const validStyle = (value: unknown): value is StyleId => typeof value === 'string' && designStyles.some(s => s.id === value);
const fresh = (): SavedProject => ({ brief: createProjectBrief(), shortlist: [], outcomes: [], exports: 0 });
let unreadableCurrent: string | null = null;

/** Canonical field and preservation order make equivalent briefs match across save/restore. */
export function projectFingerprint(brief: ProjectBrief): string {
  return JSON.stringify(normalizeProjectBrief(brief));
}
export function matchesProjectOutcome(outcome: Outcome, styleId: StyleId, brief: ProjectBrief): boolean {
  return outcome.styleId === styleId && outcome.projectFingerprint === projectFingerprint(brief) && outcome.brief !== null;
}
export function createProjectOutcome(brief: ProjectBrief, styleId: StyleId): Outcome {
  if (!validStyle(styleId)) throw new Error('Unknown style / 风格不存在');
  const snapshot = normalizeProjectBrief(brief);
  return { styleId, status: 'trying', retries: 0, checks: [], issue: '', updatedAt: '', source: 'user-reported', brief: snapshot, projectFingerprint: projectFingerprint(snapshot) };
}
function record(value: unknown): value is Record<string, unknown> { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function normalizeOutcome(value: unknown): Outcome {
  if (!record(value) || !validStyle(value.styleId) || typeof value.status !== 'string' || !['trying', 'adopted', 'needs-work'].includes(value.status) || !Number.isInteger(value.retries) || (value.retries as number) < 0 || (value.retries as number) > 99 || !Array.isArray(value.checks) || !value.checks.every(item => typeof item === 'string') || typeof value.issue !== 'string' || typeof value.updatedAt !== 'string') throw new Error('Invalid result record / 结果记录格式错误');
  let brief: ProjectBrief | null = null;
  let fingerprint: string | null = null;
  if (value.brief !== undefined && value.brief !== null) {
    brief = normalizeProjectBrief(value.brief);
    fingerprint = projectFingerprint(brief);
    // Older saved briefs predate optional primaryAction. Compare canonical data instead of
    // discarding their valid snapshots merely because today's defaults add that field.
    if (typeof value.projectFingerprint !== 'string' || projectFingerprint(normalizeProjectBrief(JSON.parse(value.projectFingerprint))) !== fingerprint) throw new Error('Result project mismatch / 结果记录与项目简报不匹配');
  } else if (value.projectFingerprint !== undefined && value.projectFingerprint !== null) throw new Error('Missing result brief / 结果记录缺少项目简报');
  return { styleId: value.styleId, status: value.status as OutcomeStatus, retries: value.retries as number, checks: [...value.checks], issue: value.issue, updatedAt: value.updatedAt, source: 'user-reported', brief, projectFingerprint: fingerprint };
}

/** Exposed for migration regression checks. Old records remain unbound rather than being attributed to a new project. */
export function restoreProjectState(raw: string): SavedProject {
  const data: unknown = JSON.parse(raw);
  if (!record(data) || (data.version !== 1 && data.version !== 2)) throw new Error('Unsupported project version');
  return {
    brief: normalizeProjectBrief(data.brief),
    shortlist: Array.isArray(data.shortlist) ? [...new Set(data.shortlist.filter(validStyle))].slice(0, 3) : [],
    outcomes: Array.isArray(data.outcomes) ? data.outcomes.map(normalizeOutcome) : [],
    exports: Number.isSafeInteger(data.exports) && (data.exports as number) >= 0 ? data.exports as number : 0,
  };
}
function load(): SavedProject & { storageError: boolean } {
  try {
    const current = localStorage.getItem(key);
    if (current !== null) {
      try { return { ...restoreProjectState(current), storageError: false }; }
      catch { unreadableCurrent = current; return { ...fresh(), storageError: true }; }
    }
    const legacy = localStorage.getItem(legacyKey);
    return legacy === null ? { ...fresh(), storageError: false } : { ...restoreProjectState(legacy), storageError: false };
  } catch { return { ...fresh(), storageError: true }; }
}
export const useProjectStore = create<ProjectState>()(set => ({
  ...load(),
  setBrief: brief => set({ brief: normalizeProjectBrief(brief) }),
  toggleCandidate: id => set(state => ({ shortlist: !validStyle(id) ? state.shortlist : state.shortlist.includes(id) ? state.shortlist.filter(item => item !== id) : state.shortlist.length < 3 ? [...state.shortlist, id] : state.shortlist })),
  saveOutcome: outcome => {
    const checked = normalizeOutcome(outcome);
    if (checked.brief === null || !checked.updatedAt) throw new Error('Project snapshot is required / 保存结果需要项目简报快照');
    set(state => ({ outcomes: [...state.outcomes.filter(item => !(item.styleId === checked.styleId && item.projectFingerprint === checked.projectFingerprint)), checked] }));
  },
  recordExport: () => set(state => ({ exports: state.exports + 1 })),
  clearProject: () => {
    try {
      // Explicit clearing includes retained v1 data and any recovery copies made by this store.
      const names = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index)).filter((name): name is string => name !== null && (name === key || name === legacyKey || name.startsWith(`${key}-recovery-`)));
      for (const name of names) localStorage.removeItem(name);
      unreadableCurrent = null;
      set({ ...fresh(), storageError: false });
    } catch { set({ ...fresh(), storageError: true }); }
  },
}));
useProjectStore.subscribe((state, previous) => {
  if (state.brief === previous.brief && state.shortlist === previous.shortlist && state.outcomes === previous.outcomes && state.exports === previous.exports) return;
  try {
    // Back up unreadable v2 bytes before the first write. If backup fails, never overwrite them.
    // Original v1 bytes are never changed by migration and remain available until explicit clearing.
    if (unreadableCurrent !== null) {
      const prefix = `${key}-recovery-${Date.now()}`;
      let backupKey = prefix, suffix = 0;
      while (localStorage.getItem(backupKey) !== null) backupKey = `${prefix}-${++suffix}`;
      localStorage.setItem(backupKey, unreadableCurrent);
      unreadableCurrent = null;
    }
    localStorage.setItem(key, JSON.stringify({ version: 2, brief: state.brief, shortlist: state.shortlist, outcomes: state.outcomes, exports: state.exports }));
    if (state.storageError) useProjectStore.setState({ storageError: false });
  } catch { if (!state.storageError) useProjectStore.setState({ storageError: true }); }
});
