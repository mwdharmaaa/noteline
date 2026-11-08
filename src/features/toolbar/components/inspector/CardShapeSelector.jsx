const CardShapeSelector = ({
  currentShape = "rectangle",
  onSelectShape
}) => {
  return <div className="space-y-1.5">
      <label className="text-[11px] font-medium text-zinc-400">Shape</label>
      <div className="grid grid-cols-3 gap-1 bg-zinc-950 p-1 rounded-none border border-zinc-800">
        {["rectangle", "rounded", "pill"].map((shape) => <button
    key={shape}
    onClick={() => onSelectShape(shape)}
    className={`text-xs py-1 rounded-none capitalize font-medium transition-all ${currentShape === shape ? "bg-zinc-800 text-zinc-100 shadow border border-zinc-700" : "text-zinc-400 hover:text-zinc-200"}`}
  >
            {shape}
          </button>)}
      </div>
    </div>;
};
export {
  CardShapeSelector
};
