import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style14, style15, style16 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Environment from '@/js/game/Environment'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class PracticeModeScene extends Scene {
    constructor() {
        super()
        this.background = new PIXI.Graphics()
        this.title = new Container()
        this.character = new character('Mary')
        this.questionTotal = 10
        this.questionNo = 1
        this.screen = new Container()
        this.screenUp = new Container()
        this.startBtn = new Button2(200, 60, ResourcesManager.start, ' 開始   ')
        this.environment = new Environment()

        this.setBackground()
        this.setTitle()
        this.setCharacter()
        this.setScreenUp()
        this.setScreen()
    }
    setBackground() {
        let background = this.background
        background.beginFill(0xff9300)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    setTitle() {
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
        let scale = 100 / btn_goback.width
        btn_goback.scale.set(scale)
        btn_goback.anchor.set(0.5)
        btn_goback.interactive = true
        btn_goback.buttonMode = true
        btn_goback.position.set(60, 60)
        btn_goback.click = () => {
            Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
        }
        btn_goback.mouseover = function(mouseData) {
            btn_goback.scale.set(scale * 1.1)
            goBackText.scale.set(1.1)
        }
        btn_goback.mouseout = function(mouseData) {
            btn_goback.scale.set(scale)
            goBackText.scale.set(1)
        }
        title.addChild(btn_goback)
        /* goBack Text */
        let goBackText = new PIXI.Text('返回', style15)
        goBackText.anchor.set(0.5)
        goBackText.position.set(160,titleHeight/2)
        title.addChild(goBackText)
        /* title Text */
        let titleText = new PIXI.Text('練習模式', style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width/2,titleHeight/2)
        title.addChild(titleText)
        /* QuestionTotal */
        let questionTotalBg = new PIXI.Graphics()
        questionTotalBg.beginFill(0xfce800)
        questionTotalBg.drawRoundedRect(titleText.x + titleText.width / 2 + 80, titleText.y - titleText.height / 2, 55, 50, 5)
        title.addChild(questionTotalBg)

        let questionTotalText = '共       題'
        let questionTotalLabel = new PIXI.Text(questionTotalText, style16)
        questionTotalLabel.anchor.set(0.5)
        questionTotalLabel.position.set(titleText.x + titleText.width + 10, titleText.y)
        title.addChild(questionTotalLabel)

        let questionTotalNo = new PIXI.Text(this.questionTotal, style16)
        questionTotalNo.anchor.set(0.5)
        questionTotalNo.position.set(titleText.x + titleText.width / 2 + 80 + 55 / 2, titleText.y - titleText.height / 2 + 50 / 2)
        title.addChild(questionTotalNo)
        /* help */   
        let btn_help = new Button2(150,titleHeight*0.8,ResourcesManager.help,'說明')
        btn_help.pivot.set(150/2,titleHeight/2)
        btn_help.position.set(Config.screen.width-70,titleHeight/2+titleHeight*0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('', 0)
        btn_help.setText(style15)
        this.bool = false
        btn_help.click = () => {}
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
    setCharacter() {
        /* Character */
        let character = this.character
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
        armatureDisplay.position.set(250,670)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    setScreenUp() {
        let screenUp = this.screenUp
        screenUp.position.set(480,Config.screen.height*0.095)
        screenUp.visible = false
        this.addChild(screenUp)
        /* question No */
        let questionNoBg = new PIXI.Graphics()
        questionNoBg.beginFill(0xFF5336)
        questionNoBg.drawRoundedRect(0,0,130,50,10)
        questionNoBg.beginFill()
        screenUp.addChild(questionNoBg)

        let questionNoText = '第    題'
        let questionNoLabel = new PIXI.Text(questionNoText, style15)
        questionNoLabel.anchor.set(0.5)
        questionNoLabel.position.set(65,25)
        screenUp.addChild(questionNoLabel)

        let questionNo = new PIXI.Text(this.questionNo, style15)
        questionNo.anchor.set(0.5)
        questionNo.position.set(65,25)
        screenUp.addChild(questionNo)
    }
    async setScreen() {
        let screen = this.screen
        screen.position.set(480,this.screenUp.y+65)
        this.addChild(screen)

        let environment = this.environment
        await environment.init('1')
        let scale = 950 / environment.width
        environment.scale.set(scale, scale)
        screen.addChild(environment)

        let screenCover = new PIXI.Graphics()
        let screenLength = 1100
        let screenHeight = 660
        screenCover.beginFill(0xffffff,0.8)
        screenCover.drawRoundedRect(0,0,screenLength,screenHeight,10)
        screenCover.endFill()
        screen.addChild(screenCover)

        /* start button */
        let startBtn = this.startBtn
        startBtn.pivot.set(startBtn.btnWidth/2,startBtn.btnHeight/2)
        startBtn.position.set(screenLength/2,screenHeight/2)
        startBtn.setBorder(0)
        startBtn.setBackgroundColor(0xf8f9ea)
        startBtn.setText(style15)
        startBtn.click = () => {
            this.screenUp.visible = true
            startBtn.visible = !startBtn.visible
            screenCover.visible = !screenCover.visible
        }
        screen.addChild(startBtn)
    }
}
