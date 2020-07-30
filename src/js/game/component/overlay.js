import * as PIXI from 'pixi.js'
import ScenesManager from '@/js/game/engine/ScenesManager'

export default class Overlay extends PIXI.Container {
    constructor() {
        super()
        this.interactive = true
        this.setOverlay()
    }

    setOverlay() {
        var overlay = new PIXI.Graphics()
        overlay.beginFill(0x000000, 0.45)
        overlay.drawRect(0, 0, ScenesManager.defaultWidth, ScenesManager.defaultHeight)
        overlay.endFill()
        this.addChild(overlay)
        this.overlay = overlay
    }
}
