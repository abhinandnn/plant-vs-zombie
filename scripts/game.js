const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const square_size = 100;
const rows = canvas.height / square_size;
const columns = canvas.width / square_size;

class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}
const ctrl_pnl = {
    w:canvas.width,
    h:square_size
}
const squares = [];
for (let i = 1; i < rows; i++) {
    squares[i] = [];
    for (let j = 0; j < columns; j++) {
        const square = new Square(j * square_size, i * square_size, square_size);
        squares[i][j] = square;
    }
}
function drawGrid() {
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            squares[i][j].draw();
        }
    }
}
function updateGame(){
    ctx.fillStyle='grey';
    ctx.fillRect(0,0,ctrl_pnl.w,ctrl_pnl.h);
    drawGrid();
    setTimeout(updateGame,16);
}
updateGame();

// adding coordinates detection to the background
 
const getMouseCoordinates=(event)=>{
    const rect=canvas.getBoundingClientRect();
      const x=event.clientX -rect.left;
      const y= event.clientY -rect.top;
      return{x,y};
  }
  
  canvas.addEventListener("mousemove",(event)=>{
    const coordinates=getMouseCoordinates(event);
    const x=coordinates.x;
    const y=coordinates.y;
    console.log(`mouse coordinates: x=${x},y=${y}`);
  })
  
  
