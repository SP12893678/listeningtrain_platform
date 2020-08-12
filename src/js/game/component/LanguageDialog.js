import * as PIXI from 'pixi.js'
import Config from '@/js/game/Config'
import Overlay from './overlay'
import GraphicsTool from 'Component/GraphicsTool'
import { Container, Graphics } from 'pixi.js/lib/core'
import { style6, style7 } from '@/js/game/engine/TextStyleManager'
import VerticalScroller from 'Component/VerticalScroller'

export default class LanguageDialog extends Overlay {
    constructor() {
        super()
        this.selected = 'chinese'
        this.background = new PIXI.Graphics()
        this.titlebar = new PIXI.Graphics()
        this.titletext = new PIXI.Text()
        this.selectorbox = new Container()
        this.btn_confirm = new Container()
        this.btn_cancel = new Container()
        this.setBackground()
        this.setTitle()
        this.setSelectBox()
        this.setButton()
    }

    setBackground() {
        let background = this.background
        background.beginFill(0xffe0d2, 1)
        background.drawRoundedRect(0, 0, Config.screen.width * 0.625, Config.screen.height * 0.625, 16)
        background.endFill()
        // background.position.set((Config.screen.width - background.width) / 2, (Config.screen.height - background.height) / 2)
        this.addChild(background)
    }

    setTitle() {
        let titlebar = this.titlebar
        let mask = new PIXI.Sprite()
        let getGradient = () => {
            let canvas = document.createElement('canvas')
            canvas.width = Config.screen.width * 0.625
            let ctx = canvas.getContext('2d')
            let gradient = ctx.createLinearGradient(0, 0, 0, 50)
            gradient.addColorStop(0, '#FF9F31')
            gradient.addColorStop(1, '#FFC561')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, Config.screen.width * 0.625, 50)
            return PIXI.Texture.fromCanvas(canvas)
        }
        mask.texture = getGradient()
        GraphicsTool.setPaintingContainer(titlebar)
        titlebar.beginFill(0x000000, 1)
        GraphicsTool.drawRoundedRect(Config.screen.width * 0.625, 50, 16, 16, 0, 0)
        titlebar.endFill()
        mask.mask = titlebar

        let titletext = this.titletext
        titletext.text = '語言選擇'
        titletext.style = style6
        titletext.anchor.set(0.5, 0.5)
        titletext.position.set(titlebar.width / 2, titlebar.height / 2)

        this.addChild(mask)
        this.addChild(titlebar)
        this.addChild(titletext)
    }

    setSelectBox() {
        let box = this.selectorbox
        let background = new PIXI.Graphics()
        background.beginFill(0xffffff, 0.5)
        background.drawRoundedRect(0, 0, Config.screen.width * 0.625 * 0.8, Config.screen.height * 0.625 * 0.6, 12)
        background.endFill()

        let mask = new PIXI.Graphics()
        mask.beginFill(0xffffff, 0.5)
        mask.drawRoundedRect(0, 0, Config.screen.width * 0.625 * 0.8, Config.screen.height * 0.625 * 0.6, 12)
        mask.endFill()

        let languageList = new Container()
        languageList.mask = mask

        for (let index = 0; index < 10; index++) {
            let item = new Container()
            let selectedbg = new PIXI.Graphics()
            selectedbg.beginFill(0xff8a30, 0.0)
            selectedbg.drawRoundedRect(0, 0, Config.screen.width * 0.625 * 0.8, 60, 0)
            selectedbg.endFill()
            let text = new PIXI.Text('繁體中文')
            text.anchor.set(0.5, 0.5)
            text.position.set(selectedbg.width / 2, selectedbg.height / 2)

            item.addChild(selectedbg)
            item.addChild(text)
            item.position.set(0, index * 60)

            item.interactive = true
            item.buttonMode = true
            item.click = () => {
                selectedbg.clear()
                selectedbg.beginFill(0xff8a30, 0.3)
                selectedbg.drawRoundedRect(0, 0, Config.screen.width * 0.625 * 0.8, 60, 0)
                selectedbg.endFill()
            }
            languageList.addChild(item)
        }

        var v_scroller = new VerticalScroller(10, languageList, mask)
        v_scroller.position.set(background.position.x + background.width - 20 - 10, background.position.y + 5)

        box.addChild(background)
        box.position.set((this.background.width - box.width) / 2, 100)
        box.addChild(mask)
        box.addChild(languageList)
        box.addChild(v_scroller)
        this.addChild(box)
    }

    setButton() {
        let btn_confirm = this.btn_confirm
        let btn_cancel = this.btn_cancel
        let background = new PIXI.Sprite()
        let mask = new PIXI.Graphics()
        let text = new PIXI.Text('確定', style7)
        let getGradient = () => {
            let canvas = document.createElement('canvas')
            canvas.width = 180
            let ctx = canvas.getContext('2d')
            let gradient = ctx.createLinearGradient(0, 0, 0, 50)
            gradient.addColorStop(0, '#FF9F31')
            gradient.addColorStop(1, '#FFC561')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 180, 60)
            return PIXI.Texture.fromCanvas(canvas)
        }
        background.texture = getGradient()
        mask.beginFill(0x000000, 1)
        mask.drawRoundedRect(0, 0, 180, 60, 12)
        mask.endFill()
        background.mask = mask

        text.anchor.set(0.5, 0.5)
        text.position.set(mask.width / 2, mask.height / 2)

        btn_confirm.addChild(background)
        btn_confirm.addChild(mask)
        btn_confirm.addChild(text)

        btn_confirm.position.set(300, 475)
        this.addChild(btn_confirm)
    }

    confirm() {
        LanguageChooser.select(this.selected)
        ScenesManager.scenes = {}
        Events.emit('goto', { id: 'game_start' })
    }

    cancel() {
        this.visible = false
    }
}
