import * as PIXI from 'pixi.js'
import {style12} from '@/js/game/engine/TextStyleManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

/**
 * A button component 
 * @constructor
 * @param {number} btnWidth - The btnWidth of the button
 * @param {number} btnHeight - The btnHeight of the button
 * @param {number} btnBorder - The border of the button
 * @param {number} cornerRadius - The corner radius of the button
 * @param {number} btnBgColor - The background color of the button
 * @param {string} btnLabel - The label(Text) of the button
 */
export default class Button3 extends PIXI.Container {
    constructor(btnWidth, btnHeight, label) {
        super();
        this.btn = new PIXI.Graphics();
        this.btnWidth = btnWidth;
        this.btnHeight = btnHeight;
        this.btnBorder = 4;
        this.btnBorderColor = 0xffffff;
        this.cornerRadius = 10;
        this.btnBgColor = 0x000000;
        this.btnBgColorAlpha = 0.8;
        this.btnLabel = label;
        this.fontFamily = style12
        this.text = new PIXI.Text()
        this.textColor = 0xffffff

        this.setButton();
        this.setText(this.fontFamily)
        // this.setTextColor(this.textColor);

        this.interactive = true;
        this.buttonMode = true;
        this.mouseover = function(mouseData) {
            this.alpha = 0.85;
        }
        this.mouseout = function(mouseData) {
            this.alpha = 1;
        }
    }

    setButton(){
       /* Draws a button */
       let btn = this.btn
       btn.lineStyle(this.btnBorder,this.btnBorderColor);
       btn.beginFill(this.btnBgColor,this.btnBgColorAlpha);//填充
       btn.drawRoundedRect(0,0,this.btnWidth,this.btnHeight,this.cornerRadius);
       btn.endFill();
       this.addChild(btn);
    }
    setBorder(border){
        this.btnBorder = border;
        this.reDraw();
    }
    setBorderColor(borderColor){
        this.btnBorderColor = borderColor;
        this.reDraw();
    }
    setBackgroundColor(backgroundColor,alpha){
        this.btnBgColor = backgroundColor;
        this.btnBgColorAlpha = alpha;
        this.reDraw();
    }
    setCornerRadius(cornerRadius){
        this.cornerRadius = cornerRadius;
        this.reDraw();
    }
    reDraw(){
        let btn = this.btn
        btn.clear();
        btn.lineStyle(this.btnBorder,this.btnBorderColor);
        btn.beginFill(this.btnBgColor,this.btnBgColorAlpha);//填充
        btn.drawRoundedRect(0,0,this.btnWidth,this.btnHeight,this.cornerRadius);
        btn.endFill();
    }
    setText(fontStyle){
        let text = this.text
        text.text = this.btnLabel
        text.style = fontStyle
        text.anchor.set(0.5)
        text.position.set(this.btnWidth/2,this.btnHeight/2);
        this.addChild(text);
    }
    setTextColor(color){
        this.text.tint = color;
    }
}
