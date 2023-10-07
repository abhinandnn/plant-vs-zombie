let MyCanvas = document.getElementById("myCanvas");
const context = MyCanvas.getContext("2d");
// Collision detection

const getMouseCoordinates = (event) => {
  const rect = MyCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
};

MyCanvas.addEventListener("mousemove", (event) => {
  const coordinates = getMouseCoordinates(event);
  const x = coordinates.x;
  const y = coordinates.y;
  console.log(`mouse coordinates: x=${x},y=${y}`);
});

// Creating the Zombie class

class Zombie {
  constructor(y) {
    this.x = MyCanvas.width;
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveZombie() {
    this.x -= this.speed;
  }
}


const zombies_arr = [];

const max_zombies = 6;

const createRandomZombie = () => {
  if (zombies_arr.length < max_zombies) {
    const maxY = MyCanvas.height;
    const randomY  = Math.floor(Math.random() * 5 + 1) * 100;
    const zombie = new Zombie(randomY);

    zombies_arr.push(zombie);
  }
};

setInterval(createRandomZombie, 3000);

const drawZombie = () => {
  //  context.clearRect(0, 0, MyCanvas.width, MyCanvas.height);
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
