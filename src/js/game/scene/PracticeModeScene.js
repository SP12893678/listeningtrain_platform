import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Config from '@/js/game/Config'
import HorizontalScroller from 'Component/HorizontalScroller'
import Events from '@/js/game/Events'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import { style14, style15, style16, style21 } from '@/js/game/engine/TextStyleManager'
import character from '@/js/game/character'
import Button2 from 'Component/button2'
import Environment from '@/js/game/Environment'
import Dialog from 'Component/dialog'
import Overlay from 'Component/overlay'
import RoundedButton from 'Component/RoundedButton'
import { OutlineFilter } from 'pixi-filters'
import { Graphics, Container, Sprite, Text } from 'pixi.js/lib/core'
import Sound from 'pixi-sound'
import { apiManageAudio, apiManageLearning } from '@/js/api'
import ptdescription from '@/js/game/ptdescription'
import video from '@/js/game/video'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const resources = PIXI.loader.resources

export default class PracticeModeScene extends Scene {
    constructor () {
        super()
        this.cover = new PIXI.Graphics()
        this.cover2 = new PIXI.Graphics()
        this.background = new Graphics()
        this.title = new Container()
        this.character = new character()
        // this.questionTotal = 10
        this.questionNo = 1
        this.questionCorrectTotal = 0
        this.firstCorrectTotal = 0

        this.screenUp = new Container()
        this.questionNoShow = new Text(this.questionNo, style15)
        // this.starCheck = new Container()
        this.screen = new Container()
        this.screenCover = new Graphics()
        this.showNextCover = new Graphics()
        this.showNext = new Text()
        this.startBtn = new Button2(200, 60, ResourcesManager.start, ' 開始   ')
        this.environment = new PracticeModeEnvironment()
        this.screenDown = new Container()
        this.nextBtn = new Button2(160, 50, ResourcesManager.nextQuestion, '下一題')
        this.listenBtn = new Button2(180, 50, ResourcesManager.listen, '再聽一次')
        this.replayBtn = new Button2(180, 50, ResourcesManager.reload, '重新開始')
        this.replayDialog = new Dialog('確定要重新開始嗎？')
        this.leaveBtn = new Button2(180, 50, ResourcesManager.leave, '結束練習')
        this.leaveDialog = new Dialog('確定要離開練習嗎？')
        this.showTotalDialog = new Dialog('', 2)
        this.questionSystem = new QuestionSystem()
        this.showAnserDialog = new showAnserDialog()
        this.ptdescription = new ptdescription()
        this.video = new video(1)
        this.btn_guide = new Button2(150, 70, ResourcesManager.help, '導覽')
        this.btn_guidestep = new Button2(150, 70, ResourcesManager.help, '下一步')
        this.btn_guideend = new Button2(150, 70, ResourcesManager.help, '完成')
        this.timeline = gsap.timeline()

        this.setBackground()
        this.setTitle()
        this.setCharacter()
        this.setScreenUp()
        this.setScreen()
        this.setScreenDown()

        this.addChild(this.showAnserDialog)
    }

