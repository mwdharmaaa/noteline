export const ToggleSettingItem = ({
  icon: Icon,
  label,
  description,
  checked,
  onChange
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl gap-3">
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

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
          checked ? "bg-zinc-200" : "bg-zinc-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-zinc-900 shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
