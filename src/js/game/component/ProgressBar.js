import * as PIXI from 'pixi.js'
import { GlowFilter, AdvancedBloomFilter } from 'pixi-filters'
import { style1 } from '@/js/game/engine/TextStyleManager'

export default class ProgressBar extends PIXI.Container {
    constructor(width) {
        super()
        this.basic_bar = new PIXI.Graphics()
        this.progress_bar = new PIXI.Graphics()
        this.progress_text = new PIXI.Text('0%', style1)
        this.draw(width)
    }

    draw(width) {
        this.clear()
        let basic_bar = this.basic_bar
        let progress_bar = this.progress_bar
        let progress_text = this.progress_text

        basic_bar.beginFill(0x828282, 1)
        basic_bar.drawRoundedRect(0, 0, width, 24, 12)
        basic_bar.endFill()
        basic_bar.filters = [new GlowFilter(25, 0, 1, 0x000000)]

        progress_bar.filters = [new AdvancedBloomFilter({ blur: 2 })]

        progress_text.anchor.set(0.5, 0.5)

        this.addChild(basic_bar)
        this.addChild(progress_bar)
        progress_text.position.set(this.width / 2, this.height / 2)
        this.addChild(progress_text)
    }

    clear() {
        this.basic_bar.clear()
        this.progress_bar.clear()
    }

    setProgress(percentage) {
        let progress_bar = this.progress_bar
        let basic_bar = this.basic_bar
        let progress_text = this.progress_text

        progress_bar.clear()
        progress_bar.beginFill(0xff9933, 1)
        progress_bar.drawRoundedRect(0, 0, percentage * basic_bar.width, 24, 12)
        progress_bar.endFill()
        progress_text.text = Math.round(percentage * 100) + '%'
    }
}
