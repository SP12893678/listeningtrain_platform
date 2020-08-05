import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import ScenesManager from '@/js/game/engine/ScenesManager'
import Scroller from 'Component/Scroller'
import GraphicsTool from 'Component/GraphicsTool'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameStartScene extends Scene {
    constructor() {
        super()
        this.interactive = true
        this.buttonMode = true
        this.click = () => {
            Events.emit('goto', { id: 'create_role', animate: 'fadeIn' })
        }
        this.setBackground()
        this.setButton()
        this.setScrollableBoard()

        var rect = new PIXI.Graphics()
        GraphicsTool.setPaintingContainer(rect)
        rect.beginFill(0x000000, 1)
        GraphicsTool.drawRoundedRect(100, 100, 25, 25, 25, 25)
        rect.endFill()
        rect.position.set(100, 100)
        this.addChild(rect)

        var radius1 = Math.round(Math.random() * 50)
        var radius2 = Math.round(Math.random() * 50)
        var radius3 = Math.round(Math.random() * 50)
        var radius4 = Math.round(Math.random() * 50)
        let count = 0
        let direct = true
        this.onUpdate(() => {
            count += direct ? 0.01 : -0.01
            direct = count > 1 || count < 0 ? !direct : direct
            count = count > 1 ? 1 : count
            count = count < 0 ? 0 : count
            rect.clear()
            rect.beginFill(0x000000, 1)
            GraphicsTool.drawRoundedRect(100, 100, radius1 * count, radius2 * count, radius3 * count, radius4 * count)
            rect.endFill()
        })
    }

    setBackground() {
        var background = new Sprite(resources[ResourcesManager.create_role_bg].texture)
        var scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.position.set(100, 400)
        button.click = () => {
            console.log(132)
            // Events.emit('goto', { id: 'create_role', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    setScrollableBoard() {
        var board = new PIXI.Graphics()
        board.beginFill(0xffffff, 0.5)
        board.drawRoundedRect(0, 0, 500, 300, 16)
        board.endFill()
        board.position.set(500, 200)

        var container = new Container()
        container.position.set(500, 200)

        for (let index = 0; index < 30; index++) {
            var rectangle = new PIXI.Graphics()
            var color = Math.random() * 0xff0000
            rectangle.beginFill(color, 1)
            rectangle.drawRoundedRect(0, 0, 50, 50, 10)
            rectangle.endFill()
            rectangle.position.set(50, index * 100)
            container.addChild(rectangle)
        }

        var mask = new PIXI.Graphics()
        mask.beginFill(0xffffff, 0.5)
        mask.drawRoundedRect(0, 0, 500, 300, 16)
        mask.endFill()
        mask.position.set(500, 200)

        container.mask = mask
        this.addChild(mask)
        this.addChild(board)
        this.board = board
        this.addChild(container)

        var scroller = new Scroller(20, board.height - 10, 10, container, board.height)
        scroller.position.set(board.position.x + board.width - 20 - 10, board.position.y + 5)
        this.addChild(scroller)
    }

    update() {
        super.update()
    }
}
