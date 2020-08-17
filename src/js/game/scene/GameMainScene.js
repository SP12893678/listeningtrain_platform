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
        this.button = new Button(150, 50, 20)
        
        this.setBackground()
        this.setTrainModeButton()
        this.setButton()
        this.setCharacter()
        this.setProfile()
    }
    setBackground() {
        let background = this.background
        background.texture = resources[ResourcesManager.create_role_bg].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        // let background = new PIXI.Graphics()
        // background.beginFill(0xffffff)
        // background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        // background.endFill()
        this.addChild(background)
    }
    setButton() {
        let button = this.button
        button.text.text = '返回'
        button.position.set(700, 400)
        button.click = () => {
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        }
        this.addChild(button)
    }
    setTrainModeButton(){
        let trainModeButton = this.trainModeButton
        trainModeButton.text.text = '訓練模式'
        trainModeButton.position.set(100,0)
        trainModeButton.click = () => {
            Events.emit('goto', { id: 'train_mode', animate: 'fadeIn' })
        }
        this.addChild(trainModeButton)
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
    setProfile(){
        let profile = this.profile
        this.addChild(profile)
    }
    /*---------*/
    update() {
        super.update()
    }
}
