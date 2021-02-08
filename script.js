let canvas = $('canvas')
// canvas.drawImage({
//     source: 'map.jpg',
//     x: canvas.width() / 2, y: canvas.height() / 2,
//     width: 920,
//     height: 760,
//     dragGroups: ["image"],
//   })
zoom = 1;
canvas.attr('width', window.innerWidth)
canvas.attr('height', window.innerHeight)

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
    x: canvas.width() / 2, y: canvas.height() / 2,
    height: 750, width: 1000,
    layer: true,
    dragGroups: ['floor_plan'],
    fromCenter: true,
    imageSmoothing: false,
  })

  canvas.restoreCanvas({
    layer: true,
    name: 'restoreCanvas'
  });

  canvas.drawLayers()
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