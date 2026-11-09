import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createDraft, exportRecipe, importRecipe } from '../../src/recipes/model.ts';
import { readStorage, writeStorage, storageKey } from '../../src/recipes/storage.ts';

const stamp = '2026-10-18T12:00:00.000Z';
const recipe = (name) => exportRecipe({ ...createDraft(), name });
const entry = (id, name = id) => ({ id, savedAt: stamp, file: recipe(name) });

function storage(initial = {}, reject = () => false) {
  const data = new Map(Object.entries(initial));
  const writes = [];
  return {
    data, writes,
    get length() { return data.size; },
    key(index) { return [...data.keys()][index] ?? null; },
    getItem(key) { return data.get(key) ?? null; },
    setItem(key, value) {
      writes.push({ key, value });
      if (reject(key, value)) throw new Error('QuotaExceededError');
      data.set(key, value);
    },
    removeItem() { throw new Error('Recipe persistence must not remove user data'); },
  };
}
function inStorage(mock, callback) {
  const previous = globalThis.localStorage;
  globalThis.localStorage = mock;
  try { return callback(); }
  finally {
    if (previous === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previous;
  }
}

test('a bad saved record does not hide the current draft or other readable recipes', () => {
  const raw = JSON.stringify({ current: recipe('Current'), saved: [entry('one'), { ...entry('bad'), file: '{damaged' }, entry('two')] });
  const mock = storage({ [storageKey]: raw });
  inStorage(mock, () => {
    const restored = readStorage();
    assert.equal(restored.error, true);
    assert.equal(restored.draft.name, 'Current');
    assert.deepEqual(restored.saved.map(item => item.id), ['one', 'two']);
    assert.equal(restored.recoveryBackups.length, 1);
    assert.equal(restored.recoveryBackups[0].raw, raw, 'exact original bytes remain available for download');
    assert.equal(mock.data.get(storageKey), raw);
    assert.equal(mock.writes.length, 0, 'reading does not mutate storage');

    const changed = { ...restored.draft, name: 'Edited' };
    assert.equal(writeStorage(changed, restored.saved), true);
    assert.equal(mock.writes.length, 2);
    assert.ok(mock.writes[0].key.startsWith(`${storageKey}-recovery-`));
    assert.equal(mock.writes[0].value, raw, 'raw backup is written before replacing damaged storage');
    assert.equal(mock.writes[1].key, storageKey);
    const reloaded = readStorage();
    assert.equal(reloaded.error, false);
    assert.equal(reloaded.draft.name, 'Edited');
    assert.deepEqual(reloaded.saved.map(item => item.id), ['one', 'two']);
    assert.equal(reloaded.recoveryBackups[0].raw, raw, 'raw backup remains discoverable after a reload');
  });
});

test('unreadable current data still restores good saved files, including damaged metadata and duplicate IDs', () => {
  const one = entry('same', 'One'), two = entry('same', 'Two'), three = { file: recipe('Three'), id: null, savedAt: 'not-a-date' };
  const raw = JSON.stringify({ current: 'future or damaged current file', saved: [one, two, three] });
  inStorage(storage({ [storageKey]: raw }), () => {
    const restored = readStorage();
    assert.equal(restored.error, true);
    assert.equal(restored.draft.name, '');
    assert.equal(restored.saved.length, 3);
    assert.equal(new Set(restored.saved.map(item => item.id)).size, 3);
    assert.deepEqual(restored.saved.map(item => importRecipe(item.file).name), ['One', 'Two', 'Three']);
    assert.equal(restored.saved[2].savedAt, '', 'an unknown date is not invented');
    assert.equal(restored.recoveryBackups[0].raw, raw);
    assert.equal(writeStorage(restored.draft, restored.saved), true, 'repaired metadata remains readable on the next load');
    assert.equal(readStorage().saved.length, 3);
  });
});

test('backup quota failure leaves the exact original and all existing copies untouched', () => {
  const raw = JSON.stringify({ current: recipe('Current'), saved: [entry('good'), { file: 'unsupported' }] });
  const mock = storage({ [storageKey]: raw, unrelated: 'keep' }, key => key.startsWith(`${storageKey}-recovery-`));
  inStorage(mock, () => {
    const restored = readStorage();
    const changed = { ...restored.draft, name: 'Session-only edit' };
    assert.equal(writeStorage(changed, restored.saved), false);
    assert.equal(mock.data.get(storageKey), raw);
    assert.equal(mock.data.get('unrelated'), 'keep');
    assert.ok(mock.writes.every(item => item.key !== storageKey), 'replacement is never attempted if the raw backup fails');
    assert.equal(changed.name, 'Session-only edit', 'the caller can retain and export in-memory editing');
    assert.equal(restored.recoveryBackups[0].raw, raw, 'raw data can be downloaded even when no extra storage space is available');
  });
});

test('a failed current write does not report success and preserves the verified raw backup', () => {
  const raw = 'not JSON\n原始字节';
  const mock = storage({ [storageKey]: raw }, key => key === storageKey);
  inStorage(mock, () => {
    const restored = readStorage();
    assert.equal(writeStorage({ ...restored.draft, name: 'Memory only' }, restored.saved), false);
    assert.equal(mock.data.get(storageKey), raw);
    const backup = [...mock.data.entries()].find(([key]) => key.startsWith(`${storageKey}-recovery-`));
    assert.equal(backup[1], raw);
  });
});

test('an existing verified backup is reused without consuming another recovery slot', () => {
  const raw = '{broken';
  const mock = storage({ [storageKey]: raw });
  inStorage(mock, () => {
    const first = readStorage();
    const key = first.recoveryBackups[0].key;
    mock.data.set(key, raw);
    assert.equal(writeStorage(first.draft, first.saved), true);
    assert.deepEqual(mock.writes.map(item => item.key), [storageKey]);
    assert.equal(readStorage().recoveryBackups.length, 1);
  });
});

test('an altered recovery slot cannot be overwritten or used as proof of a successful backup', () => {
  const raw = '{damaged';
  const mock = storage({ [storageKey]: raw });
  inStorage(mock, () => {
    const first = readStorage();
    const key = first.recoveryBackups[0].key;
    mock.data.set(key, 'different original backup');
    assert.equal(writeStorage(first.draft, first.saved), false);
    assert.equal(mock.data.get(key), 'different original backup');
    assert.equal(mock.data.get(storageKey), raw);
    assert.equal(mock.writes.length, 0);
  });
});

test('valid and supported legacy recipes retain every saved item without unnecessary recovery copies', () => {
  const legacy = readFileSync(new URL('./fixtures/recipe-v1.json', import.meta.url), 'utf8');
  const raw = JSON.stringify({ current: legacy, saved: [entry('one'), { id: 'legacy', savedAt: stamp, file: legacy }] });
  const mock = storage({ [storageKey]: raw });
  inStorage(mock, () => {
    const restored = readStorage();
    assert.equal(restored.error, false);
    assert.equal(restored.recoveryBackups.length, 0);
    assert.equal(restored.draft.name, 'Legacy saved recipe');
    assert.equal(writeStorage(restored.draft, restored.saved), true);
    assert.deepEqual(mock.writes.map(item => item.key), [storageKey]);
    assert.equal(readStorage().saved[1].file, legacy, 'saved legacy source JSON is retained');
  });
});

test('unavailable storage and an invalid next state fail without destroying existing data', () => {
  inStorage({ get length() { throw new Error('blocked'); }, getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } }, () => {
    const restored = readStorage();
    assert.equal(restored.error, true);
    assert.equal(writeStorage(restored.draft, restored.saved), false);
  });
  const raw = JSON.stringify({ current: recipe('Current'), saved: [entry('good')] });
  const mock = storage({ [storageKey]: raw });
  inStorage(mock, () => {
    assert.equal(writeStorage(createDraft(), [{ ...entry('bad'), file: 'invalid' }]), false);
    assert.equal(mock.data.get(storageKey), raw);
    assert.equal(mock.writes.length, 0);
  });
});
