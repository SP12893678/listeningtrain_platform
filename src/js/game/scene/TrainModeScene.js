import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style14, style15 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class TrainModeScene extends Scene {
    constructor() {
        super()
        this.background = new PIXI.Graphics()
        this.title = new Container()
        this.character = new character('Mary')

        this.setBackground()
        this.setTitle()
        this.setCharacter()
    }
    setBackground() {
        let background = this.background
        background.beginFill(0xFF9300)
        background.drawRect(0,0,Config.screen.width,Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    setTitle(){
        let title = this.title
        /* titlePanel */
        let titlePanel = new PIXI.Graphics()
        let titleHeight = Config.screen.height*0.08
        titlePanel.beginFill(0xF8BA00)
        titlePanel.drawRect(0,0,Config.screen.width,titleHeight)
        titlePanel.drawCircle(60,60,60)
        title.addChild(titlePanel)
        /* goBack Button */
        let btn_goback = new Sprite(resources[ResourcesManager.goBack].texture)
        let scale = 100/btn_goback.width
        btn_goback.scale.set(scale)
        btn_goback.anchor.set(0.5)
        btn_goback.interactive = true
        btn_goback.buttonMode = true
        btn_goback.position.set(60,60)
        btn_goback.click = () => {
            Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
        }
        btn_goback.mouseover = function(mouseData) {
            btn_goback.scale.set(scale*1.1)
            goBackText.scale.set(1.1)
        }
        btn_goback.mouseout = function(mouseData) {
            btn_goback.scale.set(scale)
            goBackText.scale.set(1)
        }
        title.addChild(btn_goback)
        /* goBack Text */
        let goBackText = new PIXI.Text('返回',style15)
        goBackText.anchor.set(0.5)
        goBackText.position.set(160,titleHeight/2)
        title.addChild(goBackText)
        /* title Text */
        let titleText = new PIXI.Text('訓練模式',style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width/2,titleHeight/2)
        title.addChild(titleText)
        /* help */   
        let btn_help = new Button2(150,titleHeight*0.8,ResourcesManager.help,'說明')
        btn_help.pivot.set(150/2,titleHeight/2)
        btn_help.position.set(Config.screen.width-70,titleHeight/2+titleHeight*0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('',0)
        btn_help.setText(style15)
        btn_help.click = () => {
        
        }
        btn_help.mouseover = function(mouseData) {
            btn_help.scale.set(1.1)
        }
        btn_help.mouseout = function(mouseData) {
            btn_help.scale.set(1)
        }
        title.addChild(btn_help)

        this.addChild(title)
    }
    /* 建立角色 */
    setCharacter(){
        /* Character */
        let character = this.character
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
        armatureDisplay.position.set(250,670)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
}
