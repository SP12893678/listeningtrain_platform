import { Point } from "pixi.js/lib/core/math"
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const { Container, Graphics, Sprite, Text } = require("pixi.js/lib/core")
let resources = PIXI.loader.resources

class Step {

}


class ModeGuide extends Container {
    constructor(sprite, polygon, beginpPoint, endPoint) {
        super()
        this.visible = false
        this.background = new Graphics()
        this.sprite = sprite
        this.polygon = polygon
        this.mission = new Promise()
        this.setBackgroundAndHole()
        this.setArrow()
        this.setPointer()
    }

    setBackgroundAndHole() {
        let background = this.background
        let global = this.sprite.parent.toGlobal(this.sprite.position)
        let { x, y } = global
        background.beginFill(0x000000, 0.9)
            .drawPolygon(0, 0, 1600, 0, 1600, 900, 0, 900)
            .drawPolygon(this.polygon)
            // .drawPolygon(x - 55, y - 55, x + 55, y - 55, x + 55, y + 55, x - 55, y + 55)
            .addHole();
        background.endFill()
        background.interactive = true
        background.buttonMode = true
        this.addChild(background)
    }

    setArrow() {
        let arrow = new Sprite()
        arrow.texture = resources[ResourcesManager.arrow].texture
        arrow.position.set(this.polygon.points[0] - 200, this.polygon.points[1] + 180)
        this.addChild(arrow)
        gsap.to(arrow, { pixi: { positionX: this.polygon.points[0] - 100, positionY: this.polygon.points[1] + 120 }, duration: 1, repeat: -1, yoyo: true })
    }

    setPointer() {
        let polygon = this.polygon.points
        let circle = new Graphics()
        circle.beginFill(0xffffff, 1)
        circle.drawCircle(0, 0, 50)
        circle.endFill()
        circle.alpha = 0.5
        circle.position.set(this.polygon.points[0] + 50, this.polygon.points[1] + 50)
        this.addChild(circle)
        gsap.to(circle, { pixi: { scale: 3, alpha: 0 }, duration: 1, repeat: -1, yoyo: true })

        circle = new Graphics()
        circle.beginFill(0xffffff, 1)
        circle.drawCircle(0, 0, 50)
        circle.endFill()
        circle.alpha = 0.5
        circle.position.set(this.polygon.points[0] + 50, this.polygon.points[1] + 50)
        this.addChild(circle)
        gsap.to(circle, { pixi: { scale: 1.5, alpha: 0 }, duration: 1, repeat: -1, yoyo: true })
    }

    play() {
        let sprite = this.sprite
        let clickHandler = sprite.click
        this.visible = true
        return this.mission();
        // return new Promise((resolve, reject) => {
        //     sprite.click = () => {
        //         clickHandler()
        //         sprite.click = clickHandler
        //         this.visible = false
        //         resolve()
        //     }
        // })
    }
}

class ChatBox extends Container {
    constructor(width, height) {
        super()
        this.msg = []
        this.background = new Graphics()
        this.text = new Text()
        this.setBackground(width, height)
        this.setText()
    }

    setBackground(width, height) {
        let background = this.background
        background.beginFill(0xffffff, 0.5)
        background.drawRoundedRect(0, 0, width, height, 24)
        background.endFill()
        this.addChild(background)
    }

    setText() {
        let text = this.text
        text.anchor.set(0.5)
        text.position.set(this.background.width / 2, this.background.height / 2)
        this.addChild(text)
    }

    addChat(msg) {
        this.msg.push(msg)
        return this
    }

    next() {
        let index = this.msg.indexOf(this.text.text)
        this.text.text = this.msg[index + 1]
    }
}

class MyGuide {
    constructor(guide, chatBox) {
        this.guide = guide
        this.chatBox = chatBox
    }

    play() {
        this.guide.addChild(this.chatBox)
        this.chatBox.next()
        return this.guide.play()
    }
}

export { ModeGuide, MyGuide, ChatBox }