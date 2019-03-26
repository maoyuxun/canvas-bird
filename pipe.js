/**
 * Created by maoyuxun on 2019/2/19.
 */
(function(){
    var Pipe = window.Pipe = function(){
        this.imagedown = game.R.pipe_down;
        this.imageup = game.R.pipe_up;
        this.allheight = game.canvas.height * 0.78;
        this.interheight = 120;
        this.picheight=320
        this.downheight = parseInt(Math.random()*(320-140))+140;

        this.upheight = this.allheight-this.interheight-this.downheight;
        this.x = game.canvas.width;
        game.pipeArr.push(this);
        this.pass=false;



    };

    Pipe.prototype.update = function(){
        this.x = this.x-2;

        if(game.bird.R>this.x+52 && !this.pass){
            game.score++;
            this.pass = true;

        }
        if(game.bird.R > this.x && game.bird.L < this.x + 52){
            if(game.bird.T < this.downheight || game.bird.B > this.downheight + this.interheight){
                game.sm.enter(4);
            }
        }
        if(this.x<-52){
            for(var i=0;i<game.pipeArr.length;i++){
                if(game.pipeArr[i] === this){
                    game.pipeArr.splice(i,1);
                }
            }
        }

    };

    Pipe.prototype.render = function(){


        game.ctx.drawImage(this.imagedown,0,this.picheight-this.downheight,52,this.downheight,this.x,0,52,this.downheight);
        game.ctx.drawImage(this.imageup,0,0,52,this.upheight,this.x,this.downheight+this.interheight,52,this.upheight);


    }
})()