 let MyCanvas = document.getElementById("myCanvas");

 // collision detection
 
 const getMouseCoordinates=(event)=>{
    const rect=MyCanvas.getBoundingClientRect();
      const x=event.clientX -rect.left;
      const y= event.clientY -rect.top;
      return{x,y};
  }

  MyCanvas.addEventListener("mousemove",(event)=>{
    const coordinates=getMouseCoordinates(event);
    const x=coordinates.x;
    const y=coordinates.y;
    console.log(`mouse coordinates: x=${x},y=${y}`);
  })
  
  //creating zombie class

  class Zombie {
    constructor(x,y){
     this.x=x;
     this.y=y;
     this.health= 100;
     this.width=90;
     this.height=90;
    
     this.speed=1.5 ;
    }
     
    draw(context){
        context.fillStyle='yellow';
     context.fillRect(this.x,this.y,this.width,this.height);
    }
    moveZombie(){
     this.x-=this.speed;
    }
  };
 const context=MyCanvas.getContext("2d");
 const zombies_arr=[];

 let MyCanvas = document.getElementById("myCanvas");
 
 /// collision detection
 
 const getMouseCoordinates=(event)=>{
    const rect=MyCanvas.getBoundingClientRect();
      const x=event.clientX -rect.left;
      const y= event.clientY -rect.top;
      return{x,y};
  }
  
  MyCanvas.addEventListener("mousemove",(event)=>{
    const coordinates=getMouseCoordinates(event);
    const x=coordinates.x;
    const y=coordinates.y;
    console.log(`mouse coordinates: x=${x},y=${y}`);
  })
  
  //creating zombie class

  class Zombie {
    constructor(x,y){
     this.x=x;
     this.y=y;
     this.health= 100;
     this.width=90;
     this.height=90;
    
     this.speed=1.5 ;
    }
     
    draw(context){
        context.fillStyle='yellow';
     context.fillRect(this.x,this.y,this.width,this.height);
    }
    moveZombie(){
     this.x-=this.speed;
    }
  };
 const context=MyCanvas.getContext("2d");
 const zombies_arr=[];

 
 const max_zombies=6;
  const createRandomZombie=()=>{
   if(zombies_arr.length<=max_zombies){
    const maxX = MyCanvas.width;
    const maxY= MyCanvas.height;
    const randomY= Math.floor(Math.random()*maxY);
    
     const zombie= new Zombie(maxX,randomY);

     zombies_arr.push(zombie);

   };
  }

  const drawZombie=()=>{
    context.clearRect(0,0,MyCanvas.width,MyCanvas.height);
    for(const element of zombies_arr){
      element.moveZombie();
      element.draw(context);
    }
   }
   // creating a new zombie after 3 seconds
   setInterval(createRandomZombie, 3000);
   const gameLoop=()=>{
    drawZombie();
    requestAnimationFrame(gameLoop) ;   
   }
 gameLoop();


  const drawZombie=()=>{
    context.clearRect(0,0,MyCanvas.width,MyCanvas.height);
    for(const element of zombies_arr){
      element.moveZombie();
      element.draw(context);
    }
   }
   // creating a new zombie after 3 seconds
   setInterval(createRandomZombie, 3000);
   const gameLoop=()=>{
    drawZombie();
    requestAnimationFrame(gameLoop) ;   
   }
 gameLoop();
