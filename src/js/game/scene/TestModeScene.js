import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style6, style8, style9, style10, style13, style14, style15, style16, style17, style21 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Timer from 'Component/timer'
import Environment from '@/js/game/Environment'
import Dialog from 'Component/dialog'
import { Graphics } from 'pixi.js/lib/core'
import RadarChart from 'Component/RadarChart'
import { apiManageAudio, apiManageLearning } from '@/js/api'
import { OutlineFilter } from 'pixi-filters'
import Sound from 'pixi-sound'
import testdescription from '@/js/game/testdescription'
import ScoreCaculate from '@/js/game/exam/ScoreCaculate'
import * as dat from 'dat.gui'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const Application = PIXI.Application
const Container = PIXI.Container
const loader = PIXI.loader
const resources = PIXI.loader.resources
const TextureCache = PIXI.utils.TextureCache
const Sprite = PIXI.Sprite

export default class TestModeScene extends Scene {
    constructor () {
        super()
        this.background = new PIXI.Graphics()
        this.title = new Container()
        this.character = new character()
        this.questionTotal = 10
        this.questionNo = 1
        this.screenUp = new Container()
        this.questionNoShow = new PIXI.Text(this.questionNo, style15)
        this.timer = new Timer()
        this.screen = new Container()
        this.screenCover = new PIXI.Graphics()
        this.showNextCover = new Graphics()
        this.showNext = new PIXI.Text()
        this.startBtn = new Button2(200, 60, ResourcesManager.start, ' 開始   ')
        this.environment = new TestModeEnvironment()
        this.screenDown = new Container()
        this.leaveBtn = new Button2(180, 50, ResourcesManager.leave, '中斷測驗')
        this.leaveDialog = new Dialog('確定要中斷測驗嗎？')
        this.answerCheck = []
        this.result = new Container()
        this.resultEnvironmentPic = new Sprite()
        this.resultText = new PIXI.Text()
        this.resultText2 = new PIXI.Text()
        this.answerBoard = new AnswerBoard(this.answerCheck)
        this.questionSystem = new QuestionSystem()
        this.testdescription = new testdescription()
        this.timeline = gsap.timeline()

        this.setBackground()
        this.setTitle()
        this.setCharacter()
        this.setScreenUp()
        this.setScreen()
        this.setScreenDown()
        this.setResultPanel()
        this.addChild(this.leaveDialog)
    }

    async init (id) {
        const screen = this.screen
        const environment = this.environment
        await environment.init(id)
        const scale = screen.length / environment.width
        environment.scale.set(scale)
        screen.addChild(environment)

        environment.objects.forEach(
            (object) =>
                (object.click = () => {
                    this.environment.selected = object
                    this.questionSystem.myAnswer.push(object)
                    this.questionSystem.times.push(this.timer.text.text)
                    this.nextQuestion()
                })
        )

        const questionSystem = this.questionSystem
        questionSystem.init(environment.data.objects)

        const screenCover = this.screenCover
        screenCover.interactive = true
        screenCover.beginFill(0xffffff, 0.8)
        screenCover.drawRoundedRect(0, 0, screen.length, screen.height, 10)
        screenCover.endFill()
        screen.addChild(screenCover)

        /* start button */
        const startBtn = this.startBtn
        startBtn.pivot.set(startBtn.btnWidth / 2, startBtn.btnHeight / 2)
        startBtn.position.set(screen.length / 2, screen.height / 2)
        startBtn.setBorder(0)
        startBtn.setBackgroundColor(0xf8f9ea)
        startBtn.setText(style15)
        startBtn.click = () => {
            this.screenUp.visible = !this.screenUp.visible
            startBtn.visible = !startBtn.visible
            screenCover.visible = !screenCover.visible
            this.screenDown.visible = !this.screenDown.visible
            this.showNext.x = 425
            this.showNextCover.visible = true
            this.showNext.visible = true
            this.timeline.to(this.showNextCover, { pixi: { alpha: 1 }, duration: 1.5 })
            this.timeline.to(this.showNext, {
                pixi: { text: '開始測驗 ', alpha: 1, x: this.showNext.x + 100 },
                duration: 1.5
            })
            this.timeline.to(this.showNext, {
                pixi: { x: this.showNext.x + 200, alpha: 0 },
                duration: 1
            })
            this.timeline.to(this.showNext, {
                pixi: { x: 525, text: 'Ready go! ', alpha: 1, scale: 1 },
                duration: 1.5
            })
            this.timeline.to(this.showNext, {
                pixi: { scale: 2, alpha: 0 },
                duration: 1
            })
            this.timeline.to(this.showNextCover, {
                pixi: { alpha: 0 },
                duration: 1
            })
            let time = 0
            this.timeline.add(gsap.delayedCall(0.2, () => {
                this.timer.start()
                this.showNextCover.visible = false
                this.showNext.scale.set(1, 1)
                this.character.armatureDisplay.animation.play('listen_up', 1)
                time = this.questionSystem.play(this.questionNo - 1)
                this.timeline.add(gsap.delayedCall(time, () => {
                    if (!this.character.armatureDisplay.animation.isPlaying) {
                        this.character.armatureDisplay.animation.gotoAndPlayByFrame('listen', 15, 1)
                    }// 聽完前都沒有點擊物件的話 手再放下
                }))
            }))
            // this.timer.start()
            // questionSystem.play(this.questionNo - 1)
        }
        screen.addChild(startBtn)

        const showNext = this.showNext
        showNext.style = style21
        showNext.text = '下一題 '
        showNext.anchor.set(0.5)
        showNext.position.set(screen.length / 2, screen.height / 2)
        showNext.alpha = 0
        screen.addChild(showNext)

        const showNextCover = this.showNextCover
        showNextCover.interactive = true
        showNextCover.beginFill(0xffffff, 0.2)
        showNextCover.drawRoundedRect(0, 0, screen.length, screen.height, 10)
        showNextCover.endFill()
        showNextCover.visible = false
        screen.addChild(showNextCover)

        const testdescription = this.testdescription
        testdescription.position.set(0, 0)
        this.addChild(testdescription)
    }

