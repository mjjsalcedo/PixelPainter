/*jshint esversion: 6 */

const PixelPainter = function(width, height, cellAmt, colors) {
  let chosenColor = colors[0];
  let dimensions = {width: width / cellAmt, height: height / cellAmt};
  const pixelPainter = document.getElementById("pixelPainter");

  const ppCanvas = document.createElement('div');
  ppCanvas.setAttribute('id', 'pp-canvas');

  //palette
  const Palette = document.createElement('div');
  Palette.setAttribute('id', 'palette');
  Palette.innerHTML = createPalette(colors);

  //clear button
  const clearButton = document.createElement('button');
  clearButton.setAttribute('id', 'clearButton');
  clearButton.innerText = 'Clear';

  //erase toggle button
  const eraseButton = document.createElement('button');
  eraseButton.setAttribute('id', 'eraseButton');
  eraseButton.innerText = 'Erase';

  const saveButton = document.createElement('button');
  saveButton.setAttribute('id', 'saveButton');
  saveButton.innerText = 'Save';

  //canvas
  const Canvas = document.createElement('div');
  Canvas.setAttribute('id', 'canvas');
  Canvas.style.width = width;
  Canvas.style.height = height;
  const Grid = createGrid(cellAmt, cellAmt, 'white');

  const domCanvas = renderCanvas(Grid, dimensions);
  console.log(domCanvas)
  Canvas.innerHTML = domCanvas;

  ppCanvas.appendChild(Palette);
  ppCanvas.appendChild(clearButton);
  ppCanvas.appendChild(eraseButton);
  ppCanvas.appendChild(saveButton);
  ppCanvas.appendChild(Canvas);

  pixelPainter.appendChild(ppCanvas);

  function clearGrid(grid) {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        grid[i][j] = 'white';
      }
    }
  }

  eraseButton.addEventListener('click', function(e) {
    chosenColor = 'white';
  })

  saveButton.addEventListener('click', function(e){
    localStorage.setItem('grid', Grid);

  })

  clearButton.addEventListener('click', function(e){
    //clear data grid, and renderCanvas again
    clearGrid(Grid);
    let domCanvas = renderCanvas(Grid, dimensions);
    Canvas.innerHTML = domCanvas;
  });

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
    if(e.target.className !== 'cell color')
      return;

    chosenColor = e.target.style.backgroundColor;
  });



  function createPalette(colors) {
    let palette = '';
    const length = colors.length;

    for(let i = 0; i < length; i++) {
      palette += "<div class='cell color' style='background-color:" + colors[i] + "'></div>";
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

  function renderCanvas(grid, dimensions){
    let canvas = "";
    console.log(grid);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        canvas += "<div class='cell' style='background-color:" + grid[i][j] + "; width:" + dimensions.width + ";height:" + dimensions.height + ";'></div>";
      }
    }
    return canvas;
  }
};

const colors = ["#e81717","#e87c16","#f4ea29","#37ba07","#06ba75","#05baad","#0477ba","#0434ba","#8433e0","#d732e0","#e03283","#070707"];


const pp = new PixelPainter(1000, 750, 50, colors);
