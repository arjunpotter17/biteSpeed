import "./App.css";
import "reactflow/dist/style.css";
import Flow from "./components/flow";
import TopBar from "./components/topbar";
import Sidebar from "./components/sidebar";
import { useWindowSize } from "./hooks/use-windowSize";

function App() {
  //windowsize hook to measure window size for responsive design
  const windowSize = useWindowSize()[0];
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex">
        <Flow />
        {windowSize > 500 && <Sidebar />}
      </div>
    </div>
  );
}

export default App;
