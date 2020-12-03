import * as PIXI from 'pixi.js'
import { Container, Sprite, Graphics } from 'pixi.js/lib/core'
import { apiManageEnviroment, apiManageObject } from '@/js/api'
import { OutlineFilter } from 'pixi-filters'

export default class Environment extends Container {
    constructor () {
        super()
        this.data = {}
        this.background = new Sprite()
        this.objects = []

        const environment_mask = new Graphics()
        environment_mask.beginFill(0x000000, 1)
        environment_mask.drawRect(0, 0, 1000, 625)
        environment_mask.endFill()

        this.mask = environment_mask
        this.addChild(environment_mask)
    }

    async init (id) {
        this.data = {}
        this.removeChild(...this.objects)
        await apiManageEnviroment({ type: 'get', amount: 'one', item: id }).then((res) => (this.data.environment = res.data))
        const object_arr = this.data.environment.object.split(',')
        await apiManageObject({ type: 'get', amount: 'part', items: object_arr }).then((res) => (this.data.objects = res.data))
        this.drawBackground()
        this.data.objects.forEach((object) => this.drawObject(object))
    }

    drawBackground () {
        const environment = this.data.environment
        const background = this.background
        background.texture = PIXI.loader.resources[environment.background_src].texture
        const scale = 1000 / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    drawObject (data) {
        const object = new Sprite()
        object.texture = PIXI.loader.resources[data.pic_src].texture
        // let scale = data.size / object.width
        object.scale.set(data.scale)
        object.anchor.set(0.5, 0.5)
        const [x, y] = data.coordinate.split(',')
        object.position.set(x * 1 + object.width / 2, y * 1 + object.height / 2)

        object.filters = [new OutlineFilter(3, 0xf0aaee)]
        this.addChild(object)
        object.data = data
        this.objects.push(object)
    }
}
