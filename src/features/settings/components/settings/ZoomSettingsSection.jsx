import { ZoomIn, Smartphone } from "lucide-react";
import { SliderSettingItem } from "./SliderSettingItem";
import { ToggleSettingItem } from "./ToggleSettingItem";

export const ZoomSettingsSection = ({ settings, onUpdate }) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        <ZoomIn className="w-3.5 h-3.5" />
        <span>Zoom & Pinch Gestures</span>
      </div>

      <SliderSettingItem
        icon={ZoomIn}
        label="Wheel Zoom Step Sensitivity"
        description="Discrete zoom stepping multiplier for notched mouse wheels"
        value={settings.wheelZoomSpeed}
        min={0.2}
        max={3.0}
        step={0.1}
        formatValue={(v) => `${v.toFixed(1)}x`}
        presets={[
          { label: "0.5x", value: 0.5 },
          { label: "1.0x", value: 1.0 },
          { label: "1.5x", value: 1.5 }
        ]}
        onChange={(v) => onUpdate("wheelZoomSpeed", v)}
      />

      <SliderSettingItem
        icon={ZoomIn}
        label="Trackpad Pinch Zoom Sensitivity"
        description="Continuous zoom velocity for trackpad pinch gestures"
        value={settings.trackpadPinchSpeed}
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
        onChange={(v) => onUpdate("trackpadPinchSpeed", v)}
      />

      <SliderSettingItem
        icon={Smartphone}
        label="Touchscreen Pinch Exponent"
        description="Multi-touch gesture sensitivity (lower = gentler, higher = rapid sweep)"
        value={settings.touchPinchExponent}
        min={1.0}
        max={4.0}
        step={0.25}
        formatValue={(v) => `${v.toFixed(2)}`}
        presets={[
          { label: "1.5", value: 1.5 },
          { label: "2.0 (Default)", value: 2.0 },
          { label: "2.5", value: 2.5 },
          { label: "3.0", value: 3.0 }
        ]}
        onChange={(v) => onUpdate("touchPinchExponent", v)}
      />

      <ToggleSettingItem
        icon={ZoomIn}
        label="Invert Zoom Direction"
        description="Reverse zoom in and zoom out direction for wheel and pinch"
        checked={settings.invertZoom}
        onChange={(v) => onUpdate("invertZoom", v)}
      />
    </section>
  );
};
