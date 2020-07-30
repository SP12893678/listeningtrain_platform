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
        this.settingDialog();
    }
    settingDialog(){
        let dialog = new PIXI.Graphics();
        this.dialogWidth = Config.screen.width/4;
        this.dialogHeight = Config.screen.height/3;
        dialog.beginFill(0x000000,0.8);
        dialog.drawRoundedRect(0,0,this.dialogWidth,this.dialogHeight,10);
        dialog.endFill();
        dialog.position.set((this.width-this.dialogWidth)/2,(this.height-this.dialogHeight)/2);
        this.addChild(dialog);
        this.dialog = dialog;
        this.button = new Button3(100,50,'hello');
        this.addChild(this.button.container);
    }

    setDialog(width,height){
        
    }
}
