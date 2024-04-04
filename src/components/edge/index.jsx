import React from "react";
import { BaseEdge, getStraightPath } from "reactflow";
import { useAppContext } from "../../context/nodeContext";
import { useWindowSize } from "../../hooks/use-windowSize";

function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdgeInfo, setPanel, setIsOpen } = useAppContext();
  const windowSize = useWindowSize()[0];
  // Get the straight path between two nodes
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  //open sidebar edge panel on edge click
  const handleEdgeClick = () => {
    setPanel("edges");
    setEdgeInfo(id);
    //for responsiveness make sure sidebar is open on edge click
    if (windowSize < 500) setIsOpen(true);
  };

  return (
    <g onClick={handleEdgeClick} className="edges">
      <BaseEdge id={id} path={edgePath} />
      {/* Arrowhead marker */}
      <marker
        id={`arrow-${id}`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
      </marker>
      {/* Apply marker to the edge */}
      <path
        d={edgePath}
        markerEnd={`url(#arrow-${id})`}
        fill="none"
        stroke="#666"
      />
    </g>
  );
}

export default CustomEdge;
