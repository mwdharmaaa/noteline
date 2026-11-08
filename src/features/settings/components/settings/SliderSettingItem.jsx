export const SliderSettingItem = ({
  icon: Icon,
  label,
  description,
  value,
  min,
  max,
  step = 0.1,
  formatValue = (v) => `${v.toFixed(1)}x`,
  onChange,
  presets = []
}) => {
  return (
    <div className="p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <div>
            <h4 className="text-xs font-medium text-zinc-200">{label}</h4>
            {description && (
              <p className="text-[11px] text-zinc-400 leading-tight">{description}</p>
            )}
          </div>
        </div>
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 shadow-sm">
          {formatValue(value)}
        </span>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
      </div>

      {presets.length > 0 && (
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-[10px] text-zinc-400 font-mono">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-all ${
                Math.abs(value - preset.value) < 0.05
                  ? "bg-zinc-200 text-zinc-900 font-semibold shadow-sm"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 border border-zinc-700/60"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
