/**
 * Created by maoyuxun on 2019/2/19.
 */
(function(){



    var Background = window.Background = function(){
        this.image = game.R.bg_day;
        this.x=0;
        this.y = 0.75 * game.canvas.height - 396;
        this.w = 288;
        this.h=512;
        this.speed = 1;

    };
    Background.prototype.update = function(){

        this.x -=this.speed;
        if(this.x<-this.w){
            this.x=0;
        }
    }
    Background.prototype.render = function(){
        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x+this.w,this.y);
        game.ctx.drawImage(this.image,this.x+this.w*2,this.y);
        game.ctx.fillStyle="#4EC0CA";
        game.ctx.fillRect(0,0,game.canvas.width,this.y+10);
        //game.ctx.fillStyle="#5EE270";
        //game.ctx.fillRect(0,this.y+this.h,game.canvas.width,game.canvas.height-this.y-this.h-10);
    }
})()