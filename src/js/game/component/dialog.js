import * as PIXI from 'pixi.js'
import Config from '@/js/game/Config'
import Overlay from './overlay'
import Button3 from './button3'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Dialog extends Overlay {
    constructor(label,type){
        super();
        this.dialogLabel = label;
        if(typeof(type) != 'undefined'){
            this.type = type
        }
        else 
            this.type = 0 //default
        this.settingDialog(Config.screen.width,Config.screen.height);
        // this.click = () => {
        //         this.visible = false;
        // }
    }
    settingDialog(width,height){
        this.dialog = new PIXI.Graphics();
        this.addChild(this.dialog);
        this.dialogWidth = width/4;
        this.dialogHeight = height/3;
        this.dialogBgColor = 0x000000;
        this.dialogBgColorAlpha = 0.8;
        this.draw();
        let t = this;
        switch(this.type){
            case 0:
                this.setLabel();
                this.setButton();
                break;
            case 1:
                this.setCloseButton();
                break;
            default:
                this.setLabel();
                this.setButton();
                break;
        }
        // this.setLabel();
        // this.setButton();
    }
    setButton(){
        this.cancelBtn = new Button3(this.dialogWidth*0.75/2,this.dialogHeight*0.20,'取消');
        this.cancelBtn.position.set(this.dialog.x+(this.dialogWidth-this.dialogWidth*0.8)/2,this.dialog.y+this.dialogHeight*0.6);
        this.cancelBtn.setCornerRadius(this.dialogHeight*0.20/(2.1));
        // this.cancelBtn.setBackgroundColor(0xffff00,0.6);
        // this.cancelBtn.setTextColor(0x000000);
        this.yesBtn = new Button3(this.dialogWidth*0.75/2,this.dialogHeight*0.20,'確認');
        this.yesBtn.position.set(this.cancelBtn.x+this.cancelBtn.width+this.dialogWidth*0.05,this.cancelBtn.y);
        this.yesBtn.setCornerRadius(this.dialogHeight*0.20/(2.1));
        this.yesBtn.setBackgroundColor(0xffd700,0.95);
        this.yesBtn.setTextColor(0x000000);
        this.addChild(this.cancelBtn);
        this.addChild(this.yesBtn);
    }
    setLabel(){
        let text = new PIXI.Text(this.dialogLabel, {
            fontFamily: 'Noto Sans TC',
            fontSize: 36,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.position.set(this.dialog.x+(this.dialogWidth-36*this.dialogLabel.length)/2 ,this.dialog.y+this.dialogHeight*0.3);
        this.text = text;
        this.addChild(this.text);
    }
    setLabelColor(color){
        this.text.tint = color;
    }
    setCloseButton(){
        this.closeBtnBgColor = 0xffffff;
        this.closeBtnBgColorAlpha = 0.95;
        this.cloaseBtnRadius = 15;
        this.closeBtn = new PIXI.Graphics();
        this.addChild(this.closeBtn);
        this.closeBtn.interactive = true // 設定可以互動
        this.closeBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        this.closeBtn.click = () => {
            this.visible = false;
        }

        this.closeBtn.beginFill(this.closeBtnBgColor,this.closeBtnColorAlpha);
        this.closeBtn.drawCircle(this.dialog.x+this.dialog.width,this.dialog.y,this.cloaseBtnRadius*2);
        this.closeBtn.endFill();
        this.closeBtn.lineStyle(2, 0xffffff, 1);
        this.closeBtn.drawCircle(this.dialog.x+this.dialog.width,this.dialog.y,this.cloaseBtnRadius*1.7);

        let text = new PIXI.Text('✕', {
            fontFamily: 'Noto Sans TC',
            fontSize: 36,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.anchor.set(0.5);
        text.position.set(this.dialog.x+this.dialog.width,this.dialog.y);
        this.closeBtnText = text;
        this.closeBtn.addChild(this.closeBtnText);
    }
    setCloseBtnBackgroundColor(color,alpha){
        this.closeBtnBgColor = color;
        this.closeBtnBgColorAlpha = alpha;
        this.draw();
    }
    setSize(width,height){
        this.dialogWidth = width
        this.dialogHeight = height
        this.draw()
    }
    setBackgroundColor(color,alpha){
        this.dialogBgColor = color;
        this.dialogBgColorAlpha = alpha;
        this.draw();
    }
    draw(){
        this.dialog.clear()
        this.dialog.beginFill(this.dialogBgColor,this.dialogBgColorAlpha);
        this.dialog.drawRoundedRect(0,0,this.dialogWidth,this.dialogHeight,10);
        this.dialog.endFill();
        this.dialog.position.set((this.width-this.dialogWidth)/2,(this.height-this.dialogHeight)/2);
        if(this.closeBtn != null){
            this.closeBtn.clear();
            this.closeBtn.beginFill(this.closeBtnBgColor,this.closeBtnColorAlpha);
            this.closeBtn
            this.closeBtn.drawCircle(this.dialog.x+this.dialog.width,this.dialog.y,this.cloaseBtnRadius*2);
            this.closeBtn.endFill();
            this.closeBtn.lineStyle(2, 0xffffff, 1);
            this.closeBtn.drawCircle(this.dialog.x+this.dialog.width,this.dialog.y,this.cloaseBtnRadius*1.7);
            this.closeBtnText.position.set(this.dialog.x+this.dialog.width,this.dialog.y);
        }
    }
}
