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

        this.sm = new Manager();


        var self = this;
        this.fno=0;
        this.time = setInterval(function(){
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            self.fno++;


            self.sm.update();
            self.sm.render();







            self.ctx.fillText("FNO:"+self.fno,30,20);

        },20)
    };

})()