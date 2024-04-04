//function to create a new node
export const createNode = (nodeType, offsetX, offsetY, nodes, setNodes) => {
  const newNode = {
    id: Date.now().toString(),
    type: nodeType,
    position: { x: offsetX, y: offsetY },
    data: { value: "click to add text" },
  };
  setNodes((prevNodes) => [...prevNodes, newNode]);
};
