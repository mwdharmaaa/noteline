export const SegmentedSettingItem = ({
  icon: Icon,
  label,
  description,
  value,
  options = [],
  onChange
}) => {
  return (
    <div className="p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl space-y-2.5">
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

      <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-900 border border-zinc-700/80 rounded-lg">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all text-center ${
                isSelected
                  ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
