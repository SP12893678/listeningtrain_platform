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
import Overlay from 'Component/overlay'
import RoundedButton from 'Component/RoundedButton'
import { OutlineFilter } from 'pixi-filters'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import Sound from 'pixi-sound'
import { apiManageAudio } from '@/js/api'
import * as dat from 'dat.gui'

let resources = PIXI.loader.resources

export default class PracticeModeScene extends Scene {
    constructor() {
        super()
        this.account = window.sessionStorage.getItem('account')
        this.background = new PIXI.Graphics()
        this.title = new Container()
        this.character = new character(this.account)
        this.questionTotal = 10
        this.questionNo = 1
        this.screenUp = new Container()
        this.questionNoShow = new PIXI.Text(this.questionNo, style15)
        this.starCheck = new Container()
        this.screen = new Container()
        this.screenCover = new PIXI.Graphics()
        this.startBtn = new Button2(200, 60, ResourcesManager.start, ' 開始   ')
        this.environment = new PracticeModeEnvironment()
        this.screenDown = new Container()
        this.nextBtn = new Button2(160, 50, ResourcesManager.nextQuestion, '下一題')
        this.listenBtn = new Button2(180, 50, ResourcesManager.listen, '再聽一次')
        this.replayBtn = new Button2(180, 50, ResourcesManager.reload, '重新開始')
        this.replayDialog = new Dialog('確定要重新開始嗎？')
        this.leaveBtn = new Button2(180, 50, ResourcesManager.leave, '結束練習')
        this.leaveDialog = new Dialog('確定要離開練習嗎？')
        this.questionSystem = new QuestionSystem()
        this.showAnserDialog = new showAnserDialog()

        this.setBackground()
        this.setTitle()
        this.setCharacter()
        this.setScreenUp()
        this.setScreen()
        this.setScreenDown()

        this.addChild(this.showAnserDialog)
    }

