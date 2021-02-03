let canvas = $('canvas')

canvas.drawImage({
    source: 'map.svg',
    x: canvas.width() / 2, y: canvas.height() / 2,
    width: canvas.width(),
    height: canvas.height(),
    dragGroups: ["image"],
  });