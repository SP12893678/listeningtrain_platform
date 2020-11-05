import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style14, style15 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Environment from '@/js/game/Environment'
import { OutlineFilter, ShockwaveFilter, GlowFilter } from 'pixi-filters'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import HorizontalScroller from 'Component/HorizontalScroller'
import { apiManageAudio, apiManageLearning } from '@/js/api'
import Sound from 'pixi-sound'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import trdescription from '@/js/game/traindescription'
import video from '@/js/game/video'
import * as dat from 'dat.gui'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

let resources = PIXI.loader.resources

export default class TrainModeScene extends Scene {
    constructor() {
        super()
        this.background = new PIXI.Graphics()
        this.cover = new PIXI.Graphics()
        this.screenCover = new PIXI.Graphics()
        this.environment_mask = new PIXI.Graphics()
        this.title = new Container()
        this.character = new character()
        this.environmentArea = new Container()
        this.objectList = new ObjectList()
        this.gearlocking = new GearLocking()
        this.trdescription = new trdescription()
        this.video = new video(0)
        this.btn_guide = new Button2(150, 70, ResourcesManager.help, '導覽')
        this.btn_guidestep = new Button2(150, 70, ResourcesManager.help, '下一步')
        this.btn_guideend = new Button2(150, 70, ResourcesManager.help, '完成')

        this.setBackground()
        this.setTitle()
        this.setCharacter()
    }

    async init(id) {
        /**新增探索資料 */
        let date = new Date()
        let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        apiManageLearning({ type: 'update', mode: 'train', enviro: id, action: 'new', time: time }).then(res => { console.log(res.data) })

        let environment = new TrainModeEnvironment()
        await environment.init(id)
        let scale = 1000 / environment.width
        environment.scale.set(scale, scale)


        let objectList = this.objectList
        objectList.objects = []
        environment.data.objects.forEach((object) => objectList.addListItem(object))
        objectList.position.set(500, 750)

        let scroller = new HorizontalScroller(10, objectList.list_content, objectList.list_mask)
        scroller.position.set(500, 860)

        let gearlocking = this.gearlocking
        gearlocking.filters = [new GlowFilter(30, 2.5, 20)]
        gearlocking.position.set(0, 0)

        environment.objects.forEach((object) => {
            object.update = () => {
                let { x, y } = object.position
                gearlocking.position.set(x - gearlocking.xxx / 2, y - gearlocking.yyy / 2)
                let objectList_object = objectList.objects.filter((o) => o.id == object.data.id)[0]
                objectList.selectListItem(objectList_object)

            }
        })

        objectList.objects.forEach((object) => {
            object.interactive = true
            object.buttonMode = true
            object.click = () => {
                let obj = environment.objects.filter((o) => o.data.id == object.id)[0]
                environment.objectClick(obj)
            }
        })

        let trdescription = this.trdescription
        trdescription.position.set(0, 0)

        let video = this.video
        video.position.set(0, 0)

        var { x, y } = environment.objects[1].position
        let screenCover = this.screenCover
        // screenCover.beginFill(0x000000, 0.5)
        // screenCover.drawRoundedRect(0, 0, 1000, 625)
        screenCover.beginFill(0x000000, 0.9)
            .drawPolygon(0, 0, 1000, 0, 1000, 625, 0, 625)
            .drawPolygon(x - 55, y - 55, x + 55, y - 55, x + 55, y + 55, x - 55, y + 55)
            .addHole();
        screenCover.endFill()
        screenCover.interactive = true
        screenCover.visible = false
        environment.addChild(screenCover)


        let cover = this.cover
        var { x, y } = environment.objects[4].position
        cover.beginFill(0xffffff, 0);
        cover.drawCircle(x, y, 110);
        cover.endFill();
        environment.addChild(cover)





        let environment_mask = this.environment_mask
        environment_mask.beginFill(0x000000, 0)
        environment_mask.drawRect(0, 0, 1000, 625)
        environment_mask.endFill()
        environment.addChild(environment_mask)

        environment.position.set(500, 100)
        environment.addChild(gearlocking)

        /* guide  */
        let guide = new PIXI.Text('請點選情境中的物件\n就能聽到聲音喔', style15)
        guide.position.set(120, 300)
        guide.visible = false

        let btn_guide = this.btn_guide
        btn_guide.pivot.set(btn_guide.btnWidth / 2, btn_guide.btnHeight / 2)
        btn_guide.position.set(250, 350)
        btn_guide.setBorder(0)
        btn_guide.setBackgroundColor('', 0)
        btn_guide.setText(style15)
        btn_guide.mouseover = function (mouseData) {
            btn_guide.scale.set(1.1)
        }
        btn_guide.mouseout = function (mouseData) {
            btn_guide.scale.set(1)
        }
        btn_guide.visible = true
        btn_guide.click = () => {

            btn_guide.visible = false
            guide.visible = true
            // environment.mask = cover
            screenCover.visible = true

            objectList.visible = false
            scroller.visible = false

            gsap.delayedCall(5, () => {
                btn_guidestep.visible = true
            })

        }

        let btn_guidestep = this.btn_guidestep
        btn_guidestep.pivot.set(btn_guidestep.btnWidth / 2, btn_guidestep.btnHeight / 2)
        btn_guidestep.position.set(250, 250)
        btn_guidestep.setBorder(0)
        btn_guidestep.setBackgroundColor('', 0)
        btn_guidestep.setText(style15)
        btn_guidestep.visible = false
        btn_guidestep.mouseover = function (mouseData) {
            btn_guidestep.scale.set(1.1)
        }
        btn_guidestep.mouseout = function (mouseData) {
            btn_guidestep.scale.set(1)
        }
        btn_guidestep.click = () => {

            btn_guidestep.visible = false
            environment.mask = environment_mask
            screenCover.visible = false
            objectList.visible = true
            scroller.visible = true
            environment.visible = false
            guide.setText('接下來點點看下面的表單\n一樣能聽到他的聲音喔')
            gsap.delayedCall(5, () => {
                btn_guideend.visible = true
            })
        }

        let btn_guideend = this.btn_guideend
        btn_guideend.pivot.set(btn_guideend.btnWidth / 2, btn_guideend.btnHeight / 2)
        btn_guideend.position.set(250, 250)
        btn_guideend.setBorder(0)
        btn_guideend.setBackgroundColor('', 0)
        btn_guideend.setText(style15)
        btn_guideend.visible = false
        btn_guideend.mouseover = function (mouseData) {
            btn_guideend.scale.set(1.1)
        }
        btn_guideend.mouseout = function (mouseData) {
            btn_guideend.scale.set(1)
        }
        btn_guideend.click = () => {
            environment.visible = true
            btn_guideend.visible = false
            btn_guide.visible = true
            guide.setText('請點選情境中的物件\n就能聽到聲音喔')

            guide.visible = false
        }
        /* guide end */


        this.addChild(environment)
        this.addChild(objectList)
        this.addChild(scroller)
        this.addChild(btn_guide)
        this.addChild(btn_guidestep)
        this.addChild(btn_guideend)
        this.addChild(guide)
        this.addChild(trdescription)
        this.addChild(video)
    }

