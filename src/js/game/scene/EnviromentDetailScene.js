import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import Config from '@/js/game/Config'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { apiManageEnviroment, apiManageObject } from '@/js/api'
import { BlurFilter } from 'pixi.js/lib/filters'
import HorizontalScroller from '../component/HorizontalScroller'
import RadarChart from 'Component/RadarChart'
import RoundedButton from '../component/RoundedButton'
import { style18 } from '@/js/game/engine/TextStyleManager'
import ScenesManager from '@/js/game/engine/ScenesManager'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import Events from '@/js/game/Events'
import TrainModeScene from 'Scene/TrainModeScene'
import PracticeModeScene from 'Scene/PracticeModeScene'
import TestModeScene from 'Scene/TestModeScene'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

let resources = PIXI.loader.resources

export default class EnviromentDetailScene extends Scene {
    constructor() {
        super()
        this.background = new Graphics()
        this.background.beginFill(0xffffff, 1)
        this.background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        this.background.endFill()
        this.addChild(this.background)

        this.wave = new Sprite()
        this.wave.texture = resources[ResourcesManager.fluid_shape003].texture
        this.wave.position.set(0, 826)
        this.addChild(this.wave)

        this.goBackArea = new Container()
        this.setgoBackArea()

        this.environmentArea = new Container()
        this.gamemodeArea = new Container()
    }

    async init(id) {
        this.environmentArea.removeChild(...this.environmentArea.children)
        this.gamemodeArea.removeChild(...this.gamemodeArea.children)
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
        this.setEnvironmentArea()
        this.setGameModeArea()
    }

    setgoBackArea() {
        let goBackArea = this.goBackArea
        let background = new Sprite()
        background.texture = resources[ResourcesManager.fluid_shape002].texture

        let icon = new Sprite()
        icon.texture = resources[ResourcesManager.undo001].texture
        let scale = 56 / icon.width
        icon.scale.set(scale, scale)
        icon.position.set(152, 140)

        let text = new Text('返回', style18)
        text.position.set(152, 197)

        goBackArea.addChild(background)
        goBackArea.addChild(icon)
        goBackArea.addChild(text)
        goBackArea.position.set(-113, -113)

        goBackArea.interactive = true
        goBackArea.buttonMode = true

        goBackArea.mouseover = () => gsap.to(goBackArea, { pixi: { scale: 1.2 }, duration: 0.5 })
        goBackArea.mouseout = () => gsap.to(goBackArea, { pixi: { scale: 1 }, duration: 0.5 })
        goBackArea.click = () => ScenesManager.goToScene('enviro_select')
        this.addChild(goBackArea)
    }

    setEnvironmentArea() {
        let environmentArea = this.environmentArea

        let background = new Sprite()
        background.texture = resources[ResourcesManager.fluid_shape001].texture

        let image_container = new Container()
        let image_mask = new Graphics()
        image_mask.beginFill(0x000000, 1)
        image_mask.drawRoundedRect(0, 0, 450, 280, 16)
        image_mask.endFill()

        let image = new Sprite()
        image.texture = resources[this.data.environment.background_src].texture
        let scale = 450 / image.width
        image.scale.set(scale, scale)
        image.mask = image_mask

        image_container.addChild(image_mask)
        image_container.addChild(image)
        image_container.position.set(136, 48)

        let objectList = new Container()
        let list_content = new Container()
        let list_mask = new Graphics()

        this.data.objects.forEach((object, index) => {
            let container = new Container()
            let background = new Graphics()
            background.beginFill(0xffffff, 0.5)
            background.drawRoundedRect(0, 0, 75, 75, 12)
            background.endFill()

            let item = new Sprite()
            item.texture = resources[object.pic_src].texture
            let scale = Math.min(75 / item.width, 75 / item.height)
            item.scale.set(scale, scale)
            item.position.set((75 - item.width) / 2, (75 - item.height) / 2)

            container.addChild(background)
            container.addChild(item)
            container.position.set(index * 87, 0)
            list_content.addChild(container)
        })

        list_content.mask = list_mask

        list_mask.beginFill(0x000000, 1)
        list_mask.drawRoundedRect(0, 0, 450, 100, 16)
        list_mask.endFill()

        objectList.addChild(list_content)
        objectList.addChild(list_mask)

        let scroller = new HorizontalScroller(10, list_content, list_mask)
        scroller.position.set(136, 444)
        objectList.position.set(136, 358)

        let labels = ['正確率', '完成度', '反應速度', '低頻辨識率', '高頻辨識率']
        let datasets = [
            {
                name: 'test',
                data: [100, 20, 60, 150, 90],
            },
        ]
        let radar = new RadarChart(labels, datasets)
        radar.position.set(radar.width / 2 + 800, radar.height / 2 + 100)
        radar.barLabel.position.set(-350, 320)

        environmentArea.addChild(background)
        environmentArea.addChild(image_container)
        environmentArea.addChild(objectList)
        environmentArea.addChild(scroller)
        environmentArea.addChild(radar)

        environmentArea.position.set(148, 0)
        this.addChild(environmentArea)
    }

