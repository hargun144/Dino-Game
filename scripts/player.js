import { GAME_HEIGHT, GRAVITY } from "./config.js";

export class Player{
    constructor(){
        this.x = 10;
        this.h=60;
        this.w=60;
        this.y = GAME_HEIGHT-(this.h+10);
        this.image = new Image();
        //this.image.src="./images/dino.png"
        this.runImages = ['./images/run1.png', './images/run2.png'];
        this.index=0;
        this.image.src = this.runImages[this.index];
        this.isJumping=false;

    }
    jump(){
        if (!this.isJumping){
              this.y=this.y-(GAME_HEIGHT-this.h);
              this.isJumping=true;

        }
      
    }
    fall(){
        const FLOOR = GAME_HEIGHT-this.h;
        if(this.y>=FLOOR){
            this.isJumping=false;
            return;}
            else{
                this.y= this.y+GRAVITY;
            } 
        }
        
    
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.h, this.w);
        this.walkAnimate();
        this.fall();
    }
    walkAnimate(){
        if(this.index >=2){
            this.index=0;
        }
        this.image.src = this.runImages[this.index];
        this.index++;

    }
}
