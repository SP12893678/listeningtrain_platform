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
    constructor(){
        super();
        this.settingDialog(Config.screen.width,Config.screen.height);
    }
    settingDialog(width,height){
        let dialog = new PIXI.Graphics();
        this.dialogWidth = width/4;
        this.dialogHeight = height/3;
        dialog.beginFill(0x000000,0.8);
        dialog.drawRoundedRect(0,0,this.dialogWidth,this.dialogHeight,10);
        dialog.endFill();
        dialog.position.set((this.width-this.dialogWidth)/2,(this.height-this.dialogHeight)/2);
        this.addChild(dialog);
        this.dialog = dialog;

        this.cancelBtn = new Button3(this.dialogWidth*0.75/2,this.dialogHeight*0.20,'取消');
        this.cancelBtn.position.set(this.dialog.x+(this.dialogWidth-this.dialogWidth*0.8)/2,this.dialog.y+this.dialogHeight*0.7);
        this.yesBtn = new Button3(this.dialogWidth*0.75/2,this.dialogHeight*0.20,'確認');
        this.yesBtn.position.set(this.cancelBtn.x+this.cancelBtn.width+this.dialogWidth*0.05,this.cancelBtn.y);
        this.addChild(this.cancelBtn);
        this.addChild(this.yesBtn);
    }

    setDialog(width,height){
        
    }
}