    setBackground() {
        let background = this.background
        background.beginFill(0xff9300)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    setTitle() {

        let title = this.title
        /* titlePanel */
        let titlePanel = new PIXI.Graphics()
        let titleHeight = Config.screen.height * 0.08
        titlePanel.beginFill(0xf8ba00)
        titlePanel.drawRect(0, 0, Config.screen.width, titleHeight)
        titlePanel.drawCircle(60, 60, 60)
        title.addChild(titlePanel)
        /* goBack Button */
        let btn_goback = new Sprite(resources[ResourcesManager.goBack].texture)
        let scale = 100 / btn_goback.width
        btn_goback.scale.set(scale)
        btn_goback.anchor.set(0.5)
        btn_goback.interactive = true
        btn_goback.buttonMode = true
        btn_goback.position.set(60, 60)
        btn_goback.click = () => {
            Sound.stopAll()
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        }
        btn_goback.mouseover = function (mouseData) {
            btn_goback.scale.set(scale * 1.1)
            goBackText.scale.set(1.1)
        }
        btn_goback.mouseout = function (mouseData) {
            btn_goback.scale.set(scale)
            goBackText.scale.set(1)
        }
        title.addChild(btn_goback)
        /* goBack Text */
        let goBackText = new PIXI.Text('返回', style15)
        goBackText.anchor.set(0.5)
        goBackText.position.set(160, titleHeight / 2)
        title.addChild(goBackText)
        /* title Text */
        let titleText = new PIXI.Text('探索模式', style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width / 2, titleHeight / 2)
        title.addChild(titleText)
        /* help */

        let btn_help = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '說明')
        btn_help.pivot.set(150 / 2, titleHeight / 2)
        btn_help.position.set(Config.screen.width - 70, titleHeight / 2 + titleHeight * 0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('', 0)
        btn_help.setText(style15)
        btn_help.mouseover = function (mouseData) {
            btn_help.scale.set(1.1)
        }
        btn_help.mouseout = function (mouseData) {
            btn_help.scale.set(1)
        }
        btn_help.click = () => (this.trdescription.dialog.visible = !this.trdescription.dialog.visible)
        title.addChild(btn_help)
        /* video */
        let btn_video = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '影片導覽')
        btn_video.pivot.set(150 / 2, titleHeight / 2)
        btn_video.position.set(Config.screen.width - 230, titleHeight / 2 + titleHeight * 0.1)
        btn_video.setBorder(0)
        btn_video.setBackgroundColor('', 0)
        btn_video.setText(style15)
        btn_video.mouseover = function (mouseData) {
            btn_video.scale.set(1.1)
        }
        btn_video.mouseout = function (mouseData) {
            btn_video.scale.set(1)
        }
        btn_video.click = () => (this.video.dialog.visible = !this.video.dialog.visible)
        title.addChild(btn_video)


        this.addChild(title)
    }


