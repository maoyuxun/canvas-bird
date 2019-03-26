/**
 * Created by maoyuxun on 2019/2/20.
 */
(function(){
    var Bird = window.Bird = function(){
        this.color = parseInt(Math.random()*3);
        this.imageArr = [
            game.R["bird"+this.color+"_0"],
            game.R["bird"+this.color+"_1"],
            game.R["bird"+this.color+"_2"]
        ];
        this.x = game.canvas.width*(1-0.618)-24;
        this.y = 100;
        this.wingstep = 0;
        //鸟的帧数
        this.fno = 0;
        this.d = 0;
        this.hasonclick = false;

    };


    Bird.prototype.update = function(){
        this.wing();
        if(!this.hasonclick){
            this.y += this.fno * 0.06;
        }else if(this.hasonclick){
            this.y -=(30-this.fno)*0.1;
            if(this.fno>30){
                this.hasonclick = false;
                this.fno=0;

            }
        }
        this.fno++;
        this.d +=0.01;

        if(this.y<11){
            this.y=11;
        }

        if((this.y)>(game.canvas.height * 0.78-17)){

            game.sm.enter(4);
        }

        this.L = this.x-16;
        this.R = this.x +16;
        this.T = this.y-11;
        this.B =this.y+11;

    };

    Bird.prototype.render = function(){
        game.ctx.save()
        game.ctx.translate(this.x,this.y);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingstep],-24,-24);
        game.ctx.restore()
    };

    Bird.prototype.fly = function(){
        this.hasonclick =true;
        this.d = -0.6;
        this.fno= 0;

    }

    Bird.prototype.wing = function(){
        game.fno % 20 ==0 && this.wingstep++;
        if(this.wingstep>2){
            this.wingstep=0;
        };
    }



})()