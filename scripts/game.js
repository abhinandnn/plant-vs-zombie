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
const zombies=[];
const zomb=[];
let fr=0;
let zombietime=1200;
let gameover=false;
let score=0;
let theme = new Audio();
let plantation = new Audio();
let seed = new Audio();
let peahit = new Audio();
let lost = new Audio();
let pnt = new Audio();
seed.src = "assets/audio/seed.mp3";
plantation.src = "assets/audio/plant.mp3";
peahit.src = "assets/audio/pea.mp3";
theme.src = "assets/audio/theme.mp3";
lost.src = "assets/audio/losemusic.mp3";
pnt.src = "assets/audio/points.mp3";
function audi(aud)
{
    aud.currentTime=0;
    aud.play();
}
// class images{
//     constructor()
// }    
audi(theme);
class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.side = size;
    }
    draw() {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.side, this.side);
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
let images=[5];
function drawimg(x,l,k)
{
images.length=l;
images[k]=[];
for(let i=0;i<l;i++)
{
    images[k][i]=new Image();
    images[k][i].src= x +' (' + (i+1).toString()+').png';
}
}
drawimg('/zombies/attack/1',21,0);
drawimg('/zombies/walk/1',21,1);
drawimg('/plants/SunFlower/5',13,2);
drawimg('/plants/walll/6',12,3);
drawimg('/plants/Peashooter/4',12,4);
let selectedPlantType=undefined;
let tsun=200;
const suns=[];
const rsuns=[];
const sunflowerCost=50;
const peashooterCost=100;
const chomperCost=100;
const wallnutCost=50;
let plantCost=peashooterCost;
const plants=[];
const zombiePos=[];
const plantmenu=[
    {plantname:"peashooter",imgg:"/plants/peash.png",cost:"100"},
    {plantname:"sunflower",imgg:"/plants/sunf.png",cost:" 50"},
    {plantname:"wallnut",imgg:"/plants/wall.png",cost:" 50"}
]
const imgk=[];
for(let i=0;i<plantmenu.length;i++)
        {
        imgk[i] = new Image();
        imgk[i].src = plantmenu[i].imgg;
        }
function drawPlantmenu(){
    let x=180;
    for(let i=0;i<plantmenu.length;i++)
        {
        ctx.drawImage(imgk[i], x, 20, 100, 60);
        ctx.fillStyle='yellow';
        ctx.font='18px Arial';
        ctx.fillText(plantmenu[i].cost,x+60,60);
        x=x+120;
    }
    }
    canvas.addEventListener('click',function(event) {
        pointer.x=event.x-canvas.offsetLeft;
        pointer.y=event.y-canvas.offsetTop;
        let x=180
        for(let i=0;i<plantmenu.length;i++)
        {
        if(pointer.x>=x&&pointer.x<=x+100&&pointer.y>=20&&pointer.y<=80)
        {selectedPlantType=plantmenu[i].plantname;
            audi(seed);
        }
        x=x+120;
        }
})
class sun{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.side=60;
        this.power=20;
        this.picked=false;
        this.lastPickedTime = 0;
        this.ry=60;
        this.speed=2;
        this.rx=Math.random()*10*this.side;
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
    audi(pnt);
}
randomdraw()
    {
        if(!this.picked)
        { const img=new Image();
        img.src='/plants/sun.png';
        ctx.drawImage(img,this.rx,this.ry,this.side,this.side);}
    }
