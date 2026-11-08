import { Plus } from "lucide-react";
const ChecklistInputForm = ({
  value,
  onChange,
  onSubmit
}) => {
  return <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center gap-1.5">
      <input
    type="text"
    placeholder="New task..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
    className="bg-zinc-900 text-zinc-200 text-xs px-2 py-1 rounded-none outline-none border border-zinc-700/80 focus:border-zinc-400 flex-1 placeholder:text-zinc-500 nodrag"
  />
      <button
    onClick={onSubmit}
    className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-none border border-zinc-700/80 transition-colors"
    title="Add task"
  >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>;
};
export {
  ChecklistInputForm
};
