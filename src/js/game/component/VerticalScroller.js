import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'

export default class VerticalScroller extends PIXI.Container {
    constructor(radius = 10, controlled, container) {
        super()
        this.radius = radius
        this.controlled = controlled
        this.container = container
        this.controlled_init_y = controlled.position.y
        this.min_thumb = radius * 2 - 4
        this.ratio = 4
        this.doVerticalScroller(radius, controlled, container)
    }

    doVerticalScroller(radius, controlled, container) {
        this.track = this.drawTrack(radius * 2, container.height - 10, radius)
        let need_length = (controlled.height - container.height) / this.ratio
        let track_length = this.track.height - 2 - 2
        let thumb_height = need_length <= track_length - this.min_thumb ? track_length - need_length : this.min_thumb
        this.scroll_length = track_length - thumb_height
        this.thumb = this.drawThumb(this.min_thumb, thumb_height, radius - 2)

        this.thumb.interactive = true
        this.thumb.buttonMode = true

        var event = {
            mousedown(event) {
                this.data = event.data
                this.offset_y = this.data.getLocalPosition(this.parent).y - this.position._y
                this.dragging = true
            },
            mouseup() {
                this.dragging = false
                this.data = null
            },
            mousemove() {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent)
                    var new_y = newPosition.y - this.offset_y
                    new_y = new_y <= 0 ? 0 : new_y
                    new_y = new_y >= this.parent.scroll_length ? this.parent.scroll_length : new_y
                    this.position.y = new_y
                    let ratio = (this.parent.controlled.height - this.parent.container.height) / this.parent.scroll_length
                    this.parent.controlled.position.y = this.parent.controlled_init_y - new_y * ratio
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
