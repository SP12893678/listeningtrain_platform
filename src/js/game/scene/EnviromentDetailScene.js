import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import { Graphics, Container, Sprite } from 'pixi.js/lib/core'
import Config from '@/js/game/Config'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { apiManageEnviroment } from '@/js/api'

let resources = PIXI.loader.resources

export default class EnviromentDetailScene extends Scene {
    constructor() {
        super()
    }

    async init(id) {
        /**
         * 取得情境資料(包含物件)
         * 取得該情境之玩家學習狀況
         */
        await apiManageEnviroment({ type: 'get', amount: 'one', item: id }).then((res) => {
            this.data = {}
            this.data.environment = res.data
        })
        this.built()
    }

    built() {
        this.background = new Sprite()
        this.environment = new Container()

        let background = this.background
        background.texture = resources[ResourcesManager.background001].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)

        let environment = this.environment
        let image = new Sprite()
        image.texture = resources[this.data.environment.background_src].texture
        environment.addChild(image)

        this.addChild(this.background)
        this.addChild(this.environment)
    }
}
