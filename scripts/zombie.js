let MyCanvas = document.getElementById("myCanvas");
 /// collision detection
 
 const getMouseCoordinates=(event)=>{
    const rect=MyCanvas.getBoundingClientRect();
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
  
  //creating zombie class
  
 const context=canvas.getContext("2d");
 const zombies_arr=[];
 const zombieTexture=new Image();
 zombieTexture.src="./zombie.png";
 zombieTexture.onload=()=>{
  class Zombies {
    constructor(x,y,health){
     this.x=x;
     this.y=y;
     this.health= 100;
     this.width=90;
     this.height=90;
    
     this.speed=1.5 ;
    }
     
    draw(context){
        context.fillstyle='yellow';
     context.drawRect(this.x,this.y,this.width,this.height);
    }
    moveZombie(){
     this.x-=this.speed;
    }
  };
 }
 
 const max_zombies=6;
  const createRandomZombie=()=>{
   if(zombies_arr.length<=max_zombies){
    const maxX = canvas.width-5;
    const maxY= canvas.height-5;
    const randomY=Math.random()*maxY;
     const zombie= new Zombies(maxX,randomY);
     zombies_arr.push(zombie);

   };
  }

  const drawZombie=()=>{
    context.clearRect(0,0,canvas.width,canvas.height);
    for(const element of zombies_arr){
      element.moveZombie();
      element.draw(ctx);
    }
   }
   // creating a new zombie after 3 seconds
   setInterval(createRandomZombie, 3000);
   const gameLoop=()=>{
    drawZombie();
    requestAnimationFrame(gameLoop) ;   
   }
 gameLoop();
