import {
  Background,
  Controls,
  type Edge,
  type Node,
  type NodeMouseHandler,
  type NodeTypes,
  type OnConnect,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import type React from "react";
import ActionNode from "./custom-nodes/action-node";
import EmailNode from "./custom-nodes/email-node";
import SegmentNode from "./custom-nodes/segment-node";
import SmartSegmentNode from "./custom-nodes/smart-segment-node";
import WaitNode from "./custom-nodes/wait-node";

import "@xyflow/react/dist/style.css";
import "./index.css";
import "./xy-theme.css";

import { DnDProvider, useDnD } from "./dnd-context";
import Sidebar from "./sidebar";

import type { NodeData } from "./types";

const panOnDrag: number[] = [1];

const initialNodes: Node<NodeData>[] = [
  {
    id: "dndnode_0",
    type: "action",
    data: { label: "action node" },
    position: { x: 250, y: 5 },
  },
];

let id = 1;
const getId = () => `dndnode_${id++}`;

const nodeTypes: NodeTypes = {
  action: ActionNode,
  email: EmailNode,
  segment: SegmentNode,
  smart: SmartSegmentNode,
  wait: WaitNode,
};

const JourneyBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string>();

  // Sidebar functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  const handleEdit = () => {
    setNodes((nds) =>
      nds.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, label: editValue } } : item
      )
    );
    setEditValue("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue("");
  };

  // Main canvas functions
  const onNodeClick: NodeMouseHandler = (_e, node) => {
    const typedNode = node as Node<NodeData>;
    setEditValue(typedNode.data.label);
    setId(typedNode.id);
    setIsEditing(true);
  };

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node<NodeData> = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  return (
    <div className="dndflow">
      {isEditing && (
        <div className="updatenode_controls">
          <label htmlFor="dnd-input">label: </label> <br />
          <input id="dnd-input" type="text" value={editValue} onChange={handleChange} />
          <br />
          <button type="button" className="btn" onClick={handleEdit}>
            update
          </button>
          <br />
          <button type="button" className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          onNodeClick={onNodeClick}
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          nodeTypes={nodeTypes}>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <JourneyBuilder />
    </DnDProvider>
  </ReactFlowProvider>
);
