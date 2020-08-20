import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import { Graphics, Container, Sprite } from 'pixi.js/lib/core'
import Config from '@/js/game/Config'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { apiManageEnviroment, apiManageObject } from '@/js/api'
import { BlurFilter } from 'pixi.js/lib/filters'
import HorizontalScroller from '../component/HorizontalScroller'
import RadarChart from 'Component/RadarChart'
import RoundedButton from '../component/RoundedButton'

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

        let object_arr = this.data.environment.object.split(',')
        await apiManageObject({ type: 'get', amount: 'part', items: object_arr }).then((res) => {
            console.log(res.data)
            this.data.objects = res.data
        })

        this.built()
    }

    built() {
        this.background = new Sprite()
        this.environment = new Container()
        this.personal = new Container()

        let background = this.background
        background.texture = resources[ResourcesManager.background001].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)

        this.serEnvironmentArea()
        this.setPersonalArea()

        this.environment.position.set(100, 50)
        this.personal.position.set(800, 50)

        this.addChild(this.background)
        this.addChild(this.environment)
        this.addChild(this.personal)
    }

    serEnvironmentArea() {
        let environment = this.environment

        let background = new Graphics()
        background.beginFill(0x2dacdf, 1)
        background.drawRect(0, 0, 600, 790)
        background.endFill()

        let background_slash = new Sprite()
        background_slash.texture = resources[ResourcesManager.slash001].texture
        let scale = Math.max(600 / background_slash.width, 800 / background_slash.height)
        background_slash.scale.set(scale, scale)

        let image_container = new Container()

        let image_mask = new Graphics()
        image_mask.beginFill(0x000000, 1)
        image_mask.drawRoundedRect(0, 0, 450, 300, 16)
        image_mask.endFill()

        let image = new Sprite()
        image.texture = resources[this.data.environment.background_src].texture
        scale = Math.max(450 / image.width, 300 / image.height)
        image.scale.set(scale, scale)
        image.mask = image_mask

        image_container.addChild(image_mask)
        image_container.addChild(image)
        image_container.position.set(75, 50)

        // let object_title = new Text
        let objectList = new Container()
        let list_content = new Container()
        let list_mask = new Graphics()

        this.data.objects.forEach((object, index) => {
            let container = new Container()
            let background = new Graphics()
            background.beginFill(0xffffff, 0.5)
            background.drawRoundedRect(0, 0, 100, 100, 16)
            background.endFill()

            let item = new Sprite()
            item.texture = resources[object.pic_src].texture
            let scale = Math.min(80 / item.width, 80 / item.height)
            item.scale.set(scale, scale)
            item.position.set((100 - item.width) / 2, (100 - item.height) / 2)

            container.addChild(background)
            container.addChild(item)
            container.position.set(index * 120, 0)
            list_content.addChild(container)
        })

        list_content.mask = list_mask

        list_mask.beginFill(0x000000, 1)
        list_mask.drawRoundedRect(0, 0, 450, 100, 16)
        list_mask.endFill()

        objectList.addChild(list_content)
        objectList.addChild(list_mask)

        let scroller = new HorizontalScroller(10, list_content, list_mask)
        scroller.position.set(75, 750)

        objectList.position.set(75, 625)

        environment.addChild(background)
        environment.addChild(background_slash)
        environment.addChild(image_container)
        environment.addChild(objectList)
        environment.addChild(scroller)
    }

    setPersonalArea() {
        let personal = this.personal

        let background = new Graphics()
        background.beginFill(0x2dacdf, 1)
        background.drawRect(0, 0, 700, 790)
        background.endFill()

        let background_slash = new Sprite()
        background_slash.texture = resources[ResourcesManager.slash001].texture
        let scale = Math.max(700 / background_slash.width, 800 / background_slash.height)
        background_slash.scale.set(scale, scale)

        let learning_status_area = new Container()
        let labels = ['正確率', '完成度', '反應速度', '低頻辨識率', '高頻辨識率']
        let datasets = [
            {
                name: 'test',
                data: [100, 20, 60, 150, 90],
            },
        ]
        let radar = new RadarChart(labels, datasets)
        radar.position.set(radar.width / 2, radar.height / 2)
        learning_status_area.addChild(radar)

        let option_select_area = new Container()
        let btn_train_mode = new RoundedButton('訓練模式')
        let btn_practice_mode = new RoundedButton('練習模式')
        let btn_test_mode = new RoundedButton('測驗模式')

        btn_train_mode.position.set(0, 0)
        btn_practice_mode.position.set(0, 75)
        btn_test_mode.position.set(0, 150)

        option_select_area.addChild(btn_train_mode)
        option_select_area.addChild(btn_practice_mode)
        option_select_area.addChild(btn_test_mode)

        learning_status_area.position.set(0, 50)
        option_select_area.position.set(0, 450)

        personal.addChild(background)
        personal.addChild(background_slash)
        personal.addChild(learning_status_area)
        personal.addChild(option_select_area)
    }
}
