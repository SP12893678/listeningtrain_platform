import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Button from 'Component/button'
import VerticalScroller from 'Component/VerticalScroller'
import HorizontalScroller from 'Component/HorizontalScroller'
import GraphicsTool from 'Component/GraphicsTool'
import RadarChart from 'Component/RadarChart'
import LanguageDialog from 'Component/LanguageDialog'

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
            // Events.emit('goto', { id: 'create_role', animate: 'fadeIn' })
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

        // let path = []
        // let radius = 50
        // let piDouble = Math.PI * 2
        // let side = 5
        // let degree = -Math.PI / 2
        // for (var i = 0; i < side; degree = degree + piDouble / side) {
        //     path.push({ x: radius * Math.cos(degree), y: radius * Math.sin(degree) })
        //     i++
        // }
        // console.log(path)
        // var poly = new PIXI.Graphics()
        // poly.lineStyle(4, 0xffd900, 1)
        // poly.moveTo(path[0].x, path[0].y)
        // path.forEach((point) => {
        //     poly.lineTo(point.x, point.y)
        // })
        // poly.closePath()
        // poly.endFill()
        // poly.position.set(100, 100)
        // this.addChild(poly)
        // let labels = [
        //     { name: '完成度', min: 0, max: 1 },
        //     { name: '正確率', min: 0, max: 1 },
        //     { name: '反應速度', min: 0, max: 1 },
        //     { name: '低頻辨識率', min: 0, max: 1 },
        //     { name: '高頻辨識率', min: 0, max: 1 },
        // ]
        let labels = ['完成度', '正確率', '反應速度', '低頻辨識率', '高頻辨識率']
        let datasets = [
            { name: '上一次', data: [50, 10, 75, 150, 100] },
            { name: '本次', data: [100, 70, 150, 80, 30] },
        ]

        var chart = new RadarChart(labels, datasets)
        chart.position.set(800, 700)
        this.addChild(chart)
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
            let languageDialog = new LanguageDialog()
            this.addChild(languageDialog)
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

        for (let index = 0; index < 10; index++) {
            var rectangle = new PIXI.Graphics()
            var color = Math.random() * 0xff0000
            rectangle.beginFill(color, 1)
            rectangle.drawRoundedRect(0, 0, 50, 50, 10)
            rectangle.endFill()
            rectangle.position.set(50, index * 100)
            container.addChild(rectangle)
        }

        for (let index = 0; index < 10; index++) {
            var rectangle = new PIXI.Graphics()
            var color = Math.random() * 0xff0000
            rectangle.beginFill(color, 1)
            rectangle.drawRoundedRect(0, 0, 50, 50, 10)
            rectangle.endFill()
            rectangle.position.set(index * 100, 50)
            container.addChild(rectangle)
        }

        var mask = new PIXI.Graphics()
        mask.beginFill(0xffffff, 0.5)
        mask.drawRoundedRect(0, 0, 460, 260, 16)
        mask.endFill()
        mask.position.set(500, 200)

        container.mask = mask
        this.addChild(mask)
        this.addChild(board)
        this.board = board
        this.addChild(container)

        var v_scroller = new VerticalScroller(10, container, mask)
        v_scroller.position.set(board.position.x + board.width - 20 - 10, board.position.y + 5 + 10)
        this.addChild(v_scroller)

        var h_scroller = new HorizontalScroller(10, container, mask)
        h_scroller.position.set(board.position.x + 5 + 10, board.position.y + board.height - 20 - 10)
        this.addChild(h_scroller)

        board.interactive = true
        board.buttonMode = true
    }

    update() {
        super.update()
    }
}
