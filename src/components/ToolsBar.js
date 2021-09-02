import React from "react";
import "./ToolsBar.css";
import PublishIcon from "@material-ui/icons/Publish";

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
          <PublishIcon />
        </label>
      </div>

      <div>
        <button
          onClick={() => {
            console.log("click");
          }}
          className="toolsBarBtn"
          id="render"
        >
          Render
        </button>
      </div>
    </div>
  );
};

export default ToolsBar;
