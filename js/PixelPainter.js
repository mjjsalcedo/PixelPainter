/*jshint esversion: 6 */

/*const grid = document.createElement('div');
const grid = createGrid(10,10, "<div class='cell'></div>");

var merged = [].concat.apply([], grid);
let compGrid = [];

pixelPainter.innerHTML = merged.join('')*/

const PixelPainter = function(width, height, colors) {
  const pixelPainter = document.getElementById("pixelPainter");

  const ppCanvas = document.createElement('div');
  ppCanvas.setAttribute('id', 'pp-canvas');

  const Palette = document.createElement('div');
  Palette.setAttribute('id', 'palette');
  Palette.innerHTML = createPalette(colors);

  ppCanvas.appendChild(Palette);

  pixelPainter.appendChild(ppCanvas);

  function createPalette(colors) {
    let palette = '';
    const length = colors.length;

    for(let i = 0; i < length; i++) {
      palette += "<div class='cell' style='background-color:" + colors[i] + ";'></div>";
    }

    return palette;
  }

 /* const Grid = document.createElement('div');


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

  pixelPainter.addEventListener("mousedown", function(e){
        flag = true;
        e.target.style.backgroundColor = "black";
  });

  pixelPainter.addEventListener("mouseup", function(e){
        flag = false;
  });

  pixelPainter.addEventListener("mousemove", function(e){
    if(e.target.id === 'pixelPainter' || flag === false){
      e.preventDefault();
      return;
    }

    e.target.style.backgroundColor = "black";
  });*/

};

const colors = ['blue', 'black', 'red', 'yellow'];

const pp = new PixelPainter(552, 500, colors);

