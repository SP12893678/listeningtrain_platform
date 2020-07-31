import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import * as TextStyleManager from '@/js/game/engine/TextStyleManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class CardBoard extends PIXI.Container {
    constructor() {
        super()
        this.setCardBackground()
        this.setCardTitle()

        setInterval(() => {
            this.titlebar.tint = Math.random() * 0xffffff
        }, 1000)
    }

    setCardTitle() {
        var bg = new Sprite(resources[ResourcesManager.titlebar].texture)
        var scale = 200 / bg.width
        bg.scale.set(scale, scale)
        bg.position.set(0, 0)
        this.addChild(bg)
        this.titlebar = bg

        let text = new PIXI.Text('任務資訊', TextStyleManager.defult)
        text.anchor.set(0, 0.5)
        text.position.set(20, this.titlebar.height / 2)
        this.addChild(text)
        this.titletext = text
    }

    setCardBackground() {
        var bg = new PIXI.Graphics()
        bg.beginFill(0xffffff, 0.5)
        bg.drawRoundedRect(0, 15, 300, 150, 12)
        bg.endFill()
        bg.position.set(20, 0)
        this.addChild(bg)
        this.background = bg
    }
}
