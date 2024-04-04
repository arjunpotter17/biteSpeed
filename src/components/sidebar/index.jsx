// Sidebar.jsx
import React, { useState } from "react";
import { useAppContext } from "../../context/nodeContext"; // Import the context hook
import "./sidebar.css";
import { createNode } from "../../constants/createNode";
import { useWindowSize } from "../../hooks/use-windowSize";
const Sidebar = () => {
  const { setNodes, nodeInfo, panel, setEdges, edgeInfo, nodes, setIsOpen } =
    useAppContext(); // Get input and setter from context
  const windowSize = useWindowSize()[0];
  const [inputValue, setInputValue] = useState("");
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("nodeType", nodeType);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update state with new text value
  };

  const handleSubmit = () => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id === nodeInfo.id) {
          const val = inputValue;
          setInputValue("");
          return {
            ...node,
            data: { value: val }, // Update the data property
          };
        }
        return node;
      });
    });
    setIsOpen(false);
  };

  //nodeTypes array to add new nodes
  const nodeTypes = ["textNode"];

  return (
    <div id="sidebar" className={`w-full max-w-full sm:max-w-[20vw] border-l`}>
      <div className="flex">
        <button
          className={`w-full py-2 ${
            panel === "nodes"
              ? "bg-blue-300 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          Nodes
        </button>
        <button
          className={`w-full py-2 ${
            panel === "edges"
              ? "bg-blue-300 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          Edges
        </button>
        <button
          className={`w-full py-2 ${
            panel === "settings"
              ? "bg-blue-300 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          Edit Node
        </button>
      </div>
      <div>
        {/* Conditionally render button or input based on the panel state */}
        {panel === "nodes" && (
          <div className="flex flex-col">
            {
              // section is extensible to add new nodes, just create a node component and add it to the nodeTypes array
              nodeTypes.map((nodeType) => (
                <div
                  draggable={windowSize > 500 ? true : false}
                  onDragStart={(e) => onDragStart(e, nodeType)}
                  onClick={() => {
                    windowSize < 500 && setIsOpen(false);
                    createNode(nodeType, 0, 0, nodes, setNodes);
                  }}
                  className=" py-4 px-4 bg-gray-100 text-blue-500 border border-dashed border-blue-500 rounded m-2 flex"
                >
                  {nodeType}
                </div>
              ))
            }
          </div>
        )}
        {panel === "settings" && (
          <div className="settings-panel flex flex-col justify-between px-2 gap-y-9 mt-4 h-[80vh]">
            <div className="w-full flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="editText">Add text</label>
                <input
                  type="text"
                  id="editText"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=" py-2 px-1 bg-gray-100 text-black rounded border"
                  placeholder="Enter text"
                />
              </div>
              <button
                className=" px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                setNodes((es) => es.filter((e) => e.id !== nodeInfo.id));
              }}
            >
              Delete Node
            </button>
          </div>
        )}

        {panel === "edges" && (
          <div className="edges-panel flex flex-col justify-between px-2 gap-y-9 mt-4 hover:!outline-none focus:!outline-none h-[80vh]">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                setEdges((es) => es.filter((e) => e.id !== edgeInfo));
              }}
            >
              Delete Edge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