    nextQuestion () {
        if (!this.environment.selected) return
        Sound.stopAll()
        this.timeline.clear()
        this.timer.stop()
        this.showNext.visible = false
        this.showNextCover.visible = false
        this.character.action.animationPlayOriginal()

        if (this.questionNo == this.questionTotal) {
            if (this.timer.state) this.timer.stop()
            this.showResult()
            this.result.visible = true
            // this.reset()
            return
        }
        this.questionNo++
        if (this.questionNo > this.questionTotal) this.questionNo = this.questionTotal
        this.questionNoShow.text = this.questionNo

        this.showNext.text = '下一題 '
        this.showNext.x = 425
        this.showNextCover.visible = true
        this.showNext.visible = true
        this.timeline.to(this.showNextCover, { pixi: { alpha: 1 }, duration: 0.5 })
        this.timeline.to(this.showNext, {
            pixi: { alpha: 1, x: this.showNext.x + 100 },
            duration: 1.5
        })
        this.timeline.to(this.showNext, {
            pixi: { x: this.showNext.x + 200, alpha: 0 },
            duration: 1
        })
        this.timeline.to(this.showNextCover, {
            pixi: { alpha: 0 },
            duration: 1
        })
        let time = 0
        this.timeline.add(gsap.delayedCall(0.2, () => {
            this.timer.start()
            this.showNextCover.visible = false
            // this.character.action.animationPlayOriginal()
            this.character.armatureDisplay.animation.play('listen_up', 1)
            time = this.questionSystem.play(this.questionNo - 1)
            this.timeline.add(gsap.delayedCall(time, () => {
                if (!this.character.armatureDisplay.animation.isPlaying) {
                    this.character.armatureDisplay.animation.gotoAndPlayByFrame('listen', 15, 1)
                }// 聽完前都沒有點擊物件的話 手再放下
            }))
        }))
    }

    setBackground () {
        const background = this.background
        background.beginFill(0xff9300)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }

