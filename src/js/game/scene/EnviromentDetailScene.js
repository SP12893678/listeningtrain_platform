import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import Config from '@/js/game/Config'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { apiManageEnviroment, apiManageObject, apiManageLearning } from '@/js/api'
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
import ScoreCaculate from '@/js/game/exam/ScoreCaculate'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const resources = PIXI.loader.resources

export default class EnviromentDetailScene extends Scene {
    constructor () {
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

    async init (id) {
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

        const object_arr = this.data.environment.object.split(',')
        await apiManageObject({ type: 'get', amount: 'part', items: object_arr }).then((res) => {
            console.log(res.data)
            this.data.objects = res.data
        })

        /** 取得資料庫測驗資料並計算學習平均成績 */
        this.average_score_data = []
        const scroeSystem = new ScoreCaculate()
        await scroeSystem.getExamData()
        if (scroeSystem.hasExamData(this.data.environment.id)) { this.average_score_data = scroeSystem.getAverageScoreData(this.data.environment.id) }

        this.built()
    }

    built () {
        this.setEnvironmentArea()
        this.setGameModeArea()
    }

    setgoBackArea () {
        const goBackArea = this.goBackArea
        const background = new Sprite()
        background.texture = resources[ResourcesManager.fluid_shape002].texture

        const icon = new Sprite()
        icon.texture = resources[ResourcesManager.undo001].texture
        const scale = 56 / icon.width
        icon.scale.set(scale, scale)
        icon.position.set(152, 140)

        const text = new Text('返回', style18)
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

    setEnvironmentArea () {
        const environmentArea = this.environmentArea

        const background = new Sprite()
        background.texture = resources[ResourcesManager.fluid_shape001].texture

        const image_container = new Container()
        const image_mask = new Graphics()
        image_mask.beginFill(0x000000, 1)
        image_mask.drawRoundedRect(0, 0, 450, 280, 16)
        image_mask.endFill()

        const image = new Sprite()
        image.texture = resources[this.data.environment.background_src].texture
        const scale = 450 / image.width
        image.scale.set(scale, scale)
        image.mask = image_mask

        image_container.addChild(image_mask)
        image_container.addChild(image)
        image_container.position.set(136, 48)

        const objectList = new Container()
        const list_content = new Container()
        const list_mask = new Graphics()

        this.data.objects.forEach((object, index) => {
            const container = new Container()
            const background = new Graphics()
            background.beginFill(0xffffff, 0.5)
            background.drawRoundedRect(0, 0, 75, 75, 12)
            background.endFill()

            const item = new Sprite()
            item.texture = resources[object.pic_src].texture
            const scale = Math.min(75 / item.width, 75 / item.height)
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

        const scroller = new HorizontalScroller(10, list_content, list_mask)
        scroller.position.set(136, 444)
        objectList.position.set(136, 358)

        const labels = ['正確率', '反應\n速度', '  聲音頻率<300\n的正確率', '  聲音頻率>6000\n的正確率', '完成度']
        const datasets = []
        const radar = new RadarChart(labels, datasets)
        if (this.average_score_data.length != 0) radar.addChart('上一次平均學習成績', this.average_score_data)
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

    setGameModeArea () {
        const gamemodeArea = this.gamemodeArea
        const btn_train_mode = new SlimeButton('探索模式')
        btn_train_mode.scale.set(0.7, 0.7)
        btn_train_mode.click = () => {
            Events.emit('loading')
            ScenesManager.scenes.train_mode = null
            ScenesManager.createScene('train_mode', new TrainModeScene())
            ScenesManager.scenes.train_mode.init(this.data.environment.id)
            ScenesManager.goToScene('train_mode')
            ScenesManager.scenes.train_mode.alpha = 0
            gsap.to(ScenesManager.scenes.train_mode, { pixi: { alpha: 1 }, duration: 1 })
        }
        const btn_practice_mode = new SlimeButton('練習模式', 'red')
        btn_practice_mode.scale.set(0.7, 0.7)
        btn_practice_mode.click = () => {
            Events.emit('loading')
            ScenesManager.scenes.practice_mode = null
            ScenesManager.createScene('practice_mode', new PracticeModeScene())
            ScenesManager.scenes.practice_mode.init(this.data.environment.id)
            ScenesManager.goToScene('practice_mode')
            ScenesManager.scenes.practice_mode.alpha = 0
            gsap.to(ScenesManager.scenes.practice_mode, { pixi: { alpha: 1 }, duration: 1 })
        }

        const btn_test_mode = new SlimeButton('測驗模式', 'blue')
        btn_test_mode.scale.set(0.7, 0.7)
        btn_test_mode.click = () => {
            Events.emit('loading')
            ScenesManager.scenes.test_mode = null
            ScenesManager.createScene('test_mode', new TestModeScene())
            ScenesManager.scenes.test_mode.init(this.data.environment.id)
            ScenesManager.goToScene('test_mode')
            ScenesManager.scenes.test_mode.alpha = 0
            gsap.to(ScenesManager.scenes.test_mode, { pixi: { alpha: 1 }, duration: 1 })
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
    constructor (text, color = 'green') {
        super()
        const image = {
            green: {
                background: ResourcesManager.slime_green,
                tooth: ResourcesManager.slime_tooth_green
            },
            red: {
                background: ResourcesManager.slime_red,
                tooth: ResourcesManager.slime_tooth_red
            },
            blue: {
                background: ResourcesManager.slime_blue,
                tooth: ResourcesManager.slime_tooth_blue
            }
        }
        this.background = new Sprite()
        this.background.texture = resources[image[color].background].texture
        const style = {}
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
            const tl = gsap.timeline({ duration: 0.2 })
            tl.to(this.text, { pixi: { positionY: 319 }, duration: 0.4 })
            tl.to(this.tooth, { pixi: { alpha: 1 }, duration: 0.2 })
        }
        this.mouseout = () => {
            const tl = gsap.timeline({ duration: 0.2 })
            tl.to(this.text, { pixi: { positionY: 330 }, duration: 0.4 })
            tl.to(this.tooth, { pixi: { alpha: 0 }, duration: 0.2 })
        }
    }
}
