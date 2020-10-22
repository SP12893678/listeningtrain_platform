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
import * as particles from 'pixi-particles'
import emitter2 from '@/assets/json/emitter2.json'
import MissionBoard from '../component/MissionBoard'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

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
        this.container = new Container() //for bubble
        this.character = new character(this.account)
        this.profile = new profile(this.account)
        this.set = new set()
        this.missionBoard = new MissionBoard()
        this.button = new RoundedButton(400, 80, '出征')
        this.btn_profile = new RoundedButton(120, 60, '個人資訊')
        this.btn_backpack = new RoundedButton(120, 60, '背包')
        this.btn_set = new RoundedButton(120, 60, '其他')
        this.btn_mission = new RoundedButton(120, 60, '任務')
        this.btn_shop = new RoundedButton(120, 60, '商城')
        this.btn_achievement = new RoundedButton(120, 60, '排行榜')
        this.test = new Sprite()
        this.bao = new Sprite()

        this.init()
    }
    async init() {
        this.setBackground()
        // this.doParticles()
        this.setButtonsBg()
        this.setProfileButton()
        this.setButton()
        this.setBackPackButton()
        this.setSetButton()
        this.setMissionButton()
        this.setShopButton()
        this.setAchievementButton()
        this.setGetButton()
        await this.setCharacter()
        this.setBao()
        this.setProfile()
        this.setSet()
        this.addChild(this.missionBoard)
        this.missionBoard.visible = false

    }
    setBackground() {
        let background = new Sprite(resources[ResourcesManager.game_main_bg].texture)
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)

        // let background = new PIXI.Graphics()
        // background.beginFill(0xf8f9ea)
        // background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        // background.endFill()
        this.addChild(background)
    }
    /* 背景泡泡 */
    doParticles() {
        this.addChild(this.container)
        emitter2.pos.x = 0
        emitter2.pos.y = 0
        var emitter = new particles.Emitter(this.container, [PIXI.Texture.fromImage(ResourcesManager.bubble)], emitter2)
        // Calculate the current time
        var elapsed = Date.now()
        // Update function every frame
        var update = function () {
            // Update the next frame
            requestAnimationFrame(update)
            var now = Date.now()
            // The emitter requires the elapsed
            // number of seconds since the last update
            emitter.update((now - elapsed) * 0.001)
            elapsed = now
        }
        emitter.emit = true
        update()
    }
    setButtonsBg() {
        let btnsBg = new PIXI.Graphics()
        btnsBg.beginFill(0xff96d7, 0.18)
        btnsBg.drawRoundedRect(800, 270, 500, 400, 50)
        btnsBg.endFill()
        this.addChild(btnsBg)
    }
    setButton() {
        let button = this.button
        button.setBorder(0)
        button.setBackgroundColor(0x8b8dff, 0.8)
        let style = style7.clone()
        style.fontSize = 36
        button.setText(style)
        button.position.set(850, 320)
        button.click = () => Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        this.addChild(button)
    }
    setProfileButton() {
        let btn_profile = this.btn_profile
        btn_profile.setBorder(0)
        btn_profile.setBackgroundColor(0xff968d)
        btn_profile.setText(style7)
        btn_profile.position.set(850, 440)
        btn_profile.click = () => (this.profile.dialog.visible = !this.profile.dialog.visible)
        this.addChild(btn_profile)
    }
    setBackPackButton() {
        let btn_backpack = this.btn_backpack
        btn_backpack.setBorder(0)
        btn_backpack.setBackgroundColor(0xff968d)
        btn_backpack.setText(style7)
        btn_backpack.position.set(990, 440)
        btn_backpack.click = () => Events.emit('goto', { id: 'backpack', animate: 'fadeIn' })
        this.addChild(btn_backpack)
    }

    setSetButton() {
        let btn_set = this.btn_set
        btn_set.setBorder(0)
        btn_set.setBackgroundColor(0xff968d)
        btn_set.setText(style7)
        btn_set.position.set(1130, 440)
        btn_set.click = () => (this.set.dialog.visible = !this.set.dialog.visible)
        this.addChild(btn_set)
    }

    setMissionButton() {
        let btn_mission = this.btn_mission
        btn_mission.setBorder(0)
        btn_mission.setBackgroundColor(0xff968d)
        btn_mission.setText(style7)
        btn_mission.position.set(850, 520)
        btn_mission.click = async () => (this.missionBoard.show())
        this.addChild(btn_mission)
    }

    setShopButton() {
        let btn_shop = this.btn_shop
        btn_shop.setBorder(0)
        btn_shop.setBackgroundColor(0xff968d)
        btn_shop.setText(style7)
        btn_shop.position.set(990, 520)
        this.addChild(btn_shop)
    }

    setAchievementButton() {
        let btn_achievement = this.btn_achievement
        btn_achievement.setBorder(0)
        btn_achievement.setBackgroundColor(0xff968d)
        btn_achievement.setText(style7)
        btn_achievement.position.set(1130, 520)
        this.addChild(btn_achievement)
    }

    setGetButton() {
        let temp = this.test
        temp.interactive = true
        temp.buttonMode = true
        temp.texture = resources[ResourcesManager.gift].texture
        temp.width = 80
        temp.height = 80
        temp.anchor.set(0.5)
        // temp.setBorder(0)
        // temp.setBackgroundColor(0x005493)
        // temp.setText(style7)
        temp.position.set(1500, 100)
        temp.click = () => {
            temp.texture = resources[ResourcesManager.gift_open].texture
            let category = 'clothes'
            let no = this.character.gender == 'gg' ? 5 : 6
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
                    temp.texture = resources[ResourcesManager.gift].texture
                    let check = this.character.clothing.addWardrobeClothes(category, no)
                    this.dialog.visible = false
                    check.then((success) => {
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

        let style = style7.clone()
        style.fill = 0x000000
        let text = new PIXI.Text('新手禮包', style)
        text.anchor.set(0.5)
        text.position.set(1500, 115)
        this.addChild(text)
    }
    /* 建立角色 */
    async setCharacter() {
        /* Character */
        let character = this.character
        await character.check_if_has_data()
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
        let t = this
        armatureDisplay.position.set(500, 500)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        armatureDisplay.interactive = true
        armatureDisplay.buttonMode = true
        armatureDisplay.mouseover = function (mouseData) {
            // armatureDisplay.animation.play('shakeHand', 1)
            // armatureDisplay.animation.fadeIn('shakeHand',0,1,1)
            // armatureDisplay.animation.fadeIn('fighting',0,1,2)
            if (!armatureDisplay.animation.isPlaying) {
                let handAnimation = armatureDisplay.animation.fadeIn('shakeHand', 0, 1, 1, 'hand')
                let emojiAnimation = armatureDisplay.animation.fadeIn('emoji_hello', 0, 1, 0, 'emoji')
                emojiAnimation.addBoneMask('emoji') //只顯示表情這部分
            }
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
    setBao() {
        let bao = this.bao
        bao.texture = resources[ResourcesManager.bao].texture
        bao.interactive = true;
        bao.buttonMode = true;
        let scale = 300 / bao.width;
        bao.anchor.set(0, 1)
        bao.scale.set(scale)
        bao.position.set(350, 650)
        bao.click = () => {
            let tl = gsap.timeline({ duration: 0.2, repeat: -1, repeatDelay: 0 })
            tl.to(bao, { pixi: { scaleY: scale / 2 }, duration: 0.5, ease: 'Power2.easeOut' })
            tl.to(bao, { pixi: { scaleY: scale * 1.1, positionY: 350 }, duration: 0.8, ease: 'Power2.easeOut' })
            tl.to(bao, { pixi: { scaleY: scale, positionY: 650 }, duration: 0.8, ease: 'Power2.easeIn' })
            tl.to(bao, { pixi: { scaleY: scale * 0.6 }, duration: 0.2, ease: 'Power2.easeOut' })
            tl.to(bao, { pixi: { scaleY: scale * 1 }, duration: 0.2, ease: 'Power2.easeOut' })

            // tl.to(bao, { pixi: { positionY: 200 }, duration: 0.5, ease: 'Power2.easeOut' })
        }
        bao.visible = false
        this.addChild(bao)

        this.secret_key = ''
        window.addEventListener('keyup', (event) => {
            this.secret_key += event.key
            if (this.secret_key.indexOf('bao') != -1) {
                this.character.armatureDisplay.visible = false
                bao.visible = true
            }
        })
    }
    /*---------*/
    update() {
        super.update()
    }
}
