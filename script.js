let index = 0
class Marker {
  constructor(x, y, text) {
    this.width = 30;
    this.height = 30;
    this.x = x;
    this.y = y;
    // this.id = id;
    this.selected = false;
    this.text = text;
    this.index = index++;
    this.canDrag = () => {
      return true
    }
  }
}

let markers = []
let zoom = 1
let canvas = $('canvas')
canvas.attr('width', window.innerWidth)
canvas.attr('height', window.innerHeight)
let canvasHeight = canvas.height(), canvasWidth = canvas.width(), imageHeight = 750, imageWidth = 1000


let getRelativeXValueByWidth = (x) => {
  return x * (canvasWidth / imageWidth);
};

let getRelativeYValueByHeight = (y) => {
  return y * (canvasHeight / imageHeight);
};

let getActualMarkerXValueByWidth = (x) => {
  return x * (imageWidth / canvasWidth);
};

let getActualMarkerYValueByHeight = (y) => {
  return y * (imageHeight / canvasHeight);
};

function drawCanvas() {
  canvas.clearCanvas()
  canvas.removeLayers()
  canvas.scaleCanvas({
    layer: true,
    name: 'scaleCanvas',
    scale: zoom
  }).addLayer({
    type: 'image',
    source: "map.jpg",
    x: canvasWidth / 2, y: canvasHeight / 2,
    height: imageHeight, width: imageWidth,
    layer: true,
    groups: ['map'],
    dragGroups: ["points"],
    fromCenter: true,
    imageSmoothing: false,
    click: (layer) => {
      let number = prompt("Enter number")
      // let number = "dsfsd"
      let marker = new Marker(getActualMarkerXValueByWidth(layer.eventX), getActualMarkerYValueByHeight(layer.eventY), number);  
      drawMarker(marker)
      canvas.drawLayers()
      markers.push(marker)
    }
  })

  canvas.restoreCanvas({
    layer: true,
    name: 'restoreCanvas'
  });

  markers.forEach((marker) => {
    drawMarker(marker)
  })

  canvas.drawLayers()
}

function drawMarker(marker){
  markerX = getRelativeXValueByWidth(marker.x)
  markerY = getRelativeYValueByHeight(marker.y)
  canvas.addLayer({
    type: 'arc',
    fillStyle: "#000000",
    shadowColor: "#000000",
    shadowBlur: 4,
    shadowY: 2,
    groups: ["points"],
    data: { marker: marker },
    x: markerX, 
    y: markerY, 
    layer: true,
    radius: 10,
  })
  .addLayer({
    type: 'text',
    groups: ['points'],
    // name: `pin-text-${ index }`,
    fillStyle: '#666666',
    x: markerX + (60 / zoom),
    y: markerY + (1 / zoom),
    text: marker.text,
    fontSize: 16 / zoom,
    fontStyle: 'bold',
    fontFamily: 'BrownStd, sans-serif',
    data: { marker: marker },
    dragGroups: false,
  })
}

function zoomIn() {
  if (zoom <= 4) {
    zoom += 1
    drawCanvas()
  }
}

function zoomOut() {
  if (zoom > 1) {
    zoom -= 1
    drawCanvas()
  }
}

drawCanvas()