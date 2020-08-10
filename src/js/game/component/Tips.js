import * as PIXI from 'pixi.js'
import { style3, style4 } from '@/js/game/engine/TextStyleManager'
import Config from '@/js/game/Config'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class Tips extends PIXI.Container {
    constructor() {
        super()
        this.title = new PIXI.Text()
        this.text = new PIXI.Text()
        this.setTitle()
        this.setText()
        this.setEvent()
    }

    setTitle() {
        let title = this.title
        title.text = '提示！'
        title.style = style3
        this.addChild(title)
    }

    setText() {
        let title = this.title
        let text = this.text
        text.text = ''
        text.style = style4
        text.position.set(title.width + 10, title.height - text.height)
        this.addChild(text)
    }

    setEvent() {
        let text = this.text
        setInterval(() => {
            let tl = gsap.timeline({ duration: 1 })
            tl.to(this, {
                pixi: { alpha: 0 },
                onComplete: () => {
                    text.text = Config.text.tips[Math.round(Math.random() * (Config.text.tips.length - 1))]
                },
            })
            tl.to(this, { pixi: { alpha: 1 }, duration: 1 })
        }, 1000)
    }
}
