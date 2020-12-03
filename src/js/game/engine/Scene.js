import * as PIXI from 'pixi.js'

export default class Scene extends PIXI.Container {
    constructor (background) {
        super(background)
        this.paused = false
        this.updateCB = function () {}
    }

    onUpdate (updateCB) {
        this.updateCB = updateCB
    }

    update () {
        this.updateCB()
    }

    pause () {
        this.paused = true
    }

    resume () {
        this.paused = false
    }

    isPaused () {
        return this.paused
    }
}
