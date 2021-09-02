import "./App.css";
import Header from "./components/Header.js";
import Canvas from "./components/Canvas.js";
import Viewer from "./components/Viewer.js";
import ToolsBar from "./components/ToolsBar.js";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <ToolsBar></ToolsBar>
      <Canvas></Canvas>
      <Viewer></Viewer>
    </div>
  );
}

export default App;
