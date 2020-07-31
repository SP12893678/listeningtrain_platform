import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import SettingMenu from 'Component/SettingMenu'
import Overlay from 'Component/overlay'

import { GlowFilter } from 'pixi-filters'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Dialog from 'Component/dialog'
import * as particles from 'pixi-particles'
import emitter2 from '@/assets/json/emitter2.json'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class CreateRoleScene extends Scene {
    constructor() {
        super()
        this.setBackground()
        this.setTitle()
        this.container = new Container()
        this.addChild(this.container)
        this.doParticles()
        this.setStage()
        this.character = new character()
        this.setCharacter()
        this.setGenderBtn()
        this.setRandomButton()
        this.setSaveButton()
        this.setDressingRoom()
        this.setButton()
        this.setMenu()
    }

    setBackground() {
        var background = new Sprite(resources[ResourcesManager.create_role_bg].texture)
        var scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }
    /* 創建角色title */
    setTitle() {
        let style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: ' white ',
            stroke: '#0x66FF33',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        })
        /* Title */
        let title = new PIXI.Text('創建角色', style)
        title.anchor.set(0.5, 0.5)
        this.addChild(title)
        title.position.set(Config.screen.width / 2, Config.screen.height * 0.1)
    }
    /* 背景泡泡 */
    doParticles() {
        emitter2.pos.x = 0
        emitter2.pos.y = 0
        var emitter = new particles.Emitter(this.container, [PIXI.Texture.fromImage(ResourcesManager.bubble)], emitter2)
        // Calculate the current time
        var elapsed = Date.now()
        // Update function every frame
        var update = function() {
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
    /* 建立角色 */
    setCharacter() {
        /* Character */
        this.factory = this.character.factory
        this.armatureDisplay = this.character.armatureDisplay
        this.armatureDisplay.position.set(395, 490)
        this.armatureDisplay.scale.set(0.4)
        this.addChild(this.armatureDisplay)
    }
    /* 建立角色舞台 */
    setStage() {
        /* Stage */
        let stage = new Sprite(resources[ResourcesManager.character_stage].texture)
        this.addChild(stage)
        stage.scale.set(0.2, 0.2)
        stage.position.set(200, 400)
    }
    /* 設定角色性別按鈕 */
    setGenderBtn() {
        /* Gender button */
        let girlBtn = new Sprite(PIXI.loader.resources[ResourcesManager.genderGirl].texture)
        let boyBtn = new Sprite(PIXI.loader.resources[ResourcesManager.genderBoy].texture)
        let genderBtn = new PIXI.Graphics()
        genderBtn.lineStyle(4, 0xcceeff)
        genderBtn.beginFill(0xffffff, 0.8) //填充
        genderBtn.drawRoundedRect(0, 0, 60, 150, 10)
        genderBtn.endFill()
        genderBtn.position.set(145, 390)

        let t = this

        boyBtn.scale.set(0.5, 0.5)
        boyBtn.position.set(7, 25)
        boyBtn.alpha = 1 //預設為男生
        boyBtn.filters = [new GlowFilter(10, 2, 0, 0x1e90ff)] //(distance,outerStrength,innerStrength,color);
        boyBtn.interactive = true // 設定可以互動
        boyBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        boyBtn.click = function() {
            t.gender = 'gg'
            t.removeChild(t.armatureDisplay)
            t.character.show_character('gg')
            t.armatureDisplay = t.character.armatureDisplay
            t.addChild(t.armatureDisplay)
            t.armatureDisplay.position.set(395, 490)
            t.armatureDisplay.scale.set(0.4)
            boyBtn.alpha = 1
            boyBtn.filters = [new GlowFilter(10, 2, 0, 0x1e90ff)]
            girlBtn.alpha = 0.3
            girlBtn.filters = null
            if (t.character.clothing.itemName != null) t.character.clothing.show_item(t.character.clothing.itemName)
        }
        genderBtn.addChild(boyBtn)

        girlBtn.scale.set(0.5, 0.5)
        girlBtn.position.set(7, 85)
        girlBtn.alpha = 0.3
        girlBtn.interactive = true // 設定可以互動
        girlBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        girlBtn.click = function() {
            t.gender = 'mm'
            t.removeChild(t.armatureDisplay)
            t.character.show_character('mm')
            t.armatureDisplay = t.character.armatureDisplay
            t.addChild(t.armatureDisplay)
            t.armatureDisplay.position.set(395, 490)
            t.armatureDisplay.scale.set(0.4)
            girlBtn.alpha = 1
            girlBtn.filters = [new GlowFilter(8, 2, 0, 0xff1493)]
            boyBtn.alpha = 0.3
            boyBtn.filters = null
            if (t.character.clothing.itemName != null) t.character.clothing.show_item(t.character.clothing.itemName)
        }
        genderBtn.addChild(girlBtn)
        this.addChild(genderBtn)
    }
    /* 設定隨機換裝按鈕 */
    setRandomButton() {
        let randomBtn = new Button2(120, 50, ResourcesManager.random, '隨機')
        randomBtn.setCornerRadius(30)
        randomBtn.setBackgroundColor('0x6495ed')
        randomBtn.setBorder(0)
        randomBtn.position.set(260, 698)
        randomBtn.filters = [new GlowFilter(7, 2, 2, 0xffffff)]
        this.addChild(randomBtn)
        let t = this
        randomBtn.click = function() {
            t.character.clothing.randomChangeClothes()
        }
    }
    /* 設定確認黃裝按鈕 */
    setSaveButton() {
        let saveBtn = new Button2(120, 50, ResourcesManager.confirm, '確認')
        saveBtn.setCornerRadius(30)
        saveBtn.setBackgroundColor('0xffd700')
        saveBtn.setBorder(0)
        saveBtn.position.set(400, 698)
        saveBtn.filters = [new GlowFilter(7, 2, 2, 0xffffff)]
        this.addChild(saveBtn)
        let t = this
        saveBtn.click = function() {
            t.character.clothing.changeClothes()
            let dialog = new Dialog()
            t.addChild(dialog)
            t.dialog = dialog
        }
    }
    setDressingRoom() {
        /* Create a dressing_room */
        this.dressing_room = this.character.clothing.create_dressing_room()
        this.dressing_room.position.set(Config.screen.width / 2, Config.screen.height * 0.2)
        this.addChild(this.dressing_room)
    }
    /*---------*/

    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '創建角色'
        button.text.style.fill = 0x000000
        button.position.set(500, 100)
        button.click = () => {
            Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    setMenu() {
        var menu = new SettingMenu()
        menu.background.interactive = true
        menu.background.click = () => {
            menu.visible = false
        }
        this.addChild(menu)
        this.menu = menu
    }

    update() {
        super.update()
    }
}
