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
        this.drawTalkBubble()
        this.setMessage()
        this.alpha = 0
    }
    drawTalkBubble(){
        let bubble = new Graphics();
        // bubble.beginFill(0x000000)
        // bubble.drawEllipse(100,0,100,60)
        // bubble.beginFill(0x000000)
        // bubble.drawRoundedRect(0,0,200,80,10)
        // bubble.endFill()
        // bubble.beginFill(0x000000)
        // bubble.lineStyle(5, 0x000000, 1);
        // bubble.moveTo(40,80);
        // bubble.lineTo(50, 100);
        // bubble.lineTo(60, 80);
        // bubble.lineTo(40, 80);
        // bubble.endFill()
        bubble.lineStyle(5, 0x000000);
        bubble.moveTo(0,0)
        bubble.lineTo(10,20)
        bubble.moveTo(150,0)
        bubble.lineTo(140,20)
        this.bubble = new PIXI.Sprite(bubble.generateCanvasTexture())
        this.bubble.anchor.set(0.5)
        // this.bubble.alpha = 0
        this.addChild(this.bubble)
    }
    setMessage(){
        this.message.style = style15
        this.message.anchor.set(0.5)
        this.message.position.set(0,0)
        // this.message.alpha = 0
        this.addChild(this.message)
    }
    talkMessage(content,duration){
        this.message.text = content
        gsap.to(this, {
            pixi: { alpha: 1 },
            duration:0.5,
        })
        gsap.to(this, {
            pixi: { scale:1 },
            duration:0.05,
        })
        gsap.to(this, {
            pixi: { scale:1.1 },
            duration:0.05,
            delay:0.05
        })
        gsap.to(this, {
            pixi: { alpha: 0 },
            duration: 0.5,
            delay: duration-0.5,
        })
        // TweenLite.fromTo('div', 5, {opacity:1}, {opacity:0});
    }
}