    setTitle () {
        const title = this.title
        /* titlePanel */
        const titlePanel = new PIXI.Graphics()
        const titleHeight = Config.screen.height * 0.08
        titlePanel.beginFill(0xf8ba00)
        titlePanel.drawRect(0, 0, Config.screen.width, titleHeight)
        titlePanel.drawCircle(60, 60, 60)
        title.addChild(titlePanel)
        /* goBack Button */
        const btn_goback = new Sprite(resources[ResourcesManager.goBack].texture)
        const scale = 100 / btn_goback.width
        btn_goback.scale.set(scale)
        btn_goback.anchor.set(0.5)
        btn_goback.interactive = true
        btn_goback.buttonMode = true
        btn_goback.position.set(60, 60)
        btn_goback.click = () => {
            if (!this.startBtn.visible && !this.result.visible) {
                // if (this.timer.state) this.timer.stop()
                this.leaveDialog.visible = true
            }
            // if(this.result.visible) Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
            else {
                Sound.stopAll()
                Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
            }
        }
        btn_goback.mouseover = function (mouseData) {
            btn_goback.scale.set(scale * 1.1)
            goBackText.scale.set(1.1)
        }
        btn_goback.mouseout = function (mouseData) {
            btn_goback.scale.set(scale)
            goBackText.scale.set(1)
        }
        title.addChild(btn_goback)
        /* goBack Text */
        const goBackText = new PIXI.Text('返回', style15)
        goBackText.anchor.set(0.5)
        goBackText.position.set(160, titleHeight / 2)
        title.addChild(goBackText)
        /* title Text */
        const titleText = new PIXI.Text('測驗模式', style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width / 2, titleHeight / 2)
        title.addChild(titleText)
        /* QuestionTotal */
        const questionTotalBg = new PIXI.Graphics()
        questionTotalBg.beginFill(0xfce800)
        questionTotalBg.drawRoundedRect(
            titleText.x + titleText.width / 2 + 80,
            titleText.y - titleText.height / 2,
            55,
            50,
            5
        )
        title.addChild(questionTotalBg)

        const questionTotalText = '共       題'
        const questionTotalLabel = new PIXI.Text(questionTotalText, style16)
        questionTotalLabel.anchor.set(0.5)
        questionTotalLabel.position.set(titleText.x + titleText.width + 10, titleText.y)
        title.addChild(questionTotalLabel)

        const questionTotalNo = new PIXI.Text(this.questionTotal, style16)
        questionTotalNo.anchor.set(0.5)
        questionTotalNo.position.set(
            titleText.x + titleText.width / 2 + 80 + 55 / 2,
            titleText.y - titleText.height / 2 + 50 / 2
        )
        title.addChild(questionTotalNo)
        /* help */

        const btn_help = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '說明')
        btn_help.pivot.set(150 / 2, titleHeight / 2)
        btn_help.position.set(Config.screen.width - 70, titleHeight / 2 + titleHeight * 0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('', 0)
        btn_help.setText(style15)
        btn_help.click = () => {
            btn_help.click = () => (this.testdescription.dialog.visible = !this.testdescription.dialog.visible)
        }
        btn_help.mouseover = function (mouseData) {
            btn_help.scale.set(1.1)
        }
        btn_help.mouseout = function (mouseData) {
            btn_help.scale.set(1)
        }
        title.addChild(btn_help)

        this.addChild(title)
    }

    /* 建立角色 */
    async setCharacter () {
        /* Character */
        const character = this.character
        await character.check_if_has_data()
        const factory = character.factory
        const armatureDisplay = character.armatureDisplay
        armatureDisplay.position.set(250, 670)
        armatureDisplay.scale.set(0.4)
        // For testing
        // armatureDisplay.interactive = true
        // armatureDisplay.buttonMode = true
        // armatureDisplay.click = () => {
        //     this.showResult()
        //     this.result.visible = !this.result.visible
        // }
        this.addChild(armatureDisplay)
        // this.armatureDisplay.animation.play('shakeHand',1);
    }

    setScreenUp () {
        const screenUp = this.screenUp
        screenUp.position.set(480, Config.screen.height * 0.095)
        screenUp.visible = false
        this.addChild(screenUp)
        /* question No */
        const questionNoBg = new PIXI.Graphics()
        questionNoBg.beginFill(0xff5336)
        questionNoBg.drawRoundedRect(0, 0, 130, 50, 10)
        questionNoBg.beginFill()
        screenUp.addChild(questionNoBg)

        const questionNoText = '第     題'
        const questionNoLabel = new PIXI.Text(questionNoText, style15)
        questionNoLabel.anchor.set(0.5)
        questionNoLabel.position.set(65, 25)
        screenUp.addChild(questionNoLabel)

        const questionNoShow = this.questionNoShow
        questionNoShow.anchor.set(0.5)
        questionNoShow.position.set(65, 25)
        screenUp.addChild(questionNoShow)
        /* timer icon */
        const timerIcon = new Sprite(resources[ResourcesManager.clock].texture)
        timerIcon.scale.set(40 / timerIcon.width)
        timerIcon.position.set(890, 8)
        screenUp.addChild(timerIcon)
        /* timer */
        const timer = this.timer
        timer.position.set(timerIcon.x + timerIcon.width + 10, timerIcon.y + (timerIcon.height - timer.height) / 2)
        screenUp.addChild(timer)
    }

