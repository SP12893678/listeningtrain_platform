import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import { Graphics, Container } from 'pixi.js/lib/core'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import GraphicsTool from 'Component/GraphicsTool'
import RoundedButton from 'Component/RoundedButton'
import { apiManageEnviroment } from '@/js/api'
import Text from 'pixi.js/lib/core/text/Text'
import Sprite from 'pixi.js/lib/core/sprites/Sprite'
import { Rectangle } from 'pixi.js/lib/core/math'
import ScenesManager from '@/js/game/engine/ScenesManager'
import EnviromentDetailScene from 'Scene/EnviromentDetailScene'

let resources = PIXI.loader.resources

export default class EnviromentSelectScene extends Scene {
    constructor() {
        super()
        this.environments = []
        this.current_environments = []
        this.background = new PIXI.Sprite()
        this.title = new Container()
        this.btn_goback = new RoundedButton('返回')
        this.environmentlist = new EnviromentListBoard()

        // this.init()
        this.setBackground()
        // this.setTitle()
        this.setCategoryList()
        this.setEnviromentList()
        this.setGoback()
    }

    async init() {
        let environments = this.environments
        await apiManageEnviroment({ type: 'get', amount: 'all' }).then((res) => {
            environments = res.data
            console.log(environments)
        })
    }

    // getEnvironments(data) {
    //     apiManageEnviroment({ type: 'get', amount: 'all' }).then((res) => {
    //         data = res.data
    //     })
    // }

    setBackground() {
        let background = this.background
        background.texture = resources[ResourcesManager.create_role_bg].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setGoback() {
        let button = this.btn_goback
        button.text.text = '返回'
        button.click = () => Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
        button.position.set(0, 50)
        this.addChild(button)
    }

    setTitle() {
        let title = this.title
        let background = new Graphics()
        background.beginFill(0x000000, 0.7)
        background.drawRoundedRect(0, 0, 500, 120, 12)
        background.endFill()

        title.addChild(background)
        this.addChild(title)
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

        listboard.position.set(100, 100)
        this.addChild(listboard)
    }

    setEnviromentList() {
        let listboard = this.environmentlist
        listboard.position.set(600, 100)
        this.addChild(listboard)
    }
}

class ListBoard extends Container {
    constructor() {
        super()
        this.background = this.setBackground()
        this.list = new List()
        this.scroller = new VerticalScroller(10, this.list.content, this.list.content_mask)

        this.background.position.set(0, 0)
        this.list.position.set(50, 50)
        this.scroller.position.set(350, 50)

        this.addChild(this.background)
        this.addChild(this.list)
        this.addChild(this.scroller)
    }

    setBackground() {
        let background = new Graphics()
        background.beginFill(0xff9191, 1)
        background.drawRoundedRect(0, 0, 400, 700, 12)
        background.endFill()
        return background
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
        this.content_mask.drawRoundedRect(0, 0, 300, 500, 12)
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
        this.background = this.setBackground()
        this.list = new EnviromentList()
        this.scroller = new VerticalScroller(10, this.list.content, this.list.content_mask)

        this.background.position.set(0, 0)
        this.list.position.set(50, 50)
        this.scroller.position.set(750, 50)

        this.addChild(this.background)
        this.addChild(this.list)
        this.addChild(this.scroller)
    }

    setBackground() {
        let background = new Graphics()
        background.beginFill(0xff9191, 1)
        background.drawRoundedRect(0, 0, 800, 700, 12)
        background.endFill()
        return background
    }

    showCurrentLists(current_environments) {
        let list = this.list
        let remove_arr = []
        remove_arr.push(...list.content.children)
        remove_arr.forEach((children) => list.content.removeChild(children))
        current_environments.forEach((enviroment) => list.addListitem(enviroment))
    }
}

class EnviromentList extends Container {
    constructor() {
        super()
        this.content = new Container()
        this.content_mask = new Graphics()
        this.content_mask.beginFill(0x000000, 1)
        this.content_mask.drawRoundedRect(0, 0, 600, 600, 12)
        this.content_mask.endFill()

        this.content.mask = this.content_mask
        this.addChild(this.content)
        this.addChild(this.content_mask)
    }

    addListitem(data) {
        let content = this.content
        let content_mask = this.content_mask

        let item = new EnviromentListItem(data)
        item.position.set((content_mask.width - item.width) / 2, content.children.length * 150)
        content.addChild(item)
    }
}

class EnviromentListItem extends Container {
    constructor(data) {
        super()
        this.data = data
        this.background = new Graphics()
        this.thumbnail = new Sprite()
        this.text_title = new Text()
        this.text_depiction = new Text()
        this.btn_Goto = new Container()
        this.setGotoButton()

        let background = this.background
        background.beginFill(0xffffff, 1)
        background.drawRoundedRect(0, 0, 600, 100, 16)
        background.endFill()

        let thumbnail = this.thumbnail
        thumbnail.texture = resources[data.background_src].texture
        let scale = 80 / thumbnail.height
        thumbnail.scale.set(scale, scale)

        let text_title = this.text_title
        text_title.text = data.name

        thumbnail.position.set(10, 10)
        text_title.position.set(150, 10)
        this.btn_Goto.position.set(450, 0)

        this.addChild(background)
        this.addChild(thumbnail)
        this.addChild(text_title)
        this.addChild(this.btn_Goto)
    }

    setGotoButton() {
        let button = this.btn_Goto
        let background = new Graphics()
        background.beginFill(0xc9c9c9, 1)
        GraphicsTool.setPaintingContainer(background)
        GraphicsTool.drawRoundedRect(150, 100, 0, 16, 0, 16)
        background.endFill()

        let text = new Text('前往')
        text.anchor.set(0.5, 0.5)
        text.position.set(background.width / 2, background.height / 2)

        button.addChild(background)
        button.addChild(text)
        button.interactive = true
        button.buttonMode = true
        button.click = () => {
            ScenesManager.createScene('environment_detail', new EnviromentDetailScene())
            ScenesManager.scenes['environment_detail'].init(this.data.id)
            ScenesManager.goToScene('environment_detail')
        }
    }
}