    async init (id) {
        const screen = this.screen
        const environment = this.environment
        await environment.init(id)
        const scale = screen.length / environment.width
        environment.scale.set(scale, scale)
        screen.addChild(environment)

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
            this.screenUp.visible = true
            startBtn.visible = false
            screenCover.visible = false
            this.screenDown.visible = true
            guidecircle.visible = false

            this.showNext.x = 425
            this.showNextCover.visible = true
            this.showNext.visible = true
            this.listenBtn.interactive = false// 鎖
            this.nextBtn.interactive = false// 鎖
            this.timeline.to(this.showNextCover, { pixi: { alpha: 1 }, duration: 1.5 })
            this.timeline.to(this.showNext, {
                pixi: { text: '開始練習 ', alpha: 1, x: this.showNext.x + 100 },
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
                this.listenBtn.interactive = true
                this.nextBtn.interactive = true
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
        }
        screen.addChild(startBtn)

        const cover = this.cover
        cover.beginFill(0xffffff, 0)
        cover.drawRect(0, 0, 1, 1)
        cover.endFill()

        const cover2 = this.cover2
        cover2.beginFill(0xffffff, 0)
        cover2.drawRect(0, 0, this.screen.length - this.leaveBtn.btnWidth, this.screenDown.height)
        cover2.endFill()

        const guidecircle = new Graphics()
        guidecircle.lineStyle(5, 0xFF0000, 1)
        guidecircle.drawCircle(screen.length / 2, screen.height / 2, 120)
        guidecircle.endFill()
        guidecircle.visible = false
        screen.addChild(guidecircle)

        /* guide  */
        const guide = new PIXI.Text('點擊開始後尋找答案吧', style15)
        guide.position.set(100, 300)
        guide.visible = false

        const btn_guide = this.btn_guide
        btn_guide.pivot.set(btn_guide.btnWidth / 2, btn_guide.btnHeight / 2)
        btn_guide.position.set(250, 350)
        btn_guide.setBorder(0)
        btn_guide.setBackgroundColor('', 0)
        btn_guide.setText(style15)
        btn_guide.mouseover = function (mouseData) {
            btn_guide.scale.set(1.1)
        }
        btn_guide.mouseout = function (mouseData) {
            btn_guide.scale.set(1)
        }
        btn_guide.visible = true
        btn_guide.click = () => {
            this.reset()
            guidecircle.visible = true
            btn_guide.visible = false
            guide.visible = true
            this.screenDown.mask = cover

            window.setTimeout(() => btn_guidestep.visible = true, 12000)
        }

        const btn_guidestep = this.btn_guidestep
        btn_guidestep.pivot.set(btn_guidestep.btnWidth / 2, btn_guidestep.btnHeight / 2)
        btn_guidestep.position.set(250, 250)
        btn_guidestep.setBorder(0)
        btn_guidestep.setBackgroundColor('', 0)
        btn_guidestep.setText(style15)
        btn_guidestep.visible = false
        btn_guidestep.mouseover = function (mouseData) {
            btn_guidestep.scale.set(1.1)
        }
        btn_guidestep.mouseout = function (mouseData) {
            btn_guidestep.scale.set(1)
        }
        btn_guidestep.click = () => {
            btn_guidestep.visible = false
            this.screenDown.mask = cover2
            guide.setText('發現情境下的按鈕了嗎?\n快試試他們的功能吧!')
            window.setTimeout(() => btn_guideend.visible = true, 10000)
        }

        const btn_guideend = this.btn_guideend
        btn_guideend.pivot.set(btn_guideend.btnWidth / 2, btn_guideend.btnHeight / 2)
        btn_guideend.position.set(250, 250)
        btn_guideend.setBorder(0)
        btn_guideend.setBackgroundColor('', 0)
        btn_guideend.setText(style15)
        btn_guideend.visible = false
        btn_guideend.mouseover = function (mouseData) {
            btn_guideend.scale.set(1.1)
        }
        btn_guideend.mouseout = function (mouseData) {
            btn_guideend.scale.set(1)
        }
        btn_guideend.click = () => {
            guidecircle.visible = false
            btn_guideend.visible = false
            btn_guide.visible = true
            this.screenDown.mask = null
            guide.setText('點擊開始後尋找答案吧')
            guide.visible = false

            this.reset()
        }

        this.addChild(btn_guide)
        this.addChild(btn_guidestep)
        this.addChild(btn_guideend)
        this.addChild(guide)
        this.screenDown.addChild(cover)
        this.screenDown.addChild(cover2)
        /* guide end */

        const ptdescription = this.ptdescription
        ptdescription.position.set(0, 0)
        this.addChild(ptdescription)

        const video = this.video
        video.position.set(0, 0)
        this.addChild(video)

        const showNext = this.showNext
        showNext.style = style21
        showNext.text = '下一題 '
        showNext.anchor.set(0.5)
        showNext.position.set(screen.length / 2, screen.height / 2)
        showNext.alpha = 0
        screen.addChild(showNext)

        const listenBtn = this.listenBtn
        listenBtn.click = () => {
            Sound.stopAll()
            this.timeline.clear()
            this.timeline.add(gsap.delayedCall(0.2, () => {
                this.character.armatureDisplay.animation.play('listen_up', 1)
                const time = this.questionSystem.play(this.questionNo - 1)
                this.timeline.add(gsap.delayedCall(time, () => {
                    this.character.armatureDisplay.animation.gotoAndPlayByFrame('listen', 15, 1)
                }))
            }))
        }
        environment.objects.forEach((object) => {
            object.click = () => {
                if (environment.selected) environment.selected.filters = [new OutlineFilter(3, 0xf0aaee)]
                environment.selected = object
                object.filters = [new OutlineFilter(3, 0x1976d2)]
                this.nextQuestion()
            }
        })

        const showNextCover = this.showNextCover
        showNextCover.interactive = true
        showNextCover.beginFill(0xffffff, 0.2)
        showNextCover.drawRoundedRect(0, 0, screen.length, screen.height, 10)
        showNextCover.endFill()
        showNextCover.visible = false
        screen.addChild(showNextCover)
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
            if (!this.startBtn.visible) this.leaveDialog.visible = true
            else Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
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
        const goBackText = new Text('返回', style15)
        goBackText.anchor.set(0.5)
        goBackText.position.set(160, titleHeight / 2)
        title.addChild(goBackText)
        /* title Text */
        const titleText = new Text('練習模式', style14)
        titleText.anchor.set(0.5)
        titleText.position.set(Config.screen.width / 2, titleHeight / 2)
        title.addChild(titleText)
        /* help */

        const btn_help = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '說明')
        btn_help.pivot.set(150 / 2, titleHeight / 2)
        btn_help.position.set(Config.screen.width - 70, titleHeight / 2 + titleHeight * 0.1)
        btn_help.setBorder(0)
        btn_help.setBackgroundColor('', 0)
        btn_help.setText(style15)
        this.bool = false
        btn_help.click = () => { }
        btn_help.mouseover = function (mouseData) {
            btn_help.scale.set(1.1)
        }
        btn_help.mouseout = function (mouseData) {
            btn_help.scale.set(1)
        }
        btn_help.click = () => (this.ptdescription.dialog.visible = !this.ptdescription.dialog.visible)
        title.addChild(btn_help)

        /* video */
        const btn_video = new Button2(150, titleHeight * 0.8, ResourcesManager.help, '影片導覽')
        btn_video.pivot.set(150 / 2, titleHeight / 2)
        btn_video.position.set(Config.screen.width - 230, titleHeight / 2 + titleHeight * 0.1)
        btn_video.setBorder(0)
        btn_video.setBackgroundColor('', 0)
        btn_video.setText(style15)
        btn_video.mouseover = function (mouseData) {
            btn_video.scale.set(1.1)
        }
        btn_video.mouseout = function (mouseData) {
            btn_video.scale.set(1)
        }
        btn_video.click = () => (this.video.dialog.visible = !this.video.dialog.visible)
        title.addChild(btn_video)

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
        this.addChild(armatureDisplay)

        // this.armatureDisplay.animation.play('shakeHand',1);
    }

