import { useState, useEffect } from "react";
import { Position } from "@xyflow/react";
import { NodeHandle } from "./NodeHandle";
import { NodeEditToolbar } from "./NodeEditToolbar";
import { useMindMapStore } from "@/features/canvas/store/mindMapStore";
import { NodeTitleInput } from "./parts/NodeTitleInput";
import { NodePriorityBadge } from "./parts/NodePriorityBadge";
import { NodeTagsBadgeList } from "./parts/NodeTagsBadgeList";
import { NodeCollapseButton } from "./parts/NodeCollapseButton";
import { NodeAddChildButton } from "./parts/NodeAddChildButton";
const TopicNode = ({ id, data, selected }) => {
  const { updateNodeData, addChildNode, toggleCollapse, edges } = useMindMapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");
  useEffect(() => {
    setLabel(data.label || "");
  }, [data.label]);
  const hasChildren = edges.some((e) => e.source === id);
  const handleBlur = () => {
    setIsEditing(false);
    updateNodeData(id, { label: label.trim() });
  };
  const shapeClass = data.shape === "pill"
    ? "rounded-full px-4 py-2"
    : data.shape === "rounded"
    ? "rounded-[3px] px-4 py-2.5"
    : "rounded-none px-4 py-2.5";
  return <div
    className={`relative group bg-[#111114] border transition-all duration-150 shadow-lg ${shapeClass} ${selected ? "border-zinc-200 ring-1 ring-zinc-300/40 shadow-zinc-950/90" : "border-zinc-700/80 hover:border-zinc-500"}`}
    style={{
      borderLeftColor: data.color || "#d4d4d8",
      borderLeftWidth: "3px"
    }}
  >
      <NodeEditToolbar
    nodeId={id}
    isVisible={!!selected}
    currentKind="topic"
    currentShape={data.shape}
  />

      <NodeHandle type="target" position={Position.Left} id="target-l" />
      <NodeHandle type="source" position={Position.Left} id="source-l" />
      <NodeHandle type="target" position={Position.Right} id="target-r" />
      <NodeHandle type="source" position={Position.Right} id="source-r" />
      <NodeHandle type="target" position={Position.Top} id="target-t" />
      <NodeHandle type="source" position={Position.Top} id="source-t" />
      <NodeHandle type="target" position={Position.Bottom} id="target-b" />
      <NodeHandle type="source" position={Position.Bottom} id="source-b" />

      <div className="flex items-center gap-2">
        <NodeCollapseButton
    hasChildren={hasChildren}
    collapsed={data.collapsed}
    onToggle={(e) => {
      e.stopPropagation();
      toggleCollapse(id);
    }}
  />

        <NodeTitleInput
    isEditing={isEditing}
    label={label}
    onChange={setLabel}
    onBlur={handleBlur}
    onClick={(e) => {
      e.stopPropagation();
      setIsEditing(true);
    }}
    onDoubleClick={(e) => {
      e.stopPropagation();
      setIsEditing(true);
    }}
  />

        <NodePriorityBadge priority={data.priority} />

        <NodeTagsBadgeList tags={data.tags} />

        <NodeAddChildButton
    onClick={(e) => {
      e.stopPropagation();
      addChildNode(id);
    }}
  />
      </div>
    </div>;
};
export {
  TopicNode
};