move()
{
this.ry=this.ry+this.speed;
}}
class sunflower{
    constructor(x,y){
        this.type="sunflower";
        this.x=x;
        this.y=y;
        this.side=square_size-4;
        this.health=75;
        this.cost=50;
        this.lastsun=0;
        this.frame=0;
    }
    draw()
    {
        if(fr%3===0)
        {
            this.frame=(this.frame+1)%13;
        }
        ctx.drawImage(images[2][this.frame],this.x+20,this.y+18);

    }
    bringPease()
{
        const currentTime=Date.now();
        if(currentTime-this.lastsun>=17000)
        {
            suns.push(new sun(this.x+38,this.y+20));
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
        this.side=square_size-4;
        this.health=400;
        this.frame=0;
    }
draw()
{
    if(fr%3===0)
        {
            this.frame=(this.frame+1)%12;
        }
        ctx.drawImage(images[3][this.frame],this.x+25,this.y+20);
}}
class peashooter {
    constructor(x,y){
        this.type="peashooter";
        this.x=x;
        this.y=y;
        this.side=square_size-4;
        this.health=100;
        this.zombiedetect=false;
        this.lastPea = 0;
        this.frame=0;
    }
draw()
{
if(fr%3==0)
{
    this.frame=(this.frame+1)%12;
}
ctx.drawImage(images[4][this.frame],this.x+20,this.y+20);
}
bringPease()
{
    if(this.zombiedetect)
    {
    const currentTime=Date.now();
        if(currentTime-this.lastPea>=2500)
        {  
            peas.push(new pea(this.x+38,this.y+22));
            this.lastPea=currentTime;
        }
    }
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
    else if (selectedPlantType === "wallnut") {
        selectedPlant = wallnut;
        plantCost = wallnutCost;
    }
    
    if(tsun>=plantCost)
    {plants.push(new selectedPlant(sqrX,sqrY));
        audi(plantation);
    tsun=tsun-plantCost;}
})
function managePlants(){
    for(let i=0;i<plants.length;i++)
    {
        plants[i].draw();
        if(plants[i].type!="wallnut")
        plants[i].bringPease();
    if(zombiePos.indexOf(plants[i].y)!==-1)
    plants[i].zombiedetect=true;
    else
    plants[i].zombiedetect=false;
        for(let j=0;j<zombies.length;j++)
        {
            if( plants[i]&&collision(plants[i],zombies[j]))
            {
                zomb.push(j);
                zombies[j].attack=true;
                plants[i].health=plants[i].health-0.2;
            }
            if(plants[i]&&plants[i].health<=0)
            { 
                for(let k=0;k<zomb.length;k++)
                {
                    zombies[zomb[k]].attack=false;
                }
                plants.splice(i,1);
            i--; }
        }
    }
}
const imgp=new Image();
imgp.src='/plants/pea1.png';
class pea{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.side=26;
        this.power=20;
        this.speed=5;
    }
    move()
    {
        this.x=this.x+this.speed;
    }
    draw(){
        ctx.drawImage(imgp,this.x,this.y);
    }

}
function pease(){
for(let i=0;i<peas.length;i++)
{
peas[i].move();
peas[i].draw();
for(let j=0;j<zombies.length;j++)
{
    if(zombies[j]&&peas[i]&&collision(peas[i],zombies[j]))
    {
        zombies[j].health=zombies[j].health-peas[i].power;
        audi(peahit);
        peas.splice(i,1);
        i--;
    }
}
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
        if (suns[i].picked || Date.now() - suns[i].lastPickedTime >= 5000) {
            suns.splice(i, 1);
            i--;
        }
    }
}
class zombie{
    constructor(y)
    {
        this.x=canvas.width;
        this.y=y;
        this.side=square_size-4;
        this.speed=Math.random()*0.3+0.3;
        this.motion=this.speed;
        this.health=100;
        this.frame=0;
        this.attack=false;
    }
move(){
    if(!this.attack)
    this.x=this.x-this.motion;
}
draw(){
    if(this.attack)
    {
        if(fr%3===0)
        {
            this.frame=(this.frame+1)%21;
        }
        ctx.drawImage(images[0][this.frame],this.x-90,this.y-40);
    // ctx.strokeStyle = 'black';
    // ctx.strokeRect(this.x, this.y, this.side, this.side);
    }
    else{
    if(fr%3===0)
        {
            this.frame=(this.frame+1)%21;
        }
        ctx.drawImage(images[1][this.frame],this.x-90,this.y-40);
    // ctx.strokeStyle = 'black';
    // ctx.strokeRect(this.x, this.y, this.side, this.side);
    }}
}

function zombiese(){
    for(let i=0;i<zombies.length;i++)
    {
        zombies[i].move();
        zombies[i].draw();
        if(zombies[i].x<-5)
        {
            gameover=true;
            audi(lost);
        }
        if(zombies[i].health<=0)
        {
            const find=zombiePos.indexOf(zombies[i].y);
            zombiePos.splice(find,1);
            zombies.splice(i,1);
            for(let k=0;k<zomb.length;k++)
            {
                if(zomb[k]===i)
                { zomb.splice(k,1);
                k--;}
            }
            i--;
            score++;
        }
    }
    if(fr%zombietime===0)
    {
        let y=Math.floor(Math.random()*5+1)*(square_size);
        zombies.push(new zombie(y));
        zombiePos.push(y);
        if(zombietime >=250)
        {zombietime=zombietime-50;}
        if(zombietime <=200&&zombietime>=50)
        zombietime=zombietime-10;
    }
}
function sunese(){
    for(let i=0;i<rsuns.length;i++)
    {
        rsuns[i].move();
        rsuns[i].randomdraw();
        if (!rsuns[i].picked&&mouseinsqr(pointer.x, pointer.y,rsuns[i].rx,rsuns[i].ry,60)) {
            rsuns[i].pick();
            tsun += rsuns[i].power;
            rsuns.splice(i,1);
            i--;
        }
    }
    if(fr%600===0)
    {
        rsuns.push(new sun(undefined,undefined));
    }
}
function controlGame()
{
    ctx.fillStyle='black';
    ctx.font='bold 25px Arial';
    ctx.fillText(tsun,67,93);
    ctx.fillStyle='black';
    ctx.font='bold 25px Arial';
    ctx.fillText("ZOMBIES KILLED:"+score,700,60);
    if(gameover){
        ctx.fillStyle='black'
        ctx.font='60px Arial';
        ctx.fillText('Game Over!', 310,330);
    }
    else if(score>=100)
    {
        ctx.fillStyle='black'
        ctx.font='60px Arial';
        ctx.fillText('You won!', 340,330);
        gameover=true;
    }
}
const img1=new Image();
    img1.src='/plants/control.png';
function control()
{
        ctx.drawImage(img1,0,0,ctrl_pnl.w,ctrl_pnl.h);
}
function collision(a,b){
    return !(a.x>b.x+b.side||a.x+a.side<b.x||a.y>b.y+b.side||a.y+a.side<b.y);}
function updateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    control();
    drawPlantmenu();
    drawGrid();
    managePlants();
    zombiese();
    pease();
    sune();
    sunese();
    controlGame();
    fr++;
    if(gameover)
    theme.pause();
    if(!gameover)
    requestAnimationFrame(updateGame);
}
requestAnimationFrame(updateGame);
