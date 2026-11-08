import { X, Sliders, RotateCcw } from "lucide-react";
import { useCanvasSettingsStore } from "../store/canvasSettingsStore";
import { ScrollingSettingsSection } from "./settings/ScrollingSettingsSection";
import { ZoomSettingsSection } from "./settings/ZoomSettingsSection";

export const CanvasSettingsModal = () => {
  const { isSettingsOpen, closeSettings, settings, updateSetting, resetSettings } = useCanvasSettingsStore();

  if (!isSettingsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={closeSettings}
    >
      <div
        className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Canvas Navigation & Gestures</h3>
              <p className="text-[11px] text-zinc-400">Calibrate scroll velocity, wheel zoom, and pinch sensitivity</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={resetSettings}
              className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-colors"
              title="Reset all settings to calibrated defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Defaults</span>
            </button>
            <button
              onClick={closeSettings}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          <ScrollingSettingsSection settings={settings} onUpdate={updateSetting} />
          <div className="h-px bg-zinc-800/80" />
          <ZoomSettingsSection settings={settings} onUpdate={updateSetting} />
        </div>
      </div>
    </div>
  );
};