    setScreenUp () {
        const screenUp = this.screenUp
        screenUp.position.set(480, Config.screen.height * 0.095)
        screenUp.visible = false
        this.addChild(screenUp)
        /* question No */
        const questionNoBg = new Graphics()
        questionNoBg.beginFill(0xff5336)
        questionNoBg.drawRoundedRect(0, 0, 130, 50, 10)
        questionNoBg.beginFill()
        screenUp.addChild(questionNoBg)

        const questionNoText = '第     題'
        const questionNoLabel = new Text(questionNoText, style15)
        questionNoLabel.anchor.set(0.5)
        questionNoLabel.position.set(65, 25)
        screenUp.addChild(questionNoLabel)

        const questionNoShow = this.questionNoShow
        questionNoShow.anchor.set(0.5)
        questionNoShow.position.set(65, 25)
        screenUp.addChild(questionNoShow)
        /* star */
        // let starCheck = this.starCheck
        // starCheck.position.set(170, 0)
        // screenUp.addChild(starCheck)
        // for (let i = 0; i < this.questionTotal; i++) {
        //     let star = new PIXI.Graphics()
        //     star.beginFill(0xffffff)
        //     star.drawStar(0 + i * 60, 25, 5, 25, 9)
        //     star.endFill()
        //     starCheck.addChild(star)
        // }
        // console.log(this.starCheck)
    }

