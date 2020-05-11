var CharacterTalk ={
    init: function(message){
        this.drawTalkingBubble();//畫對話框
        armatureDisplay.animation.play('talk',0);//進行說話的動作
        myBoy.talkTime(message,200);//開始說話
    },
    drawTalkingBubble: function(){
        /*Draws a talking bubble*/
        this.rectangle =  new  PIXI.Graphics ();
        this.rectangle.lineStyle(4,0xFFFFFF);
        // rectangle.beginFill( 0x66CCFF );
        this.rectangle.drawRoundedRect(0,0,200,50,10);
        this.rectangle.endFill();
        this.rectangle.x  =  35;
        this.rectangle.y  =  190 ;
        app.stage.addChild(this.rectangle);
        /*----------------------------------------*/
        /*create new container for all items*/
        this.talkingBubble = new PIXI.Container();
        app.stage.addChild(this.talkingBubble);
        this.talkingBubble .x = 35;
        this.talkingBubble .y = 190;
        var talkingBubbleWidth = 200;
        var talkingBubbleHeight= 50;
        /*----------------------------------------*/
    },
    talkTime: function (message,time){
        this.index = 0;
        let t = this;
        this.s=setInterval(function() {
            t.talkMessage(message);
          },time);
    },
    talkMessage: function(message){
        /*TEXT STYLE*/
        let style = new PIXI.TextStyle({
            fontFamily:"Arial",
            fontSize:28,
            fill:" black ",
        });
        /*----------------------------------------*/
        this.talkingBubble.removeChildren();
        let showMessage =  new PIXI.Text (message.substring(0,this.index++),style);
        //think如果超出範圍怎麼辦？
        this.talkingBubble.addChild(showMessage);
        showMessage.position.set(10,10);
        // console.log(this.talkingBubble.getChildAt(0).text);
        // console.log(message);
        if(this.index > message.length+1){
            clearInterval(this.s);
            this.clear();
        }
    },
    clear: function(){
        app.stage.removeChild(this.talkingBubble);
        app.stage.removeChild(this.rectangle);
        console.log("whar happen?");
        armatureDisplay.animation.play('handmove',0);//恢復到原本的動作
    }
};
// myBoy = Object.create(CharacterTalk);
// myBoy.init("Hello");
//myBoy.talkTime("Hello",200);
// myBoy.index=10;
// myBoy.talkMessage("Hello");