    async init(id) {
        let screen = this.screen
        let environment = this.environment
        await environment.init(id)
        let scale = screen.length / environment.width
        environment.scale.set(scale, scale)
        screen.addChild(environment)

        let questionSystem = this.questionSystem
        questionSystem.init(environment.data.objects)

        let screenCover = this.screenCover
        screenCover.beginFill(0xffffff, 0.8)
        screenCover.drawRoundedRect(0, 0, screen.length, screen.height, 10)
        screenCover.endFill()
        screen.addChild(screenCover)

        /* start button */
        let startBtn = this.startBtn
        startBtn.pivot.set(startBtn.btnWidth / 2, startBtn.btnHeight / 2)
        startBtn.position.set(screen.length / 2, screen.height / 2)
        startBtn.setBorder(0)
        startBtn.setBackgroundColor(0xf8f9ea)
        startBtn.setText(style15)
        startBtn.click = () => {
            this.screenUp.visible = true
            startBtn.visible = false
            screenCover.visible = false
            this.screenDown.visible = true
            questionSystem.play(this.questionNo - 1)
        }
        screen.addChild(startBtn)

        let listenBtn = this.listenBtn
        listenBtn.click = () => questionSystem.play(this.questionNo - 1)
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
        let titleHeight = Config.screen.height * 0.08
        titlePanel.beginFill(0xf8ba00)
        titlePanel.drawRect(0, 0, Config.screen.width, titleHeight)
        titlePanel.drawCircle(60, 60, 60)
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
            if (!this.startBtn.visible) this.leaveDialog.visible = true
            else Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
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
        goBackText.position.set(160, titleHeight / 2)
        title.addChild(goBackText)
        /* title Text */
        let titleText = new PIXI.Text('練習模式', style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width / 2, titleHeight / 2)
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

        let btn_help = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '說明')
        btn_help.pivot.set(150 / 2, titleHeight / 2)
        btn_help.position.set(Config.screen.width - 70, titleHeight / 2 + titleHeight * 0.1)
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
        armatureDisplay.position.set(250, 670)
        armatureDisplay.scale.set(0.4)
        this.addChild(armatureDisplay)
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    setScreenUp() {
        let screenUp = this.screenUp
        screenUp.position.set(480, Config.screen.height * 0.095)
        screenUp.visible = false
        this.addChild(screenUp)
        /* question No */
        let questionNoBg = new PIXI.Graphics()
        questionNoBg.beginFill(0xff5336)
        questionNoBg.drawRoundedRect(0, 0, 130, 50, 10)
        questionNoBg.beginFill()
        screenUp.addChild(questionNoBg)

        let questionNoText = '第     題'
        let questionNoLabel = new PIXI.Text(questionNoText, style15)
        questionNoLabel.anchor.set(0.5)
        questionNoLabel.position.set(65, 25)
        screenUp.addChild(questionNoLabel)

        let questionNoShow = this.questionNoShow
        questionNoShow.anchor.set(0.5)
        questionNoShow.position.set(65, 25)
        screenUp.addChild(questionNoShow)
        /* star */
        let starCheck = this.starCheck
        starCheck.position.set(170, 0)
        screenUp.addChild(starCheck)
        for (let i = 0; i < this.questionTotal; i++) {
            let star = new PIXI.Graphics()
            star.beginFill(0xffffff)
            star.drawStar(0 + i * 60, 25, 5, 25, 9)
            star.endFill()
            starCheck.addChild(star)
        }
        console.log(this.starCheck)
    }
    async setScreen() {
        let screen = this.screen
        screen.length = 1050
        screen.height = 630
        screen.position.set(480, this.screenUp.y + 65)
        this.addChild(screen)

        // let environment = this.environment
        // await environment.init('1')
        // let scale = screen.length / environment.width
        // environment.scale.set(scale, scale)
        // screen.height = environment.height
        // screen.addChild(environment)

        // let screenCover = this.screenCover
        // screenCover.beginFill(0xffffff, 0.8)
        // screenCover.drawRoundedRect(0, 0, screen.length, environment.height, 10)
        // screenCover.endFill()
        // screen.addChild(screenCover)

        // /* start button */
        // let startBtn = this.startBtn
        // startBtn.pivot.set(startBtn.btnWidth / 2, startBtn.btnHeight / 2)
        // startBtn.position.set(screen.length / 2, screen.height / 2)
        // startBtn.setBorder(0)
        // startBtn.setBackgroundColor(0xf8f9ea)
        // startBtn.setText(style15)
        // startBtn.click = () => {
        //     this.screenUp.visible = true
        //     startBtn.visible = false
        //     screenCover.visible = false
        //     this.screenDown.visible = true
        // }
        // screen.addChild(startBtn)
    }
    setScreenDown() {
        let screenDown = this.screenDown
        screenDown.position.set(480, Config.screen.height * 0.92)
        screenDown.visible = false
        this.addChild(screenDown)
        /* next button */
        let nextBtn = this.nextBtn
        nextBtn.position.set(0, 0)
        nextBtn.setBorder(0)
        nextBtn.setCornerRadius(15)
        nextBtn.setBackgroundColor(0xf8f9ea)
        nextBtn.setText(style15)
        nextBtn.update = () => {}
        nextBtn.click = () => this.nextQuestion()

        screenDown.addChild(nextBtn)
        /* reload button */
        let listenBtn = this.listenBtn
        listenBtn.position.set(nextBtn.x + nextBtn.btnWidth + 10, 0)
        listenBtn.setBorder(0)
        listenBtn.setCornerRadius(15)
        listenBtn.setBackgroundColor(0xf8f9ea)
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
        replayBtn.position.set(this.screen.length - replayBtn.btnWidth * 2 - 10, 0)
        replayBtn.setBorder(0)
        replayBtn.setCornerRadius(15)
        replayBtn.setBackgroundColor(0xf8f9ea)
        replayBtn.setText(style15)
        replayBtn.click = () => {
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
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
            leaveDialog.visible = false
        }
        leaveDialog.cancelBtn.click = () => {
            /* cancelBtn action */
            leaveDialog.visible = false
        }
        /* leave button */
        let leaveBtn = this.leaveBtn
        leaveBtn.position.set(this.screen.length - leaveBtn.btnWidth, 0)
        leaveBtn.setBorder(0)
        leaveBtn.setCornerRadius(15)
        leaveBtn.setBackgroundColor(0xf8f9ea)
        leaveBtn.setText(style15)
        leaveBtn.click = () => {
            leaveDialog.visible = true
        }
        screenDown.addChild(leaveBtn)
    }
    reset() {
        Sound.stopAll()
        this.questionTotalNo = this.questionTotal

        this.questionNo = 1
        this.questionNoShow.text = this.questionNo

        let starCheck = this.starCheck.children
        starCheck.forEach((star) => {
            star.tint = 0xffffff
        })

        this.screenUp.visible = false
        this.startBtn.visible = true
        this.screenCover.visible = true
        this.screenDown.visible = false

        this.questionSystem.init(this.environment.data.objects)
        this.environment.cancelSelectedObject()
    }

    nextQuestion() {
        if (!this.environment.selected) return

        Sound.stopAll()
        this.showAnserDialog.showAnser(this.questionSystem.question[this.questionNo - 1], this.environment.selected)
        let checkColor = (this.environment.selected.data.pic_src == this.questionSystem.question[this.questionNo - 1].pic_src) ? 0xFFFB00 : 0xDD9000
        this.showAnserDialog.confirmButton.update = () => {
            this.starCheck.getChildAt(this.questionNo - 1).tint = checkColor
            this.questionNo++
            if (this.questionNo > this.questionTotal) this.questionNo = this.questionTotal
            this.questionNoShow.text = this.questionNo
            this.environment.cancelSelectedObject()
            this.questionSystem.play(this.questionNo - 1)
        }
    }
}

class PracticeModeEnvironment extends Environment {
    constructor() {
        super()
        this.selected = null
    }

