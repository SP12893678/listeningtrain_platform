import * as PIXI from 'pixi.js'
import { Container, Sprite } from 'pixi.js/lib/core'
import { apiManageEnviroment, apiManageObject } from '@/js/api'
import { OutlineFilter } from 'pixi-filters'

export default class Environment extends Container {
    constructor() {
        super()
        this.data = {}
        this.background = new Sprite()
        this.objects = []
    }

    async init(id) {
        this.data = {}
        this.removeChild(...this.objects)
        await apiManageEnviroment({ type: 'get', amount: 'one', item: id }).then((res) => (this.data.environment = res.data))
        let object_arr = this.data.environment.object.split(',')
        await apiManageObject({ type: 'get', amount: 'part', items: object_arr }).then((res) => (this.data.objects = res.data))
        this.drawBackground()
        this.data.objects.forEach((object) => this.drawObject(object))
    }

    drawBackground() {
        let environment = this.data.environment
        let background = this.background
        background.texture = PIXI.loader.resources[environment.background_src].texture
        let scale = 1000 / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    drawObject(data) {
        let object = new Sprite()
        object.texture = PIXI.loader.resources[data.pic_src].texture
        let scale = data.size / object.width
        object.scale.set(scale, scale)
        let [x, y] = data.coordinate.split(',')
        object.position.set(x, y)

        object.filters = [new OutlineFilter(3, 0xf0aaee)]
        this.addChild(object)
        object.data = data
        this.objects.push(object)
    }
}
