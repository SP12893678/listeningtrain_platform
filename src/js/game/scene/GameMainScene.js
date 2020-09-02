import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import RoundedButton from 'Component/button3'
import { style7 } from '@/js/game/engine/TextStyleManager'

import character from '@/js/game/character'
import profile from '@/js/game/profile'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameMainScene extends Scene {
    constructor() {
        super()
        this.account = window.sessionStorage.getItem('account')
        this.background = new Sprite()
        this.character = new character(this.account)
        this.profile = new profile(this.account)
        this.button = new RoundedButton(150, 60, '出征')
        this.btn_profile = new RoundedButton(150, 60, '個人資訊')
        this.btn_backpack = new RoundedButton(150, 60, '背包')

        this.setBackground()
        this.setButton()
        this.setProfileButton()
        this.setBackPackButton()
        this.setCharacter()
        this.setProfile()
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
    /* 建立角色 */
    setCharacter() {
        /* Character */
        let character = this.character
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
        let t = this
        armatureDisplay.position.set(395, 490)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        armatureDisplay.interactive = true
        armatureDisplay.buttonMode = true
        armatureDisplay.mouseover = function(mouseData) {
            // armatureDisplay.animation.play('shakeHand', 1)
            // armatureDisplay.animation.fadeIn('shakeHand',0,1,1)
            // armatureDisplay.animation.fadeIn('fighting',0,1,2)

            let handAnimation = armatureDisplay.animation.fadeIn('shakeHand', 0, 1, 1, 'hand')
            let emojiAnimation = armatureDisplay.animation.fadeIn('fighting', 0, 1, 0, 'emoji')
            emojiAnimation.addBoneMask('emoji') //只顯示表情這部分
        }
        armatureDisplay.mouseout = function(mouseData) {}
        armatureDisplay.click = function() {
            t.profile.dialog.visible = !t.profile.dialog.visible
        }
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    setProfile() {
        let profile = this.profile
        this.addChild(profile)
    }
    /*---------*/
    update() {
        super.update()
    }
}
