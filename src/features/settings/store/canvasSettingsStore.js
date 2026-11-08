import { create } from "zustand";
import { DEFAULT_CANVAS_SETTINGS } from "../types/settings.types.js";
import { loadCanvasSettings, saveCanvasSettings, clearCanvasSettings } from "../services/settingsStorage.js";

export const useCanvasSettingsStore = create((set, get) => ({
  settings: loadCanvasSettings(),
  isSettingsOpen: false,

  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),

  updateSetting: (key, value) => {
    const current = get().settings;
    const next = { ...current, [key]: value };
    saveCanvasSettings(next);
    set({ settings: next });
  },

  resetSettings: () => {
    clearCanvasSettings();
    set({ settings: { ...DEFAULT_CANVAS_SETTINGS } });
  }
}));
