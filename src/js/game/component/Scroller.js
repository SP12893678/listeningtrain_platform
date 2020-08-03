import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'

export default class Scroller extends PIXI.Container {
    constructor(width, height, radius, content, mask_height) {
        super()
        this.content = content
        this.scrollable_length = content.height - mask_height + 10
        this.container_init_y = content.position.y
        this.thumb_init_y = 2
        this.drawTrack(width, height, radius)
        this.drawThumb()
        this.setThumbEvent()
        this.setTrackEvent()
    }

    drawTrack(width, height, radius) {
        var track = new PIXI.Graphics()
        track.beginFill(0x828282, 1)
        track.drawRoundedRect(0, 0, width, height, radius)
        track.endFill()
        track.filters = [new GlowFilter(25, 0, 1, 0x000000)]
        this.addChild(track)
        this.track = track
    }

    drawThumb() {
        var thumb = new PIXI.Graphics()
        thumb.beginFill(0xffffff, 1)
        thumb.drawRoundedRect(0, 0, this.track.width - 4, this.track.height / 5, (this.track.width - 2) / 2)
        thumb.endFill()
        thumb.position.set(2, this.thumb_init_y)
        this.addChild(thumb)
        this.thumb = thumb
    }

    setThumbEvent() {
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

                    this.position.y = new_y < this.parent.thumb_init_y ? this.parent.thumb_init_y : new_y
                    this.parent.content.position.y =
                        new_y < this.parent.thumb_init_y
                            ? this.parent.container_init_y
                            : this.parent.container_init_y - ((new_y - 2) / (this.parent.track.height - this.height - 2 - 2)) * this.parent.scrollable_length

                    if (new_y < this.parent.thumb_init_y) return

                    var track_end = this.parent.track.height - this.height - 2
                    this.position.y = new_y > track_end ? track_end : new_y
                    this.parent.content.position.y =
                        new_y > track_end
                            ? this.parent.container_init_y - this.parent.scrollable_length
                            : this.parent.container_init_y - ((new_y - 2) / (this.parent.track.height - this.height - 2 - 2)) * this.parent.scrollable_length
                }
            },
        }

        this.thumb
            .on('mousedown', event.mousedown)
            .on('mouseup', event.mouseup)
            .on('mouseupoutside', event.mouseup)
            .on('mousemove', event.mousemove)
    }

    setTrackEvent() {
        this.track.interactive = true
        this.track.buttonMode = true
        this.track.click = (event) => {
            var new_y = event.data.getLocalPosition(this).y - this.thumb.height / 2
            this.thumb.position.y = new_y < this.thumb_init_y ? this.thumb_init_y : new_y
            this.content.position.y =
                new_y < this.thumb_init_y
                    ? this.container_init_y
                    : this.container_init_y - ((new_y - 2) / (this.track.height - this.thumb.height - 2 - 2)) * this.scrollable_length

            if (new_y < this.thumb_init_y) return
            var track_end = this.track.height - this.thumb.height - 2
            this.thumb.position.y = new_y > track_end ? track_end : new_y
            this.content.position.y =
                new_y > track_end
                    ? this.container_init_y - this.scrollable_length
                    : this.container_init_y - ((new_y - 2) / (this.track.height - this.thumb.height - 2 - 2)) * this.scrollable_length
        }
    }
}
