import * as PIXI from 'pixi.js'
import Scene from './Scene'
import Config from '@/js/game/Config'

class ScenesManager {
    constructor() {
        this.scenes = {}
        this.currentScene = null
        this.renderer = null
    }

    create() {
        if (this.renderer) return this

        this.renderer = new PIXI.autoDetectRenderer({
            view: document.getElementById('app'),
            width: Config.screen.width,
            height: Config.screen.height,
        })
        this.renderer.autoResize = true
        this._rescale()
        window.addEventListener('resize', this._rescale.bind(this), false)

        this.loop()
        return this
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this))

        if (!this.currentScene || this.currentScene.isPaused()) return
        this.currentScene.update()
        this.renderer.render(this.currentScene)
    }

    createScene(id, myScene = new Scene()) {
        if (this.scenes[id]) return undefined

        var scene = myScene
        this.scenes[id] = scene
        return scene
    }

    goToScene(id) {
        if (this.scenes[id]) {
            if (this.currentScene) this.currentScene.pause()
            this.currentScene = this.scenes[id]
            this.currentScene.resume()
            return true
        }
        return false
    }

    _rescale() {
        this.ratio = Math.min(window.innerWidth / Config.screen.width, window.innerHeight / Config.screen.height)
        this.width = Config.screen.width * this.ratio
        this.height = Config.screen.height * this.ratio
        this.renderer.view.style.width = this.width + 'px'
        this.renderer.view.style.height = this.height + 'px'
    }
}

export default new ScenesManager()
