/**
 * Created by maoyuxun on 2019/2/19.
 */
(function(){
    var Land = window.Land = function(){
        this.image = game.R.land;
        this.x = 0;
        this.y = game.canvas.height * 0.78;
        this.w = 336

    };

    Land.prototype.update = function(){
        this.x = this.x-2;
        if(this.x<-this.w){
            this.x = 0;
        }

    };

    Land.prototype.render = function(){

        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x+this.w,this.y);
        game.ctx.drawImage(this.image,this.x+this.w*2,this.y);
        game.ctx.fillStyle = "#DED895";
        game.ctx.fillRect(0,this.y+112-2,game.canvas.width,game.canvas.height*0.25-112)

    }
})()