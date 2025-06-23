import { GAME_HEIGHT, SPEED } from "./config.js";

export class Floor{
    constructor(){
        this.x=0;
        this.h=200;
        this.w=525;
        this.y=GAME_HEIGHT-this.h;
        this.image= new Image();
        this.image.src="../images/floor.png";
        this.speed = SPEED;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
        context.drawImage(this.image, this.x + this.w, this.y, this.w, this.h);
        if (this.x <- this.w){
            this.x=0;
        }
        this.move();
    }
    move(){
        this.x = this.x - this.speed;

    }

}