    async setScreen () {
        const screen = this.screen
        screen.length = 1050
        screen.height = 630
        screen.position.set(480, this.screenUp.y + 65)
        this.addChild(screen)
    }

    setScreenDown () {
        const screenDown = this.screenDown
        screenDown.position.set(480, Config.screen.height * 0.92)
        screenDown.visible = false
        this.addChild(screenDown)
        /* leave dialog */
        const leaveDialog = this.leaveDialog
        leaveDialog.visible = false
        // this.addChild(leaveDialog)

        leaveDialog.yesBtn.click = () => {
            /* yesBtn action */
            this.timer.stop()
            this.showResult()
            this.result.visible = true
            // Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
            leaveDialog.visible = false
        }
        leaveDialog.cancelBtn.click = () => {
            /* cancelBtn action */
            leaveDialog.visible = false
            // this.timer.start()
        }
        /* leave button */
        const leaveBtn = this.leaveBtn
        leaveBtn.position.set(this.screen.length - leaveBtn.btnWidth, 0)
        leaveBtn.setBorder(0)
        leaveBtn.setCornerRadius(15)
        leaveBtn.setBackgroundColor(0xf8f9ea)
        leaveBtn.setText(style15)
        leaveBtn.click = () => {
            leaveDialog.visible = true
            // if (this.timer.state) this.timer.stop()
        }
        screenDown.addChild(leaveBtn)
    }

    reset () {
        Sound.stopAll()
        this.timeline.clear()
        if (this.timer.state) this.timer.stop()
        this.showNext.visible = false
        this.showNextCover.visible = false
        this.character.action.animationPlayOriginal()

        this.questionNo = 1
        this.questionNoShow.text = this.questionNo

        this.screenUp.visible = false
        this.startBtn.visible = true
        this.screenCover.visible = true
        this.screenDown.visible = false
        this.timer.reset()
    }

