import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer, Image } from "react-konva";
import { applyImageOnModel } from "./Viewer";
import "./Canvas.css";
import Button from "./Button.js";
import PublishIcon from "@material-ui/icons/Publish";
import DoneIcon from "@material-ui/icons/Done";

import useImage from "use-image";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
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

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
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

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

let url;

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image);
  //return <Image image={img} x={200} y={200} />;

  const shapeRef = React.useRef();
  const trRef = React.useRef();

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
          // onChange({
          //   ...shapeProps,
          //   x: e.target.x(),
          //   y: e.target.y(),
          // });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
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
  const generateURL = () => {
    url = stage.current.toDataURL();
  };

  const stage = useRef();

  useEffect(() => {
    generateURL();
  });

  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const changeHandler = (event) => {
    var URL = window.webkitURL || window.URL;
    var imgUrl = URL.createObjectURL(event.target.files[0]);
    setImages([imgUrl]);
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

        <Button name="Render" Icon={DoneIcon} clickAction={testFunc} />
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
            <Layer>
              {rectangles.map((rect, i) => {
                return (
                  <Rectangle
                    key={i}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                      selectShape(rect.id);
                    }}
                    onChange={(newAttrs) => {
                      const rects = rectangles.slice();
                      rects[i] = newAttrs;
                      setRectangles(rects);
                    }}
                  />
                );
              })}

              {images &&
                images.map((image, i) => {
                  return (
                    <URLImage
                      key={i}
                      image={image}
                      shapeProps={image}
                      isSelected={image.id === selectedId}
                      onSelect={() => {
                        selectShape(image.id);
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

export const testFunc = () => {
  applyImageOnModel(url);
};

export default Canvas;
