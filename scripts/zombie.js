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
  
 const ctx=canvas.getContext("2d");
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
     
    draw(ctx){
        ctx.fillstyle='yellow';
     ctx.drawRect(this.x,this.y,this.width,this.height);
    }
    moveZombie(){
     this.x-=this.speed;
    }
  };
 }