import * as PIXI from 'pixi.js'

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
        this.btnWidth = btnWidth;
        this.btnHeight = btnHeight;
        this.btnBorder = 4;
        this.btnBorderColor = "0xFFFFFF";
        this.cornerRadius = 30;
        this.btnBgColor = "0x000000";
        this.btnLabel = label;
        this.setButton();
        this.setText();
        this.interactive = true;
        this.btnMode = true;
        this.mouseover = function(mouseData) {
            this.alpha = 0.95;
        }
        this.mouseout = function(mouseData) {
            this.alpha = 1;
        }
    }

    setButton(){
       /* Draws a button */
       this.btn = new PIXI.Graphics();
       this.btn.lineStyle(this.btnBorder,this.btnBorderColor);
       this.btn.beginFill(this.btnBgColor,0.8);//填充
       this.btn.drawRoundedRect(0,0,this.btnWidth,this.btnHeight,this.cornerRadius);
       this.btn.endFill();
       this.addChild(this.btn);
    }
    setBorder(border){
        this.btnBorder = border;
        this.reDraw();
    }
    setBorderColor(borderColor){
        this.btnBorderColor = borderColor;
        this.reDraw();
    }
    setBackgroundColor(backgroundColor){
        this.btnBgColor = backgroundColor;
        this.reDraw();
    }
    setCornerRadius(cornerRadius){
        this.cornerRadius = cornerRadius;
        this.reDraw();
    }
    reDraw(){
        this.btn.clear();
        this.btn.lineStyle(this.btnBorder,this.btnBorderColor);
        this.btn.beginFill(this.btnBgColor);//填充
        this.btn.drawRoundedRect(0,0,this.btnWidth,this.btnHeight,this.cornerRadius);
        this.btn.endFill();
    }
    setText(){
        var text = new PIXI.Text(this.btnLabel, {
            fontFamily: 'Noto Sans TC',
            fontSize: this.btnHeight*0.5,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.position.set((this.btnWidth - text.width) / 2, (this.btnHeight - text.height) / 2);
        this.addChild(text);
    }
}
