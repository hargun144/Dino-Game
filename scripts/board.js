import { FRAME_RATE, GAME_HEIGHT, GAME_WIDTH, MAX, MIN } from "./config.js";
import { Player } from "./player.js";
import { Floor } from "./floor.js";
import { Cactus } from "./cactus.js";
window.addEventListener('load', gamestart);

function gamestart(){
bindevents();
prepareCanvas();
loadSprites();
gameloop();
}

function bindevents(){
    window.addEventListener('keyup', doJump)
}

function doJump(event){
if (event.code == 'Space'){
    player.jump();
}
}
let player;
let context;
let floor;
function prepareCanvas(){
const canvas = document.getElementById("canvas");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
context = canvas.getContext('2d');
}


function loadSprites(){
     floor = new Floor();
     player = new Player();
     loadCactus();
     
}
let cactusArray = [];
function loadCactus(){
    
    const cactusArr = ['./images/cactus1.png','./images/cactus2.png'];
    let GAP = 1;
    for (var c of cactusArr){
        const cactus = new Cactus(GAME_WIDTH*GAP, GAME_HEIGHT-60, 70, 156, c);
        GAP++;
        cactusArray.push(cactus);
    } 

}

function generateRandomNumber(){
    return Math.floor(Math.random()*MAX-MIN+1)+MIN;
}
let delay=0;
function generateRandomCactus(){
    
    if (delay>=70){
        delay=0;
    setTimeout(()=>{
        loadCactus();
        //cactusArray.push(new Cactus(GAME_WIDTH*1, GAME_HEIGHT-60, 70, 156, c))
    }, generateRandomNumber
    ());
}
delay++;
}
function printCactus(context){
    for(let cactus of cactusArray){
        cactus.draw(context);
    }

}
function removeUnUsedCactus(){
    cactusArray = cactusArray.filter(c=>!c.isOutOfScreen())

}
function printGameOver(){
    context.font = 'bold 48px serif'
    context.fillStyle= 'grey';
    context.fillText('Game Over', GAME_WIDTH/4, GAME_HEIGHT/2);
}

function gameloop(){
    clearScreen();
    if (isCollisionHappens()){
         floor.draw(context);
         player.draw(context);
         printCactus(context);
         generateRandomCactus();
         removeUnUsedCactus();
         printGameOver();
         Score();
    }
    else{
    floor.draw(context);
    player.draw(context);
    printCactus(context);
    generateRandomCactus();
    removeUnUsedCactus();
    Score();
    setTimeout(function(){
        requestAnimationFrame(gameloop)

    }, FRAME_RATE)
}}

let score =0;
function Score(){
    score++;
    context.font = 'bold 20px serif'
    context.fillStyle= 'grey';
    context.fillText(score.toString().padStart(5,0), GAME_WIDTH-100, 40);
}
function clearScreen(){
    context.fillStyle="white";
    context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
}
function isCollide(cactus){
    return player.x < cactus.x + cactus.w && player.x + player.w > cactus.x && player.y < cactus.y + cactus.h && player.y + player.h > cactus.y;

}
function isCollisionHappens(){
    for (let cactus of cactusArray){
        if (isCollide(cactus)){
            return true;
        }
    }
    return false;
}
