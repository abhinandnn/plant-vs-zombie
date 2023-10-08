const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const square_size = 100;
const rows = canvas.height / square_size;
const columns = canvas.width / square_size;
const pointer ={
    x:0,
    y:0
};
const peas = [];

class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw() {
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
function mouseinsqr(mouseX, mouseY, squareX, squareY, squareSize) {
    return mouseX >= squareX&&mouseX<=squareX + squareSize && mouseY >= squareY &&mouseY <= squareY + squareSize;
}
function drawGrid() {
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if(mouseinsqr(pointer.x,pointer.y,squares[i][j].x,squares[i][j].y,square_size))
            squares[i][j].draw();
        }
    }
}
canvas.addEventListener('mousemove',function(event) {
    pointer.x=event.x-canvas.offsetLeft;
    pointer.y=event.y-canvas.offsetTop;
})
canvas.addEventListener('mouseleave',function(event) {
    pointer.x=0;
    pointer.y=0;
})
let i=0;
function drawimg(x,l,dx,dy,frame)
{
let images=[];
images.length=l;
for(let i=0;i<l;i++)
{
    images[i]=new Image();
    images[i].src= '/plants/' + x +' (' + (i+1).toString()+').png';
}
// let i=0;
    // if(i>=l-1)
    // { i=0;}
    // i++;
    ctx.drawImage(images[frame],dx,dy);
}
let selectedPlantType=undefined;
let tsun=1200;
const suns=[];
const sunflowerCost=50;
const peashooterCost=100;
const chomperCost=100;
const wallnutCost=50;
let plantCost=peashooterCost;
const plants=[];
const plantmenu=[
    {plantname:"peashooter",imgg:"/plants/peash.png"},
    {plantname:"sunflower",imgg:"/plants/sunf.png"}
    // {plantname:"sunflower",imgg:"/plants/sunf.png"},
    // {plantname:"sunflower",imgg:"/plants/sunf.png"}
]
function drawPlantmenu(){
    let x=20;
    for(let i=0;i<plantmenu.length;i++)
        {
    const img = new Image();
    
        img.src = plantmenu[i].imgg;
        ctx.drawImage(img, x, 20, 100, 60);
        x=x+120;}}
    canvas.addEventListener('click',function(event) {
        pointer.x=event.x-canvas.offsetLeft;
        pointer.y=event.y-canvas.offsetTop;
        let x=20
        for(let i=0;i<plantmenu.length;i++)
        {
        if(pointer.x>=x&&pointer.x<=x+100&&pointer.y>=20&&pointer.y<=80)
        {selectedPlantType=plantmenu[i].plantname;}
        x=x+120;
        }
})
class sun{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.side=60;
        this.power=25;
        this.picked=false;
        this.lastPickedTime = 0;
    }
    draw()
    {
        if(!this.picked)
        { const img=new Image();
        img.src='/plants/sun.png';
        ctx.drawImage(img,this.x,this.y,this.side,this.side);}
    }
    isClicked(dx,dy) {
        return !this.picked && dx >= this.x && dx <= this.x + this.side && dy >= this.y && dy <= this.y + this.side;
}
pick()
{
    this.picked=true;
}}
class sunflower{
    constructor(x,y){
        this.type="sunflower"
        this.x=x;
        this.y=y;
        this.side=square_size;
        this.health=75;
        this.cost=50;
        this.lastsun=0;
    }
    draw()
    {
    const frameSpeed = 0.1;
this.frame = Math.floor((Date.now() * frameSpeed) % 60);
drawimg('SunFlower/5',60,this.x+2,this.y+8,this.frame)
    }
    bringPease()
{
    const currentTime=Date.now();
        if(currentTime-this.lastsun>=10000)
        {
            suns.push(new sun(this.x+20,this.y+12));
            suns[suns.length - 1].lastPickedTime = Date.now();
            this.lastsun=currentTime;
        }
    }
} 
class wallnut{
    constructor(x,y){
        this.type="wallnut";
        this.x=x;
        this.y=y;
        this.side=square_size;
        this.health=400;
    }
draw()
{
}}
class peashooter {
    constructor(x,y){
        this.type="peashooter";
        this.x=x;
        this.y=y;
        this.side=square_size;
        this.health=100;
        this.enemyDetect=false;
        this.lastPea = 0;
        this.frame=0;
    }
draw()
{
// ctx.fillStyle='green';
// ctx.fillRect(this.x,this.y,this.side,this.side)
const frameSpeed = 0.1;
this.frame = Math.floor((Date.now() * frameSpeed) % 60);
drawimg('Peashooter/4',60,this.x+2,this.y+8,this.frame)
}
bringPease()
{
    const currentTime=Date.now();
        if(currentTime-this.lastPea>=1500)
        {
            peas.push(new pea(this.x+20,this.y+12));
            this.lastPea=currentTime;
        }
    }
}
class chomper
{
    constructor(x,y)
    {
        this.type="chomper";
        this.x=x;
        this.y=y;
        this.side=square_size;
        this.health=100;
        this.enemyDetect=false;
    }
    draw()
    {

    }
}

canvas.addEventListener('click',function()
{
    const sqrX=pointer.x-(pointer.x%square_size);
    const sqrY=pointer.y-(pointer.y%square_size);
    if(sqrY<square_size)
    return;
    for(let i=0;i<plants.length;i++)
    {
        if(plants[i].x==sqrX&&plants[i].y==sqrY)
        return;
    }
    if (selectedPlantType === "peashooter") {
        selectedPlant = peashooter;
        plantCost = peashooterCost;
    }
    else if (selectedPlantType === "sunflower") {
        selectedPlant = sunflower;
        plantCost = sunflowerCost;
    }
    else if (selectedPlantType === "chomper") {
        selectedPlant = chomper;
        plantCost = chomperCost;
    }
    else if (selectedPlantType === "wallnut") {
        selectedPlant = wallnut;
        plantCost = wallnutCost;
    }
    
    if(tsun>=plantCost)
    {plants.push(new selectedPlant(sqrX,sqrY));
    tsun=tsun-plantCost;}
})
function managePlants(){
    for(let i=0;i<plants.length;i++)
    {
        plants[i].draw();
        // if(plants[i].type==="peashooter")
        plants[i].bringPease();
    }
}
class pea{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.width=20;
        this.height=20;
        this.power=20;
        this.speed=5;
    }
    move()
    {
        this.x=this.x+this.speed;
    }
    draw(){
        const img=new Image();
        img.src='/plants/pea1.png';
        ctx.drawImage(img,this.x,this.y,);
    }

}
function pease(){
for(let i=0;i<peas.length;i++)
{
peas[i].move();
peas[i].draw();
if(peas[i]&&peas[i].x>canvas.width)
{
peas.splice(i,1);
i--;
}
}
}
function sune(){
    for(let i=0;i<suns.length;i++)
{
    suns[i].draw();
    if (suns[i].isClicked(pointer.x, pointer.y)) {
            suns[i].pick();
            tsun += suns[i].power;
        }
        if (suns[i].picked && Date.now() - suns[i].lastPickedTime >= 10000) {
            suns.splice(i, 1);
            i--;
        }
    }
}
class zombies{

}
function updateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='brown';
    ctx.fillRect(0,0,ctrl_pnl.w,ctrl_pnl.h);
    drawPlantmenu();
    drawGrid();
    managePlants();
    pease();
    sune();
    requestAnimationFrame(updateGame);
}
updateGame();
