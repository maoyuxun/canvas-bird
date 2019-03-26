/**
 * Created by maoyuxun on 2019/2/19.
 */
(function(){

    //将Game变成全局
    var Game = window.Game = function(params){
        this.canvas = document.querySelector(params.canvasid);
        this.ctx = this.canvas.getContext("2d");
        this.reasourceurl = params.reasourceurl;
        this.score = 0;

        this.init();
        var self= this;

        //异步，以回调的形式
        this.readload(function(){
            self.start();
            self.bingEvent();
        });

    }
    //适配窗口
    Game.prototype.init = function(){
        var windowW =document.documentElement.clientWidth;
        var windowH =document.documentElement.clientHeight;
        if(windowW>414){
            windowW=414;
        }else if(windowW<320){
            windowW=320;
        }
        if(windowH>736){
            windowH=736;
        }else if(windowH<500){
            windowH=500;
        }
        this.canvas.width=windowW;
        this.canvas.height=windowH;
    };

    Game.prototype.readload = function(callback){

        this.R={};
        var self=this;
        var alreadynumber =0;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                var RJ = JSON.parse(xhr.responseText);
                for(var i=0;i<RJ.images.length;i++){
                    self.R[RJ.images[i].name] = new Image();
                    self.R[RJ.images[i].name].src=RJ.images[i].url;

                    self.R[RJ.images[i].name].onload = function(){
                        alreadynumber++;
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        var text = "正在加载"+alreadynumber +"/"+RJ.images.length+"张图片";
                        self.ctx.textAlign = "center";
                        self.ctx.fillText(text,self.canvas.width/2,self.canvas.width*(1-0.618));

                        if(alreadynumber == RJ.images.length){
                          callback();
                        }


                    }
                }
            }

        };
        xhr.open("get",this.reasourceurl,true);
        xhr.send(null);

    };
    Game.prototype.start = function(){

        this.background = new Background();
        this.land = new Land();

        this.pipeArr = [];

        this.bird = new Bird();
        var self = this;
        this.fno=0;
        this.time = setInterval(function(){
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            self.fno++;
            self.ctx.font = "16px 宋体";
            self.ctx.textAlign = "left";


            self.background.update();
            self.background.render();

            self.land.update();
            self.land.render();



            for(var i = 0; i < self.pipeArr.length; i++){
                self.pipeArr[i].update();
                self.pipeArr[i].render();
            }

            //50帧创建一个实例
            self.fno % 150 == 0 && (new Pipe());


            var scorelength = self.score.toString().length;
            for(var i=0;i<scorelength;i++){
                self.ctx.drawImage(self.R["shuzi"+self.score.toString().charAt(i)],self.canvas.width/2 - scorelength/2*34+34*i,100);
            }





            self.bird.update();
            self.bird.render();


            self.ctx.fillText("FNO:"+self.fno,10,20);

        },20)
    };


    Game.prototype.bingEvent = function(){
        var self =this;
        game.canvas.onclick =function(){
            self.bird.fly();
        }
    }



})()