import { Move, MousePointer } from "lucide-react";
import { SliderSettingItem } from "./SliderSettingItem";
import { ToggleSettingItem } from "./ToggleSettingItem";
import { SegmentedSettingItem } from "./SegmentedSettingItem";

export const ScrollingSettingsSection = ({ settings, onUpdate }) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        <Move className="w-3.5 h-3.5" />
        <span>Scrolling & Panning</span>
      </div>

      <SegmentedSettingItem
        icon={MousePointer}
        label="Mouse Wheel Action"
        description="Choose default behavior when scrolling with mouse wheel"
        value={settings.wheelMode}
        options={[
          { value: "pan", label: "Scroll to Pan (Hold Ctrl to Zoom)" },
          { value: "zoom", label: "Scroll to Zoom (Hold Shift to Pan)" }
        ]}
        onChange={(v) => onUpdate("wheelMode", v)}
      />

      <SliderSettingItem
        icon={Move}
        label="Pan Scrolling Speed"
        description="Multiplier for two-finger drag and wheel pan velocity"
        value={settings.scrollSpeed}
        min={0.2}
        max={3.0}
        step={0.1}
        formatValue={(v) => `${v.toFixed(1)}x`}
        presets={[
          { label: "0.5x", value: 0.5 },
          { label: "1.0x", value: 1.0 },
          { label: "1.5x", value: 1.5 },
          { label: "2.0x", value: 2.0 }
        ]}
        onChange={(v) => onUpdate("scrollSpeed", v)}
      />

      <ToggleSettingItem
        icon={Move}
        label="Invert Pan Direction"
        description="Invert scroll direction for natural touchpad swipe vs reverse wheel"
        checked={settings.invertScroll}
        onChange={(v) => onUpdate("invertScroll", v)}
      />
    </section>
  );
};
