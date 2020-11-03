import * as PIXI from 'pixi.js'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import RoundedButton from 'Component/button3'
import VerticalScroller from 'Component/VerticalScroller'
import Overlay from './overlay'
import Config from '@/js/game/Config'
import { style1, style7, style23, style22 } from '@/js/game/engine/TextStyleManager'
import GraphicsTool from 'Component/GraphicsTool'
import { OutlineFilter, ShockwaveFilter, GlowFilter, DropShadowFilter } from 'pixi-filters'
import { apiManageMission, apiManageLearning } from "@/js/api";
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import MissionSystem from '@/js/game/engine/MissionSystem'
import character from '@/js/game/character'
import Events from '@/js/game/Events'
import Dialog from 'Component/dialog'

import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
let resources = PIXI.loader.resources

let myCharacter = new character()
let missionDialog = null;

export default class MissionBoardDialog extends Overlay {
    constructor() {
        super()
        missionDialog = this;
        this.missionBoard = new MissionBoard()
        this.missionBoard.position.set(
            (Config.screen.width - this.missionBoard.width) / 2,
            (Config.screen.height - this.missionBoard.height) / 2
        )
        this.addChild(this.missionBoard)
    }

    async init() {
        await myCharacter.check_if_has_data()


        this.missionBoard = new MissionBoard()
        this.missionBoard.position.set(
            (Config.screen.width - this.missionBoard.width) / 2,
            (Config.screen.height - this.missionBoard.height) / 2
        )
        this.addChild(this.missionBoard)

        await MissionSystem.init()
            .then(res => MissionSystem.missions.forEach(mission => MissionSystem.missionDetect(mission)))
            .catch(res => new Error('error'))

        /**排序任務順序 */
        MissionSystem.missions.sort((a, b) => {
            let value = {
                finished: 0,
                unfinished: 1,
                received: 2,
            }
            return value[a.status] - value[b.status]
        })

        MissionSystem.missions.forEach(mission => this.missionBoard.missionList.addListitem(mission))
        this.missionBoard.scroller.refresh()
    }

    async show() {
        await this.init()
        this.visible = true
    }
}

class MissionBoard extends Container {
    constructor() {
        super()
        this.everyday = []
        this.growth = []
        this.background = new Graphics()
        this.titleboard = new Container()
        this.closeBtn = new Container()
        this.missionSelector = new Graphics()
        this.missionBtn = new RoundedButton(280, 80, '每日任務')
        this.missionBtn2 = new RoundedButton(280, 80, '成長任務')
        this.missionList = new MissionList()
        this.scroller = new VerticalScroller(10, this.missionList.content, this.missionList.content_mask)

        this.setBackground()
        this.setTitleboard()
        this.setCloseButton()
        this.addChild(this.missionSelector)
        this.missionSelector.beginFill(0xFF8D8D, 1)
        GraphicsTool.setPaintingContainer(this.missionSelector)
        GraphicsTool.drawRoundedRect(360, 720 - 54, 0, 0, 24, 0)
        this.missionSelector.endFill()
        this.missionSelector.position.set(0, 54)
        this.addChild(this.missionSelector)
        this.setMissionButton()
        this.setMissionList()
        this.setMissionScroller()
    }

    setBackground() {
        let background = this.background
        background.beginFill(0x77aaff)
        background.drawRoundedRect(0, 0, 1280, 720, 24)
        this.addChild(background)
    }

    setTitleboard() {
        let titleboard = this.titleboard
        let background = new Graphics()
        background.beginFill(0xAB8DFF, 1)
        GraphicsTool.setPaintingContainer(background)
        GraphicsTool.drawRoundedRect(1280, 54, 24, 24, 0, 0)
        background.endFill()
        titleboard.addChild(background)
        let text = new Text()
        text.text = '任務面板'
        text.style = style23
        text.anchor.set(0, 0.5)
        text.position.set(20, titleboard.height / 2)
        titleboard.addChild(text)
        this.addChild(titleboard)
    }

