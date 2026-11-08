const NodePriorityBadge = ({ priority }) => {
  if (!priority || priority === "none") return null;
  const styleClass = priority === "urgent" ? "bg-zinc-100 text-zinc-950 font-bold border border-zinc-200" : priority === "high" ? "bg-zinc-800 text-zinc-200 border border-zinc-600 font-medium" : "bg-zinc-900 text-zinc-400 border border-zinc-800";
  return <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-none tracking-wider ${styleClass}`}>
      {priority}
    </span>;
};
export {
  NodePriorityBadge
};
