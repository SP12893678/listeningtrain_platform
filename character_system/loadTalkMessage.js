var CharacterTalk = class CharacterTalk{
    constructor(){
        this.drawTalkingBubble();//畫對話框
        this.talkTime("歡迎來到換衣間～開始換裝咯!");
    }

    drawTalkingBubble(){
        /*Draws a talking bubble*/
        this.rectangle =  new  PIXI.Graphics ();
        this.rectangle.lineStyle(4,0xFFFFFF);
        // rectangle.beginFill( 0x66CCFF );
        this.rectangle.drawRoundedRect(0,0,200,50,10);
        this.rectangle.endFill();
        this.rectangle.x  =  35;
        this.rectangle.y  =  190 ;
        this.rectangle.visible = false;
        app.stage.addChild (this.rectangle);
        /*----------------------------------------*/
        /*create new container for all items*/
        this.talkingBubble = new PIXI.Container();
        app.stage.addChild(this.talkingBubble);
        this.talkingBubble .x = 35;
        this.talkingBubble .y = 190;
        this.talkingBubbleWidth = 190;
        this.talkingBubbleHeight= 50;
        /*----------------------------------------*/
    }
    talkTime(message){
        armatureDisplay.animation.play('talk',0);//進行說話的動作
        this.endIndex = 0;
        this.startIndex = 0;
        this.rectangle.visible = true;
        let t = this;
        clearInterval(this.s);//確保每次talk的時候interval是clear的
        this.s = setInterval(function() {
            t.talkMessage(message);
          },200);
    }
    talkMessage(message){
        /*TEXT STYLE*/
        let style = new PIXI.TextStyle({
            fontFamily:"Arial",
            fontSize:28,
            fill:" black ",
        });
        /*----------------------------------------*/
        this.talkingBubble.removeChildren();
        let showMessage =  new PIXI.Text (message.substring(this.startIndex,this.endIndex++),style);
        if(showMessage.width>this.talkingBubbleWidth){
            this.startIndex = this.endIndex-2;
            showMessage =  new PIXI.Text (message.substring(this.startIndex,this.endIndex++),style);
        }
        //think如果超出範圍怎麼辦？
        this.talkingBubble.addChild(showMessage);
        showMessage.position.set(10,10);
        if(this.endIndex > message.length+2){
            clearInterval(this.s);
            this.talkEnd();
        }
    }
    talkEnd(){
        this.talkingBubble.removeChildren();
        this.rectangle.visible = false;
        console.log("idk what happens");
        armatureDisplay.animation.play('handmove',0);//恢復到原本的動作
    }
};