    setCloseButton() {
        let closeBtn = this.closeBtn
        let background = new Graphics()
        background.beginFill(0xA7FF8D, 1)
        GraphicsTool.setPaintingContainer(background)
        GraphicsTool.drawRoundedRect(120, 54, 0, 24, 36, 0)
        background.endFill()
        closeBtn.addChild(background)

        let text = new Text(style1)
        text.text = '關閉'
        text.style = style23
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
        missionBtn.setBackgroundColor(0xffffff, 0.7)
        missionBtn.setText(style23)
        missionBtn.click = () => {
            this.missionList.content.removeChildren()
            this.everyday.forEach((missionItem, index) => {
                missionItem.position.set(0, index * 150)
                this.missionList.content.addChild(missionItem)
                this.missionList.content.position.set(0, 0)
                this.scroller.refresh()
            })
        }
        missionBtn.position.set(40, 100)
        this.addChild(missionBtn)

        let missionBtn2 = this.missionBtn2
        missionBtn2.setBorder(0)
        missionBtn2.setBackgroundColor(0xffffff, 0.7)
        missionBtn2.setText(style23)
        missionBtn2.click = () => {
            this.missionList.content.removeChildren()
            this.growth.forEach((missionItem, index) => {
                missionItem.position.set(0, index * 150)
                this.missionList.content.addChild(missionItem)
                this.missionList.content.position.set(0, 0)
                this.scroller.refresh()
            })
        }

        missionBtn2.position.set(40, 225)
        this.addChild(missionBtn2)
    }

    setMissionList() {
        let missionList = this.missionList
        missionList.position.set(400, 100)
        this.addChild(missionList)
    }

    setMissionScroller() {
        let scroller = this.scroller
        scroller.position.set(1280 - scroller.width - 30, 105)
        this.addChild(scroller)
    }
}

class MissionList extends Container {
    constructor() {
        super()
        this.content = new Container()
        this.content_mask = new Graphics()
        this.content_mask.beginFill(0x000000, 1)
        this.content_mask.drawRoundedRect(0, 0, 850, 600, 12)
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

        if (data.type == '每日任務') this.parent.everyday.push(item)
        if (data.type == '成長任務') this.parent.growth.push(item)
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
        background.beginFill(0xffffff, 1)
        background.drawRoundedRect(0, 0, 800, 135, 12)
        background.endFill()
        background.filters = [new DropShadowFilter()]
        this.addChild(background)
    }

    setTitle() {
        let title = this.title
        title.text = this.mission.title
        title.style = style23
        title.position.set(20, 25)
        this.addChild(title)
    }

    setDescription() {
        let description = this.description
        description.text = this.mission.description
        description.style = style22
        description.position.set(20, 70)
        this.addChild(description)
    }

    setRewards() {
        let rewards = this.rewards
        console.log(this.mission.rewards)


        let addReward = (icon, index) => {
            let item = new Container()
            let background = new Graphics()
            background.beginFill(0xFFD36B, 0.5)
            background.drawRoundedRect(0, 0, 80, 80, 10)
            background.endFill()
            item.addChild(background)


            let scale = 60 / icon.width
            icon.scale.set(scale)
            icon.position.set((item.width - icon.width) / 2, (item.height - icon.height) / 2)
            item.addChild(icon)
            item.position.set(rewards.children.length * 95, 0)
            rewards.addChild(item)
        }

        this.mission.rewards.forEach(reward => {
            let texture;
            if (reward.type == 'money') {
                texture = resources[ResourcesManager.money_bag].texture;
                let icon = new Sprite()
                icon.texture = texture;
                addReward(icon, texture);
            }
            else {
                let gender = myCharacter.gender
                let clothing = myCharacter.clothing
                let getItem = clothing.showClothes(reward[gender].type, reward[gender].no, 0, 0)
                addReward(getItem, texture);
            }
        })
        for (let index = 0; index < 3 - this.mission.rewards.length; index++) {
            let icon = new Sprite()
            addReward(icon, index);
        }

        rewards.position.set(300 + 20 + 15, 35)
        this.addChild(rewards)
    }

