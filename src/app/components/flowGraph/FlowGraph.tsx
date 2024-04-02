import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { FormattedFilms } from "@/app/interfaces/IFilms";
import { generateEdges, generateNodes, getLayoutedElements } from "./utils";

interface FlowGraphProps {
  heroeName: string;
  heroeInfo: FormattedFilms[];
}

const FlowGraph = ({ heroeName, heroeInfo }: FlowGraphProps) => {
  const initialNodes = generateNodes(heroeName, heroeInfo);
  const initialEdges = generateEdges(heroeName, heroeInfo);

  // Arrange the elements in the graph from top to bottom using dagre layout
  getLayoutedElements(initialNodes, initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Callback function for adding edges
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowGraph;
