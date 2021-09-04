import React, { useRef, useEffect } from "react";
import "@webcomponents/webcomponentsjs";
import "@google/model-viewer";
import "./Viewer.css";

let material;

const Viewer = () => {
  const model1 = useRef();

  const colorString = "1,0,0,1";

  const color = colorString
    .split(",")
    .map((numberString) => parseFloat(numberString));

  const checkMaterials = () => {
    setTimeout(() => {
      if (!model1.current.model) {
        console.log("Model didn't load. Retrying in 1s.");
        checkMaterials();
      } else {
        material = model1.current.model.materials[3];

        let applyPBRTexture = (event) => {
          material.pbrMetallicRoughness[
            "baseColorTexture"
          ].texture.source.setURI(event);
        };

        applyPBRTexture("./image.png");
      }
    }, 1000);
  };

  useEffect(() => {
    checkMaterials();
  }, []);

  return (
    <div className="viewer">
      <model-viewer
        ref={model1}
        src="/crewneck-sweatshirt.glb"
        alt="A Crewneck Sweatshirt"
        shadow-intensity="1"
        camera-controls
      ></model-viewer>
    </div>
  );
};

export const applyImageOnModel = (url) => {
  material.pbrMetallicRoughness["baseColorTexture"].texture.source.setURI(url);
};

export default Viewer;