    setScreen () {
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
        /* next button */
        const nextBtn = this.nextBtn
        nextBtn.position.set(0, 0)
        nextBtn.setBorder(0)
        nextBtn.setCornerRadius(15)
        nextBtn.setBackgroundColor(0xf8f9ea)
        nextBtn.setText(style15)
        nextBtn.update = () => { }
        nextBtn.click = () => this.nextQuestion()

        screenDown.addChild(nextBtn)
        /* reload button */
        const listenBtn = this.listenBtn
        listenBtn.position.set(nextBtn.x + nextBtn.btnWidth + 10, 0)
        listenBtn.setBorder(0)
        listenBtn.setCornerRadius(15)
        listenBtn.setBackgroundColor(0xf8f9ea)
        listenBtn.setText(style15)
        screenDown.addChild(listenBtn)
        /* replay dialog */
        const replayDialog = this.replayDialog
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
        const replayBtn = this.replayBtn
        replayBtn.position.set(this.screen.length - replayBtn.btnWidth * 2 - 10, 0)
        replayBtn.setBorder(0)
        replayBtn.setCornerRadius(15)
        replayBtn.setBackgroundColor(0xf8f9ea)
        replayBtn.setText(style15)
        replayBtn.click = () => {
            replayDialog.visible = true
        }
        screenDown.addChild(replayBtn)

        /* showTotal dialog */
        const showTotalDialog = this.showTotalDialog
        showTotalDialog.visible = false
        this.addChild(showTotalDialog)
        // showTotalDialog.setBackgroundColor(color,alpha)
        showTotalDialog.yesBtn.setBorder(0)
        showTotalDialog.yesBtn.scale.set(0.8)
        showTotalDialog.yesBtn.position.set(showTotalDialog.yesBtn.x, showTotalDialog.yesBtn.y + 50)

        showTotalDialog.yesBtn.click = () => {
            /* yesBtn action */
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
            showTotalDialog.visible = false
        }

        /* leave dialog */
        const leaveDialog = this.leaveDialog
        leaveDialog.visible = false
        this.addChild(leaveDialog)

        leaveDialog.yesBtn.click = () => {
            /* yesBtn action */
            // Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })

            const items = []

            let data = this.questionSystem.myAnser.map(answer => answer.map(item => item.id))
            for (let index = 0; index < this.questionNo - 1; index++) {
                const item = {
                    object_id: this.questionSystem.question[index].id,
                    your_answer: (data[index] == undefined) ? null : data[index]
                }
                items.push(item)
            }

            const date = new Date()
            const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            data = {
                time: time,
                enviro: this.environment.data.environment.name,
                questions: items,
                firstCorrect: this.firstCorrectTotal,
                Correct: this.questionCorrectTotal,
                questions_num: items.length
            }
            apiManageLearning({ type: 'update', mode: 'practice', item: data })
                .then(res => { console.log(res.data) })

            leaveDialog.visible = false
            showTotalDialog.visible = !leaveDialog.visible
            showTotalDialog.text.text =
                '作答情境: ' +
                this.environment.data.environment.name +
                '\n\n練習題數: ' +
                (this.questionNo - 1) +
                ' 題' +
                '\n答對題數: ' +
                this.questionCorrectTotal +
                ' 題'
            this.reset()
        }
        leaveDialog.cancelBtn.click = () => {
            /* cancelBtn action */
            leaveDialog.visible = false
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
        }
        screenDown.addChild(leaveBtn)
    }

    reset () {
        Sound.stopAll()
        this.timeline.clear()
        this.showNext.visible = false
        this.showNext.scale.set(1, 1)
        this.showNextCover.visible = false
        this.character.action.talkBubble.alpha = 0
        this.character.action.animationPlayOriginal()

        // this.questionTotalNo = this.questionTotal

        this.questionNo = 1
        this.questionNoShow.text = this.questionNo
        this.questionCorrectTotal = 0
        this.firstCorrectTotal = 0

        // let starCheck = this.starCheck.children
        // starCheck.forEach((star) => {
        //     star.tint = 0xffffff
        // })

        this.screenUp.visible = false
        this.startBtn.visible = true
        this.screenCover.visible = true
        this.screenDown.visible = false

        this.questionSystem.init(this.environment.data.objects)
        this.environment.cancelSelectedObject()
    }

