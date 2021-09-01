import React from "react";
import "./ToolsBar.css";

const ToolsBar = () => {
  return (
    <div className="toolsBar">
      <div>
        <input
          className="toolsBarBtn fileUploadBtn"
          type="file"
          id="fileInput"
        />
        <label for="fileInput" className="toolsBarBtn ">
          <i class="fas fa-upload"></i>
        </label>
      </div>

      <div>
        <button className="toolsBarBtn" id="render">
          Render
        </button>
      </div>
    </div>
  );
};

export default ToolsBar;
