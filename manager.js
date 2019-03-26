/**
 * Created by maoyuxun on 2019/2/20.
 */
(function(){
    var Manager = window.Manager = function(){

        this.sceneNumber=1;
        game.bg = new Background();
        game.land = new Land();
        game.bird = new Bird();
        this.logoY=-48;
        this.button_playX=game.canvas.width/2-58;
        this.button_playY=game.canvas.height;
        this.bindEvent();



    };


    Manager.prototype.update = function(){
        switch (this.sceneNumber){
            case 1:
                this.logoY +=10;
                if(this.logoY>120){
                    this.logoY=120;
                }
                this.button_playY -=20;
                if(this.button_playY<250){
                    this.button_playY=250;
                }
                break
            case 2:
                game.bird.wing();

                this.tuOpacity += this.tuOpacitydown ? -0.02:0.02;
                if(this.tuOpacity<0.02 || this.tuOpacity>0.98){
                    this.tuOpacitydown = !this.tuOpacitydown;
                }
                break
            case 3:
                game.bg.update();
                game.land.update();

                game.bird.update();
                game.fno % 150 == 0 && (new Pipe());
                for(var i= 0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].update();
                }
                break
            case 4:

                if(game.bird.y >game.canvas.height * 0.78-17){
                    this.isBirdLand =true;
                }
                this.birdfno++;
                if(!this.isBirdLand){
                    game.bird.y += 1*this.birdfno;
                }else {
                    game.fno % 10==0 && this.boom++;
                }
                this.mask -=0.1;
                if(this.mask<0){
                    this.mask=0;
                }
        }


    };

    Manager.prototype.render = function(){
        switch (this.sceneNumber){
            case 1:
                game.bg.render();
                game.land.render();
                game.bird.render();
                game.bird.x = game.canvas.width/2;
                game.bird.y =220;
                game.ctx.drawImage(game.R["title"],game.canvas.width/2-89,this.logoY);
                game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY);
                break;
            case 2:
                game.bg.render();
                game.land.render();
                game.bird.render();


                game.ctx.save();
                game.ctx.globalAlpha = this.tuOpacity;
                game.ctx.drawImage(game.R["tutorial"],game.canvas.width/2-57,240);
                game.ctx.restore();
                break
            case 3:
                game.bg.render();
                game.land.render();
                game.bird.render();
                for(var i= 0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
                for(var i = 0 ; i < scoreLength ; i++ ){
                    game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                }
                break
            case 4:


                game.bg.render();
                game.land.render();

                for(var i= 0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }

                if(!this.isBirdLand){
                    game.bird.render();
                }else {
                    if(this.boom<=11){
                        game.ctx.drawImage(game.R["b"+this.boom],game.bird.x-24,game.bird.y-24,48,48);
                    }else {
                        this.enter(5);
                    }
                }
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
                for(var i = 0 ; i < scoreLength ; i++ ){
                    game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                }
                game.ctx.fillStyle="rgba(255,255,255,"+this.mask +")";
                game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
                break
            case 5:
                game.bg.render();
                game.land.render();

                for(var i= 0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
                for(var i = 0 ; i < scoreLength ; i++ ){
                    game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                }
                game.ctx.drawImage(game.R["text_game_over"],game.canvas.width/2-102,250);




        }

    };

    Manager.prototype.enter = function(number){
        this.sceneNumber =number;
        switch (this.sceneNumber){
            case 1:
                this.logoY=-48;
                this.button_playY=game.canvas.height;
                game.bird = new Bird();
                break
            case 2:
                this.tuOpacity = 1;
                this.tuOpacitydown =true;
                game.bird.y =160;
                break
            case 3:
                game.pipeArr = new Array();
                break
            case 4:
                this.mask = 1;
                this.isBirdLand =false;
                this.birdfno=0;
                this.boom=0;
                break



        }

    };

    Manager.prototype.bindEvent = function(){
        var self =this;
        game.canvas.onclick = function(event){
            clickHand(event.clientX,event.clientY);
        };
        game.canvas.addEventListener("touchstart",function(event){
            var finger = event.touches[0];
            clickHand(finger.clientX,finger.clientY);
        },true);

        function clickHand(mousex,mousey){
            switch (self.sceneNumber){
                case 1:
                    if(mousex>self.button_playX && mousex<self.button_playX+116 && mousey>self.button_playY && mousey<self.button_playY+70){
                        self.enter(2);
                    }
                    break
                case 2:
                    self.enter(3);
                    break
                case 3:
                    game.bird.fly();
                    break
                case 5:
                    self.enter(1);

            }
        }
    }

})()