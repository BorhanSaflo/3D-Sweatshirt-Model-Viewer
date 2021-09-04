import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";
import Canvas, { testFunc } from "./components/Canvas.js";
import Viewer from "./components/Viewer.js";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Canvas></Canvas>
      <Viewer></Viewer>
    </div>
  );
}

export default App;
