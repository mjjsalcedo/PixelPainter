/*jshint esversion: 6 */

const PixelPainter = function(width, height, colors) {
  let chosenColor = colors[0];
  const pixelPainter = document.getElementById("pixelPainter");

  const ppCanvas = document.createElement('div');
  ppCanvas.setAttribute('id', 'pp-canvas');

  const Palette = document.createElement('div');
  Palette.setAttribute('id', 'palette');
  Palette.innerHTML = createPalette(colors);

  ppCanvas.appendChild(Palette);

  pixelPainter.appendChild(ppCanvas);

  const Canvas = document.createElement('div');
  Canvas.setAttribute('id', 'canvas');
  const canvas = createGrid(10,10, "<div class='cell'></div>");

  var merged = [].concat.apply([], canvas).join('');

  Canvas.innerHTML = merged;
  ppCanvas.appendChild(Canvas);

  function createPalette(colors) {
    let palette = '';
    const length = colors.length;

    for(let i = 0; i < length; i++) {
      palette += "<div class='cell' style='background-color:" + colors[i] + ";'></div>";
    }

    return palette;
  }



  function createGrid(col, rows, fill) {
    const grid = [];

    for (let i = 0; i < col; i++) {
        grid.push([]);
      for (let j = 0; j < rows; j++) {
        grid[i].push(fill);
      }
    }

    return grid;
  }

  let flag = false;

  Canvas.addEventListener("mousedown", function(e){
    if(e.target.className !== 'cell')
      return;

    flag = true;
    e.target.style.backgroundColor = "black";
    console.log(e.target);
  });

  Canvas.addEventListener("mouseup", function(e){
        flag = false;
  });

  Canvas.addEventListener("mousemove", function(e){
    if(e.target.className !== 'cell' || flag === false){
      e.preventDefault();
      return;
    }

    e.target.style.backgroundColor = chosenColor;
  });

  Palette.addEventListener('click', function(e) {
    if (e.target.className !== 'cell')
      return;

    chosenColor = e.target.style.backgroundColor;
  })

};

const colors = ['blue', 'black', 'red', 'yellow'];

const pp = new PixelPainter(552, 500, colors);

