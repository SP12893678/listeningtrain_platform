import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'

import character from '@/js/game/character'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameMainScene extends Scene {
    constructor() {
        super()
        this.setBackground()
        this.setCharacter()
        // this.setButton()
    }

    setBackground() {
        var background = new Sprite(resources[ResourcesManager.game_main].texture)
        var scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }
     /* 建立角色 */
    setCharacter() {
        /* Character */
        this.character = new character()
        this.factory = this.character.factory
        this.armatureDisplay = this.character.armatureDisplay
        this.armatureDisplay.position.set(395, 490)
        this.armatureDisplay.scale.set(0.4)
        this.addChild(this.armatureDisplay)
        this.armatureDisplay.interactive = true
        this.armatureDisplay.buttonMode = true
        let t = this
        this.armatureDisplay.mouseover = function(mouseData) {
            t.armatureDisplay.animation.play('shakeHand',1);
        }
        this.armatureDisplay.mouseout = function(mouseData) {
            
        }
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    /*---------*/
    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '返回'
        button.position.set(700, 400)
        button.click = () => {
            Events.emit('goto', { id: 'create_role', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    update() {
        super.update()
    }
}
