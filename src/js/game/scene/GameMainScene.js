import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import RoundedButton from 'Component/button3'
import { style7 } from '@/js/game/engine/TextStyleManager'
import Dialog from 'Component/dialog'

import character from '@/js/game/character'
import profile from '@/js/game/profile'
import set from '@/js/game/set'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameMainScene extends Scene {
    constructor() {
        super()
        this.background = new Sprite()

        this.character = new character(this.account)
        this.profile = new profile(this.account)
        this.set = new set()
        this.button = new RoundedButton(150, 60, '出征')
        this.btn_profile = new RoundedButton(150, 60, '個人資訊')
        this.btn_backpack = new RoundedButton(150, 60, '背包')
        this.btn_set = new RoundedButton(150, 60, '其他')
        this.test = new RoundedButton(60, 60, 'Get')

        this.init()
    }
    async init() {
        this.setBackground()
        this.setButton()
        this.setProfileButton()
        this.setBackPackButton()
        this.setSetButton()
        this.setGetButton()
        await this.setCharacter()
        this.setProfile()
        this.setSet()
    }
    setBackground() {
        // var background = new Sprite(resources[ResourcesManager.game_main].texture)
        // var scale = Config.screen.width / background.width
        // background.scale.set(scale, scale)

        let background = new PIXI.Graphics()
        background.beginFill(0xf8f9ea)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    setButton() {
        let button = this.button
        button.setBorder(0)
        button.setBackgroundColor(0x29d4ff)
        button.setText(style7)
        button.position.set(700, 400)
        button.click = () => Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        this.addChild(button)
    }
    setProfileButton() {
        let btn_profile = this.btn_profile
        btn_profile.setBorder(0)
        btn_profile.setBackgroundColor(0x29d4ff)
        btn_profile.setText(style7)
        btn_profile.position.set(700, 300)
        btn_profile.click = () => (this.profile.dialog.visible = !this.profile.dialog.visible)
        this.addChild(btn_profile)
    }
    setBackPackButton() {
        let btn_backpack = this.btn_backpack
        btn_backpack.setBorder(0)
        btn_backpack.setBackgroundColor(0x29d4ff)
        btn_backpack.setText(style7)
        btn_backpack.position.set(700, 500)
        btn_backpack.click = () => Events.emit('goto', { id: 'backpack', animate: 'fadeIn' })
        this.addChild(btn_backpack)
    }

    setSetButton() {
        let btn_set = this.btn_set
        btn_set.setBorder(0)
        btn_set.setBackgroundColor(0x29d4ff)
        btn_set.setText(style7)
        btn_set.position.set(700, 700)
        btn_set.click = () => (this.set.dialog.visible = !this.set.dialog.visible)
        this.addChild(btn_set)
    }

    setGetButton() {
        let temp = this.test
        temp.setBorder(0)
        temp.setBackgroundColor(0x005493)
        temp.setText(style7)
        temp.position.set(750, 600)
        temp.click = () => {
            let category = 'clothes'
            let no = (this.character.gender == 'gg') ? 5 : 6
            if (this.dialog == null) {
                let dialog = new Dialog('恭喜你獲得', 2)
                dialog.setSize(400, 300)
                dialog.text.position.set(dialog.text.x, dialog.text.y - 60)
                dialog.yesBtn.position.set(dialog.yesBtn.x, dialog.yesBtn.y + 30)
                dialog.yesBtn.setBorder(0)
                dialog.yesBtn.scale.set(0.8)
                this.addChild(dialog)
                this.dialog = dialog
                /* yesBtn action */
                this.dialog.yesBtn.click = () => {
                    let check = this.character.clothing.addWardrobeClothes(category, no)
                    this.dialog.visible = false
                    check.then(success => {
                        Events.emit('warning', { no: success })
                    })
                }
                //獲得服飾顯示（for test）
                let clothing = this.character.clothing
                let getItem = clothing.showClothes(category, no, this.dialog.dialog.x + 140, this.dialog.dialog.y + 90)
                this.dialog.addChild(getItem)
            } else {
                this.dialog.visible = true
            }
        }
        this.addChild(temp)
    }
    /* 建立角色 */
    async setCharacter() {
        /* Character */
        let character = this.character
        await character.check_if_has_data()
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
        let t = this
        armatureDisplay.position.set(395, 490)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        armatureDisplay.interactive = true
        armatureDisplay.buttonMode = true
        armatureDisplay.mouseover = function (mouseData) {
            // armatureDisplay.animation.play('shakeHand', 1)
            // armatureDisplay.animation.fadeIn('shakeHand',0,1,1)
            // armatureDisplay.animation.fadeIn('fighting',0,1,2)

            let handAnimation = armatureDisplay.animation.fadeIn('shakeHand', 0, 1, 1, 'hand')
            let emojiAnimation = armatureDisplay.animation.fadeIn('fighting', 0, 1, 0, 'emoji')
            emojiAnimation.addBoneMask('emoji') //只顯示表情這部分
        }
        armatureDisplay.mouseout = function (mouseData) { }
        armatureDisplay.click = function () {
            t.profile.dialog.visible = !t.profile.dialog.visible
        }
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    setProfile() {
        let profile = this.profile
        this.addChild(profile)
    }
    setSet() {
        let set = this.set
        this.addChild(set)
    }
    /*---------*/
    update() {
        super.update()
    }
}
