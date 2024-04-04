import React, { useState, useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { useAppContext } from "../../context/nodeContext";
import { useWindowSize } from "../../hooks/use-windowSize";

function TextUpdaterNode({ data, isConnectable, id }) {
  const { setNodeInfo, nodeInfo, setPanel, setIsOpen } = useAppContext();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const windowSize = useWindowSize()[0];

  //open sidebar with node settings on node click
  const handleNodeClick = () => {
    if (windowSize < 500) setIsOpen(true);
    setSelectedNodeId(id);
    setPanel("settings");
    setNodeInfo({ id, data });
  };

  //close settings or edge sidebar on outside click
  const handleClickOutside = useCallback((event) => {
    if (
      !event.target.closest(".text-updater-node") &&
      !event.target.closest(".settings-panel") &&
      !event.target.closest(".edges") &&
      !event.target.closest(".edges-panel")
    ) {
      setSelectedNodeId(null);
      setPanel("nodes");
    }
  }, []);

  //useEfect to add event listener for close click
  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className={`text-updater-node shadow-lg ${
        selectedNodeId === nodeInfo?.id ? "border border-blue-500" : ""
      }`}
      onClick={handleNodeClick}
    >
      {/*target handle */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="">
        <label
          htmlFor="text"
          className="bg-[#7ae9d9] font-bold text-black rounded-t-[5px] px-2 w-full text-[12px] block"
        >
          Send Message
        </label>
        <p className="text-black px-2 overflow-x-auto text-[12px]">
          {data?.value}
        </p>
      </div>
      {/*source handle */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
