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
  

// sun-------------------->
 // Sun class
 class Sun {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 40; // Increased sun size
        this.value = 25;
        this.isCollected = false;
        this.fallSpeed = 2; // Increased falling speed
        this.image = new Image();
        this.image.src = 'assets/img/sun.png'; // Set the path to your sun image
    }

    draw() {
        if (!this.isCollected) {
            ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    update() {
        if (!this.isCollected) {
            this.y += this.fallSpeed; // Update the sun's position to make it fall
        }
    }

    collect() {
        if (!this.isCollected) {
            this.isCollected = true;
            // Implement resource collection logic here (e.g., increment the player's resource count).
        }
    }
}

const suns_arr = []; // Array to store Sun instances
const max_suns = 5; // Maximum number of suns on the screen

function createRandomSun() {
    if (suns_arr.length < max_suns) {
        const randomX = Math.random() * canvas.width;
        const sun = new Sun(randomX, -100); // Start sun above the canvas

        suns_arr.push(sun);
    }
}

setInterval(createRandomSun, 8000); // Increased time duration for creating new suns

function checkSunClick(event) {
    const coordinates = getMouseCoordinates(event);
    const x = coordinates.x;
    const y = coordinates.y;

    for (const sun of suns_arr) {
        const distance = Math.sqrt((x - sun.x) ** 2 + (y - sun.y) ** 2);
        if (distance <= sun.radius && !sun.isCollected) {
            sun.collect();
        }
    }
}

canvas.addEventListener('click', checkSunClick);

function drawSuns() {
    for (const sun of suns_arr) {
        sun.draw();
    }
}


// Modify your game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateGame();
  drawGrid();
  drawZombie();
  for (const sun of suns_arr) {
    sun.update();
    sun.draw();
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();







  