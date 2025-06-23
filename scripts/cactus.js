import { SPEED } from "./config.js";
export class Cactus{
    constructor(x,y,w,h,imagesrc){
        this.x=x;
        this.h=h;
        this.y=y-20;
        this.w=w;
        
        this.image=new Image();
        this.image.src=imagesrc;

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
        this.move();
    }
    move() {
        this.x=this.x-SPEED;

    }
    isOutOfScreen(){
        return this.x<0;
    }
}
