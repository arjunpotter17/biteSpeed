import React, { useState } from "react";
import { useAppContext } from "../../context/nodeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseMenuIcon, MenuIcon } from "../../icons/Menu.icon";
import { useWindowSize } from "../../hooks/use-windowSize";
import Sidebar from "../sidebar";

const Topbar = () => {
  const windowSize = useWindowSize()[0];
  const { edges, nodes, setEdges, setNodes, isOpen, setIsOpen } =
    useAppContext();

  //clear button is shown only after a successful save otherwise cannot get a clear screen unless manually nodes are deleted
  const [showClearChanges, setShowClearChanges] = useState(false);

  //changes are saved to localstorage
  const saveChanges = () => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
  };

  //changes are cleared from localstorage and flow
  const clearChanges = () => {
    localStorage.removeItem("nodes");
    localStorage.removeItem("edges");
    setNodes([]);
    setEdges([]);
  };

  //check for emtpy target handles before saving changes
  const handleSaveChanges = () => {
    let nodesWithEmptyTargets = 0;

    // Iterate over edges and check for empty target handles
    edges.forEach((edge) => {
      if (edge.targetHandle === null) {
        nodesWithEmptyTargets++;
      }
    });

    // Show error if more than one node has empty target handles
    if (nodes.length > 2 && nodesWithEmptyTargets !== 0) {
      toast(
        "More than one node has empty target handles! Please connect all nodes before saving changes."
      );
      return;
    } else {
      // If no error, proceed with saving changes
      saveChanges();
      setShowClearChanges(true);
      toast("Your changes have been saved! Refresh to verify!");

      return;
    }
  };

  return (
    <>
      <div className="bg-purple-100 flex justify-end px-4 h-[65px] w-full items-center py-4 shadow-md border-b border-purple-50">
        <div className="flex gap-x-2">
          <button
            className="border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400 rounded px-4 py-2 bg-white"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          {showClearChanges && (
            <button
              className="border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400 rounded px-4 py-2 bg-white"
              onClick={clearChanges}
            >
              Clear Board
            </button>
          )}
        </div>
        {windowSize < 500 && (
          <button onClick={() => setIsOpen(true)}>
            <MenuIcon />
          </button>
        )}

        <ToastContainer
          position="top-left"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </div>
      {
        <div
          className={`top-0 right-0 fixed z-50 bg-white w-full  h-full py-10 px-[24px] overflow-scroll ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } ease-in-out duration-300`}
        >
          {
            <button
              className={"fixed top-4 right-[16px]"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <CloseMenuIcon />
            </button>
          }
          <div className={`mt-[42px] border border-transparent`} />

          {/* Sidebar is rednered inside topbar during responsive design */}
          <div className="w-full">
            <Sidebar />
          </div>
        </div>
      }
    </>
  );
};

export default Topbar;
