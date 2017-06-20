/*jshint esversion: 6 */

const pixelPainter = document.getElementById("pixelPainter");
/*pixelPainter.appendChild(box);*/
const grid = createGrid(10,10, "<div class='cell'></div>");

var merged = [].concat.apply([], grid);
let compGrid = [];

pixelPainter.innerHTML = merged.join('');

function createGrid(col, rows, fill){
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
})

pixelPainter.addEventListener("mouseup", function(e){
      flag = false;
})

pixelPainter.addEventListener("mousemove", function(e){
  if(e.target.id === 'pixelPainter' || flag === false){
    e.preventDefault();
    return;
  }
    e.target.style.backgroundColor = "black";
})
