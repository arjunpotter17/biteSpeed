import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "../node";
import CustomEdge from "../edge";
import "../node/node.css";
import { useAppContext } from "../../context/nodeContext";
import { createNode } from "../../constants/createNode";

//custom node and edge types outside the component to avoid re-creating them on each render
const nodeTypes = { textNode: TextUpdaterNode };
const edgeTypes = {
  "custom-edge": CustomEdge,
};

function Flow() {
  const { nodes, setNodes, edges, setEdges } = useAppContext();

  //allow node movement
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  //allow edge movement
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  //allow dynamic edge connect
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  //on new node drag and drop a node has to be created of the type that was dragged
  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("nodeType");
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    createNode(nodeType, offsetX, offsetY, nodes, setNodes);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="h-[90vh] w-[100vw] md:w-[80vw]"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView="true"
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Flow;
