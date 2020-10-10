import * as PIXI from 'pixi.js'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import RoundedButton from 'Component/button3'
import VerticalScroller from 'Component/VerticalScroller'
import Overlay from './overlay'
import Config from '@/js/game/Config'
import { style7, style1 } from '@/js/game/engine/TextStyleManager'
import GraphicsTool from 'Component/GraphicsTool'
import { OutlineFilter, ShockwaveFilter, GlowFilter } from 'pixi-filters'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class MissionBoardDialog extends Overlay {
    constructor() {
        super()
        this.missionBoard = new MissionBoard()
        this.missionBoard.position.set(
            (Config.screen.width - this.missionBoard.width) / 2,
            (Config.screen.height - this.missionBoard.height) / 2
        )
        this.addChild(this.missionBoard)
    }

    async init() {}

    show() {
        this.visible = true
    }
}

class MissionBoard extends Container {
    constructor() {
        super()
        this.background = new Graphics()
        this.closeBtn = new Container()
        this.missionBtn = new RoundedButton(300, 100, '每日任務')
        this.missionList = new Container()
        // this.scroller = new VerticalScroller()

        this.setBackground()
        this.setCloseButton()
        this.setMissionButton()
    }

    setBackground() {
        let background = this.background
        background.beginFill(0x77aaff)
        background.drawRoundedRect(0, 0, 1280, 720, 24)
        this.addChild(background)
    }

    setCloseButton() {
        let closeBtn = this.closeBtn
        let background = new Graphics()
        background.beginFill(0xff8d8d, 1)
        GraphicsTool.setPaintingContainer(background)
        GraphicsTool.drawRoundedRect(120, 54, 0, 24, 36, 0)
        background.endFill()
        closeBtn.addChild(background)

        let text = new Text(style1)
        text.text = '關閉'
        text.anchor.set(0.5, 0.5)
        text.position.set(closeBtn.width / 2, closeBtn.height / 2)
        closeBtn.addChild(text)

        closeBtn.position.set(1280 - closeBtn.width, 0)
        closeBtn.interactive = true
        closeBtn.buttonMode = true
        closeBtn.click = () => (this.parent.visible = false)
        this.addChild(closeBtn)
    }

    setMissionButton() {
        let missionBtn = this.missionBtn
        missionBtn.setBorder(0)
        missionBtn.setBackgroundColor(0xffffff, 0.5)
        missionBtn.setText(style7)
        missionBtn.position.set(50, 100)
        this.addChild(missionBtn)
    }
}

class MissionList extends Container {
    constructor() {
        this.content = new Container()
        this.content_mask = new Graphics()
        this.content_mask.beginFill(0x000000, 1)
        this.content_mask.drawRoundedRect(0, 0, 850, 650, 12)
        this.content_mask.endFill()

        this.content.mask = this.content_mask
        this.addChild(this.content)
        this.addChild(this.content_mask)
    }

    addListitem(data) {
        let content = this.content
        let content_mask = this.content_mask

        let item = new MissionListItem(data)
        item.position.set(0, 0)
        content.addChild(item)
    }
}

class MissionListItem extends Container {
    constructor(data) {
        super()
    }
}
