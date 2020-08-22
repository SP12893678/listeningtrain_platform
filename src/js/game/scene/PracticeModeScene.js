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
import Dialog from 'Component/dialog'

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
        this.screenUp = new Container()
        this.questionNoShow = new PIXI.Text(this.questionNo, style15)
        this.starCheck = new Container()
        this.screen = new Container()
        this.screenCover = new PIXI.Graphics()
        this.startBtn = new Button2(200, 60, ResourcesManager.start, ' 開始   ')
        this.environment = new Environment()
        this.screenDown = new Container()
        this.nextBtn = new Button2(160, 50, ResourcesManager.nextQuestion, '下一題')
        this.listenBtn = new Button2(180, 50, ResourcesManager.listen, '再聽一次')
        this.replayBtn = new Button2(180, 50, ResourcesManager.reload, '重新開始')
        this.replayDialog = new Dialog('確定要重新開始嗎？')
        this.leaveBtn = new Button2(180, 50, ResourcesManager.leave, '結束練習')
        this.leaveDialog = new Dialog('確定要離開練習嗎？')



        this.setBackground()
        this.setTitle()
        this.setCharacter()
        this.setScreenUp()
        this.setScreen()
        this.setScreenDown()
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
            if(!this.startBtn.visible)
                this.leaveDialog.visible = true
            else
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

        let questionNoText = '第     題'
        let questionNoLabel = new PIXI.Text(questionNoText, style15)
        questionNoLabel.anchor.set(0.5)
        questionNoLabel.position.set(65,25)
        screenUp.addChild(questionNoLabel)

        let questionNoShow = this.questionNoShow 
        questionNoShow.anchor.set(0.5)
        questionNoShow.position.set(65,25)
        screenUp.addChild(questionNoShow)
        /* star */
        let starCheck = this.starCheck
        starCheck.position.set(170,0)
        screenUp.addChild(starCheck)
        for(let i = 0 ; i < this.questionTotal ; i++ ){
            let star = new PIXI.Graphics()
            star.beginFill(0xffffff)
            star.drawStar(0+i*60, 25, 5, 25, 9)
            star.endFill()
            starCheck.addChild(star)
        }
        console.log(this.starCheck)
    }
    async setScreen() {
        let screen = this.screen
        screen.length = 1050
        screen.height = 630
        screen.position.set(480,this.screenUp.y+65)
        this.addChild(screen)

        let environment = this.environment
        await environment.init('1')
        let scale =  screen.length / environment.width
        environment.scale.set(scale, scale)
        screen.height = environment.height
        screen.addChild(environment)

        let screenCover = this.screenCover
        screenCover.beginFill(0xffffff,0.8)
        screenCover.drawRoundedRect(0,0,screen.length,environment.height,10)
        screenCover.endFill()
        screen.addChild(screenCover)

        /* start button */
        let startBtn = this.startBtn
        startBtn.pivot.set(startBtn.btnWidth/2,startBtn.btnHeight/2)
        startBtn.position.set(screen.length/2,screen.height/2)
        startBtn.setBorder(0)
        startBtn.setBackgroundColor(0xf8f9ea)
        startBtn.setText(style15)
        startBtn.click = () => {
            this.screenUp.visible = true
            startBtn.visible = false
            screenCover.visible = false
            this.screenDown.visible = true

        }
        screen.addChild(startBtn)
    }
    setScreenDown(){
        let screenDown = this.screenDown
        screenDown.position.set(480,Config.screen.height*0.92)
        screenDown.visible = false
        this.addChild(screenDown)
        /* next button */
        let nextBtn = this.nextBtn
        nextBtn.position.set(0,0)
        nextBtn.setBorder(0)
        nextBtn.setCornerRadius(15)
        nextBtn.setBackgroundColor(0xF8F9EA)
        nextBtn.setText(style15)
        nextBtn.click = () =>{
            // For test
            this.starCheck.getChildAt(this.questionNo-1).tint = 0xff0000
            this.questionNo++
            if(this.questionNo > this.questionTotal)
                this.questionNo = this.questionTotal
            this.questionNoShow.text = this.questionNo
        }
        screenDown.addChild(nextBtn)
        /* reload button */
        let listenBtn = this.listenBtn
        listenBtn.position.set(nextBtn.x+nextBtn.btnWidth+10,0)
        listenBtn.setBorder(0)
        listenBtn.setCornerRadius(15)
        listenBtn.setBackgroundColor(0xF8F9EA)
        listenBtn.setText(style15)
        screenDown.addChild(listenBtn)
        /* replay dialog */
        let replayDialog = this.replayDialog
        replayDialog.visible = false
        this.addChild(replayDialog)

        replayDialog.yesBtn.click = () => {
            /* yesBtn action */
            this.reset()
            replayDialog.visible = false
        }
        replayDialog.cancelBtn.click = () => {
            /* cancelBtn action */
            replayDialog.visible = false
        }
        /* replay button */
        let replayBtn = this.replayBtn
        replayBtn.position.set(this.screen.length-replayBtn.btnWidth*2-10,0)
        replayBtn.setBorder(0)
        replayBtn.setCornerRadius(15)
        replayBtn.setBackgroundColor(0xF8F9EA)
        replayBtn.setText(style15)
        replayBtn.click = () =>{
            replayDialog.visible = true
        }
        screenDown.addChild(replayBtn)
        /* leave dialog */
        let leaveDialog = this.leaveDialog
        leaveDialog.visible = false
        this.addChild(leaveDialog)

        leaveDialog.yesBtn.click = () => {
            /* yesBtn action */
            this.reset()
            Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
            leaveDialog.visible = false
        }
        leaveDialog.cancelBtn.click = () => {
            /* cancelBtn action */
            leaveDialog.visible = false
        }
        /* leave button */
        let leaveBtn = this.leaveBtn
        leaveBtn .position.set(this.screen.length-leaveBtn.btnWidth,0)
        leaveBtn .setBorder(0)
        leaveBtn .setCornerRadius(15)
        leaveBtn .setBackgroundColor(0xF8F9EA)
        leaveBtn .setText(style15)
        leaveBtn.click = () =>{
            leaveDialog.visible = true
        }
        screenDown.addChild(leaveBtn)

    }
    reset(){
        this.questionTotalNo = this.questionTotal

        this.questionNo = 1
        this.questionNoShow.text = this.questionNo

        let starCheck = this.starCheck.children
            starCheck.forEach( star => {
                star.tint = 0xffffff
        })

        this.screenUp.visible = false
        this.startBtn.visible = true
        this.screenCover.visible = true
        this.screenDown.visible = false
    }
}
