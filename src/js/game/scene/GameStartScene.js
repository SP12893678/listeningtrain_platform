import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import { apiManageRoleClothes } from '@/js/api'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameStartScene extends Scene {
    constructor() {
        super()
        this.background = new Sprite()
        this.button = new Button(150, 50, 20)
        this.interactive = true
        this.buttonMode = true
        this.click = () => this.gotoNextScene()
        this.setBackground()
        this.setButton()
    }

    setBackground() {
        let background = this.background
        background.texture = resources[ResourcesManager.create_role_bg].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        let button = this.button
        button.position.set((Config.screen.width - button.width) / 2, 750)
        button.click = () => this.gotoNextScene()
        this.addChild(button)
    }

    async gotoNextScene() {
        await apiManageRoleClothes({ type: 'get', name: 'Mary' })
            .then((res) => {
                console.log('clothing_data', res.data)
                let scene = res.data.length != 0 ? 'game_main' : 'create_role'
                Events.emit('goto', { id: scene, animate: 'fadeIn' })
            })
            .catch((error) => {
                console.error(error)
            })
    }
}
