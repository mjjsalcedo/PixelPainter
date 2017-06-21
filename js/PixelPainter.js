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

  const fillButton = document.createElement('button');
  fillButton.setAttribute('id', 'fillButton');
  fillButton.innerText = 'Fill';

  //canvas
  const Canvas = document.createElement('div');
  Canvas.setAttribute('id', 'canvas');
  Canvas.style.width = width;
  Canvas.style.height = height;

  let Grid = JSON.parse(localStorage.getItem('grid'));

  if(!Grid)
    Grid = createGrid(cellAmt , cellAmt, 'white');

  const domCanvas = renderCanvas(Grid, dimensions);
  Canvas.innerHTML = domCanvas;

  ppCanvas.appendChild(clearButton);
  ppCanvas.appendChild(eraseButton);
  ppCanvas.appendChild(saveButton);
  ppCanvas.appendChild(fillButton);
  ppCanvas.appendChild(Palette);
  ppCanvas.appendChild(Canvas);

  pixelPainter.appendChild(ppCanvas);

  function clearGrid(grid) {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        grid[i][j] = 'white';
      }
    }
  }

  function updateGrid(grid) {
    const cells = Canvas.querySelectorAll('.cell');
    const length = cells.length;
    let col = 0;
    let row = 0;

    for(let i = 0; i < length; i++) {
      Grid[col][row] = cells[i].style.backgroundColor;

      if(row < cellAmt - 1) {
        row++;
      } else {
        col++;
        row = 0;
      }
    }
  }

  eraseButton.addEventListener('click', function(e) {
    chosenColor = 'white';
  })

  saveButton.addEventListener('click', function(e){
    updateGrid(Grid);
    localStorage.setItem('grid', JSON.stringify(Grid));


  })

  clearButton.addEventListener('click', function(e){
    //clear data grid, and renderCanvas again
    e.preventDefault();
    clearGrid(Grid);
    let domCanvas = renderCanvas(Grid, dimensions);
    Canvas.innerHTML = domCanvas;
  });

  fillButton.addEventListener('click', function(e) {
    e.preventDefault();
    fillActive = !fillActive;
  })

  let flag = false;
  let fillActive = false;



  function fillCell(col, row) {
    console.log(col, row)
    console.log(Grid)
    const color = Grid[col][row];
    //check top
    //subtract one from column, same row

    //const top = Grid[col - 1][row];
    //if its negative
    //if it exceeds rowAmt = 49 if its < 50 ok
    // if it exceeds colAmt = 49 if its < 50 ok
    var test = col - 1;
    console.log(test)
    if(Grid[col -1][row] && color === Grid[col -1][row]) {
      fillCell(col - 1, row)
      console.log('top')
    }

    //check top right
    //subtract one from column, +1 row
    const topRight = Grid[col - 1][row + 1];

    if(color === topRight) {
      fillCell(col - 1, row + 1);

      console.log('top right')
    }

    //check right
    //+1 row
    const right = Grid[col][row + 1];

    if(color === right) {
      fillCell(col, row + 1);
      console.log('right')
    }

    //check bottom right
    //+1 col, +1 row
    const bottomRight = Grid[col + 1][row + 1];

    if(color === bottomRight) {
      fillCell(col + 1, row + 1);
      console.log('bottom right')
    }

    //check bottom
    //+1 col
    const bottom = Grid[col + 1][row];

    if(color === bottom) {
      fillCell(col + 1, row);
      console.log('bottom')
    }

    //check bottom left
    //+1 col, -1 row
    const bottomLeft = Grid[col + 1][row - 1];

    if(color === bottomLeft) {
      fillCell(col + 1, row - 1);
      console.log('bottom left')
    }

    //check left
    //-1 row
    const left = Grid[col][row - 1];

    if(color === left) {
      fillCell(col, row - 1)
      console.log('left')
    }

    //check top left
    //+1 col, -1 row
    const topLeft = Grid[col - 1][row - 1];

    if(color === topLeft) {
      fillCell(col - 1, row - 1);
      console.log('top left')
    }
  }

  function getIndexofNode(child) {
    const parent = child.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    const column = Math.floor(index / cellAmt);
    const row = index - (column * cellAmt)

    return [column, row];
  }

  Canvas.addEventListener("mousedown", function(e){
    if(e.target.className !== 'cell')
      return;

    e.preventDefault();

    if(fillActive) {
      const indexes = getIndexofNode(e.target);

      updateGrid(Grid);
      console.log(Grid)
      fillCell(indexes[0], indexes[1]);
    } else {
      flag = true;
      e.target.style.backgroundColor = chosenColor;
    }
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

  function renderCanvas(grid, dimensions){
    let canvas = "";
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