    /* 建立角色 */
    async setCharacter() {
        /* Character */
        let character = this.character
        await character.check_if_has_data()
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
        armatureDisplay.position.set(250, 670)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        //this.armatureDisplay.animation.play('shakeHand',1);
    }


}

class TrainModeEnvironment extends Environment {
    async init(id) {
        await super.init(id)
        let audio_arr = this.data.objects.map((item) => item.sound_src)
        await apiManageAudio({ type: 'get', amount: 'part', items: audio_arr }).then((res) => {
            this.data.objects.forEach((object) => {
                object.audio = res.data.filter((audio) => audio.id == object.sound_src)[0]
            })
        })
        this.objects.forEach((object) => {
            object.interactive = true
            object.buttonMode = true
            object.mouseover = () => (object.filters = [new OutlineFilter(3, 0x99ff99)])
            object.mouseout = () => (object.filters = [new OutlineFilter(3, 0xf0aaee)])
            object.update = () => { }
            object.click = () => this.objectClick(object)
        })
    }

    objectClick(object) {
        Sound.stopAll()
        Sound.add(object.data.audio.audio_id, resources[object.data.audio.sound_src])
        Sound.play(object.data.audio.audio_id, {
            complete: () => {
                console.log('complete', object.data.audio.audio_id)
                let date = new Date()
                let item = {
                    enviro: this.data.environment.id,
                    id: object.data.id,
                    time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                };
                apiManageLearning({ type: 'update', mode: 'train', action: 'add', item: item }).then(res => { console.log(res.data) })
            }
        })
        object.update()
    }
}

class GearLocking extends Container {
    constructor() {
        super()
        this.circle_inside = new Sprite()
        this.circle_center = new Sprite()
        this.circle_outside = new Sprite()

        this.circle_inside.texture = resources[ResourcesManager.gear_inside].texture
        this.circle_center.texture = resources[ResourcesManager.gear_center].texture
        this.circle_outside.texture = resources[ResourcesManager.gear_outside].texture

        this.xxx = this.circle_outside.width
        this.yyy = this.circle_outside.height

        this.circle_inside.anchor.set(0.5, 0.5)
        this.circle_center.anchor.set(0.5, 0.5)
        this.circle_outside.anchor.set(0.5, 0.5)

        this.circle_inside.position.set(this.circle_outside.width / 2, this.circle_outside.height / 2)
        this.circle_center.position.set(this.circle_outside.width / 2, this.circle_outside.height / 2)
        this.circle_outside.position.set(this.circle_outside.width / 2, this.circle_outside.height / 2)

        this.addChild(this.circle_inside)
        this.addChild(this.circle_center)
        this.addChild(this.circle_outside)

        gsap.to(this.circle_inside, { pixi: { rotation: -360 }, duration: 4, repeat: -1, ease: 'Power2.easeOut' })
        gsap.to(this.circle_center, { pixi: { rotation: -360 }, duration: 4, repeat: -1, ease: 'Power2.easeOut' })
        gsap.to(this.circle_outside, { pixi: { rotation: 360 }, duration: 4, repeat: -1, ease: 'Power2.easeOut' })
    }
}

class ObjectList extends Container {
    constructor() {
        super()
        this.objects = []
        this.list_content = new Container()
        this.list_mask = new Graphics()
        this.list_mask.beginFill(0x000000, 1)
        this.list_mask.drawRoundedRect(0, 0, 1000, 120, 16)
        this.list_mask.endFill()

        this.list_content.mask = this.list_mask

        this.addChild(this.list_mask)
    }

    addListItem(data) {
        let list_content = this.list_content
        let list_item = new Container()

        let background = new Graphics()
        background.beginFill(0xffffff, 0.5)
        background.drawRoundedRect(0, 0, 100, 100, 12)
        background.endFill()

        let image = new Sprite()
        image.texture = resources[data.pic_src].texture
        let scale = Math.min(100 / image.width, 100 / image.height)
        image.scale.set(scale, scale)
        image.position.set((100 - image.width) / 2, (100 - image.height) / 2)

        list_item.addChild(background)
        list_item.addChild(image)
        list_item.position.set(this.objects.length * 120, 0)

        list_item.id = data.id
        list_item.background = background

        list_content.addChild(list_item)
        this.addChild(list_content)
        this.objects.push(list_item)
    }

    selectListItem(object) {
        this.objects.forEach((o) => {
            let background = o.background
            background.clear()
            background.beginFill(0xffffff, 0.5)
            background.drawRoundedRect(0, 0, 100, 100, 12)
            background.endFill()
        })

        let background = object.background
        background.clear()
        background.beginFill(0x1976d2, 1)
        background.drawRoundedRect(0, 0, 100, 100, 12)
        background.endFill()
    }
}
