import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Events from '@/js/game/Events'
import { style2, style15} from '@/js/game/engine/TextStyleManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import character from '@/js/game/character'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Backpack extends Scene {
    constructor() {
        super()
        this.account = window.sessionStorage.getItem('account')
        this.setBackground()
        this.setGoBack()
        this.setTitle()
        this.setStage()
        this.character = new character(this.account)
        this.setCharacter()
        this.setDressingRoom()
    }

    setBackground() {
        // var background = new Sprite(resources[ResourcesManager.create_role_bg].texture)
        // var scale = Config.screen.width / background.width
        // background.scale.set(scale, scale)
        let background = new PIXI.Graphics()
        background.beginFill(0xF9D6FF)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    setGoBack(){
        /* goBack Button */
        let btn_goback = new Sprite(resources[ResourcesManager.goBack].texture)
        let scale = 100 / btn_goback.width
        btn_goback.scale.set(scale)
        btn_goback.anchor.set(0.5)
        btn_goback.interactive = true
        btn_goback.buttonMode = true
        btn_goback.position.set(60, 60)
        btn_goback.click = () => {Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })}
        btn_goback.mouseover = function(mouseData) {
            btn_goback.scale.set(scale * 1.1)
            goBackText.scale.set(1.1)
        }
        btn_goback.mouseout = function(mouseData) {
            btn_goback.scale.set(scale)
            goBackText.scale.set(1)
        }
        this.addChild(btn_goback)
        /* goBack Text */
        let goBackText = new PIXI.Text('返回', style15)
        goBackText.anchor.set(0.5)
        goBackText.position.set(160,50)
        this.addChild(goBackText)
    }
    /* 創建角色title */
    setTitle() {
        /* Title */
        let title = new PIXI.Text('我的背包', style2)
        title.anchor.set(0.5, 0.5)
        this.addChild(title)
        title.position.set(350, 50)
    }
    /* 建立角色 */
    setCharacter() {
        /* Character */
        this.factory = this.character.factory
        this.armatureDisplay = this.character.armatureDisplay
        this.armatureDisplay.position.set(320, 590)
        this.armatureDisplay.scale.set(0.5)
        this.addChild(this.armatureDisplay)
    }
    /* 建立角色舞台 */
    setStage() {
        /* Stage */
        let stage = new Sprite(resources[ResourcesManager.character_stage].texture)
        this.addChild(stage)
        stage.scale.set(0.2)
        stage.position.set(125, 540)
    }
    
    setDressingRoom() {
        /* Create a dressing_room */
        this.dressing_room = this.character.clothing.create_dressing_room()
        this.dressing_room.position.set(650,80)
        this.dressing_room.scale.set(1.4)
        let wardrobe = this.dressing_room.getChildByName("wardrobe")
        wardrobe.clear()
        wardrobe.beginFill(0xffffff,0.6)
        wardrobe.drawRoundedRect(0, 0, 600, 450, 10)
        wardrobe.endFill()
        this.addChild(this.dressing_room)
    }
}
