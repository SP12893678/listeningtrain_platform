import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'

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
        this.background = new Sprite()
        this.character = new character('Mary')
        this.profile = new profile()
        this.trainModeButton = new Button(150, 50, 20)
        this.practiceModeButton = new Button(150, 50, 20)
        this.testModeButton = new Button(150, 50, 20)
        this.button = new Button(150, 50, 20)

        this.setBackground()
        this.setTrainModeButton()
        this.setPracticeModeButton()
        this.setTestModeButton()
        this.setButton()
        this.setCharacter()
        this.setProfile()
    }
    setBackground() {
        // var background = new Sprite(resources[ResourcesManager.game_main].texture)
        // var scale = Config.screen.width / background.width
        // background.scale.set(scale, scale)

        let background = new PIXI.Graphics()
        background.beginFill(0x000000)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    setButton() {
        let button = this.button
        button.text.text = '出征'
        button.position.set(700, 400)
        button.click = () => Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        this.addChild(button)
    }
    setTrainModeButton() {
        let trainModeButton = this.trainModeButton
        trainModeButton.text.text = '訓練模式'
        trainModeButton.position.set(100, 0)
        trainModeButton.click = () => Events.emit('goto', { id: 'train_mode', animate: 'fadeIn' })
        this.addChild(trainModeButton)
    }
    setPracticeModeButton() {
        let practiceModeButton = this.practiceModeButton
        practiceModeButton.text.text = '練習模式'
        practiceModeButton.position.set(this.trainModeButton.x + this.trainModeButton.width, 0)
        practiceModeButton.click = () => Events.emit('goto', { id: 'practice_mode', animate: 'fadeIn' })
        this.addChild(practiceModeButton)
    }
    setTestModeButton() {
        let testModeButton = this.testModeButton
        testModeButton.text.text = '測驗模式'
        testModeButton.position.set(this.practiceModeButton.x + this.practiceModeButton.width, 0)
        testModeButton.click = () => Events.emit('goto', { id: 'test_mode', animate: 'fadeIn' })
        this.addChild(testModeButton)
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
            armatureDisplay.animation.play('shakeHand', 1)
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