    setResultPanel () {
        const result = this.result
        result.visible = false
        result.position.set(this.screenUp.x, this.screenUp.y)
        this.addChild(result)

        const resultPanel = new PIXI.Graphics()
        resultPanel.interactive = true
        const panelLength = Config.screen.width - this.screenUp.x - 20
        const panelHeight = Config.screen.height - this.screenUp.y - 20
        resultPanel.beginFill(0xfbffe0)
        resultPanel.drawRoundedRect(0, 0, panelLength, panelHeight, 10)
        resultPanel.endFill()
        result.addChild(resultPanel)
        /* title */
        const title = new PIXI.Graphics()
        title.beginFill(0xff644e)
        title.drawRoundedRect(panelLength - 200, 0, 200, 60, 10)
        title.endFill()
        result.addChild(title)
        const titleText = new PIXI.Text('測驗結果', style6)
        titleText.anchor.set(0.5)
        titleText.position.set(panelLength - 100, 30)
        result.addChild(titleText)
        /* environment pic */
        const EnvironmentPicMask = new PIXI.Graphics()
        EnvironmentPicMask.beginFill(0xffffff)
        EnvironmentPicMask.drawRoundedRect(0, 0, 500, 280, 10)
        EnvironmentPicMask.endFill()
        EnvironmentPicMask.position.set(40, 40)
        result.addChild(EnvironmentPicMask)

        const EnvironmentPic = this.resultEnvironmentPic
        EnvironmentPic.mask = EnvironmentPicMask
        EnvironmentPic.position.set(40, 40)
        result.addChild(EnvironmentPic)

        /* result text */
        const resultText = this.resultText
        resultText.position.set(600, 50)
        resultText.style = style17
        result.addChild(resultText)
        /* result text 2 */
        const resultText2 = this.resultText2
        resultText2.position.set(600, 230)
        const tempStyle = style17.clone()
        tempStyle.fill = 0x004D7F
        resultText2.style = tempStyle
        result.addChild(resultText2)
        //  /* button:詳細反應時間 */
        //  let detailTimes = new Button2(210, 40, ResourcesManager.question, '各題作答時間')
        //  detailTimes.position.set(870, 150)
        //  let tempStyle2 = style8.clone()
        //  tempStyle2.fill = 0xffffff
        //  detailTimes.setText(tempStyle2)
        //  detailTimes.setBorder(0)
        //  detailTimes.setCornerRadius(10)
        //  detailTimes.setBackgroundColor(0xf4814e)
        //  detailTimes.interactive = true
        //  detailTimes.buttonMode = true
        //  result.addChild(detailTimes)
        const textStyle = style15.clone()
        textStyle.fontSize = 24
        /* answerCheck */
        const no = new PIXI.Text('No', textStyle)
        no.position.set(25, 355)
        result.addChild(no)

        const correctAnswer = new Sprite(resources[ResourcesManager.correctAnswer].texture)
        correctAnswer.width = 35
        correctAnswer.height = 35
        correctAnswer.position.set(no.x + no.width + 5, no.y - 5)
        result.addChild(correctAnswer)

        const correctAnswerTitle = new PIXI.Text('正確答案', textStyle)
        correctAnswerTitle.position.set(correctAnswer.x + correctAnswer.width + 5, no.y)
        result.addChild(correctAnswerTitle)

        const yourAnswer = new Sprite(resources[ResourcesManager.yourAnswer].texture)
        yourAnswer.width = 35
        yourAnswer.height = 35
        yourAnswer.position.set(correctAnswerTitle.x + correctAnswerTitle.width + 5, no.y - 5)
        result.addChild(yourAnswer)

        const yourAnswerTitle = new PIXI.Text('你的答案', textStyle)
        yourAnswerTitle.position.set(yourAnswer.x + yourAnswer.width + 5, no.y)
        result.addChild(yourAnswerTitle)

        const timerIcon = new Sprite(resources[ResourcesManager.clock].texture)
        timerIcon.width = 35
        timerIcon.height = 35
        timerIcon.position.set(yourAnswerTitle.x + yourAnswerTitle.width + 5, no.y - 5)
        result.addChild(timerIcon)

        const timeTitle = new PIXI.Text('作答時間', textStyle)
        timeTitle.position.set(timerIcon.x + timerIcon.width + 5, no.y)
        result.addChild(timeTitle)

        const check = new Sprite(resources[ResourcesManager.check].texture)
        check.width = 35
        check.height = 35
        check.position.set(timeTitle.x + timeTitle.width + 5, no.y - 5)
        result.addChild(check)

        const answerBoard = this.answerBoard
        answerBoard.position.set(no.x, no.y + no.height + 10)
        result.addChild(answerBoard)

        const learningData = new Container()
        result.addChild(learningData)
        learningData.position.set(600, 375)

        const line = new PIXI.Graphics()
        line.lineStyle(2, 0x000000)
        line.drawRect(0, 0, 450, 350)
        learningData.addChild(line)
        /* 雷達圖 */
        const labels = ['正確率', '反應\n速度', '  聲音頻率<300Hz\n             的正確率', '  聲音頻率>6000Hz\n           的正確率', '完成度']
        const datasets = [
            // { name: '最近一次測驗', data: [50, 10, 75, 150, 100] },
            // { name: '個人學習平均值', data: [100, 70, 150, 80, 30] },
        ]
        const chart = new RadarChart(labels, datasets)
        chart.position.set(230, 195)
        chart.barLabel.position.set(-390, 340)
        chart.scale.set(380 / chart.width)
        learningData.addChild(chart)
        this.chart = chart
        /* button:各能力計算標準 */
        const standardBtn = new Button2(180, 40, ResourcesManager.question, '能力計算標準')
        standardBtn.position.set(265, 365)
        standardBtn.setText(style8)
        standardBtn.setBorder(0)
        standardBtn.setCornerRadius(10)
        standardBtn.setBackgroundColor(0xffa050)
        standardBtn.interactive = true
        standardBtn.buttonMode = true
        learningData.addChild(standardBtn)

        const standardContainer = new Container()
        standardContainer.visible = false
        result.addChild(standardContainer)
        standardContainer.position.set(25, 40)
        /* panel */
        const standardPanel = new PIXI.Graphics()
        standardPanel.lineStyle(3, 0x000000)
        standardPanel.beginFill(0xfbffe0)
        standardPanel.drawRoundedRect(0, 0, 525, panelHeight - 80, 10)
        standardPanel.endFill()
        standardContainer.addChild(standardPanel)
        /* title:※各能力的計算標準? */
        const standardTitle = new PIXI.Text('※各能力的計算標準?', style10)
        standardTitle.anchor.set(0.5)
        standardTitle.position.set(262.5, 150)
        standardContainer.addChild(standardTitle)
        /* standard */
        const standard = [
            { name: '正確率', data: '本次測驗答題正確數 / 本次測驗題數' },
            { name: '完成度', data: '本次測驗完成物件數 / 該情境物件數' },
            {
                name: '反應速度',
                data: '平均作答所需時間'
            },
            { name: '聲音頻率>6000Hz的正確率', data: '本次測驗聲音頻率>6000Hz物件答對數 / 本次測驗聲音頻率>6000Hz物件數' },
            { name: '聲音頻率<300Hz的正確率', data: '本次測驗聲音頻率<300Hz物件答對數 / 本次測驗聲音頻率<300Hz物件數' }
        ]
        let index = 1
        const textStyle2 = style9.clone()
        textStyle2.wordWrapWidth = 500
        standard.forEach((standard) => {
            let str = '-' + standard.name
            const name = new PIXI.Text(str, style13)
            name.position.set(35, 100 + 100 * index)
            standardContainer.addChild(name)
            str = standard.data
            const data = new PIXI.Text(str, textStyle2)
            data.position.set(name.x + 10, name.y + name.height + 15)
            standardContainer.addChild(data)
            index++
        })
        standardBtn.click = () => {
            standardContainer.visible = !standardContainer.visible
        }
        // const gui = new dat.GUI()
        // var effectController = {
        //     chart: { X: 550, Y: 70 },
        // }

        // var chartgui = gui.addFolder('chart')
        // chartgui.add(effectController.chart, 'X', 0, 1600, 1).onChange(countChange)
        // chartgui.add(effectController.chart, 'Y', 0, 900, 1).onChange(countChange)
        // chartgui.open()

        // function countChange() {
        //     chart.position.set(effectController.chart.X, effectController.chart.Y)
        // }
    }

