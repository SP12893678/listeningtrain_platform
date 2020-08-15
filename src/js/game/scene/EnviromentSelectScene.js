import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import { Graphics, Container } from 'pixi.js/lib/core'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import GraphicsTool from 'Component/GraphicsTool'

let resources = PIXI.loader.resources

export default class EnviromentSelectScene extends Scene {
    constructor() {
        super()
        this.environments = []
        this.current_environments = []
        this.background = new PIXI.Sprite()
        this.title = new Container()
        // this.categoryList = {
        //     container: new Container(),
        //     background: new Graphics(),
        //     scroller: new VerticalScroller(),
        // }
        // this.enviromentList = {
        //     container: new Container(),
        //     background: new Graphics(),
        //     scroller: new VerticalScroller(10, this.enviromentList.list, area),
        //     list: new Container(),
        //     area: new Graphics(),
        // }
        this.btn_goback = new Button(150, 50, 20)

        this.setBackground()
        // this.setTitle()
        this.setCategoryList()
        this.setGoback()
    }

    init() {
        // this.
    }

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
        button.click = () => {
            Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
        }
        button.position.set(0, 100)
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

    setCategoryList() {
        let environments = this.environments
        let listbox = new Container()
        let current_environments = this.current_environments
        let categories = Config.text.enviroment.category
        categories.forEach((category) => {
            let list = new Container()
            let item = new Text(category.text)

            list.click = () => {
                current_environments = environments.filter((environment) => {
                    return environment.category.indexOf(category.name)
                })
            }
        })
    }
}
