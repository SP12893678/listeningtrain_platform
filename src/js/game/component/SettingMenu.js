import * as PIXI from 'pixi.js'
import Overlay from 'Component/overlay'
import ResourcesManager from '@/js/game/engine/ResourcesManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class SettingMenu extends Overlay {
    constructor() {
        super()

        var background = new Sprite(resources[ResourcesManager.menu].texture)
        var scale = 800 / background.width
        background.scale.set(scale, scale)
        background.position.set(0, 0)
        this.addChild(background)
        this.background = background
    }
}
