/*jshint esversion: 6 */

const PixelPainter = function(width, height, colors) {
  let chosenColor = colors[0];
  const pixelPainter = document.getElementById("pixelPainter");

  const ppCanvas = document.createElement('div');
  ppCanvas.setAttribute('id', 'pp-canvas');

  //palette
  const Palette = document.createElement('div');
  Palette.setAttribute('id', 'palette');
  Palette.innerHTML = createPalette(colors);

  //clear button
  const clearButton = document.createElement("h2");
  clearButton.setAttribute('id', 'clearButton');
  clearButton.innerHTML = "Clear";

  //canvas
  const Canvas = document.createElement('div');
  Canvas.setAttribute('id', 'canvas');
  const domCanvas = renderCanvas(createGrid(10,10,"white"));
  Canvas.innerHTML = domCanvas;

  ppCanvas.appendChild(Palette);
  ppCanvas.appendChild(Canvas);
  ppCanvas.appendChild(clearButton);

  pixelPainter.appendChild(ppCanvas);

  Canvas.addEventListener("mousedown", function(e){
    if(e.target.className !== 'cell')
      return;

    flag = true;
    e.target.style.backgroundColor = chosenColor;
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
    if(e.target.className !== 'cell')
      return;

    chosenColor = e.target.style.backgroundColor;
  });

  clearButton.addEventListener("click", function(e){
        domCanvas;

  });

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

  function renderCanvas(grid){
    let canvas = "";
    console.log(grid);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        canvas += "<div class='cell' style='background-color:" + grid[i][j] + ";'></div>";
      }
    }

    return canvas;
  }
};


const colors = ['blue', 'black', 'red', 'yellow'];

const pp = new PixelPainter(552, 500, colors);
