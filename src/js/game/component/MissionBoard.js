import * as PIXI from 'pixi.js'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import RoundedButton from 'Component/button3'
import VerticalScroller from 'Component/VerticalScroller'
import Overlay from './overlay'
import Config from '@/js/game/Config'
import { style7 } from '@/js/game/engine/TextStyleManager'

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
        this.missionBtn = new RoundedButton(300, 100, '每日任務')
        this.missionList = new Container()
        // this.scroller = new VerticalScroller()

        this.setBackground()
        this.setMissionButton()
    }

    setBackground() {
        let background = this.background
        background.beginFill(0x77aaff)
        background.drawRoundedRect(0, 0, 1280, 720)
        this.addChild(background)
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
