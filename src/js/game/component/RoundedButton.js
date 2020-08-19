import * as PIXI from 'pixi.js'
import { Container, Graphics } from 'pixi.js/lib/core'
import Text from 'pixi.js/lib/core/text/Text'
import { style7 } from '@/js/game/engine/TextStyleManager'

export default class RoundedButton extends Container {
    constructor(text) {
        super()
        this.interactive = true
        this.buttonMode = true

        this.background = new Graphics()
        this.background.beginFill(0x29d4ff, 1)
        this.background.drawRoundedRect(0, 0, 150, 60, 12)
        this.background.endFill()
        this.addChild(this.background)

        this.text = new Text(text, style7)
        this.text.anchor.set(0.5, 0.5)
        this.text.position.set(this.background.width / 2, this.background.height / 2)
        this.addChild(this.text)
    }

    drawBackground(color) {
        let background = this.background
        background.clear()
        background.beginFill(color, 1)
        background.drawRoundedRect(0, 0, 150, 60, 12)
        background.endFill()
    }
}
