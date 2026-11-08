import { useState } from "react";
import { Position } from "@xyflow/react";
import { NodeHandle } from "./NodeHandle";
import { useMindMapStore } from "@/features/canvas/store/mindMapStore";
import { Network } from "lucide-react";
const RootNode = ({ id, data, selected }) => {
  const updateNodeData = useMindMapStore((s) => s.updateNodeData);
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const handleBlur = () => {
    setIsEditing(false);
    updateNodeData(id, { label: label.trim() || "Central Idea" });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleBlur();
  };
  return <div
    className={`relative group px-6 py-4 rounded-none bg-[#101013] border transition-all duration-150 shadow-2xl ${selected ? "border-zinc-200 ring-1 ring-zinc-300/40 shadow-zinc-950/90" : "border-zinc-700/80 hover:border-zinc-500"}`}
    style={{
      borderLeftColor: data.color || "#f4f4f5",
      borderLeftWidth: "3px"
    }}
  >
      <NodeHandle type="target" position={Position.Left} id="target-l" />
      <NodeHandle type="source" position={Position.Left} id="source-l" />
      <NodeHandle type="target" position={Position.Right} id="target-r" />
      <NodeHandle type="source" position={Position.Right} id="source-r" />
      <NodeHandle type="target" position={Position.Top} id="target-t" />
      <NodeHandle type="source" position={Position.Top} id="source-t" />
      <NodeHandle type="target" position={Position.Bottom} id="target-b" />
      <NodeHandle type="source" position={Position.Bottom} id="source-b" />

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-none bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
          <Network className="w-4 h-4" />
        </div>

        {isEditing ? <input
    type="text"
    value={label}
    onChange={(e) => setLabel(e.target.value)}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
    autoFocus
    className="bg-zinc-900 text-zinc-100 font-bold px-2 py-1 rounded-none outline-none border border-zinc-400 text-sm tracking-tight w-48 nodrag"
  /> : <span
    onClick={(e) => {
      e.stopPropagation();
      setIsEditing(true);
    }}
    onDoubleClick={(e) => {
      e.stopPropagation();
      setIsEditing(true);
    }}
    title="Click to edit central idea"
    className="text-zinc-100 font-bold text-sm tracking-wide uppercase cursor-text select-text"
  >
            {data.label}
          </span>}
      </div>
    </div>;
};
export {
  RootNode
};
