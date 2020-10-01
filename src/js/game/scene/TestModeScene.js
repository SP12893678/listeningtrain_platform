import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import VerticalScroller from 'Component/VerticalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style6, style8, style14, style15, style16, style17 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Timer from 'Component/timer'
import Environment from '@/js/game/Environment'
import Dialog from 'Component/dialog'
import { Graphics } from 'pixi.js/lib/core'
import RadarChart from 'Component/RadarChart'
import { apiManageAudio, apiManageExam } from '@/js/api'
import { OutlineFilter } from 'pixi-filters'
import Sound from 'pixi-sound'
import testdescription from '@/js/game/testdescription'
import ScoreCaculate from '@/js/game/exam/ScoreCaculate'
import * as dat from 'dat.gui'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class TestModeScene extends Scene {
    constructor() {
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
        this.startBtn = new Button2(200, 60, ResourcesManager.start, ' 開始   ')
        this.environment = new TestModeEnvironment()
        this.screenDown = new Container()
        this.leaveBtn = new Button2(180, 50, ResourcesManager.leave, '結束測驗')
        this.leaveDialog = new Dialog('確定要離開測驗嗎？')
        this.answerCheck = [
            { correctAnswer: '1', yourAnswer: '2' },
            { correctAnswer: '2', yourAnswer: '2' },
            { correctAnswer: '1', yourAnswer: '3' },
            { correctAnswer: '4', yourAnswer: '4' },
        ]
        this.result = new Container()
        this.resultEnvironmentPic = new Sprite()
        this.resultText = new PIXI.Text()
        this.answerBoard = new AnswerBoard(this.answerCheck)
        this.questionSystem = new QuestionSystem()
        this.testdescription = new testdescription()

        this.setBackground()
        this.setTitle()
        this.setCharacter()
        this.setScreenUp()
        this.setScreen()
        this.setScreenDown()
        this.setResultPanel()
        this.addChild(this.leaveDialog)
    }
    async init(id) {
        let screen = this.screen
        let environment = this.environment
        await environment.init(id)
        let scale = screen.length / environment.width
        environment.scale.set(scale)
        screen.addChild(environment)

        environment.objects.forEach(
            (object) =>
                (object.click = () => {
                    this.environment.selected = object
                    this.questionSystem.myAnswer.push(object)
                    this.nextQuestion()
                })
        )

        let questionSystem = this.questionSystem
        questionSystem.init(environment.data.objects)

        let screenCover = this.screenCover
        screenCover.interactive = true
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
            this.screenUp.visible = !this.screenUp.visible
            startBtn.visible = !startBtn.visible
            screenCover.visible = !screenCover.visible
            this.screenDown.visible = !this.screenDown.visible
            this.timer.start()
            questionSystem.play(this.questionNo - 1)
        }
        screen.addChild(startBtn)
        let testdescription = this.testdescription
        testdescription.position.set(0, 0)
        this.addChild(testdescription)
    }

    nextQuestion() {
        if (!this.environment.selected) return
        Sound.stopAll()

        if (this.questionNo == this.questionTotal) {
            if (this.timer.state) this.timer.stop()
            this.showResult()
            this.result.visible = true
            this.reset()
            return
        }

        this.questionNo++
        if (this.questionNo > this.questionTotal) this.questionNo = this.questionTotal
        this.questionNoShow.text = this.questionNo
        this.questionSystem.play(this.questionNo - 1)
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
            if (!this.startBtn.visible) {
                if (this.timer.state) this.timer.stop()
                this.leaveDialog.visible = true
            } else Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
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
        let titleText = new PIXI.Text('測驗模式', style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width / 2, titleHeight / 2)
        title.addChild(titleText)
        /* QuestionTotal */
        let questionTotalBg = new PIXI.Graphics()
        questionTotalBg.beginFill(0xfce800)
        questionTotalBg.drawRoundedRect(
            titleText.x + titleText.width / 2 + 80,
            titleText.y - titleText.height / 2,
            55,
            50,
            5
        )
        title.addChild(questionTotalBg)

        let questionTotalText = '共       題'
        let questionTotalLabel = new PIXI.Text(questionTotalText, style16)
        questionTotalLabel.anchor.set(0.5)
        questionTotalLabel.position.set(titleText.x + titleText.width + 10, titleText.y)
        title.addChild(questionTotalLabel)

        let questionTotalNo = new PIXI.Text(this.questionTotal, style16)
        questionTotalNo.anchor.set(0.5)
        questionTotalNo.position.set(
            titleText.x + titleText.width / 2 + 80 + 55 / 2,
            titleText.y - titleText.height / 2 + 50 / 2
        )
        title.addChild(questionTotalNo)
        /* help */

        let btn_help = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '說明')
        btn_help.pivot.set(150 / 2, titleHeight / 2)
        btn_help.position.set(Config.screen.width - 70, titleHeight / 2 + titleHeight * 0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('', 0)
        btn_help.setText(style15)
        btn_help.click = () => {
            btn_help.click = () => (this.testdescription.dialog.visible = !this.testdescription.dialog.visible)
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
    async setCharacter() {
        /* Character */
        let character = this.character
        await character.check_if_has_data()
        let factory = character.factory
        let armatureDisplay = character.armatureDisplay
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

        let questionNoText = '第    題'
        let questionNoLabel = new PIXI.Text(questionNoText, style15)
        questionNoLabel.anchor.set(0.5)
        questionNoLabel.position.set(65, 25)
        screenUp.addChild(questionNoLabel)

        let questionNoShow = this.questionNoShow
        questionNoShow.anchor.set(0.5)
        questionNoShow.position.set(65, 25)
        screenUp.addChild(questionNoShow)
        /* timer icon */
        let timerIcon = new Sprite(resources[ResourcesManager.clock].texture)
        timerIcon.scale.set(40 / timerIcon.width)
        timerIcon.position.set(920, 8)
        screenUp.addChild(timerIcon)
        /* timer */
        let timer = this.timer
        timer.position.set(timerIcon.x + timerIcon.width + 10, timerIcon.y + (timerIcon.height - timer.height) / 2)
        screenUp.addChild(timer)
    }
    async setScreen() {
        let screen = this.screen
        screen.length = 1050
        screen.height = 630
        screen.position.set(480, this.screenUp.y + 65)
        this.addChild(screen)
    }
    setScreenDown() {
        let screenDown = this.screenDown
        screenDown.position.set(480, Config.screen.height * 0.92)
        screenDown.visible = false
        this.addChild(screenDown)
        /* leave dialog */
        let leaveDialog = this.leaveDialog
        leaveDialog.visible = false
        // this.addChild(leaveDialog)

        leaveDialog.yesBtn.click = () => {
            /* yesBtn action */
            this.reset()
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
            leaveDialog.visible = false
        }
        leaveDialog.cancelBtn.click = () => {
            /* cancelBtn action */
            leaveDialog.visible = false
            this.timer.start()
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
            if (this.timer.state) this.timer.stop()
        }
        screenDown.addChild(leaveBtn)
    }
    reset() {
        this.questionNo = 1
        this.questionNoShow.text = this.questionNo

        this.screenUp.visible = false
        this.startBtn.visible = true
        this.screenCover.visible = true
        this.screenDown.visible = false
        this.timer.reset()
    }
    setResultPanel() {
        let result = this.result
        result.visible = false
        result.position.set(this.screenUp.x, this.screenUp.y)
        this.addChild(result)

        let resultPanel = new PIXI.Graphics()
        resultPanel.interactive = true
        let panelLength = Config.screen.width - this.screenUp.x - 20
        let panelHeight = Config.screen.height - this.screenUp.y - 20
        resultPanel.beginFill(0xfbffe0)
        resultPanel.drawRoundedRect(0, 0, panelLength, panelHeight, 10)
        resultPanel.endFill()
        result.addChild(resultPanel)
        /* title */
        let title = new PIXI.Graphics()
        title.beginFill(0xff644e)
        title.drawRoundedRect(panelLength - 200, 0, 200, 60, 10)
        title.endFill()
        result.addChild(title)
        let titleText = new PIXI.Text('測驗結果', style6)
        titleText.anchor.set(0.5)
        titleText.position.set(panelLength - 100, 30)
        result.addChild(titleText)
        /* environment pic */
        let EnvironmentPicMask = new PIXI.Graphics()
        EnvironmentPicMask.beginFill(0xffffff)
        EnvironmentPicMask.drawRoundedRect(0, 0, 450, 280, 10)
        EnvironmentPicMask.endFill()
        EnvironmentPicMask.position.set(50, 50)
        result.addChild(EnvironmentPicMask)

        let EnvironmentPic = this.resultEnvironmentPic
        EnvironmentPic.mask = EnvironmentPicMask
        EnvironmentPic.position.set(50, 50)
        result.addChild(EnvironmentPic)
        /* result text */
        let resultText = this.resultText
        resultText.position.set(550, 60)
        result.addChild(resultText)
        /* answerCheck*/
        let no = new PIXI.Text('題數', style15)
        no.position.set(50, 350)
        result.addChild(no)

        let correctAnswer = new Sprite(resources[ResourcesManager.correctAnswer].texture)
        correctAnswer.width = 40
        correctAnswer.height = 40
        correctAnswer.position.set(no.x + no.width + 5, no.y)
        result.addChild(correctAnswer)

        let correctAnswerTitle = new PIXI.Text('正確答案', style15)
        correctAnswerTitle.position.set(correctAnswer.x + correctAnswer.width + 5, correctAnswer.y)
        result.addChild(correctAnswerTitle)

        let yourAnswer = new Sprite(resources[ResourcesManager.yourAnswer].texture)
        yourAnswer.width = 40
        yourAnswer.height = 40
        yourAnswer.position.set(correctAnswerTitle.x + correctAnswerTitle.width + 5, correctAnswerTitle.y)
        result.addChild(yourAnswer)

        let yourAnswerTitle = new PIXI.Text('你的答案', style15)
        yourAnswerTitle.position.set(yourAnswer.x + yourAnswer.width + 5, correctAnswer.y)
        result.addChild(yourAnswerTitle)

        let check = new Sprite(resources[ResourcesManager.check].texture)
        check.width = 40
        check.height = 40
        check.position.set(yourAnswerTitle.x + yourAnswerTitle.width + 10, yourAnswerTitle.y)
        result.addChild(check)

        let answerBoard = this.answerBoard
        answerBoard.position.set(no.x, no.y + no.height + 10)
        result.addChild(answerBoard)

        /* 雷達圖 */
        let labels = ['正確率', '反應\n速度', '  聲音頻率<300\n的正確率', '  聲音頻率>6000\n的正確率', '完成度']
        let datasets = [
            // { name: '最近一次測驗', data: [50, 10, 75, 150, 100] },
            // { name: '個人學習平均值', data: [100, 70, 150, 80, 30] },
        ]
        let chart = new RadarChart(labels, datasets)
        chart.position.set(780, 570)
        chart.barLabel.position.set(-390, 340)
        chart.scale.set(380 / chart.width)
        result.addChild(chart)
        this.chart = chart
        /* button:各能力計算標準 */
        let standardBtn = new Button2(180, 40, ResourcesManager.question, '能力計算標準')
        standardBtn.position.set(820, 740)
        standardBtn.setText(style8)
        standardBtn.setBorder(0)
        standardBtn.setCornerRadius(10)
        standardBtn.setBackgroundColor(0xffa050)
        standardBtn.interactive = true
        standardBtn.buttonMode = true
        result.addChild(standardBtn)

        let line = new PIXI.Graphics()
        line.lineStyle(2, 0x000000)
        line.drawRect(0, 0, 450, 350)
        line.position.set(550, 375)
        result.addChild(line)

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
    async showResult() {
        //test
        this.answerCheck = []
        this.answerBoard.data = []
        this.questionSystem.question.forEach((item, index) => {
            this.answerCheck.push({
                correctAnswer: item,
                yourAnswer: this.questionSystem.myAnswer[index],
            })
            this.answerBoard.data.push({
                correctAnswer: item,
                yourAnswer: this.questionSystem.myAnswer[index],
            })
        })

        let environmentName = this.environment.data.environment.name
        let correct = this.answerCheck.filter((check) => {
            return check.correctAnswer.id == check.yourAnswer.data.id
        })

        let envionmentPicTexture = this.environment.background._texture
        let scale = Math.max(450 / envionmentPicTexture.width, 280 / envionmentPicTexture.height)
        this.resultEnvironmentPic.texture = envionmentPicTexture
        this.resultEnvironmentPic.scale.set(scale)

        /**取得資料庫測驗資料並計算學習平均成績 */
        this.average_score_data = []
        let past_exams = []
        let the_enviro_past_exam = []
        let scroeSystem = new ScoreCaculate()
        let average_score = scroeSystem.getDefaultFormateObject()

        await apiManageExam({ type: 'get' }).then((res) => {
            if (res.data == null) return
            past_exams = JSON.parse(res.data.exam).exam

            the_enviro_past_exam = past_exams.filter((exam) => exam.enviro_id == this.environment.data.environment.id)
            scroeSystem.first_response_rate = past_exams[0].response_rate
            the_enviro_past_exam.forEach((exam) => {
                average_score.accuracy.your += exam.accuracy.your
                average_score.accuracy.all += exam.accuracy.all
                average_score.completion.your += exam.completion.your
                average_score.completion.all += exam.completion.all
                average_score.response_rate += exam.response_rate
                average_score.high_frequency_accuracy.your += exam.high_frequency_accuracy.your
                average_score.high_frequency_accuracy.all += exam.high_frequency_accuracy.all
                average_score.low_frequency_accuracy.your += exam.low_frequency_accuracy.your
                average_score.low_frequency_accuracy.all += exam.low_frequency_accuracy.all
                average_score.total++
            })
            console.log(average_score)
        })

        let average_score_data = [
            Math.round((average_score.accuracy.your / average_score.accuracy.all) * 100),
            Math.round(
                (average_score.response_rate / average_score.total / (scroeSystem.first_response_rate * 2)) * 100
            ),
            Math.round((average_score.low_frequency_accuracy.your / average_score.low_frequency_accuracy.all) * 100),
            Math.round((average_score.high_frequency_accuracy.your / average_score.high_frequency_accuracy.all) * 100),
            Math.round((average_score.completion.your / average_score.completion.all) * 100),
        ]
        console.log(average_score_data)
        if (the_enviro_past_exam.length != 0) this.chart.addChart('過去次平均學習成績', average_score_data)

        /**計算當前測驗成績 */
        console.log(this.questionSystem)
        let exam = {
            questions: [],
        }

        this.questionSystem.question.forEach((question, index) => {
            exam.questions.push({
                object_id: question.id,
                your_answer_id: this.questionSystem.myAnswer[index].data.id,
                times: 0,
            })
        })

        /**正確率 */
        let correct_questions = exam.questions.filter((question) => question.object_id == question.your_answer_id)
        exam.accuracy = { your: correct_questions.length, all: exam.questions.length }

        /**完成度 */
        let completion_questions = []
        correct_questions.forEach((question) => {
            if (completion_questions.findIndex((item) => item.object_id == question.object_id) == -1)
                completion_questions.push(question)
        })
        exam.completion = { your: completion_questions.length, all: this.environment.objects.length }

        /**反應速度 */
        exam.response_rate = 50

        /**高頻 */
        let high_frequency_question_counts = 0
        let high_frequency_question_correct_counts = 0
        this.questionSystem.question.forEach((question, index) => {
            let high = false
            question.audio.frequency.forEach((frequency) => {
                if (frequency.max > 2000) high = true
            })
            if (high) high_frequency_question_counts++
            if (high && question.id == this.questionSystem.myAnswer[index].data.id) high_frequency_quest
            ion_correct_counts++
        })
        exam.high_frequency_accuracy = {
            your: high_frequency_question_correct_counts,
            all: high_frequency_question_counts,
        }

        /**低頻 */
        let low_frequency_question_counts = 0
        let low_frequency_question_correct_counts = 0
        this.questionSystem.question.forEach((question, index) => {
            let low = false
            question.audio.frequency.forEach((frequency) => {
                if (frequency.min < 300) low = true
            })
            if (low) low_frequency_question_counts++
            if (low && question.id == this.questionSystem.myAnswer[index].data.id)
                low_frequency_question_correct_counts++
        })
        exam.low_frequency_accuracy = {
            your: low_frequency_question_correct_counts,
            all: low_frequency_question_counts,
        }

        console.log(exam)
        exam.enviro_id = this.environment.data.environment.id
        apiManageExam({ type: 'update', data: exam }).then((res) => {
            console.log(res.data)
        })

        let correctTotal = correct.length
        let resultText = this.resultText

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
            '\n完成物件數: ' +
            exam.completion.your +
            '\n聲音頻率>6000正確題數: ' +
            exam.high_frequency_accuracy.your +
            '\n聲音頻率<300正確題數: ' +
            exam.low_frequency_accuracy.your
        resultText.style = style17
        this.answerBoard.update()
    }
}

/**測驗結果
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
    constructor(data) {
        super()
        this.data = data

        this.background = new Graphics()
        this.list = new Container()
        this.listColor = [0xffffff, 0xefefef]

        this.setBackground()
        // this.setList()
    }

    setBackground() {
        let background = this.background
        background.beginFill(0xffffff)
        background.drawRoundedRect(0, 0, 450, 350, 10)
        background.endFill()
        this.addChild(background)
    }
    setList() {
        let list = this.list
        this.addChild(list)

        let listContainer = new Container()
        list.addChild(listContainer)

        let listMask = new Graphics()
        listMask.beginFill(0x000000)
        listMask.drawRoundedRect(0, 0, 450, 350, 10)
        listMask.endFill()
        list.addChild(listMask)

        let data = this.data
        let listColor = this.listColor

        for (let i = 0; i < data.length; i++) {
            let bg = new Graphics()
            bg.beginFill(listColor[i % 2])
            bg.drawRect(0, 120 * i, 450, 120)
            bg.endFill()
            bg.lineStyle(1, 0x000000)
            bg.moveTo(60, 120 * i)
            bg.lineTo(60, 120 * (i + 1))
            bg.moveTo(230, 120 * i)
            bg.lineTo(230, 120 * (i + 1))
            bg.moveTo(400, 120 * i)
            bg.lineTo(400, 120 * (i + 1))
            listContainer.addChild(bg)

            let no = new PIXI.Text(i + 1, style15)
            no.anchor.set(0.5)
            no.position.set(30, 60 * (i * 2 + 1)) //width 60
            listContainer.addChild(no)

            let correctAnswer = data[i].correctAnswer
            let correct = new Sprite()
            correct.texture = resources[correctAnswer.pic_src].texture
            let scale = Math.min(100 / correct.width, 100 / correct.height)
            correct.scale.set(scale, scale)
            correct.anchor.set(0.5)
            correct.position.set(145, 60 * (i * 2 + 1)) //width 170
            listContainer.addChild(correct)

            let yourAnswer = data[i].yourAnswer
            let your = new Sprite()
            your.texture = resources[yourAnswer.data.pic_src].texture
            scale = Math.min(100 / your.width, 100 / your.height)
            your.scale.set(scale, scale)
            your.anchor.set(0.5)
            your.position.set(315, 60 * (i * 2 + 1)) //width 170
            listContainer.addChild(your)

            let checkAnswer = correctAnswer.id == yourAnswer.data.id ? 'O' : 'X'
            let style = style15.clone()
            let check = new PIXI.Text(checkAnswer, style)
            check.style.fill = checkAnswer == 'O' ? 0x017100 : 0xee220c
            check.anchor.set(0.5)
            check.position.set(425, 60 * (i * 2 + 1)) //width 50
            listContainer.addChild(check)
        }

        listContainer.mask = listMask
        let scroller = new VerticalScroller(10, listContainer, listMask)
        scroller.position.set(450, 0)
        list.addChild(scroller)
    }
    update() {
        this.list.removeChildren()
        this.setList()
    }
}

class TestModeEnvironment extends Environment {
    constructor() {
        super()
        this.selected = null
    }

    async init(id) {
        await super.init(id)
        let audio_arr = this.data.objects.map((item) => item.sound_src)
        await apiManageAudio({
            type: 'get',
            amount: 'part',
            items: audio_arr,
        }).then((res) => {
            this.data.objects.forEach((object) => {
                object.audio = res.data.filter((audio) => audio.id == object.sound_src)[0]
                object.audio.frequency = object.audio.frequency.split(';')
                let frequencies = []
                object.audio.frequency.forEach((frequency) => {
                    let less_re = new RegExp(/\</g)
                    let greater_re = new RegExp(/\>/g)
                    let equal_re = new RegExp(/\~/g)
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

                    console.log(frequency, min, max)
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

    cancelSelectedObject() {
        if (!this.selected) return
        this.selected.filters = [new OutlineFilter(3, 0xf0aaee)]
        this.selected = null
    }
}

class QuestionSystem {
    constructor() {
        this.question = []
        this.myAnswer = []
        this.times = []
    }

    init(data) {
        this.question = []
        for (let index = 0; index < 10; index++) {
            let i = Math.round(Math.random() * 100) % data.length
            this.question.push(data[i])
        }
    }

    play(index) {
        Sound.stopAll()
        Sound.add(this.question[index].audio.audio_id, resources[this.question[index].audio.sound_src])
        Sound.play(this.question[index].audio.audio_id)
    }
}