    setActionButton() {
        let app = this
        let actionBtn = this.actionBtn
        let buttonBuilder = {
            build(type) {
                let background = new Sprite();
                let colors = this.colors[type]
                background.texture = PIXI.Texture.fromCanvas(buttonBuilder.drawGradientArea(colors, 200, 50))
                let background_mask = new Graphics()
                background_mask.beginFill(0x000000, 1)
                background_mask.drawRoundedRect(0, 0, 150, 50, 25)
                background_mask.endFill()
                background.mask = background_mask
                actionBtn.addChild(background)
                actionBtn.addChild(background_mask)

                let text = new Text()
                text.text = this.text[type]
                text.style = style7
                text.anchor.set(0.5, 0.5)
                text.position.set(actionBtn.width / 2, actionBtn.height / 2)
                actionBtn.addChild(text)

                actionBtn.interactive = true;
                actionBtn.buttonMode = true;
                actionBtn.click = this.click[type]
                actionBtn.position.set(630, 70)

                actionBtn.update = () => { actionBtn.filters = [] }
                actionBtn.filters = []
                if (type == 'finished') {
                    actionBtn.update = () => {
                        requestAnimationFrame(actionBtn.update)
                        var r = Math.round(Math.random() * 255);
                        var g = Math.round(Math.random() * 255);
                        var b = Math.round(Math.random() * 255);
                        var color = `0x${parseInt(r, 16)}${parseInt(g, 16)}${parseInt(b, 16)}`;
                        // app.filters = [new OutlineFilter(3, color)]
                        // actionBtn.filters = [new GlowFilter(20, 3, 0, color)]
                    }
                    actionBtn.update();
                }

                app.addChild(actionBtn)
            },
            colors: {
                unfinished: ["#FFBE3B", "#F58F4B"],
                finished: ["#FFBE3B", "#F58F4B"],
                received: ["#B6B6B6", "#909090"]
            },
            text: {
                unfinished: '未完成',
                finished: '領取獎勵',
                received: '已領取'
            },
            click: {
                unfinished() {
                    console.log('1')
                },
                finished() {
                    actionBtn.interactive = false;
                    MissionSystem.completeMission(app.mission)
                    app.mission.status = 'received'
                    app.setActionButton()
                    let gender = myCharacter.gender


                    let dialog = new Dialog('恭喜你獲得', 2)
                    dialog.setSize(400, 300)
                    dialog.text.position.set(dialog.text.x, dialog.text.y - 60)
                    dialog.yesBtn.position.set(dialog.yesBtn.x, dialog.yesBtn.y + 30)
                    dialog.yesBtn.setBorder(0)
                    dialog.yesBtn.scale.set(0.8)
                    missionDialog.addChild(dialog)
                    /* yesBtn action */
                    dialog.yesBtn.click = () => {
                        app.mission.rewards.forEach(reward => {
                            if (reward.type == 'entity') {
                                let check = myCharacter.clothing.addWardrobeClothes(reward[gender].type, reward[gender].no)
                                check.then((success) => {
                                    Events.emit('warning', { no: success })
                                })
                            }
                        })
                        dialog.visible = false
                    }
                    //獲得服飾顯示（for test）
                    let clothing = myCharacter.clothing
                    let rewardBox = new Container();
                    app.mission.rewards.forEach((reward, index) => {
                        if (reward.type == 'entity') {
                            let getItem = clothing.showClothes(reward[gender].type, reward[gender].no, 100 * index, 0)
                            rewardBox.addChild(getItem)
                        }
                        else {
                            let texture = resources[ResourcesManager.money_bag].texture;
                            let icon = new Sprite()
                            icon.texture = texture;
                            let scale = 80 / icon.width
                            icon.scale.set(scale)
                            icon.position.set(100 * index, 0)
                            rewardBox.addChild(icon)
                        }
                    });
                    rewardBox.position.set(dialog.dialog.x + (dialog.dialog.width - rewardBox.width) / 2, dialog.dialog.y + 90);
                    dialog.addChild(rewardBox)
                },
                received() {
                    console.log('3')
                },
            },
            drawGradientArea(colors, width, height) {
                let canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext('2d');
                let gradient = ctx.createLinearGradient(0, 0, 0, height);
                colors.forEach((color, index) => gradient.addColorStop(index, color))
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                return canvas
            }
        }
        buttonBuilder.build(this.mission.status)
    }

    setRequiredCounter() {
        let requiredCounter = this.requiredCounter
        requiredCounter.text = `${this.mission.fit} / ${this.mission.required.times}`
        requiredCounter.anchor.set(0.5, 0)
        requiredCounter.position.set(710, 30)
        if (this.mission.status != 'received') this.addChild(requiredCounter)
    }
}
