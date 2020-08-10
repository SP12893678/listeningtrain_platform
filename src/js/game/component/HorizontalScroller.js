import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'

export default class HorizontalScroller extends PIXI.Container {
    constructor(radius = 10, controlled, container) {
        super()
        this.radius = radius
        this.controlled = controlled
        this.container = container
        this.controlled_init_x = controlled.position.x
        this.min_thumb = radius * 2 - 4
        this.ratio = 4
        this.doVerticalScroller(radius, controlled, container)
    }

    doVerticalScroller(radius, controlled, container) {
        this.track = this.drawTrack(container.width - 10, radius * 2, radius)
        let need_length = (controlled.width - container.width) / this.ratio
        let track_length = this.track.width - 2 - 2
        let thumb_width = need_length <= track_length - this.min_thumb ? track_length - need_length : this.min_thumb
        this.scroll_length = track_length - thumb_width
        this.thumb = this.drawThumb(thumb_width, this.min_thumb, radius - 2)

        this.thumb.interactive = true
        this.thumb.buttonMode = true

        var event = {
            mousedown(event) {
                this.data = event.data
                this.offset_x = this.data.getLocalPosition(this.parent).x - this.position._x
                this.dragging = true
            },
            mouseup() {
                this.dragging = false
                this.data = null
            },
            mousemove() {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent)
                    var new_x = newPosition.x - this.offset_x
                    new_x = new_x <= 0 ? 0 : new_x
                    new_x = new_x >= this.parent.scroll_length ? this.parent.scroll_length : new_x
                    this.position.x = new_x
                    let ratio = (this.parent.controlled.width - this.parent.container.width) / this.parent.scroll_length
                    this.parent.controlled.position.x = this.parent.controlled_init_x - new_x * ratio
                }
            },
        }

        this.thumb
            .on('mousedown', event.mousedown)
            .on('mouseup', event.mouseup)
            .on('mouseupoutside', event.mouseup)
            .on('mousemove', event.mousemove)

        this.addChild(this.track)
        this.addChild(this.thumb)
    }

    drawTrack(width, height, radius) {
        var track = new PIXI.Graphics()
        track.beginFill(0x828282, 1)
        track.drawRoundedRect(0, 0, width, height, radius)
        track.endFill()
        track.filters = [new GlowFilter(25, 0, 1, 0x000000)]
        return track
    }

    drawThumb(width, height, radius) {
        var thumb = new PIXI.Graphics()
        thumb.beginFill(0xffffff, 1)
        thumb.drawRoundedRect(2, 2, width, height, radius)
        thumb.endFill()
        return thumb
    }
}
