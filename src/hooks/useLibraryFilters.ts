import { useEffect, useState } from 'react';
import { scenes, difficultyTiers } from '../data/scenes';
interface Filters { tag: number; scene: string; difficulty: string; query: string }
const initial: Filters = { tag: 0, scene: '', difficulty: '', query: '' };
export function useLibraryFilters() {
  const [filters, setFilters] = useState<Filters>(() => {
    try {
      const value = JSON.parse(sessionStorage.getItem('vibedesign-library-filters') || 'null');
      if (!value || !Number.isInteger(value.tag) || value.tag < 0 || value.tag > 9 || typeof value.query !== 'string' || value.query.length > 120 || !['', ...scenes.map(s => s.id)].includes(value.scene) || !['', ...difficultyTiers.map(t => String(t.level))].includes(value.difficulty)) return initial;
      return value;
    } catch { return initial; }
  });
  useEffect(() => { try { sessionStorage.setItem('vibedesign-library-filters', JSON.stringify(filters)); } catch { /* Filtering remains usable without storage. */ } }, [filters]);
  const update = <K extends keyof Filters>(field: K, value: Filters[K]) => setFilters(previous => ({ ...previous, [field]: value }));
  return { filters, update };
}
