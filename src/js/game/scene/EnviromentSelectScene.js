import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import { Graphics, Container } from 'pixi.js/lib/core'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import GraphicsTool from 'Component/GraphicsTool'
import RoundedButton from 'Component/RoundedButton'
import { apiManageEnviroment } from '@/js/api'
import Text from 'pixi.js/lib/core/text/Text'
import Sprite from 'pixi.js/lib/core/sprites/Sprite'
import ScenesManager from '@/js/game/engine/ScenesManager'
import EnviromentDetailScene from 'Scene/EnviromentDetailScene'
import { style6 } from '@/js/game/engine/TextStyleManager'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

let resources = PIXI.loader.resources

export default class EnviromentSelectScene extends Scene {
    constructor() {
        super()
        this.environments = []
        this.current_environments = []
        this.background = new Graphics()
        this.background.beginFill(0xffffff, 1)
        this.background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        this.background.endFill()
        this.addChild(this.background)

        this.environmentlist = new EnviromentListBoard()

        this.setCategoryList()
        this.setEnviromentList()

        this.goBackArea = new Container()
        this.setgoBackArea()
    }

    async init() {
        let environments = this.environments
        await apiManageEnviroment({ type: 'get', amount: 'all' }).then((res) => {
            environments = res.data
            console.log(environments)
        })
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

        let text = new Text('返回', style6)
        text.position.set(152, 197)

        goBackArea.addChild(background)
        goBackArea.addChild(icon)
        goBackArea.addChild(text)
        goBackArea.position.set(-113, -113)

        goBackArea.interactive = true
        goBackArea.buttonMode = true

        goBackArea.mouseover = () => gsap.to(goBackArea, { pixi: { scale: 1.2 }, duration: 0.5 })
        goBackArea.mouseout = () => gsap.to(goBackArea, { pixi: { scale: 1 }, duration: 0.5 })
        goBackArea.click = () => ScenesManager.goToScene('game_main')
        this.addChild(goBackArea)
    }

    async setCategoryList() {
        let environments = this.environments
        let current_environments = this.current_environments
        let environmentlist = this.environmentlist

        await apiManageEnviroment({ type: 'get', amount: 'all' }).then((res) => {
            environments = res.data
            environments.forEach((environment) => (environment.category = environment.category.split(';')))
        })

        let listboard = new ListBoard()
        listboard.getListItems().forEach((item) => {
            item.click = () => {
                listboard.getListItems().forEach((i) => i.drawBackground(0x29d4ff))
                item.drawBackground(0x4b70fa)
                current_environments = environments.filter((environment) => {
                    return environment.category.indexOf(item.type) != -1
                })
                environmentlist.showCurrentLists(current_environments)
                environmentlist.scroller.refresh()
            }
        })

        listboard.position.set(240, 50)
        this.addChild(listboard)
    }

    setEnviromentList() {
        let listboard = this.environmentlist
        listboard.position.set(240 + 350, 50)
        this.addChild(listboard)
    }
}

class ListBoard extends Container {
    constructor() {
        super()
        this.background = new Graphics()
        this.title = new Text('情境類別選單')
        this.list = new List()
        this.scroller = new VerticalScroller(10, this.list.content, this.list.content_mask)

        this.setBackground()
        this.setTitle()

        this.list.position.set(0, 150)
        this.scroller.position.set(315, 150)

        this.addChild(this.list)
        this.addChild(this.scroller)
    }

    setBackground() {
        let background = new Graphics()
        background.beginFill(0xc8d5ff, 1)
        GraphicsTool.setPaintingContainer(background)
        GraphicsTool.drawRoundedRect(350, 800, 12, 0, 12, 0)
        background.endFill()

        background.lineStyle(2, 0xa7b8ff, 1)
        background.moveTo(0, 100)
        background.lineTo(350, 100)
        background.endFill()
        this.addChild(background)
    }

    setTitle() {
        let title = this.title
        let style = {}
        Object.assign(style, style6)
        style.fill = 0x4d53ff
        title.style = style
        title.anchor.set(0.5, 0.5)
        title.position.set(350 / 2, 50)
        this.addChild(title)
    }

    getListItems() {
        return this.list.items
    }
}

class List extends Container {
    constructor() {
        super()
        this.environments = []
        this.current_environments = []
        this.categories = Config.text.enviroment.category
        this.items = []

        this.content = new Container()
        this.content_mask = new Graphics()
        this.content_mask.beginFill(0x000000, 1)
        this.content_mask.drawRoundedRect(0, 0, 300, 600, 12)
        this.content_mask.endFill()

        this.setItems()
        this.content.mask = this.content_mask
        this.addChild(this.content)
        this.addChild(this.content_mask)
    }

    setItems() {
        let categories = this.categories
        let content = this.content
        let items = this.items

        categories.forEach((category, index) => {
            let item = new RoundedButton(category.text)
            item.type = category.name
            item.position.set((300 - item.width) / 2, index * 100)
            content.addChild(item)
            items.push(item)
        })
    }
}

