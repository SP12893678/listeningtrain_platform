import * as PIXI from 'pixi.js'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import RoundedButton from 'Component/button3'
import VerticalScroller from 'Component/VerticalScroller'
import Overlay from './overlay'
import Config from '@/js/game/Config'
import { style1,style7, style23,style22 } from '@/js/game/engine/TextStyleManager'
import GraphicsTool from 'Component/GraphicsTool'
import { OutlineFilter, ShockwaveFilter, GlowFilter,DropShadowFilter } from 'pixi-filters'
import { apiManageMission } from "@/js/api";
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
let resources = PIXI.loader.resources

export default class MissionBoardDialog extends Overlay {
    constructor() {
        super()
        this.missions = []
        this.missionBoard = new MissionBoard()
        this.missionBoard.position.set(
            (Config.screen.width - this.missionBoard.width) / 2,
            (Config.screen.height - this.missionBoard.height) / 2
        )
        this.addChild(this.missionBoard)
    }

    async init() {
        this.missions = []
        this.missionBoard = new MissionBoard()
        this.missionBoard.position.set(
            (Config.screen.width - this.missionBoard.width) / 2,
            (Config.screen.height - this.missionBoard.height) / 2
        )
        this.addChild(this.missionBoard)
        await apiManageMission({type:'get',amount:'all'}).then(res=>{
            this.missions = res.data
            this.missions.forEach(mission=>{
                mission.required = JSON.parse(mission.required)
                mission.rewards = JSON.parse(mission.rewards)
                this.missionBoard.missionList.addListitem(mission)
            })
            console.log('mission',this.missions)
        })
    }

    async show() {
        await this.init()
        this.visible = true
    }
}

class MissionBoard extends Container {
    constructor() {
        super()
        this.background = new Graphics()
        this.closeBtn = new Container()
        this.missionBtn = new RoundedButton(300, 100, '每日任務')
        this.missionBtn2 = new RoundedButton(300, 100, '成長任務')
        this.missionList = new MissionList()
        // this.scroller = new VerticalScroller()

        this.setBackground()
        this.setCloseButton()
        this.setMissionButton()
        this.setMissionList()
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
        missionBtn.setText(style23)
        missionBtn.click = ()=>{
            this.missionList.content.removeChildren()
            let missions = this.parent.missions.filter(mission => mission.type == '每日任務')
            missions.forEach(mission=> this.missionList.addListitem(mission))
        }
        missionBtn.position.set(50, 100)
        this.addChild(missionBtn)

        let missionBtn2 = this.missionBtn2
        missionBtn2.setBorder(0)
        missionBtn2.setBackgroundColor(0xffffff, 0.5)
        missionBtn2.setText(style23)
        missionBtn2.click = ()=>{
            this.missionList.content.removeChildren()
            let missions = this.parent.missions.filter(mission => mission.type == '成長任務')
            missions.forEach(mission=> this.missionList.addListitem(mission))
        }

        missionBtn2.position.set(50, 225)
        this.addChild(missionBtn2)
    }

    setMissionList(){
        let missionList = this.missionList
        missionList.position.set(400,100)
        this.addChild(missionList)
    }
}

class MissionList extends Container {
    constructor() {
        super()
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
        item.position.set(0, (content.children.length) * 150)
        console.log(content.children.length)
        content.addChild(item)
    }
}

class MissionListItem extends Container {
    constructor(data) {
        super()
        this.mission = data
        this.complete = false
        this.background = new Graphics()
        this.title = new Text()
        this.description = new Text()
        this.rewards = new Container()
        this.actionBtn = new Container()
        this.requiredCounter = new Text()

        this.setBackground()
        this.setTitle()
        this.setDescription()
        this.setActionButton()
        this.setRewards()
        this.setRequiredCounter()
    }

    setBackground() {
        let background = this.background
        background.beginFill(0xffffff,1)
        background.drawRoundedRect(0,0,800,135,12)
        background.endFill()
        background.filters = [new DropShadowFilter()]
        this.addChild(background)
    }

    setTitle() {
        let title = this.title
        title.text = this.mission.title
        title.style = style23
        title.position.set(20,25)
        this.addChild(title)
    }
    
    setDescription() {
        let description = this.description
        description.text = this.mission.description
        description.style = style22
        description.position.set(20,70)
        this.addChild(description)
    }

    setRewards(){
        let rewards = this.rewards
        for (let index = 0; index < 3; index++) {
            let item = new Container()
            let background = new Graphics()
            background.beginFill(0xFFD36B,0.5)
            background.drawRoundedRect(0,0,80,80,10)
            background.endFill()
            // background.filters = [new DropShadowFilter()]
            item.addChild(background)

            let icon = new Sprite()
            icon.texture = resources[ResourcesManager.money_bag].texture
            let scale = 60 / icon.width
            icon.scale.set(scale)
            icon.position.set((item.width-icon.width)/2,(item.height-icon.height)/2)
            item.addChild(icon)

            item.position.set(index*95,0)
            rewards.addChild(item)
        }

        rewards.position.set(300+20+15,35)
        this.addChild(rewards)
    }

    setActionButton(){
        let actionBtn = this.actionBtn
        let canvas = document.createElement('canvas');
        canvas.width  = 200;
        canvas.height = 60;
        let ctx = canvas.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 0, 0, 50);
        gradient.addColorStop(0, "#FFBE3B");
        gradient.addColorStop(1, "#F58F4B");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let background = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
        let background_mask = new Graphics()
        background_mask.beginFill(0x000000,1)
        background_mask.drawRoundedRect(0,0,150,50,25)
        background_mask.endFill()
        background.mask = background_mask
        actionBtn.addChild(background)
        actionBtn.addChild(background_mask)

        let text = new Text()
        text.text = '領取獎勵'
        text.style = style7
        text.anchor.set(0.5,0.5)
        text.position.set(actionBtn.width/2,actionBtn.height/2)
        actionBtn.addChild(text)

        actionBtn.position.set(630,70)
        this.addChild(actionBtn)
    }

    setRequiredCounter(){
        let requiredCounter = new Text()
        requiredCounter.text = `0 / ${this.mission.required.times}`
        requiredCounter.position.set(670,30)
        this.addChild(requiredCounter)
    }
}
