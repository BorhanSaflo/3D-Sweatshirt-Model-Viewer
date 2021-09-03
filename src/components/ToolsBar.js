import React from "react";
import "./ToolsBar.css";
import Button from "./Button.js";
import PublishIcon from "@material-ui/icons/Publish";
import DoneIcon from "@material-ui/icons/Done";

const ToolsBar = () => {
  return (
    <div className="toolsBar">
      <Button name="Upload" Icon={PublishIcon} isInput />
      <Button name="Render" Icon={DoneIcon} />
    </div>
  );
};

export default ToolsBar;
