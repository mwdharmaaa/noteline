const NodeTitleInput = ({
  isEditing,
  label,
  placeholder = "Empty card - click to type",
  onChange,
  onBlur,
  onClick,
  onDoubleClick
}) => {
  if (isEditing) {
    return <input
      type="text"
      value={label}
      placeholder="Type note title..."
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={(e) => e.key === "Enter" && onBlur()}
      autoFocus
      className="bg-zinc-900 text-zinc-100 text-xs px-2 py-0.5 rounded-none outline-none border border-zinc-400 min-w-[130px] font-medium placeholder:text-zinc-500 nodrag"
    />;
  }
  return <span
    onClick={onClick || onDoubleClick}
    onDoubleClick={onDoubleClick}
    title="Click to edit text"
    className={`text-xs select-text cursor-text tracking-tight ${label ? "font-semibold text-zinc-100" : "italic text-zinc-500"}`}
  >
      {label || placeholder}
    </span>;
};
export {
  NodeTitleInput
};