    async showResult () {
        this.timer.stop()
        // test
        this.answerCheck = []
        this.answerBoard.data = []
        this.questionSystem.question.forEach((item, index) => {
            this.answerCheck.push({
                correctAnswer: item,
                yourAnswer: this.questionSystem.myAnswer[index]
            })
            this.answerBoard.data.push({
                correctAnswer: item,
                yourAnswer: this.questionSystem.myAnswer[index],
                times: this.timer.differ(this.questionSystem.times[index - 1], this.questionSystem.times[index])
            })
        })

        const environmentName = this.environment.data.environment.name
        const envionmentPicTexture = this.environment.background._texture
        const scale = Math.max(500 / envionmentPicTexture.width, 280 / envionmentPicTexture.height)
        this.resultEnvironmentPic.texture = envionmentPicTexture
        this.resultEnvironmentPic.scale.set(scale)

        /** 取得資料庫測驗資料並計算學習平均成績 */
        let average_score_data = []
        const scroeSystem = new ScoreCaculate()
        await scroeSystem.getExamData()
        if (scroeSystem.hasExamData(this.environment.data.environment.id)) {
            average_score_data = scroeSystem.getAverageScoreData(this.environment.data.environment.id)
            this.chart.addChart('過去次平均學習成績', average_score_data)
        }

        /** 計算當前測驗成績 */
        const exam = {
            questions: []
        }

        this.questionSystem.question.forEach((question, index) => {
            exam.questions.push({
                object_id: question.id,
                your_answer_id: (this.questionSystem.myAnswer[index] != undefined) ? this.questionSystem.myAnswer[index].data.id : '',
                times: this.timer.differ(this.questionSystem.times[index - 1], this.questionSystem.times[index])
            })
        })

        /** 正確率 */
        const correct_questions = exam.questions.filter((question) => question.object_id == question.your_answer_id)
        exam.accuracy = { your: correct_questions.length, all: exam.questions.length }

        /** 完成度 */
        const completion_questions = []
        correct_questions.forEach((question) => {
            if (completion_questions.findIndex((item) => item.object_id == question.object_id) == -1) { completion_questions.push(question) }
        })
        exam.completion = { your: completion_questions.length, all: this.environment.objects.length }

        /** 反應速度 */
        exam.response_rate = 50

        /** 高頻 */
        let high_frequency_question_counts = 0
        let high_frequency_question_correct_counts = 0
        this.questionSystem.question.forEach((question, index) => {
            let high = false
            question.audio.frequency.forEach((frequency) => {
                if (frequency.max > 2000) high = true
            })
            if (high) high_frequency_question_counts++
            if (this.questionSystem.myAnswer[index] != undefined) {
                if (high && question.id == this.questionSystem.myAnswer[index].data.id) { high_frequency_question_correct_counts++ }
            }
        })
        exam.high_frequency_accuracy = {
            your: high_frequency_question_correct_counts,
            all: high_frequency_question_counts
        }

        /** 低頻 */
        let low_frequency_question_counts = 0
        let low_frequency_question_correct_counts = 0
        this.questionSystem.question.forEach((question, index) => {
            let low = false
            question.audio.frequency.forEach((frequency) => {
                if (frequency.min < 300) low = true
            })
            if (low) low_frequency_question_counts++
            if (this.questionSystem.myAnswer[index] != undefined) {
                if (low && question.id == this.questionSystem.myAnswer[index].data.id) { low_frequency_question_correct_counts++ }
            }
        })
        exam.low_frequency_accuracy = {
            your: low_frequency_question_correct_counts,
            all: low_frequency_question_counts
        }

        exam.enviro_id = this.environment.data.environment.id
        exam.enviro_name = this.environment.data.environment.name
        exam.usetime = this.timer.text.text
        const date = new Date()
        const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        exam.time = time
        apiManageLearning({ type: 'update', mode: 'test', item: exam }).then((res) => {
            console.log(res.data)
        })
        const have_answer = exam.questions.filter((question) => question.your_answer_id != '').length
        const correctTotal = correct_questions.length
        const resultText = this.resultText
        resultText.text =
            '作答情境: ' +
            environmentName +
            '\n作答題數: ' +
            this.questionTotal +
            ' 題' +
            '\n答對題數: ' +
            correctTotal +
            ' 題' +
            '\n作答時間: ' +
            this.timer.text.text +
            '\n平均作答時間: ' +
            this.timer.average(this.timer.text.text, have_answer)
        const resultText2 = this.resultText2
        resultText2.text =
            '完成物件數: ' +
            exam.completion.your +
            '\n聲音頻率>6000正確題數: ' +
            exam.high_frequency_accuracy.your +
            '\n聲音頻率<300正確題數: ' +
            exam.low_frequency_accuracy.your
        this.answerBoard.update()

        this.reset()
    }
}

