//飞机属性
window.onload=function() {
        var playplane;             //玩家飞机
        var game = document.getElementById("game");
        var arrDiplane=[];         //存放敌机
        var arrplayZidan=[];         //存放玩家子弹
        var arrdizidan=[];           //存放敌机子弹
        var keyup=false; var keydown=false; var keyleft=false; var keyright=false;


        //调用玩家飞机
        createPlayPlane();
        //定时器,每600ms创建一个敌人飞机
        var createPlane1Timer=setInterval(createPlane1,1500);
        var createPlane1time=setInterval(createPlane2,2000);
        var createPlane1Time=setInterval(createPlane3,2500);
        var createPlane1times=setInterval(createPlane4,3000);
        var movezidan=setInterval(moveZidan,1);
        var moveDiplaneTimer=setInterval(moveDiplane,10);       //10是刷新频率
        var movePlayPlaneTimer=setInterval(moveplayplane,1);
        var moveDiZidanTimer = setInterval(moveDiZidan,20);//敌机子弹移动
        var pengzhuangTimer=setInterval(crash,20);
        var shoushiTimer=setInterval(shoushi,200);

        //定义玩家飞机键盘移动事件
        document.onkeydown=function(){
        var e= window.event || arguments[0];
        //判断用户按键位置
        if(e.keyCode==38){
            keyup=true;
            playplane.moveup();
        }
        if(e.keyCode==40){
            keydown=true;
            playplane.movedown();
        }
        if(e.keyCode==37){
            keyleft=true;
            playplane.moveLeft();
        }
        if(e.keyCode==39){
            keyright=true;
            playplane.moveRight();
        }
        if(e.keyCode==32){
            playplane.short();
        }
    }
        //键盘抬起
        document.onkeyup=function(){
        var e= window.event || arguments[0];
        //判断用户按键位置
        if(e.keyCode==38){
            keyup=false;
            playplane.moveup();
        }
        if(e.keyCode==40){
            keydown=false;
            playplane.movedown();
        }
        if(e.keyCode==37){
            keyleft=false;
            playplane.moveLeft();
        }
        if(e.keyCode==39){
            keyright=false;
            playplane.moveRight();
        }
    }


        /*原型模型*/
        /*敌机原型*/
        function Diplaneprototype(x, y, src, speed) {
            this.x = x;
            this.y = y;
            this.src = src;
            this.speed = speed;
            this.imgNode = document.createElement("img");
            this.bleed=1;
            this.isdeed=false;

            //发射敌机子弹
            this.shorts=function(){
                var width=this.imgNode.width;
                var top=parseInt(this.imgNode.style.top);
                var left=parseInt(this.imgNode.style.left);
                var x= left+width/2;
                var y= top+40+10;
                var Dizidan =new Dizidanprototype(x,y,"image/EnemyFire_03.png",2);            //发射的子弹
                arrdizidan.push(Dizidan);
            }
            //飞机移动
            this.move = function () {
                var top = parseInt(this.imgNode.style.top) + this.speed;
                this.imgNode.style.top = top + "px";
            };
            //飞机初始化
            this.init = function () {
                this.imgNode.src = this.src;
                this.imgNode.style.left = x + "px";
                this.imgNode.style.top = y + "px";
                game.appendChild(this.imgNode);
            };
            this.init();
        }
        //******************我机原型*************************
        function playplaneprototype(x, y, src, speed) {
        this.x = x;
        this.y = y;
        this.src = src;
        this.speed = speed;
        this.imgNode = document.createElement("img");
        this.bleed;
        this.jifen;
        //发射子弹
        this.short=function(){
            var width=this.imgNode.width;
            var top=parseInt(this.imgNode.style.top);
            var left=parseInt(this.imgNode.style.left);
            var x= left+width/2;
            var y= top+40+10;
            var cartridge =new cartridgeprototype(x,y,"image/bullet_03.png",2);            //发射的子弹
            arrplayZidan.push(cartridge);
        }
        //飞机移动
        this.movedown = function () {
            var down=(parseInt(this.imgNode.style.top)+this.speed);
            if(down<(662-128)){
                this.imgNode.style.top=down+"px";
            }
        };
        this.moveup = function () {
            var top=(parseInt(this.imgNode.style.top)-this.speed);
            if(top>=0){
                this.imgNode.style.top=top+"px";
            }
        }
        this.moveLeft = function () {
            var left=(parseInt(this.imgNode.style.left)-this.speed);
            if(left>0){
                this.imgNode.style.left=left+"px";
            }
        };
        this.moveRight = function () {
            var right=(parseInt(this.imgNode.style.left)+this.speed);
            if(right<(442-128)){
                this.imgNode.style.left=right+"px";
            }
        };
        this.init=function(){
            this.imgNode.src=this.src;
            this.imgNode.style.left=x+"px";
            this.imgNode.style.top=y+"px";
            game.appendChild(this.imgNode);
        };
        this.init();
    }
        //玩家飞机子弹
        function cartridgeprototype(x,y,src,speed){
        this.x=x;
        this.y=y;
        this.src=src;
        this.speed=speed;
        this.imgNode=document.createElement("img");
        this.move=function(){
            var top=(parseInt(this.imgNode.style.top)-this.speed);
            if(top>=0){
                this.imgNode.style.top=top+"px";
            }else{
                this.imgNode.style.top="0px";
            }
        }
        this.init=function(){
            this.imgNode.src=this.src;
            this.imgNode.style.left=x+"px";
            this.imgNode.style.top=y+"px";
            game.appendChild(this.imgNode);

        }
        this.init();
    }
        //创建敌机子弹
        function Dizidanprototype(x,y,src,speed){
        this.x=x;
        this.y=y;
        this.src=src;
        this.speed=speed;
        this.imgNode=document.createElement("img");
        this.move=function(){
            var top=(parseInt(this.imgNode.style.top)+this.speed);
            if(top<662){
                this.imgNode.style.top=top+"px";
            }else{
                this.imgNode.style.top="662px";
            }
        }
        this.init=function(){
            this.imgNode.src=this.src;
            this.imgNode.style.left=x+"px";
            this.imgNode.style.top=y+"px";
            game.appendChild(this.imgNode);

        }
        this.init();
    }

        //敌人飞机与玩家子弹的碰撞
         function crash(){
            for(var i=0; i<arrplayZidan.length;i++){         //取出玩家的子弹
                var zidanleft=parseInt(arrplayZidan[i].imgNode.style.left);
                var zidantop=parseInt(arrplayZidan[i].imgNode.style.top);
                var ziWidth=arrplayZidan[i].imgNode.width;
                var ziHeight=arrplayZidan[i].imgNode.height;
                for(var j=0;j<arrDiplane.length;j++){        //取出敌机
                    var planeleft=parseInt(arrDiplane[j].imgNode.style.left);
                    var planetop=parseInt(arrDiplane[j].imgNode.style.top);
                    var planeWidth=arrDiplane[j].imgNode.width;
                    var planeHeight=arrDiplane[j].imgNode.height;
                    //判断子弹的坐标比对飞机的范围
                    if((zidanleft>(planeleft-ziWidth)&&zidanleft<(planeleft+planeWidth))
                        &&(zidantop>(planetop-ziHeight)&& zidantop<(planetop+planeHeight))
                    ){
                        //子弹与当前飞机发生了碰撞
                        arrDiplane[j].bleed--;
                        if(arrDiplane[j].bleed==0){
                            //飞机爆炸
                            arrDiplane[j].imgNode.src="image/BeiJi_02.png";
                           arrDiplane[j].isdeed=true;

                        }

                        //2.子弹消失
                        game.removeChild(arrplayZidan[i].imgNode);
                        arrplayZidan.splice(i,1);
                        i--;
                        break;
                    }

                }
            }
         }

        //消除死亡飞机
         function  shoushi(){
             for(var i=0;i<arrDiplane.length;i++){
                 if(arrDiplane[i].isdeed){
                     game.removeChild(arrDiplane[i].imgNode);
                     arrDiplane.splice(i,1);
                     i--;
                 }
             }
         }


    /*生成的实例*/
        //创建玩家飞机
        function createPlayPlane(){
            //求出飞机的宽度  游戏界面宽度/2,再减去飞机的2/1，220-64(飞机宽度的一半)=156
            //求飞机的高度位置，游戏界面高度减去飞机高度，再再地步留一些位置
            playplane =new playplaneprototype(156,484,"image/GodPlane.png",1.2);
        }
        //创建敌机
        function createPlane1() {
        //X范围0-644
        var x = parseInt(Math.random() * 395);
        //y范围top 0-758
        var y = 0;
        var plane = new Diplaneprototype(x, y, "image/BluePlane.png", 1);
        arrDiplane.push(plane);//讲创建的存放敌机push添加到一号机里
        plane.shorts();
    }
        function createPlane2() {
        //X范围0-664
        var x = parseInt(Math.random() * 395);
        //y范围top 0-758
        var y = 0;
        var plane = new Diplaneprototype(x, y, "image/BluePlane1.png", 1);  //1是飞机出现的速度
        arrDiplane.push(plane);
        plane.shorts();//讲创建的存放敌机push添加到一号机里
    }
        function createPlane3() {
        //X范围0-664
        var x = parseInt(Math.random() * 395);
        //y范围top 0-758
        var y = 0;
        var plane = new Diplaneprototype(x, y, "image/BluePlane2.png", 1);
        arrDiplane.push(plane);            //讲创建的存放敌机push添加到一号机里
             plane.shorts();
    }
        function createPlane4() {
        //X范围0-664
        var x = parseInt(Math.random() * 395);
        //y范围top 0-758
        var y = 0;
        var plane = new Diplaneprototype(x, y, "image/BluePlane3.png", 1);
        arrDiplane.push(plane);            //将创建的存放敌机push添加到一号机里
            plane.shorts();
    }

        /*动作方法*/
        //移动敌机
        function moveDiplane(){
        for(var i=0;i<arrDiplane.length;i++){
            var top=parseInt(arrDiplane[i].imgNode.style.top);
            if(top<600){
                arrDiplane[i].move();
            }else{
                //删除飞机
                game.removeChild(arrDiplane[i].imgNode);
                arrDiplane.splice(i,1);
                i--;
            }
        }
    }
        //玩家飞机的移动
        function  moveplayplane(){
            if(playplane==undefined){
                return;                     //错误排除
            }
            if(keyup){
                playplane.moveup();
            }
            if(keyleft){
                playplane.moveLeft();
            }
            if(keyright){
                playplane.moveRight();
            }
            if(keydown){
                playplane.movedown();
            }
        }
        /*子弹*/
        function moveZidan(){
            for(var i=0; i<arrplayZidan.length;i++){
                var top=parseInt(arrplayZidan[i].imgNode.style.top);
                if(top==0){
                    //删除子弹
                    game.removeChild(arrplayZidan[i].imgNode);
                    arrplayZidan.splice(i,1);
                    i--;
                }else{
                    arrplayZidan[i].move();
                }
            }
        }
        function moveDiZidan(){
        for(var i=0; i<arrdizidan.length;i++){
            var top=parseInt(arrdizidan[i].imgNode.style.top);
            if(top==662){
                //删除子弹
                game.removeChild(arrdizidan[i].imgNode);
                arrdizidan.splice(i,1);
                i--;
            }else{
                arrdizidan[i].move();
            }
        }
    }
    }