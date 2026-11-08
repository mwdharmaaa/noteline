const NodeTagsBadgeList = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return <div className="flex items-center gap-1 flex-wrap">
      {tags.map((tag) => <span
    key={tag}
    className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded-none border border-zinc-800"
  >
          #{tag}
        </span>)}
    </div>;
};
export {
  NodeTagsBadgeList
};
