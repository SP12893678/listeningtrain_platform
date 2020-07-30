import * as PIXI from 'pixi.js'
import Config from '@/js/game/Config'

export default class Overlay extends PIXI.Container {
    constructor() {
        super()
        this.interactive = true
        this.setOverlay()
    }

    setOverlay() {
        var overlay = new PIXI.Graphics()
        overlay.beginFill(0x000000, 0.45)
        overlay.drawRect(0, 0, Config.screen.width, Config.screen.height)
        console.log('width',Config.screen.width);
        console.log('height',Config.screen.height);

        overlay.endFill()
        this.addChild(overlay)
        this.overlay = overlay
    }
}