    nextQuestion () {
        Sound.stopAll()
        this.timeline.clear()
        this.showNext.visible = false
        this.showNextCover.visible = false
        this.character.action.animationPlayOriginal()
        /* 顯示 */
        const selected = this.environment.selected
        const question = this.questionSystem.question[this.questionNo - 1]
        const isNext = !selected || selected.data.id == question.id

        /** 將此次作答紀錄到出題系統 */
        if (isNext) {
            const answer = []
            answer.push(...this.showAnserDialog.answerRecord)
            if (selected && selected.data.id == question.id) {
                answer.push(selected.data)
                if (answer.length == 1 || answer[0].id == question.id) {
                    this.firstCorrectTotal++
                }
            }
            this.questionSystem.myAnser.push(answer)
        }

        if (!selected) this.showAnserDialog.showAnser(question, '')
        else this.showAnserDialog.showAnser(question, selected.data)

        /* 判斷是否播放下一題 */
        const check = isNext
        // let checkColor = (this.environment.selected.data.pic_src == this.questionSystem.question[this.questionNo - 1].pic_src) ? 0xFFFB00 : 0xDD9000
        /* 判斷要播的音效 */
        if (!check) {
            Sound.stopAll()
            Sound.add('wrong', '../static/sound/effect/wrong.mp3')
            Sound.play('wrong')
            this.character.action.animationPlayOriginal()
            const emojiAnimation = this.character.armatureDisplay.animation.fadeIn('emoji_sad', 0, 1, 0, 'emoji')
            emojiAnimation.addBoneMask('emoji')
        }
        if (selected && selected.data.id == question.id) {
            this.questionCorrectTotal++
            Sound.stopAll()
            Sound.add('correct', '../static/sound/effect/correct.mp3')
            Sound.play('correct')
            this.character.action.animationPlayOriginal()
            this.character.armatureDisplay.animation.fadeIn('clapHand', 0, 1, 1, 'hand')
            this.character.armatureDisplay.animation.fadeIn('emoji_fighting', 0, 1, 1, 'emoji')
            // animationName,fadeInTime,playTimes,layer,group,fadeOutMode
        }
        this.showAnserDialog.confirmButton.update = () => {
            this.environment.cancelSelectedObject()
            // this.starCheck.getChildAt(this.questionNo - 1).tint = checkColor
            /* 如果答對的話 */
            if (check) {
                this.questionNo++
                this.questionNoShow.text = this.questionNo
                if (this.questionNo > 10) this.questionSystem.addNextQuesion()
                this.showNext.text = '下一題 '
            } else this.showNext.text = '再聽一次 '
            this.showNext.x = 425
            this.showNextCover.visible = true
            this.showNext.visible = true
            this.listenBtn.interactive = false
            this.nextBtn.interactive = false
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
                this.showNextCover.visible = false
                this.listenBtn.interactive = true
                this.nextBtn.interactive = true
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
    }
}

class PracticeModeEnvironment extends Environment {
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

    cancelSelectedObject () {
        if (!this.selected) return
        this.selected.filters = [new OutlineFilter(3, 0xf0aaee)]
        this.selected = null
    }
}

class QuestionSystem {
    constructor () {
        this.question = []
        this.myAnser = []
    }

    init (data) {
        this.question = []
        this.data = data
        for (let index = 0; index < 10; index++) {
            const i = Math.round(Math.random() * 100) % data.length
            this.question.push(data[i])
        }
    }

    addNextQuesion () {
        const i = Math.round(Math.random() * 100) % this.data.length
        this.question.push(this.data[i])
    }

