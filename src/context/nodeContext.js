// simple context to easily pass states and functions between components
import React, { createContext, useContext, useState } from "react";

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [panel, setPanel] = useState("nodes");
  const [nodeInfo, setNodeInfo] = useState({});
  const [edgeInfo, setEdgeInfo] = useState({});
  const [nodes, setNodes] = useState(() => {
    const storedNodes = localStorage.getItem("nodes");
    return storedNodes ? JSON.parse(storedNodes) : [];
  });

  const [edges, setEdges] = useState(() => {
    const storedEdges = localStorage.getItem("edges");
    return storedEdges ? JSON.parse(storedEdges) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        panel,
        setPanel,
        nodeInfo,
        setNodeInfo,
        nodes,
        setNodes,
        edges,
        setEdges,
        edgeInfo,
        setEdgeInfo,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);
