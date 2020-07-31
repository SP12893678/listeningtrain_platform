import * as PIXI from 'pixi.js'
import Config from '@/js/game/Config'

/**
 *
 *
 * @export
 * @class Overlay
 * @extends {PIXI.Container}
 */
export default class Overlay extends PIXI.Container {
    /**
     *Creates an instance of Overlay.
     * @param {number} [opacity=0.45]
     * @param {number} [color=0x000000]
     * @memberof Overlay
     */
    constructor(opacity = 0.45, color = 0x000000) {
        super()
        this.interactive = true
        this.setOverlay(color, opacity)
    }

    setOverlay(color, opacity) {
        var overlay = new PIXI.Graphics()
        overlay.beginFill(color, opacity)
        overlay.drawRect(0, 0, Config.screen.width, Config.screen.height)

        overlay.endFill()
        this.addChild(overlay)
        this.overlay = overlay
    }
}