    play (index) {
        Sound.stopAll()
        Sound.add(this.question[index].audio.audio_id, resources[this.question[index].audio.sound_src])
        Sound.play(this.question[index].audio.audio_id)
        const test = resources[this.question[index].audio.sound_src].sound
        return test.duration
    }
}

class showAnserDialog extends Overlay {
    constructor () {
        super(0.01)
        this.visible = false
        this.board = new Container()
        this.answerBoard = new Container()
        this.background = new Graphics()
        this.backgroundAns = new Graphics()
        this.yourAnswerIcon = new Sprite()
        this.yourAnswerLabel = new Text()
        this.yourAnser = new Container()
        this.yourAnser_mask = new Graphics()
        this.correctAnswerIcon = new Sprite()
        this.correctAnswerLabel = new Text()
        this.correctAnserBg = new Graphics()
        this.correctAnser = new Sprite()
        this.confirmButton = new RoundedButton('確認')
        this.answerRecord = []

        this.init()
    }

    init () {
        const background = this.background
        background.beginFill(0xffffff, 0.8)
        background.drawRoundedRect(0, 0, 500, 350, 10)
        background.endFill()
        this.board.addChild(background)

        const backgroundAns = this.backgroundAns
        backgroundAns.beginFill(0xffffff, 0.8)
        backgroundAns.drawRoundedRect(0, 0, 700, 350, 10)
        backgroundAns.endFill()
        this.answerBoard.addChild(backgroundAns)

        const dottedLine = new Graphics()
        dottedLine.lineStyle(3, 0x000000)
        const length = 340
        for (let i = 0; (i + 1) * 20 < length; i++) {
            dottedLine.moveTo(0, i * 20 + 5)
            dottedLine.lineTo(0, (i + 1) * 20)
        }
        dottedLine.position.set(500, 10)
        this.answerBoard.addChild(dottedLine)

        const yourAnswerIcon = this.yourAnswerIcon
        yourAnswerIcon.texture = resources[ResourcesManager.yourAnswer].texture
        yourAnswerIcon.width = 40
        yourAnswerIcon.height = 40
        yourAnswerIcon.anchor.set(0.5)
        yourAnswerIcon.position.set(500 / 2 - 60, 40)
        this.board.addChild(yourAnswerIcon)

        const yourAnswerLabel = this.yourAnswerLabel
        yourAnswerLabel.text = '你的答案'
        yourAnswerLabel.style = style15
        yourAnswerLabel.anchor.set(0.5)
        yourAnswerLabel.position.set(500 / 2 + 20, 40)
        this.board.addChild(yourAnswerLabel)

        const yourAnser_mask = this.yourAnser_mask
        yourAnser_mask.beginFill(0x000000)
        yourAnser_mask.drawRoundedRect(30, 95, 450, 140, 10)
        yourAnser_mask.endFill()
        this.board.addChild(yourAnser_mask)

        const yourAnser = this.yourAnser
        yourAnser.position.set((500 - 130) / 2, 105)
        yourAnser.mask = yourAnser_mask
        this.board.addChild(yourAnser)

        const correctAnswerIcon = this.correctAnswerIcon
        correctAnswerIcon.texture = resources[ResourcesManager.correctAnswer].texture
        correctAnswerIcon.width = 40
        correctAnswerIcon.height = 40
        correctAnswerIcon.anchor.set(0.5)
        correctAnswerIcon.position.set(600 - 60, 50)
        this.answerBoard.addChild(correctAnswerIcon)

        const correctAnswerLabel = this.correctAnswerLabel
        correctAnswerLabel.text = '正確答案'
        correctAnswerLabel.style = style15
        correctAnswerLabel.anchor.set(0.5)
        correctAnswerLabel.position.set(600 + 20, 50)
        this.answerBoard.addChild(correctAnswerLabel)

        const correctAnserBg = this.correctAnserBg
        correctAnserBg.beginFill(0xc3ffa8, 0.8)
        correctAnserBg.drawRoundedRect(535, 105, 130, 130, 10)
        correctAnserBg.endFill()
        this.answerBoard.addChild(correctAnserBg)

        this.confirmButton.interactive = true
        this.confirmButton.buttonMode = true
        this.confirmButton.update = () => { }
        this.confirmButton.click = () => {
            this.visible = false
            this.confirmButton.update()
        }
        this.confirmButton.position.set((500 - this.confirmButton.width) / 2, 270)
        this.board.addChild(this.confirmButton)

        this.answerBoard.position.set(650, 300)
        this.answerBoard.visible = false
        this.board.position.set(750, 300)
        this.addChild(this.answerBoard)
        this.addChild(this.board)
    }