    setGameModeArea() {
        let gamemodeArea = this.gamemodeArea
        let btn_train_mode = new SlimeButton('訓練模式')
        btn_train_mode.scale.set(0.7, 0.7)
        btn_train_mode.click = () => {
            ScenesManager.scenes['train_mode'] = null
            ScenesManager.createScene('train_mode', new TrainModeScene())
            ScenesManager.scenes['train_mode'].init(this.data.environment.id)
            ScenesManager.goToScene('train_mode')
        }
        let btn_practice_mode = new SlimeButton('練習模式', 'red')
        btn_practice_mode.scale.set(0.7, 0.7)
        btn_practice_mode.click = () => {
            ScenesManager.scenes['practice_mode'] = null
            ScenesManager.createScene('practice_mode', new PracticeModeScene())
            ScenesManager.scenes['practice_mode'].init(this.data.environment.id)
            ScenesManager.goToScene('practice_mode')
        }

        let btn_test_mode = new SlimeButton('測驗模式', 'blue')
        btn_test_mode.scale.set(0.7, 0.7)
        btn_test_mode.click = () => {
            ScenesManager.scenes['test_mode'] = null
            ScenesManager.createScene('test_mode', new TestModeScene())
            ScenesManager.scenes['test_mode'].init(this.data.environment.id)
            ScenesManager.goToScene('test_mode')
        }

        btn_train_mode.position.set(0, 0)
        btn_practice_mode.position.set(btn_train_mode.position.x + btn_train_mode.width, 0)
        btn_test_mode.position.set(btn_practice_mode.position.x + btn_practice_mode.width, 0)

        gamemodeArea.addChild(btn_train_mode)
        gamemodeArea.addChild(btn_practice_mode)
        gamemodeArea.addChild(btn_test_mode)

        gamemodeArea.position.set(195, 555)
        this.addChild(gamemodeArea)
    }
}

class SlimeButton extends Container {
    constructor(text, color = 'green') {
        super()
        let image = {
            green: {
                background: ResourcesManager.slime_green,
                tooth: ResourcesManager.slime_tooth_green,
            },
            red: {
                background: ResourcesManager.slime_red,
                tooth: ResourcesManager.slime_tooth_red,
            },
            blue: {
                background: ResourcesManager.slime_blue,
                tooth: ResourcesManager.slime_tooth_blue,
            },
        }
        this.background = new Sprite()
        this.background.texture = resources[image[color].background].texture
        let style = {}
        Object.assign(style, style18)
        this.text = new Text(text, style)
        this.tooth = new Sprite()
        this.tooth.texture = resources[image[color].tooth].texture
        this.tooth.alpha = 0

        this.text.position.set(186, 330)
        this.tooth.position.set(126, 316)

        this.addChild(this.background)
        this.addChild(this.text)
        this.addChild(this.tooth)

        this.interactive = true
        this.buttonMode = true
        this.mouseover = () => {
            let tl = gsap.timeline({ duration: 0.2 })
            tl.to(this.text, { pixi: { positionY: 319 }, duration: 0.4 })
            tl.to(this.tooth, { pixi: { alpha: 1 }, duration: 0.2 })
        }
        this.mouseout = () => {
            let tl = gsap.timeline({ duration: 0.2 })
            tl.to(this.text, { pixi: { positionY: 330 }, duration: 0.4 })
            tl.to(this.tooth, { pixi: { alpha: 0 }, duration: 0.2 })
        }
    }
}
