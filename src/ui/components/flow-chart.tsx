import { useMemo } from "react";
import {
  Background,
  type Edge,
  MarkerType,
  type Node,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "#/utils/style";

const nodeStyle = {
  borderRadius: 30,
  border: "3px dashed rgba(0,0,0,0.4)",
  padding: 16,
  background: "rgba(0,0,0,0.04)",
  // backdropFilter: "blur(10px)",
  color: "black",
  width: 220,
  // boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const edgeStyle = {
  stroke: "rgba(0,0,0,0.4)",
  strokeWidth: 2,
};

function createFlow(
  steps: string[],
  y = 0,
  customNodeStyle: React.CSSProperties = {},
  textClassName: string = "",
): {
  nodes: Node[];
  edges: Edge[];
} {
  const isMobile = window.innerWidth < 768;
  const spacing = 280;
  const maxNodesPerRow = isMobile ? 1 : 3;
 
  const nodes: Node[] = steps.map((step, index) => {
    const row = Math.trunc(index / maxNodesPerRow);
    const isRowEven = row % 2 === 0;
    const normalizedIndex = index - (maxNodesPerRow * row);
    return({
    id: `node-${y}-${index}`,
    position: {
      x:  isRowEven  ? (normalizedIndex * spacing) : ((maxNodesPerRow - normalizedIndex - 1) * spacing),
      y: row * 190, // stagger nodes vertically
    },
    sourcePosition: !isRowEven  ? Position.Left : Position.Right,
    targetPosition: !isRowEven ? Position.Right : Position.Left,
    data: {
      label: (
        <div className={cn("flex flex-col gap-2 text-2xl!", textClassName)}>
          <div className="text-xs uppercase tracking-[0.25em] text-black">
            Step {index + 1}
          </div>

          <div className={cn("text-lg font-medium leading-snug", textClassName)}>
            {step}
          </div>
        </div>
      ),
    },
    style: {...nodeStyle, ...customNodeStyle},
    draggable: false,
  })});

  const edges: Edge[] = steps.slice(0, -1).map((_, index) => ({
    id: `edge-${y}-${index}`,
    source: `node-${y}-${index}`,
    target: `node-${y}-${index + 1}`,
    animated: true,
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: edgeStyle,
  }));

  return {
    nodes,
    edges,
  };
}

export function FlowCard({
  customNodeStyle = {},
  steps,
  textClassName = ""
}: {
  customNodeStyle?: React.CSSProperties;
  steps: string[];
  textClassName?: string
}) {
  const { nodes, edges } = useMemo(() => createFlow(steps, 0, customNodeStyle, textClassName), [steps, customNodeStyle]);

  return (
    

      <div className=" w-full rounded-3xl border border-white/10 h-105">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.5 }}
          panOnDrag={false}
          zoomOnPinch={false}
          zoomOnScroll={false}
          nodesDraggable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
          className="w-full h-full"
        >
          <Background gap={24} size={1} />

        </ReactFlow>
      </div>
   );
}