    showAnser (correctObject, yourObject) {
        const board = this.board
        const answerBoard = this.answerBoard
        const yourAnser = this.yourAnser
        const correctAnser = this.correctAnser
        correctAnser.scale.set(1)

        yourAnser.removeChildren()
        board.removeChild(board.getChildByName('scroller'))

        if (yourObject.pic_src) this.answerRecord.push(yourObject)
        if (this.answerRecord == 0) {
            const skipText = '放棄作答'
            const skipTextStyle = style15.clone()
            const skip = new Text(skipText, skipTextStyle)
            skip.style.fill = 0x004d7f
            skip.style.fontSize = 36
            skip.anchor.set(0.5)
            skip.position.set(0, 75)
            yourAnser.addChild(skip)
        }
        if (this.answerRecord.length == 1) {
            answerBoard.visible = false
            this.background.visible = !answerBoard.visible
            board.position.set(750, 300)
        }
        for (let i = 0; i < this.answerRecord.length; i++) {
            const yourAnserBg = new Graphics()
            const bgColor = this.answerRecord[i] == correctObject.pic_src ? 0xc3ffa8 : 0xffccaa - i * 20
            yourAnserBg.beginFill(bgColor, 0.8)
            yourAnserBg.drawRoundedRect(0 + 145 * i, 0, 130, 130, 10)
            yourAnserBg.endFill()
            yourAnser.addChild(yourAnserBg)

            const answer = new Sprite()
            answer.texture = resources[this.answerRecord[i].pic_src].texture
            scale = Math.min(100 / answer.width, 100 / answer.height)
            answer.scale.set(scale)
            answer.anchor.set(0.5)
            answer.position.set(145 * i + 130 / 2, 130 / 2)
            yourAnser.addChild(answer)

            const timesBg = new Graphics()
            timesBg.beginFill(0x000000, 0.8)
            timesBg.drawCircle(10 + 145 * i, 10, 20)
            timesBg.endFill()
            yourAnser.addChild(timesBg)

            const times = new Text()
            times.text = i + 1
            const style = style15.clone()
            style.fill = 0xffffff
            times.style = style
            times.anchor.set(0.5)
            times.position.set(10 + 145 * i, 10)
            yourAnser.addChild(times)

            const checkAnswer = this.answerRecord[i].id == correctObject.id ? 'O' : 'X'
            const checkStyle = style15.clone()
            const check = new Text(checkAnswer, checkStyle)
            check.style.fill = checkAnswer == 'O' ? 0x017100 : 0xee220c
            check.style.fontSize = 60
            check.anchor.set(0.5)
            check.position.set(120 + 145 * i, 100)
            yourAnser.addChild(check)
        }
        /* answer wrong more than 3 times will use scroller */
        if (this.answerRecord.length > 3) {
            yourAnser.position.set(40, 105)
            board.removeChild(board.getChildByName('scroller'))
            const scroller = new HorizontalScroller(10, this.yourAnser, this.yourAnser_mask)
            scroller.move(1)
            scroller.position.set(30, 95 + 140)
            scroller.name = 'scroller'
            board.addChild(scroller)
        } else yourAnser.position.set((500 - this.answerRecord.length * 140) / 2, 105)

        correctAnser.texture = resources[correctObject.pic_src].texture
        let scale = Math.min(100 / correctAnser.width, 100 / correctAnser.height)
        correctAnser.scale.set(scale)
        correctAnser.anchor.set(0.5)
        correctAnser.position.set(600, 170)
        answerBoard.addChild(correctAnser)

        /* correct or not ---> clean answerRecord */
        if (yourObject.pic_src == correctObject.pic_src || yourObject == '') {
            if (this.yourObject != '') this.answerRecord.push(this.yourObject)

            this.answerRecord.length = 0
            answerBoard.visible = true
            this.background.visible = !answerBoard.visible
            board.position.set(650, 300)
        }
        this.visible = true
    }
}
