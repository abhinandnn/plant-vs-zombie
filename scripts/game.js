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

// zombies
// Collision detection

const getMouseCoordinates = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  };
  
  canvas.addEventListener("mousemove", (event) => {
    const coordinates = getMouseCoordinates(event);
    const x = coordinates.x;
    const y = coordinates.y;
    console.log(`mouse coordinates: x=${x},y=${y}`);
  });
  
  // Creating the Zombie class
  
  class Zombie {
    constructor(y) {
      this.x = canvas.width;
      this.y = y;
      this.health = 100;
      this.width = 90;
      this.height = 90;
      this.speed = 0.5;
      this.movement = this.speed;
      this.curr_health = this.health;
      this.image = new Image(this.width, this.height);
      this.image.src = 'assets/img/zombie.png';
      console.log(`zombie created at y=${y}`);
      this.image.onload=()=>{
        this.draw();
      }
    }
   
  
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    moveZombie() {
      this.x -= this.speed;
    }
  }
  
  
  const zombies_arr = [];
  
  const max_zombies = 6;
  
  const createRandomZombie = () => {
    if (zombies_arr.length < max_zombies) {
      const maxY = canvas.height;
      const randomY  = Math.floor(Math.random() * 5 + 1) * 100;
      const zombie = new Zombie(randomY);
  
      zombies_arr.push(zombie);
    }
  };
  
  setInterval(createRandomZombie, 3000);
  
  const drawZombie = () => {
    //  ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const element of zombies_arr) {
      element.moveZombie();
      element.draw();
    }
  };
  
  // Creating a new zombie after 3 seconds
  const gameLoop = () => {
    drawZombie();
    requestAnimationFrame(gameLoop);
  };  
  
  gameLoop();
  