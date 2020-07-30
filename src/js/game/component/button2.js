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
 * @param {number} width - The width of the button
 * @param {number} height - The height of the button
 * @param {number} border - The border of the button
 * @param {number} cornerRadius - The corner radius of the button
 * @param {number} backgroundColor - The background color of the button
 * @param {string} iconPath - The resource of the icon 
 * @param {string} label - The label(Text) of the button
 */
export default class Button2{
    constructor(width, height,iconPath,label) {
        this.width = width;
        this.height = height;
        this.border = 4;
        this.borderColor = "0xFFFFFF";
        this.cornerRadius = 30;
        this.backgroundColor = "0x000000";
        this.iconPath = iconPath;
        this.label = label;
        this.container = new PIXI.Container();
        this.setButton();
        this.setText();
        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.mouseover = function(mouseData) {
            this.alpha = 0.95;
        }
        this.container.mouseout = function(mouseData) {
            this.alpha = 1;
        }
    }

    setButton(){
       /* Draws a button */
       this.button = new PIXI.Graphics();
       this.button.lineStyle(this.border,this.borderColor);
       this.button.beginFill(this.backgroundColor);//填充
       this.button.drawRoundedRect(0,0,this.width,this.height,this.cornerRadius);
       this.button.endFill();
       var icon = new Sprite (PIXI.loader.resources [this.iconPath].texture);
    //    var icon = new PIXI.Sprite.fromImage("../"+this.iconPath);
       icon.width = this.height*0.7;;
       icon.height = this.height*0.7;
       icon.position.set(this.width*0.1,this.height*0.3/2);
       this.button.addChild(icon);
       this.container.addChild(this.button);
    }
    setBorder(border){
        this.border = border;
        this.reDraw();
    }
    setBorderColor(borderColor){
        this.borderColor = borderColor;
        this.reDraw();
    }
    setBackgroundColor(backgroundColor){
        this.backgroundColor = backgroundColor;
        this.reDraw();
    }
    setCornerRadius(cornerRadius){
        this.cornerRadius = cornerRadius;
        this.reDraw();
    }
    reDraw(){
        this.button.clear();
        this.button.lineStyle(this.border,this.borderColor);
        this.button.beginFill(this.backgroundColor);//填充
        this.button.drawRoundedRect(0,0,this.width,this.height,this.cornerRadius);
        this.button.endFill();
    }
    setText(){
        var text = new PIXI.Text(this.label, {
            fontFamily: 'Noto Sans TC',
            fontSize: this.height*0.5,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.position.set((this.height*0.8+this.width - text.width) / 2, (this.height - text.height) / 2);
        this.container.addChild(text);
    }
}
