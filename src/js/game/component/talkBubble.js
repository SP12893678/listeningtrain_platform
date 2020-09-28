import * as PIXI from 'pixi.js'
import { Graphics,Text } from 'pixi.js/lib/core'
import {style15} from '@/js/game/engine/TextStyleManager'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

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
 * @param {number} btnBorder - The btnBorder of the button
 */
export default class talkBubble extends PIXI.Container {
    constructor() {
        super()
        this.message = new Text()
        this.bubble = new PIXI.Sprite()
        this.drawTalkBubble(200)
        this.setMessage()
        this.alpha = 0
        this.timeline = gsap.timeline()
    }
    drawTalkBubble(width){
        let bubble = new Graphics();
        bubble.lineStyle(5, 0x000000);
        bubble.moveTo(0,0)
        bubble.lineTo(10,20)
        bubble.moveTo(width,0)
        bubble.lineTo(width-10,20)
        this.bubble.texture = bubble.generateCanvasTexture()
        this.bubble.anchor.set(0.5)
        this.addChild(this.bubble)
    }
    setMessage(){
        this.message.style = style15
        this.message.anchor.set(0.5)
        this.message.position.set(0,0)
        this.addChild(this.message)
    }
    talkMessage(content,duration){
        this.message.text = content
        // this.drawTalkBubble(this.message.width+50)
        if(content.length <=7)this.drawTalkBubble(this.message.width+60)
        this.timeline.clear()
        let buffer = []
        let times = Math.ceil(content.length/7)
        for(let i = 0;i < times;i++){
            buffer.push(content.substr(i*7,7))
        }
        for(let i = 0;i < buffer.length;i++){
            this.timeline.to(this,0.5,{
                pixi: { alpha: 1}
            },i*(duration/times)+0)
            .to(this.message,{
                pixi: { text:buffer[i]},
            },i*(duration/times)+0)
            .to(this,0.05,{
                pixi: { scale:1.1 },
            },i*(duration/times)+0)
            .to(this,0.05,{
                pixi: { scale:1 },
            },0.05)
            .to(this,0.5,{
                pixi: { alpha: 0 },
                delay:(i+1)*(duration/times)-0.6
            })
        }
        this.timeline.eventCallback("onComplete", ()=>this.timeline.clear())
        // TweenLite.fromTo('div', 5, {opacity:1}, {opacity:0});
    }
}
