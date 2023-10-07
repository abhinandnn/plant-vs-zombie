const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let score = 100;
let gameOver = false;
let canPlant = false;

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
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }
}
const ctrl_pnl = {
  w: canvas.width,
  h: square_size,
};
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
function updateGame() {
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, ctrl_pnl.w, ctrl_pnl.h);
  drawGrid();
  setTimeout(updateGame, 16);
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
    this.image.src = "assets/img/zombie.png";
    console.log(`zombie created at y=${y}`);
    this.image.onload = () => {
      this.draw();
    };
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveZombie() {
    this.x -= this.speed;

    if (this.x < 0) {
      gameOver = true;
    }
  }
}

const zombies_arr = [];

const max_zombies = 6;

const createRandomZombie = () => {
  if (zombies_arr.length < max_zombies) {
    const maxY = canvas.height;
    const randomY = Math.floor(Math.random() * 5 + 1) * 100;
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

function updateScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Plant selection and planting logic
let selectedPlant = null;

function selectPlant(plantType) {
  selectedPlant = plantType;
}

document.getElementById("sunflower").addEventListener("click", () => {
  selectPlant("sunflower");
  canPlant = true;
});
document.getElementById("peashooter").addEventListener("click", () => {
  selectPlant("peashooter");
  canPlant = true;
});

// Handle planting logic
canvas.addEventListener("mousedown", (event) => {

    if(!canPlant) return;

  if (selectedPlant) {
    const coordinates = getMouseCoordinates(event);
    const x = coordinates.x;
    const y = coordinates.y;

    // Calculate the center position of the box based on the click coordinates
    const boxX = Math.floor(x / square_size) * square_size + square_size / 2;
    const boxY = Math.floor(y / square_size) * square_size + square_size / 2;

    // Check if the planting location is valid (e.g., not on the top control panel)
    if (boxY >= ctrl_pnl.h) {
      // Check if there's already a plant of the same type at this location
      const existingPlant = plants.find((plant) => {
        return (
          Math.abs(plant.x - boxX) < square_size / 2 &&
          Math.abs(plant.y - boxY) < square_size / 2 &&
          plant.constructor.name === selectedPlant // Check if it's the same type
        );
      });

      // If there's no existing plant of the same type, create and add the selected plant
      if (!existingPlant) {
        if (selectedPlant === "sunflower") {
          const sunflower = new Sunflower(boxX, boxY);
          plants.push(sunflower);
        } else if (selectedPlant === "peashooter") {
          const peashooter = new Peashooter(boxX, boxY);
          plants.push(peashooter);
        }
      }

      canPlant=false;
    }
  }
});

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
    this.image.src = "assets/img/sun.png"; // Set the path to your sun image
  }

  draw() {
    if (!this.isCollected) {
      ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
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
      score += 50;
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

setInterval(createRandomSun, 9000); // Increased time duration for creating new suns

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

canvas.addEventListener("click", checkSunClick);

// Plant classes (Sunflower and Peashooter)
class Sunflower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 40; // Adjust size as needed
    this.planted = true; // Indicate that it's planted
    this.image = new Image();
    this.image.src = "assets/img/sunflower.png"; // Set the path to your sunflower image
  }

  draw() {
    if (this.planted) {
      ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }
}

class Peashooter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 40; // Adjust size as needed
    this.planted = true; // Indicate that it's planted
    this.image = new Image();
    this.image.src = "assets/img/peashooter.png"; // Set the path to your peashooter image
  }

  draw() {
    if (this.planted) {
      ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }
}

const plants = []; // Array to store planted plants

// ... Continue with your existing code ...

// Modify your game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateGame();
  drawGrid();
  drawZombie();
  updateScore();
  for (const sun of suns_arr) {
    sun.update();
    sun.draw();
  }
  for (const plant of plants) {
    plant.draw();
  }
  if (gameOver) {
    // Display game over message
    ctx.fillStyle = "red";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  } else {
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
