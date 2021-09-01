import "./App.css";
import Header from "./components/Header.js";
import Canvas from "./components/Canvas.js";
import Viewer from "./components/Viewer.js";
import ToolsBar from "./components/ToolsBar.js";

function App() {
  // let canvas = document.getElementById("canvas");
  // let fileInput = document.getElementById("file_input");
  // let renderButton = document.getElementById("render");
  // const modelViewerTexture = document.querySelector("model-viewer");

  // var width = 400;
  // var height = 400;

  // var stage = new Konva.Stage({
  //   container: "canvas",
  //   width: width,
  //   height: height,
  // });

  // var layer = new Konva.Layer();
  // stage.add(layer);

  // fileInput.addEventListener("change", handleFiles, false);

  // function handleFiles() {
  //   var URL = window.webkitURL || window.URL;
  //   var url = URL.createObjectURL(this.files[0]);
  //   var img = new Image();
  //   img.src = url;

  //   img.onload = function () {
  //     var img_width = img.width;
  //     var img_height = img.height;

  //     // calculate dimensions to get max 300px
  //     var max = 300;
  //     var ratio = img_width > img_height ? img_width / max : img_height / max;

  //     // now load the Konva image
  //     var theImg = new Konva.Image({
  //       image: img,
  //       x: 50,
  //       y: 30,
  //       name: "rect",
  //       width: img_width / ratio,
  //       height: img_height / ratio,
  //       draggable: true,
  //       rotation: 0,
  //     });

  //     layer.add(theImg);
  //     tr.moveToTop();
  //     layer.batchDraw();
  //   };
  // }

  // var rect1 = new Konva.Rect({
  //   x: 60,
  //   y: 60,
  //   width: 100,
  //   height: 90,
  //   fill: "red",
  //   name: "rect",
  //   draggable: true,
  // });
  // layer.add(rect1);

  // var rect2 = new Konva.Rect({
  //   x: 250,
  //   y: 100,
  //   width: 150,
  //   height: 90,
  //   fill: "green",
  //   name: "rect",
  //   draggable: true,
  //   dragBoundFunc: function (pos) {
  //     let newX;
  //     let newY;

  //     //For Y
  //     if (pos.y < 0) {
  //       newY = 0;
  //     } else if (pos.y > canvas.offsetHeight - this.attrs.height) {
  //       newY = canvas.offsetHeight - this.attrs.height;
  //     } else {
  //       newY = pos.y;
  //     }

  //     //For X
  //     if (pos.x < 0) {
  //       newX = 0;
  //     } else if (pos.x > canvas.offsetWidth - this.attrs.width) {
  //       newX = canvas.offsetWidth - this.attrs.width;
  //     } else {
  //       newX = pos.x;
  //     }

  //     return {
  //       x: newX,
  //       y: newY,
  //     };
  //   },
  // });
  // layer.add(rect2);

  // var tr = new Konva.Transformer();
  // layer.add(tr);
  // tr.zIndex(10);

  // // add a new feature, lets add ability to draw selection rectangle
  // var selectionRectangle = new Konva.Rect({
  //   fill: "rgba(0,0,255,0.5)",
  //   visible: false,
  // });
  // layer.add(selectionRectangle);

  // var x1, y1, x2, y2;
  // stage.on("mousedown touchstart", (e) => {
  //   // do nothing if we mousedown on any shape
  //   if (e.target !== stage) {
  //     return;
  //   }
  //   x1 = stage.getPointerPosition().x;
  //   y1 = stage.getPointerPosition().y;
  //   x2 = stage.getPointerPosition().x;
  //   y2 = stage.getPointerPosition().y;

  //   selectionRectangle.visible(true);
  //   selectionRectangle.width(0);
  //   selectionRectangle.height(0);
  // });

  // stage.on("mousemove touchmove", () => {
  //   // no nothing if we didn't start selection
  //   if (!selectionRectangle.visible()) {
  //     return;
  //   }
  //   x2 = stage.getPointerPosition().x;
  //   y2 = stage.getPointerPosition().y;

  //   selectionRectangle.setAttrs({
  //     x: Math.min(x1, x2),
  //     y: Math.min(y1, y2),
  //     width: Math.abs(x2 - x1),
  //     height: Math.abs(y2 - y1),
  //   });
  // });

  // stage.on("mouseup touchend", () => {
  //   // no nothing if we didn't start selection
  //   if (!selectionRectangle.visible()) {
  //     return;
  //   }
  //   // update visibility in timeout, so we can check it in click event
  //   setTimeout(() => {
  //     selectionRectangle.visible(false);
  //   });

  //   var shapes = stage.find(".rect");
  //   var box = selectionRectangle.getClientRect();
  //   var selected = shapes.filter((shape) =>
  //     Konva.Util.haveIntersection(box, shape.getClientRect())
  //   );
  //   tr.nodes(selected);
  // });

  // // clicks should select/deselect shapes
  // stage.on("click tap", function (e) {
  //   // if we are selecting with rect, do nothing
  //   if (selectionRectangle.visible()) {
  //     return;
  //   }

  //   // if click on empty area - remove all selections
  //   if (e.target === stage) {
  //     tr.nodes([]);
  //     return;
  //   }

  //   // do nothing if clicked NOT on our rectangles
  //   if (!e.target.hasName("rect")) {
  //     return;
  //   }

  //   // do we pressed shift or ctrl?
  //   const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
  //   const isSelected = tr.nodes().indexOf(e.target) >= 0;

  //   if (!metaPressed && !isSelected) {
  //     // if no key pressed and the node is not selected
  //     // select just one
  //     tr.nodes([e.target]);
  //   } else if (metaPressed && isSelected) {
  //     // if we pressed keys and node was selected
  //     // we need to remove it from selection:
  //     const nodes = tr.nodes().slice(); // use slice to have new copy of array
  //     // remove node from array
  //     nodes.splice(nodes.indexOf(e.target), 1);
  //     tr.nodes(nodes);
  //   } else if (metaPressed && !isSelected) {
  //     // add the node into selection
  //     const nodes = tr.nodes().concat([e.target]);
  //     tr.nodes(nodes);
  //   }
  // });

  // modelViewerTexture.addEventListener("load", (ev) => {
  //   let material = modelViewerTexture.model.materials[2];

  //   let applyPBRTexture = (event) => {
  //     material.pbrMetallicRoughness["baseColorTexture"].texture.source.setURI(
  //       event
  //     );
  //   };

  //   document.querySelector("#diffuse").addEventListener("input", (event) => {
  //     applyPBRTexture(event.target.value);
  //   });
  // });

  // renderButton.addEventListener(
  //   "click",
  //   function () {
  //     let material = modelViewerTexture.model.materials[2];

  //     let applyPBRTexture = (event) => {
  //       material.pbrMetallicRoughness["baseColorTexture"].texture.source.setURI(
  //         event
  //       );
  //     };
  //     var dataURL = stage.toDataURL();
  //     //downloadURI(dataURL, 'stage.png');
  //     applyPBRTexture(dataURL);
  //   },
  //   false
  // );

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
