const CardTypeSelector = ({
  currentKind,
  onSelectKind
}) => {
  return <div className="space-y-1.5">
      <label className="text-[11px] font-medium text-zinc-400">Card Type</label>
      <div className="grid grid-cols-3 gap-1 bg-zinc-950 p-1 rounded-none border border-zinc-800">
        {["topic", "checklist", "markdown"].map((kind) => <button
    key={kind}
    onClick={() => onSelectKind(kind)}
    className={`text-xs py-1 rounded-none capitalize font-medium transition-all ${currentKind === kind ? "bg-zinc-800 text-zinc-100 shadow border border-zinc-700" : "text-zinc-400 hover:text-zinc-200"}`}
  >
            {kind === "topic" ? "Card" : kind === "markdown" ? "Note" : "Checklist"}
          </button>)}
      </div>
    </div>;
};
export {
  CardTypeSelector
};
