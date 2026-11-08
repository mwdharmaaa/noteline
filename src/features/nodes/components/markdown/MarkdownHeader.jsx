import { FileText, Edit2, Check } from "lucide-react";
const MarkdownHeader = ({
  label,
  isEditing,
  isEditingTitle,
  onTitleChange,
  onTitleBlur,
  onTitleClick,
  onTitleDoubleClick,
  onToggleContentEdit
}) => {
  return <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 flex-1 mr-2">
        <FileText className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
        {isEditingTitle ? <input
    type="text"
    value={label}
    onChange={(e) => onTitleChange(e.target.value)}
    onBlur={onTitleBlur}
    onKeyDown={(e) => e.key === "Enter" && onTitleBlur()}
    autoFocus
    className="bg-zinc-900 text-zinc-100 text-xs px-1.5 py-0.5 rounded-none outline-none border border-zinc-500 w-full nodrag"
  /> : <span
    onClick={onTitleClick || onTitleDoubleClick}
    onDoubleClick={onTitleDoubleClick}
    className="truncate cursor-text tracking-tight uppercase text-zinc-100 font-semibold text-[11px]"
    title="Click to edit title"
  >
            {label || "Doc Note"}
          </span>}
      </div>
      <button
    onClick={onToggleContentEdit}
    className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded-none hover:bg-zinc-800"
    title={isEditing ? "Save note" : "Edit note"}
  >
        {isEditing ? <Check className="w-3.5 h-3.5 text-zinc-200" /> : <Edit2 className="w-3 h-3 text-zinc-400" />}
      </button>
    </div>;
};
export {
  MarkdownHeader
};
