import { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useNodesInitialized,
  Controls,
  MiniMap,
  Background,
  SelectionMode,
  ConnectionMode
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMindMapStore } from "@/features/canvas/store/mindMapStore";
import { clearPersistedViewport } from "@/features/canvas/store/canvasPersistence";
import { nodeTypes } from "@/features/nodes/nodeTypes";
import { edgeTypes } from "@/features/edges/edgeTypes";
import { useKeyboardNavigation } from "@/features/canvas/hooks/useKeyboardNavigation";
import { CanvasWheelController } from "./CanvasWheelController";
import { useThemeStore } from "@/features/theme/store/themeStore";
import { CanvasZoomWidget } from "./controls/CanvasZoomWidget";

const FIT_VIEW_OPTIONS = {
  padding: 0.2,
  maxZoom: 1,
  duration: 0
};

const MindMapCanvasInner = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    addCardAtPosition
  } = useMindMapStore();
  const { screenToFlowPosition, fitView } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const hasCenteredOnLoadRef = useRef(false);
  const activeProjectId = useMindMapStore((s) => s.activeProjectId);
  const lastProjectIdRef = useRef(activeProjectId);

  useKeyboardNavigation();
  const currentTheme = useThemeStore((s) => s.currentTheme);

  // Clear any legacy saved viewport so refresh always centers user card(s)
  useEffect(() => {
    clearPersistedViewport();
  }, []);

  // When web is refreshed / initially loaded, center the card or collection of cards
  useEffect(() => {
    if (!hasCenteredOnLoadRef.current && nodesInitialized && nodes.length > 0) {
      hasCenteredOnLoadRef.current = true;
      fitView(FIT_VIEW_OPTIONS);
    }
  }, [nodesInitialized, nodes.length, fitView]);

  // When switching projects, smoothly center the cards of the target project
  useEffect(() => {
    if (lastProjectIdRef.current !== activeProjectId) {
      lastProjectIdRef.current = activeProjectId;
      if (nodes.length > 0) {
        requestAnimationFrame(() => {
          fitView({ padding: 0.2, maxZoom: 1, duration: 250 });
        });
      }
    }
  }, [activeProjectId, nodes.length, fitView]);
  const handleSelectionChange = useCallback(
    (params) => {
      if (params.nodes && params.nodes.length > 0) {
        setSelectedNodeId(params.nodes[0].id);
      } else {
        setSelectedNodeId(null);
      }
    },
    [setSelectedNodeId]
  );
  const handleDoubleClick = useCallback(
    (e) => {
      const target = e.target;
      if (target?.closest(
        ".react-flow__node, .react-flow__controls, .react-flow__minimap, header, button, [data-no-menu]"
      )) {
        return;
      }
      const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      addCardAtPosition(flowPos, "topic");
    },
    [screenToFlowPosition, addCardAtPosition]
  );
  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);
  return <div
    className="w-full h-full relative"
    style={{ backgroundColor: currentTheme.canvasBg }}
    onDoubleClick={handleDoubleClick}
  >
      <ReactFlow
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    edgeTypes={edgeTypes}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    onPaneClick={handlePaneClick}
    onSelectionChange={handleSelectionChange}
    selectionMode={SelectionMode.Partial}
    connectionMode={ConnectionMode.Loose}
    zoomOnDoubleClick={false}
    panOnScroll={false}
    zoomOnScroll={false}
    zoomOnPinch={false}
    zoomActivationKeyCode={null}
    panOnDrag={[0, 1, 2]}
    fitView={Boolean(nodes && nodes.length > 0)}
    fitViewOptions={FIT_VIEW_OPTIONS}
    minZoom={0.15}
    maxZoom={2.5}
    defaultEdgeOptions={{
      type: "smoothstep",
      style: { stroke: "#71717a", strokeWidth: 1.5 }
    }}
    proOptions={{ hideAttribution: true }}
    className="touch-none"
  >
        <CanvasWheelController />

        <Background
    variant={currentTheme.variant}
    gap={currentTheme.dotGap}
    size={currentTheme.dotSize}
    color={currentTheme.dotColor}
  />

        <Controls
    showInteractive={false}
    className="!bg-zinc-900/95 !border !border-zinc-700 !rounded-none !overflow-hidden !shadow-2xl [&>button]:!bg-zinc-900 [&>button]:!border-zinc-700 [&>button]:!text-zinc-200 hover:[&>button]:!bg-zinc-800"
  />

        <CanvasZoomWidget />

        <MiniMap
    nodeStrokeWidth={3}
    nodeColor={(node) => {
      const dataColor = node.data?.color;
      return dataColor || "#e4e4e7";
    }}
    maskColor="rgba(9, 9, 11, 0.88)"
    className="!bg-zinc-900 !border !border-zinc-700 !rounded-none !overflow-hidden !shadow-2xl"
  />
      </ReactFlow>
    </div>;
};
const MindMapCanvas = () => {
  return <ReactFlowProvider>
      <MindMapCanvasInner />
    </ReactFlowProvider>;
};
export {
  MindMapCanvas
};