/** 測驗結果
 * 正確率: 本次測驗答題正確數 / 本次測驗題數
 * 反應速度: 平均答題所需時間
 * 完成度: 本次測驗完成物件數 / 該情境物件數
 * 低頻辨識率: 本次測驗低頻物件答對數 / 本次測驗低頻物件數
 * 高頻辨識率: 本次測驗高頻物件答對數 / 本次測驗高頻物件數
 *
 * 測驗完流程
 * 取得資料庫測驗資料並計算學習平均成績
 * 計算當前測驗成績
 * 將當前測驗資料和成績儲存至資料庫
 * 呈現測驗結果至畫面
 */

class AnswerBoard extends Container {
    constructor (data) {
        super()
        this.data = data

        this.background = new Graphics()
        this.list = new Container()
        this.listColor = [0xffffff, 0xefefef]

        this.setBackground()
        // this.setList()
    }

    setBackground () {
        const background = this.background
        background.beginFill(0xffffff)
        background.drawRoundedRect(0, 0, 500, 350, 10)
        background.endFill()
        this.addChild(background)
    }

    setList () {
        const list = this.list
        this.addChild(list)

        const listContainer = new Container()
        list.addChild(listContainer)

        const listMask = new Graphics()
        listMask.beginFill(0x000000)
        listMask.drawRoundedRect(0, 0, 500, 350, 10)
        listMask.endFill()
        list.addChild(listMask)

        const data = this.data
        const listColor = this.listColor
        const textStyle = style15.clone()
        textStyle.fontSize = 24

        for (let i = 0; i < data.length; i++) {
            const bg = new Graphics()
            bg.beginFill(listColor[i % 2])
            bg.drawRect(0, 120 * i, 500, 120)
            bg.endFill()
            bg.lineStyle(1, 0x000000)
            bg.moveTo(40, 120 * i)
            bg.lineTo(40, 120 * (i + 1))
            bg.moveTo(180, 120 * i)
            bg.lineTo(180, 120 * (i + 1))
            bg.moveTo(320, 120 * i)
            bg.lineTo(320, 120 * (i + 1))
            bg.moveTo(460, 120 * i)
            bg.lineTo(460, 120 * (i + 1))
            listContainer.addChild(bg)

            const no = new PIXI.Text(i + 1, textStyle)
            no.anchor.set(0.5)
            no.position.set(20, 60 * (i * 2 + 1)) // width 40
            listContainer.addChild(no)

            const correctAnswer = data[i].correctAnswer
            const correct = new Sprite()
            correct.texture = resources[correctAnswer.pic_src].texture
            let scale = Math.min(90 / correct.width, 90 / correct.height)
            correct.scale.set(scale)
            correct.anchor.set(0.5)
            correct.position.set(110, 60 * (i * 2 + 1)) // width 140 40
            listContainer.addChild(correct)

            const yourAnswer = data[i].yourAnswer
            let your
            if (yourAnswer != undefined) {
                your = new Sprite()
                your.texture = resources[yourAnswer.data.pic_src].texture
                scale = Math.min(90 / your.width, 90 / your.height)
                your.scale.set(scale)
            } else {
                const noAnswerTextStyle = style15.clone()
                noAnswerTextStyle.fill = 0x004d7f
                your = new PIXI.Text('沒有作答', noAnswerTextStyle)
            }
            your.anchor.set(0.5)
            your.position.set(250, 60 * (i * 2 + 1)) // width 140 180
            listContainer.addChild(your)

            const times = new PIXI.Text(data[i].times, textStyle)
            times.anchor.set(0.5)
            times.position.set(390, 60 * (i * 2 + 1)) // width 140 320
            listContainer.addChild(times)

            const checkItem = (yourAnswer != undefined) ? yourAnswer.data.id : ''
            const checkAnswer = correctAnswer.id == checkItem ? 'O' : 'X'
            const style = textStyle.clone()
            const check = new PIXI.Text(checkAnswer, style)
            check.style.fill = checkAnswer == 'O' ? 0x017100 : 0xee220c
            check.anchor.set(0.5)
            check.position.set(480, 60 * (i * 2 + 1)) // width 40 460
            listContainer.addChild(check)
        }

        listContainer.mask = listMask
        const scroller = new VerticalScroller(10, listContainer, listMask)
        scroller.position.set(495, 0)
        list.addChild(scroller)
    }

