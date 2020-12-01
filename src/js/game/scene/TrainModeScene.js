import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style14, style15 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Environment from '@/js/game/Environment'
import { OutlineFilter, GlowFilter } from 'pixi-filters'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import HorizontalScroller from 'Component/HorizontalScroller'
import { apiManageAudio, apiManageLearning } from '@/js/api'
import Sound from 'pixi-sound'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import trdescription from '@/js/game/traindescription'
import video from '@/js/game/video'
import * as Guide from '@/js/game/engine/GuideQueue'
import { Polygon } from 'pixi.js/lib/core/math'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const resources = PIXI.loader.resources

export default class TrainModeScene extends Scene {
    constructor () {
        super()
        this.background = new PIXI.Graphics()
        this.titleMenu = new TitleMenu()
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

    async init (id) {
        /** 新增探索資料 */
        const date = new Date()
        const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        apiManageLearning({ type: 'update', mode: 'train', enviro: id, action: 'new', time: time })

        const environment = new TrainModeEnvironment()
        await environment.init(id)
        const scale = 1000 / environment.width
        environment.scale.set(scale, scale)

        const objectList = this.objectList
        objectList.objects = []
        environment.data.objects.forEach((object) => objectList.addListItem(object))
        objectList.position.set(500, 750)

        const scroller = new HorizontalScroller(10, objectList.list_content, objectList.list_mask)
        scroller.position.set(500, 860)

        const gearlocking = this.gearlocking
        gearlocking.filters = [new GlowFilter(30, 2.5, 20)]
        gearlocking.position.set(0, 0)

        environment.objects.forEach((object) => {
            object.update = () => {
                const { x, y } = object.position
                gearlocking.position.set(x - gearlocking.xxx / 2, y - gearlocking.yyy / 2)
                const objectList_object = objectList.objects.filter((o) => o.id == object.data.id)[0]
                objectList.selectListItem(objectList_object)
            }
        })

        objectList.objects.forEach((object) => {
            object.interactive = true
            object.buttonMode = true
            object.click = () => {
                const obj = environment.objects.filter((o) => o.data.id == object.id)[0]
                environment.objectClick(obj)
            }
        })

        const trdescription = this.trdescription
        trdescription.position.set(0, 0)

        const video = this.video
        video.position.set(0, 0)

        const { x, y } = environment.objects[1].position
        const screenCover = this.screenCover
        // screenCover.beginFill(0x000000, 0.5)
        // screenCover.drawRoundedRect(0, 0, 1000, 625)
        screenCover.beginFill(0x000000, 0.9)
            .drawPolygon(0, 0, 1000, 0, 1000, 625, 0, 625)
            .drawPolygon(x - 55, y - 55, x + 55, y - 55, x + 55, y + 55, x - 55, y + 55)
            .addHole()
        screenCover.endFill()
        screenCover.interactive = true
        screenCover.visible = false
        environment.addChild(screenCover)

        // let cover = this.cover
        // var { x, y } = environment.objects[4].position
        // cover.beginFill(0xffffff, 0);
        // cover.drawCircle(x, y, 110);
        // cover.endFill();
        // environment.addChild(cover)

        const environment_mask = this.environment_mask
        environment_mask.beginFill(0x000000, 0)
        environment_mask.drawRect(0, 0, 1000, 625)
        environment_mask.endFill()
        environment.addChild(environment_mask)

        environment.position.set(500, 100)
        environment.addChild(gearlocking)

        /* guide  */
        const guide = new PIXI.Text('請點選情境中的物件\n就能聽到聲音喔', style15)
        guide.position.set(120, 300)
        guide.visible = false

        const btn_guide = this.btn_guide
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

        const btn_guidestep = this.btn_guidestep
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

        const btn_guideend = this.btn_guideend
        btn_guideend.pivot.set(btn_guideend.btnWidth / 2, btn_guideend.btnHeight / 2)
        btn_guideend.position.set(250, 250)
        btn_guideend.setBorder(0)
        btn_guideend.setBackgroundColor('', 0)
        btn_guideend.setText(style15)
        btn_guideend.visible = false
        btn_guideend.mouseover = () => btn_guideend.scale.set(1.1)

        btn_guideend.mouseout = () => btn_guideend.scale.set(1)

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

        const sprite = environment.objects[0]
        const sprite2 = this.objectList.objects[1]

        console.log(resources[sprite.data.audio.sound_src].sound)

        // const step1 = {
        //     area: () => {
        //         let global = sprite.parent.toGlobal(sprite.position)
        //         let { x, y } = global
        //         return new Polygon(x - 55, y - 55, x + 55, y - 55, x + 55, y + 55, x - 55, y + 55)
        //     },
        //     mission: () => {
        //         return new Promise((resolve, reject) => {

        //         })
        //     }
        // }

        // let global = sprite.parent.toGlobal(sprite.position)
        // var { x, y } = global
        // let area = new Polygon(x - 55, y - 55, x + 55, y - 55, x + 55, y + 55, x - 55, y + 55)
        // let testGuide = new Guide.ModeGuide(sprite, area, null, null)
        // this.addChild(testGuide)

        // var { x, y } = this.character.armatureDisplay.position
        // let chatBox = new Guide.ChatBox(300, 200)
        //     .addChat('點選箭頭指向的區域')
        //     .addChat('點擊物件列表中的一個物件')
        // chatBox.position.set(x - chatBox.width / 2, y - chatBox.height * 2.2)

        // let myGuide = new Guide.MyGuide(testGuide, chatBox)
        // global = sprite2.parent.toGlobal(sprite2.position)
        // var { x, y } = global
        // area = new Polygon(x, y, x + sprite2.width, y, x + sprite2.width, y + sprite2.height, x, y + sprite2.height)

        // let testGuide2 = new Guide.ModeGuide(sprite2, area, null, null)
        // this.addChild(testGuide2)

        // let myGuide2 = new Guide.MyGuide(testGuide2, chatBox)

        // this.addChild(this.character.armatureDisplay)
        // myGuide.play()
        //     .then(res => myGuide2.play())
        //     .then(res => {
        //         console.log('done2')
        //     })
        //     .catch(res => console.log('error'))
    }

    setBackground () {
        const background = this.background
        background.beginFill(0xff9300)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }

    setTitle () {
        const titleMenu = this.titleMenu
        titleMenu.goBackButton.click = () => {
            Sound.stopAll()
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        }
        titleMenu.HelpButton.click = () => (this.trdescription.dialog.visible = !this.trdescription.dialog.visible)
        titleMenu.VedioGudieButton.click = () => (this.video.dialog.visible = !this.video.dialog.visible)
        this.addChild(titleMenu)
    }

    /* 建立角色 */
    async setCharacter () {
        /* Character */
        const character = this.character
        await character.check_if_has_data()
        const factory = character.factory
        const armatureDisplay = character.armatureDisplay
        armatureDisplay.position.set(250, 670)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        // this.armatureDisplay.animation.play('shakeHand',1);
    }
}

class TrainModeEnvironment extends Environment {
    async init (id) {
        await super.init(id)
        const audio_arr = this.data.objects.map((item) => item.sound_src)
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

    objectClick (object) {
        Sound.stopAll()
        Sound.add(object.data.audio.audio_id, resources[object.data.audio.sound_src])
        Sound.play(object.data.audio.audio_id, {
            complete: () => {
                const date = new Date()
                const item = {
                    enviro: this.data.environment.name,
                    id: object.data.id,
                    object_name: object.data.name,
                    time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                }
                apiManageLearning({ type: 'update', mode: 'train', action: 'add', item: item })
            }
        })
        object.update()
    }
}

class GearLocking extends Container {
    constructor () {
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
    constructor () {
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

    addListItem (data) {
        const list_content = this.list_content
        const list_item = new Container()

        const background = new Graphics()
        background.beginFill(0xffffff, 0.5)
        background.drawRoundedRect(0, 0, 100, 100, 12)
        background.endFill()

        const image = new Sprite()
        image.texture = resources[data.pic_src].texture
        const scale = Math.min(100 / image.width, 100 / image.height)
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

    selectListItem (object) {
        this.objects.forEach((o) => {
            const background = o.background
            background.clear()
            background.beginFill(0xffffff, 0.5)
            background.drawRoundedRect(0, 0, 100, 100, 12)
            background.endFill()
        })

        const background = object.background
        background.clear()
        background.beginFill(0x1976d2, 1)
        background.drawRoundedRect(0, 0, 100, 100, 12)
        background.endFill()
    }
}

class TitleMenu extends Container {
    constructor () {
        super()
        this.titleHeight = Config.screen.height * 0.08
        this.background = new Graphics()
        this.goBackButton = new Sprite()
        this.goBackText = new PIXI.Text('返回', style15)
        this.titleText = new PIXI.Text('探索模式', style14)
        this.HelpButton = new Button2(150, this.titleHeight * 0.8, ResourcesManager.help, '說明')
        this.VedioGudieButton = new Button2(150, this.titleHeight * 0.8, ResourcesManager.help, '影片導覽')
        this.setBackground()
        this.setGoBackButton()
        this.setTitle()
        this.setVideoGuideButton()
        this.setHelpButton()
    }

    setBackground () {
        const background = this.background
        background.beginFill(0xf8ba00)
        background.drawRect(0, 0, Config.screen.width, this.titleHeight)
        background.drawCircle(60, 60, 60)
        this.addChild(background)
    }

    setGoBackButton () {
        const titleHeight = this.titleHeight
        const btn_goback = this.goBackButton
        const goBackText = this.goBackText

        btn_goback.texture = resources[ResourcesManager.goBack].texture
        const scale = 100 / btn_goback.width
        btn_goback.scale.set(scale)
        btn_goback.anchor.set(0.5)
        btn_goback.interactive = true
        btn_goback.buttonMode = true
        btn_goback.mouseover = () => {
            btn_goback.scale.set(scale * 1.1)
            goBackText.scale.set(1.1)
        }
        btn_goback.mouseout = () => {
            btn_goback.scale.set(scale)
            goBackText.scale.set(1)
        }
        btn_goback.position.set(60, 60)
        this.addChild(btn_goback)

        goBackText.anchor.set(0.5)
        goBackText.position.set(160, titleHeight / 2)
        this.addChild(goBackText)
    }

    setTitle () {
        const titleHeight = this.titleHeight
        const titleText = this.titleText
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width / 2, titleHeight / 2)
        this.addChild(titleText)
    }

    setHelpButton () {
        const titleHeight = this.titleHeight
        const btn_help = this.HelpButton
        btn_help.pivot.set(75, titleHeight / 2)
        btn_help.position.set(Config.screen.width - 70, titleHeight / 2 + titleHeight * 0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('', 0)
        btn_help.setText(style15)
        btn_help.mouseover = () => btn_help.scale.set(1.1)
        btn_help.mouseout = () => btn_help.scale.set(1)
        this.addChild(btn_help)
    }

    setVideoGuideButton () {
        const titleHeight = this.titleHeight
        const btn_video = this.VedioGudieButton
        btn_video.pivot.set(75, titleHeight / 2)
        btn_video.position.set(Config.screen.width - 230, titleHeight / 2 + titleHeight * 0.1)
        btn_video.setBorder(0)
        btn_video.setBackgroundColor('', 0)
        btn_video.setText(style15)
        btn_video.mouseover = () => btn_video.scale.set(1.1)
        btn_video.mouseout = () => btn_video.scale.set(1)
        this.addChild(btn_video)
    }
}
