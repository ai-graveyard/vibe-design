import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'zh' | 'en';
export type Theme = 'light' | 'dark';
export type PreviewDevice = 'desktop' | 'tablet' | 'mobile' | 'responsive';

export interface AppState {
  language: Language;
  theme: Theme;
  previewDevice: PreviewDevice;
  isDetailsPanelCollapsed: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  toggleDetailsPanel: () => void;
}

export function mergeAppSettings(persisted: unknown, current: AppState): AppState {
  const state = persisted !== null && typeof persisted === 'object' ? persisted as Partial<AppState> : {};
  return {
    ...current,
    language: state.language === 'zh' || state.language === 'en' ? state.language : current.language,
    theme: state.theme === 'light' || state.theme === 'dark' ? state.theme : current.theme,
    previewDevice: state.previewDevice === 'desktop' || state.previewDevice === 'tablet' || state.previewDevice === 'mobile' || state.previewDevice === 'responsive' ? state.previewDevice : current.previewDevice,
    isDetailsPanelCollapsed: typeof state.isDetailsPanelCollapsed === 'boolean' ? state.isDetailsPanelCollapsed : current.isDetailsPanelCollapsed,
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'zh',
      theme: 'light',
      previewDevice: 'desktop',
      isDetailsPanelCollapsed: false,
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme }),
      toggleLanguage: () => set((state) => ({
        language: state.language === 'zh' ? 'en' : 'zh'
      })),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      setPreviewDevice: (device) => set({ previewDevice: device }),
      toggleDetailsPanel: () => set((state) => ({
        isDetailsPanelCollapsed: !state.isDetailsPanelCollapsed
      })),
    }),
    {
      name: 'vibedesign-settings',
      version: 1,
      migrate: persistedState => persistedState as AppState,
      merge: mergeAppSettings,
    }
  )
);