class EnviromentListBoard extends Container {
    constructor() {
        super()
        this.background = new Graphics()
        this.list = new EnviromentList()
        this.scroller = new VerticalScroller(10, this.list.content, this.list.content_mask)

        this.setBackground()

        this.list.position.set(30, 30)
        this.scroller.position.set(750, 30)

        this.addChild(this.list)
        this.addChild(this.scroller)
    }

    setBackground() {
        let background = new Graphics()
        background.beginFill(0x8898ff, 1)
        GraphicsTool.setPaintingContainer(background)
        GraphicsTool.drawRoundedRect(800, 800, 0, 12, 0, 12)
        background.endFill()
        this.addChild(background)
    }

    showCurrentLists(current_environments) {
        let list = this.list
        list.content.removeChild(...list.content.children)
        current_environments.forEach((enviroment) => list.addListitem(enviroment))
    }
}

class EnviromentList extends Container {
    constructor() {
        super()
        this.content = new Container()
        this.content_mask = new Graphics()
        this.content_mask.beginFill(0x000000, 1)
        this.content_mask.drawRoundedRect(0, 0, 700, 750, 12)
        this.content_mask.endFill()

        this.content.mask = this.content_mask
        this.addChild(this.content)
        this.addChild(this.content_mask)
    }

    addListitem(data) {
        let content = this.content
        let content_mask = this.content_mask

        let item = new EnviromentListItem(data)
        item.position.set(0, 0)
        content.addChild(item)
    }
}

class EnviromentListItem extends Container {
    constructor(data) {
        super()
        this.data = data
        this.background = new Graphics()
        this.thumbnail_container = new Container()
        this.profile_container = new Container()

        let background = this.background
        background.beginFill(0xffffff, 0.5)
        background.drawRoundedRect(0, 0, 340, 340, 16)
        background.endFill()
        this.addChild(background)

        this.setThumbnail()
        this.setProfile()
    }

    setThumbnail() {
        let data = this.data
        let thumbnail_container = this.thumbnail_container

        let thumbnail_mask = new Graphics()
        thumbnail_mask.beginFill(0x000000, 1)
        thumbnail_mask.drawRoundedRect(0, 0, 320, 200, 16)
        thumbnail_mask.endFill()

        let thumbnail = new Sprite()
        thumbnail.texture = resources[data.background_src].texture
        let scale = Math.max(320 / thumbnail.width, 200 / thumbnail.height)
        thumbnail.scale.set(scale, scale)
        thumbnail.mask = thumbnail_mask

        thumbnail_container.addChild(thumbnail)
        thumbnail_container.addChild(thumbnail_mask)
        thumbnail_container.position.set(10, 10)
        this.addChild(thumbnail_container)
    }

    setProfile() {
        let data = this.data
        let profile_container = this.profile_container
        let border = new Graphics()
        border.lineStyle(2, 0xae5eff, 1)
        GraphicsTool.setPaintingContainer(border)
        GraphicsTool.drawRoundedRect(320, 100, 12, 50, 12, 50)
        border.endFill()

        border.lineStyle(2, 0xbd7dfe, 0.3)
        border.moveTo(8, 56)
        border.lineTo(200, 56)
        border.endFill()

        let style = {}
        Object.assign(style, style6)
        style.fontSize = 40
        style.fill = 0xbd7dfe
        let title = new Text(data.name, style)
        title.position.set(8, 8)

        let btn_go = new Sprite()
        btn_go.texture = resources[ResourcesManager.circle_go001].texture
        btn_go.anchor.set(0.5, 0.5)
        btn_go.position.set(320 - 105 + btn_go.width / 2, btn_go.height / 2 - 5)
        btn_go.interactive = true
        btn_go.buttonMode = true
        btn_go.mouseover = () => gsap.to(btn_go, { pixi: { rotation: 360 }, duration: 0.5 })
        btn_go.mouseout = () => gsap.to(btn_go, { pixi: { rotation: -360 }, duration: 0.5 })
        btn_go.click = async () => {
            ScenesManager.createScene('environment_detail', new EnviromentDetailScene())
            await ScenesManager.scenes['environment_detail'].init(data.id)
            ScenesManager.goToScene('environment_detail')
            ScenesManager.scenes['environment_detail'].alpha = 0
            gsap.to(ScenesManager.scenes['environment_detail'], { pixi: { alpha: 1 }, duration: 1 })
        }

        let style2 = {}
        Object.assign(style2, style6)
        style2.fontSize = 24
        style2.fill = 0xbd7dfe
        let title_complete = new Text('完成度', style2)
        title_complete.position.set(8, 65)

        let box_complete = new Graphics()
        box_complete.lineStyle(2, 0xbd7dfe, 1)
        box_complete.drawRect(0, 0, 100, 20)
        box_complete.endFill()
        box_complete.beginFill(0xbd7dfe, 1)
        box_complete.drawRect(0, 0, 20, 20)
        box_complete.endFill()
        box_complete.position.set(title_complete.position.x + title_complete.width + 10, 68)

        profile_container.addChild(border)
        profile_container.addChild(title)
        profile_container.addChild(btn_go)
        profile_container.addChild(title_complete)
        profile_container.addChild(box_complete)

        profile_container.position.set(10, 225)
        this.addChild(profile_container)
    }
}
