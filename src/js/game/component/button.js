import * as PIXI from 'pixi.js'
import * as particles from 'pixi-particles'
import { GlowFilter } from 'pixi-filters'
import emitter_data from '@/assets/json/emitter-shot.json'
import ResourcesManager from '@/js/game/engine/ResourcesManager'

/**
 * A button component that's shape is Parallelogram
 * @constructor
 * @param {number} x_width - The width of the Parallelogram
 * @param {number} y_height - The height of the Parallelogram
 * @param {number} offset - The offset of the Parallelogram
 */
export default class Button extends PIXI.Container {
    constructor(x_width, y_height, offset) {
        super()
        this.x_width = x_width
        this.y_height = y_height
        this.offset = offset
        this.setBorder()
        this.setText()
        this.setMaskArea()
        // this.setParticles()
        this.setMouseEvent()
    }

    setMouseEvent() {
        this.interactive = true
        this.buttonMode = true

        this.click = () => {
            console.log('container', this)
        }
        this.mouseover = () => {
            this.border.filters = [new GlowFilter(25, 1.6, 0)]
        }
        this.mouseout = () => {
            this.border.filters = []
        }
    }

    setBorder() {
        var border = new PIXI.Graphics()
        border.lineStyle(2, 0xe4f9ff, 1)
        border.moveTo(this.offset, 0)
        border.lineTo(this.offset + this.x_width, 0)
        border.lineTo(this.x_width, this.y_height)
        border.lineTo(0, this.y_height)
        border.lineTo(this.offset, 0)
        this.addChild(border)
        this.border = border
    }

    setText() {
        var text = new PIXI.Text('開始遊戲', {
            fontFamily: 'Noto Sans TC',
            fontSize: 16,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.anchor.set(0.5, 0.5)
        text.position.set((this.x_width + this.offset) / 2, this.y_height / 2)
        this.addChild(text)
        this.text = text
    }

    setMaskArea() {
        var maskGraphic = new PIXI.Graphics()
        maskGraphic.beginFill(0xff0000)
        maskGraphic.moveTo(20, 0)
        maskGraphic.lineTo(170, 0)
        maskGraphic.lineTo(150, 50)
        maskGraphic.lineTo(0, 50)
        maskGraphic.lineTo(20, 0)
        maskGraphic.endFill()
        this.mask = maskGraphic
        this.addChild(maskGraphic)
    }

    setParticles() {
        emitter_data.pos.x = -300
        emitter_data.pos.y = 50
        var emitter = new particles.Emitter(
            this,
            [PIXI.Texture.fromImage(ResourcesManager.particles)],
            emitter_data
        )
        var elapsed = Date.now()
        var update = function() {
            requestAnimationFrame(update)
            var now = Date.now()

            emitter.update((now - elapsed) * 0.001)
            elapsed = now
        }

        /**執行效果 */
        emitter.emit = true
        update()
    }
}