    async init(id) {
        await super.init(id)
        let audio_arr = this.data.objects.map((item) => item.sound_src)
        await apiManageAudio({ type: 'get', amount: 'part', items: audio_arr }).then((res) => {
            this.data.objects.forEach((object) => {
                object.audio = res.data.filter((audio) => audio.id == object.sound_src)[0]
            })
        })
        this.objects.forEach((object) => {
            object.interactive = true
            object.buttonMode = true
            object.mouseover = () => {
                if (this.selected != object) object.filters = [new OutlineFilter(3, 0x99ff99)]
            }
            object.mouseout = () => {
                if (this.selected != object) object.filters = [new OutlineFilter(3, 0xf0aaee)]
            }
            object.click = () => {
                if (this.selected) this.selected.filters = [new OutlineFilter(3, 0xf0aaee)]
                this.selected = object
                object.filters = [new OutlineFilter(3, 0x1976d2)]
            }
        })
    }

    cancelSelectedObject() {
        if (!this.selected) return
        this.selected.filters = [new OutlineFilter(3, 0xf0aaee)]
        this.selected = null
    }
}

class QuestionSystem {
    constructor() {
        this.question = []
        this.myAnser = []
    }

    init(data) {
        this.question = []
        for (let index = 0; index < 10; index++) {
            let i = Math.round(Math.random() * 100) % data.length
            this.question.push(data[i])
        }
        console.log(this.question)
    }

    play(index) {
        Sound.stopAll()
        Sound.add(this.question[index].audio.audio_id, resources[this.question[index].audio.sound_src])
        Sound.play(this.question[index].audio.audio_id)
    }
}

class showAnserDialog extends Overlay {
    constructor() {
        super(0.01)
        this.visible = false
        this.board = new Container()
        this.background = new Graphics()
        this.correctAnswerIcon = new Sprite()
        this.correctAnswerLabel = new PIXI.Text()
        this.correctAnser = new Sprite()
        this.yourAnswerIcon = new Sprite()
        this.yourAnswerLabel = new PIXI.Text()
        this.yourAnser = new Sprite()
        this.confirmButton = new RoundedButton('確認')

        let background = this.background
        background.beginFill(0xffffff, 0.8)
        background.drawRoundedRect(0, 0, 700, 300, 20)
        background.endFill()
        this.board.addChild(background)

        let correctAnswerIcon = this.correctAnswerIcon
        correctAnswerIcon.texture = resources[ResourcesManager.correctAnswer].texture
        correctAnswerIcon.width = 40
        correctAnswerIcon.height = 40
        correctAnswerIcon.anchor.set(0.5)
        correctAnswerIcon.position.set(80,50)
        this.board.addChild(correctAnswerIcon)

        let correctAnswerLabel = this.correctAnswerLabel
        correctAnswerLabel.text = '正確答案'
        correctAnswerLabel.style = style15
        correctAnswerLabel.anchor.set(0.5)
        correctAnswerLabel.position.set(160,50)
        this.board.addChild(correctAnswerLabel)

        let dottedLine = new Graphics()
        dottedLine.lineStyle(2,0x000000)
        let length = 150
        for(let i = 0; (i+1)*20 < length ;i++){
            dottedLine.moveTo(0,i*20+5);
            dottedLine.lineTo(0,(i+1)*20);
        }
        dottedLine.position.set(350,30)
        this.board.addChild(dottedLine)

        let yourAnswerIcon = this.yourAnswerIcon
        yourAnswerIcon.texture = resources[ResourcesManager.yourAnswer].texture
        yourAnswerIcon.width = 40
        yourAnswerIcon.height = 40
        yourAnswerIcon.anchor.set(0.5)
        yourAnswerIcon.position.set(480,50)
        this.board.addChild(yourAnswerIcon)

        let yourAnswerLabel = this.yourAnswerLabel
        yourAnswerLabel.text = '你的答案'
        yourAnswerLabel.style = style15
        yourAnswerLabel.anchor.set(0.5)
        yourAnswerLabel.position.set(560,50)
        this.board.addChild(yourAnswerLabel)

        this.confirmButton.interactive = true
        this.confirmButton.buttonMode = true
        this.confirmButton.update = () => {}
        this.confirmButton.click = () => {
            this.visible = false
            this.confirmButton.update()
        }
        this.confirmButton.position.set((700 - this.confirmButton.width) / 2, 200)
        this.board.addChild(this.confirmButton)

        this.board.position.set(640, 270)
        this.addChild(this.board)
    }

    showAnser(correctObject, yourObject) {
        let board = this.board
        let correctAnser = this.correctAnser
        let yourAnser = this.yourAnser
        correctAnser.scale.set(1, 1)
        yourAnser.scale.set(1, 1)

        correctAnser.texture = resources[correctObject.pic_src].texture
        let scale = Math.min(150 / correctAnser.width, 150 / correctAnser.height)
        correctAnser.scale.set(scale, scale)
        correctAnser.anchor.set(0.5, 0.5)

        yourAnser.texture = resources[yourObject.data.pic_src].texture
        scale = Math.min(150 / yourAnser.width, 150 / yourAnser.height)
        yourAnser.scale.set(scale, scale)
        yourAnser.anchor.set(0.5, 0.5)

        correctAnser.position.set(150, 170)
        yourAnser.position.set(550, 170)

        board.addChild(correctAnser)
        board.addChild(yourAnser)

        this.visible = true
    }
}
