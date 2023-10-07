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
  
  