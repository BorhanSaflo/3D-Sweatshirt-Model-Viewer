import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer, Image } from "react-konva";
import { applyImageOnModel } from "./Viewer";
import "./Canvas.css";
import Button from "./Button.js";
import PublishIcon from "@material-ui/icons/Publish";
import DoneIcon from "@material-ui/icons/Done";

import useImage from "use-image";

let url;

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image);

  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const Canvas = () => {
  const stage = useRef();
  const layer = useRef();
  const [imagesURL, setImagesURL] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);

  useEffect(() => {
    exportImage();
  });

  const generateURL = () => {
    let url = stage.current.toDataURL();
    return url;
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const changeHandler = (event) => {
    var imgUrl = URL.createObjectURL(event.target.files[0]);
    setImagesURL([...imagesURL, imgUrl]);
  };

  const exportImage = () => {
    let tempId = selectedId;
    //selectShape(null);
    setTimeout(() => {
      console.log("message");
      applyImageOnModel(generateURL());
      //selectShape(tempId);
    }, 50);
  };

  const deselect = () => {
    selectShape();
  };

  return (
    <>
      <div className="toolsBar">
        <input
          id="fileInput"
          type="file"
          className="btn"
          onChange={changeHandler}
        />
        <label for="fileInput" className="btn">
          <p>
            <PublishIcon fontSize="large" />
          </p>
        </label>

        <Button name="Render" Icon={DoneIcon} clickAction={exportImage} />
      </div>
      <div className="canvas" id="canvas">
        <div className="canvasArea">
          <Stage
            width="450"
            height="600"
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            ref={stage}
          >
            <Layer ref={layer}>
              {imagesURL &&
                imagesURL.map((image, i) => {
                  return (
                    <URLImage
                      key={i}
                      id={i}
                      image={image}
                      shapeProps={image}
                      isSelected={i === selectedId}
                      onSelect={() => {
                        selectShape(i);
                      }}
                      onChange={(newAttrs) => {
                        const imgs = images.slice();
                        imgs[i] = newAttrs;
                        setImages(imgs);
                      }}
                    />
                  );
                })}
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
};

export default Canvas;
