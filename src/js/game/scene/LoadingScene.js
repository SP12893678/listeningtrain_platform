import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import ProgressBar from 'Component/ProgressBar'
import Tips from 'Component/Tips'
import LanguageChooser from '@/js/game/LanguageChooser'
import ScenesManager from '@/js/game/engine/ScenesManager'
import Events from '@/js/game/Events'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class LoadingScene extends Scene {
    constructor() {
        super()
        this.background = new Sprite()
        this.box = new Container()

        this.setBackground()

        let box = new PIXI.Graphics()
        box.beginFill(0x000000, 0.7)
        box.drawRoundedRect(0, 0, 1600 * 0.6, 200, 12)
        box.endFill()

        let tips = new Tips()

        let progress_bar = new ProgressBar(1600 * 0.8 * 0.6)

        let container = new PIXI.Container()
        container.addChild(box)
        container.addChild(tips)
        container.addChild(progress_bar)

        tips.position.set((container.width / 40) * 9, container.height / 3)
        progress_bar.position.set((container.width - progress_bar.width) / 2, container.height - progress_bar.height - 25)
        container.position.set((Config.screen.width - container.width) / 2, Config.screen.height - container.height - 20)
        this.addChild(container)

        this.progress_bar = progress_bar
        // let i = 0
        // let count = setInterval(() => {
        //     i += 0.01
        //     if (i >= 1) clearInterval(count)
        //     this.progress_bar.setProgress(i)
        // }, 1)

        // setTimeout(() => {
        //     console.log('go')
        //     LanguageChooser.select('english')
        //     ScenesManager.scenes = {}
        //     Events.emit('goto', { id: 'game_start' })
        // }, 5000)
    }

    init() {}

    setBackground() {
        let background = this.background
        background.texture = resources[ResourcesManager.create_role_bg].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setBox() {
        let box = this.box
        let background = new PIXI.Graphics()
        background.beginFill(0x000000, 0.7)
        background.drawRoundedRect(0, 0, Config.screen.width * 0.6, 200, 12)
        background.endFill()
    }

    update() {
        super.update()
    }
}