    update () {
        this.list.removeChildren()
        this.setList()
    }
}

class TestModeEnvironment extends Environment {
    constructor () {
        super()
        this.selected = null
    }

    async init (id) {
        await super.init(id)
        const audio_arr = this.data.objects.map((item) => item.sound_src)
        await apiManageAudio({
            type: 'get',
            amount: 'part',
            items: audio_arr
        }).then((res) => {
            this.data.objects.forEach((object) => {
                object.audio = res.data.filter((audio) => audio.id == object.sound_src)[0]
                object.audio.frequency = object.audio.frequency.split(';')
                const frequencies = []
                object.audio.frequency.forEach((frequency) => {
                    const less_re = new RegExp(/\</g)
                    const greater_re = new RegExp(/\>/g)
                    const equal_re = new RegExp(/\~/g)
                    let max, min

                    if (less_re.test(frequency)) {
                        max = frequency.match(/\d+/g)[0]
                        min = Number.MIN_VALUE
                    } else if (greater_re.test(frequency)) {
                        min = frequency.match(/\d+/g)[0]
                        max = Number.MAX_VALUE
                    } else if (equal_re.test(frequency)) {
                        ;[min, max] = frequency.match(/\d+/g)
                    }

                    frequencies.push({ min, max })
                })
                object.audio.frequency = frequencies
            })
        })
        this.objects.forEach((object) => {
            object.interactive = true
            object.buttonMode = true
            object.mouseover = () => (object.filters = [new OutlineFilter(3, 0x99ff99)])
            object.mouseout = () => (object.filters = [new OutlineFilter(3, 0xf0aaee)])
        })
    }

    cancelSelectedObject () {
        if (!this.selected) return
        this.selected.filters = [new OutlineFilter(3, 0xf0aaee)]
        this.selected = null
    }
}

class QuestionSystem {
    constructor () {
        this.question = []
        this.myAnswer = []
        this.times = []
    }

    init (data) {
        this.question = []
        for (let index = 0; index < 10; index++) {
            const i = Math.round(Math.random() * 100) % data.length
            this.question.push(data[i])
        }
    }

    play (index) {
        Sound.stopAll()
        Sound.add(this.question[index].audio.audio_id, resources[this.question[index].audio.sound_src])
        Sound.play(this.question[index].audio.audio_id)
        const test = resources[this.question[index].audio.sound_src].sound
        return test.duration
    }
}
