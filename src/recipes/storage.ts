import { createDraft, importRecipe, exportRecipe } from './model.ts';
import type { Draft } from './model.ts';
import { sha256 } from '../lib/checksum.ts';
export const storageKey = 'vibedesign-recipes-v1';
const recoveryPrefix = `${storageKey}-recovery-`;
export interface SavedRecipe { id: string; file: string; savedAt: string }
export interface RecipeRecovery { key: string; raw: string }
export interface RecipeStorage { draft: Draft; saved: SavedRecipe[]; error: boolean; recoveryBackups: RecipeRecovery[] }
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const empty = () => ({ draft: createDraft(), saved: [] as SavedRecipe[], error: false });
const recoveryKey = (raw: string) => `${recoveryPrefix}${sha256(raw)}`;

/** Restore independent readable records; one damaged item must not swallow the whole collection. */
function parseStorage(raw: string): Omit<RecipeStorage, 'recoveryBackups'> {
  const restored = empty();
  try {
    const data: unknown = JSON.parse(raw);
    if (!record(data)) throw new Error('Invalid storage');
    if (Object.keys(data).some(key => !['current', 'saved'].includes(key))) restored.error = true;
    try {
      if (typeof data.current !== 'string') throw new Error('Missing current recipe');
      restored.draft = importRecipe(data.current);
    } catch { restored.error = true; }
    if (!Array.isArray(data.saved)) restored.error = true;
    else for (const item of data.saved) {
      try {
        if (!record(item) || typeof item.file !== 'string') throw new Error('Invalid saved recipe');
        importRecipe(item.file);
        if (Object.keys(item).some(key => !['id', 'file', 'savedAt'].includes(key))) restored.error = true;
        const validId = typeof item.id === 'string' && item.id !== '';
        const validDate = typeof item.savedAt === 'string' && (item.savedAt === '' || Number.isFinite(Date.parse(item.savedAt)));
        if (!validId || !validDate) restored.error = true;
        // Salvage duplicate IDs without losing either readable recipe or creating duplicate UI keys.
        let id = validId ? item.id as string : `recovered-${sha256(item.file).slice(0, 12)}`;
        while (restored.saved.some(saved => saved.id === id)) { restored.error = true; id += '-recovered'; }
        restored.saved.push({ id, file: item.file, savedAt: validDate ? item.savedAt as string : '' });
      } catch { restored.error = true; }
    }
  } catch { restored.error = true; }
  return restored;
}

function recoveryCopies(): RecipeRecovery[] {
  const copies: RecipeRecovery[] = [];
  // Keep already-read copies available even when a later storage access fails.
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(recoveryPrefix)) continue;
      const raw = localStorage.getItem(key);
      if (raw !== null) copies.push({ key, raw });
    }
  } catch { /* These optional copies do not prevent using readable current data. */ }
  return copies;
}

export function readStorage(): RecipeStorage {
  const recoveryBackups = recoveryCopies();
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return { ...empty(), recoveryBackups };
    const restored = parseStorage(raw);
    if (restored.error && !recoveryBackups.some(copy => copy.raw === raw)) recoveryBackups.unshift({ key: recoveryKey(raw), raw });
    return { ...restored, recoveryBackups };
  } catch { return { ...empty(), error: true, recoveryBackups }; }
}
export function writeStorage(draft: Draft, saved: SavedRecipe[]) {
  try {
    const current = exportRecipe(draft);
    // Never write a state that cannot be read back by the same importer.
    const next = JSON.stringify({ current, saved });
    if (parseStorage(next).error) return false;
    const original = localStorage.getItem(storageKey);
    if (original !== null && parseStorage(original).error) {
      const key = recoveryKey(original);
      const existing = localStorage.getItem(key);
      // A distinct recovery copy is never replaced, even if its key was externally altered.
      if (existing !== null && existing !== original) return false;
      if (existing === null) localStorage.setItem(key, original);
      if (localStorage.getItem(key) !== original) return false;
    }
    // A quota/security failure leaves the original bytes and any recovery copy intact.
    localStorage.setItem(storageKey, next);
    return localStorage.getItem(storageKey) === next;
  }
  catch { return false; }
}
