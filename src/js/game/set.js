
import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import TextInput from 'Component/TextInput'
import Dialog from 'Component/dialog'
import Sound from 'pixi-sound'
import {
    style7,
    style13,
    style14
} from '@/js/game/engine/TextStyleManager'
import Button2 from 'Component/button2'
import Button3 from 'Component/button3'

const Application = PIXI.Application
const Container = PIXI.Container
const Graphics = PIXI.Graphics
const Text = PIXI.Text
const Sprite = PIXI.Sprite
const resources = PIXI.loader.resources

export default class set extends PIXI.Container {
    constructor () {
        super()
        this.dialog = new Dialog('', 1)
        this.input = new TextInput({
            input: {
                fontFamily: 'jf-openhuninn',
                fontSize: '20px',
                padding: '3px',
                width: '270px',
                color: '#000000'
            },
            box: {
                default: {
                    fill: '',
                    rounded: 1,
                    stroke: { color: '', width: 0 }
                },
                focused: {
                    fill: '',
                    rounded: 1,
                    stroke: { color: 0xffffff, width: 2 }
                },
                disabled: { fill: '', rounded: 1 }
            }
        })
        this.InfoContainer = new Container()

        this.init()
    }

    async init () {
        this.setDialog()
        this.setInfoContainer()
    }

    setDialog () {
        const dialog = this.dialog
        dialog.visible = false
        dialog.setSize(800, 430)
        dialog.setBackgroundColor(0xff9300, 0.99)
        dialog.setCloseBtnBackgroundColor(0xf8ba00, 0.99)
        dialog.closeBtn.click = () => {
            dialog.visible = false
        }
        this.addChild(dialog)
    }

    setInfoContainer () {
        const InfoContainer = this.InfoContainer
        InfoContainer.position.set(
            this.dialog.dialog.x,
            this.dialog.dialog.y
        )
        /* title:操作說明 */
        const learningTitle = new Text('其他功能', style14)
        learningTitle.position.set(300, 15)
        InfoContainer.addChild(learningTitle)

        const standard = [
            { data: '音量設定:' },
            { data: '語言選擇:' },
            { data: '給我們的意見:' },
            { data: '返回平台首頁:' }
        ]
        let index = 1
        standard.forEach((standard) => {
            const str = standard.data
            const data = new Text(str, style7)
            data.position.set(100, 35 + 80 * index)
            InfoContainer.addChild(data)
            index++
        })

        const rectangle = new Graphics()
        rectangle.lineStyle(1, 0xFF3300, 1)
        rectangle.drawRect(0, 0, 300, 1)
        rectangle.endFill()
        rectangle.x = 250
        rectangle.y = 140
        InfoContainer.addChild(rectangle)

        const circle = new Graphics()
        circle.beginFill(0x9966FF)
        circle.drawCircle(0, 0, 10)
        circle.endFill()
        circle.x = 400
        circle.y = 140
        circle.interactive = true
        circle.buttonMode = true
        circle.scale.set(1)

        let num
        num = new Text('50', style13)
        InfoContainer.addChild(num)
        num.position.set(390, 95)
        circle
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove)
        InfoContainer.addChild(circle)

        function onDragStart (event) {
            this.data = event.data
            this.alpha = 0.8
            this.dragging = true
        }

        function onDragEnd () {
            this.alpha = 1
            this.dragging = false
            // set the interaction data to null
            this.data = null
        }

        function onDragMove () {
            if (this.dragging) {
                const newPosition = this.data.getLocalPosition(this.parent)
                if (newPosition.x > 250 && newPosition.x < 550) {
                    this.x = newPosition.x
                    this.y = 140
                    num.text = Math.round((newPosition.x - 250) / 300 * 100)
                }
            }
        }

        const bt_back = new Button2(
            120,
            30,
            ResourcesManager.goBack,
            ' 返回'
        )
        bt_back.position.set(350, 355)
        bt_back.setText(style13)
        bt_back.setBorder(0)
        bt_back.setCornerRadius(10)
        bt_back.setBackgroundColor(0xfbffe0)
        bt_back.interactive = true
        bt_back.buttonMode = true
        bt_back.click = function () {
            window.location.href = './'
        }
        InfoContainer.addChild(bt_back)

        const sound = new Button2(
            160,
            30,
            ResourcesManager.listen,
            ' 音量測試'
        )
        sound.position.set(600, 120)
        sound.setText(style13)
        sound.setBorder(0)
        sound.setCornerRadius(10)
        sound.setBackgroundColor(0xfbffe0)
        sound.interactive = true
        sound.buttonMode = true
        sound.click = function () {
            Sound.stopAll()
            // Sound.add('test', 'https://pixijs.io/pixi-sound/examples/resources/buzzer.mp3')
            Sound.add('test', ResourcesManager.opening1)
            Sound.volumeAll = num.text / 100
            Sound.play('test')
        }
        InfoContainer.addChild(sound)

        const input = this.input
        input._placeholderColor = 0x000000
        input.maxLength = 20
        input.position.set(270, 270)
        InfoContainer.addChild(input)

        const bt_opinion = new Button3(120, 30, '輸入')
        bt_opinion.position.set(600, 270)
        bt_opinion.setText(style13)
        bt_opinion.setBorder(0)
        bt_opinion.setCornerRadius(10)
        bt_opinion.setBackgroundColor(0xfbffe0)
        bt_opinion.interactive = true
        bt_opinion.buttonMode = true
        bt_opinion.click = function () {

        }
        InfoContainer.addChild(bt_opinion)

        const language_selection = new Sprite(resources[ResourcesManager.correctAnswer].texture)
        language_selection.width = 40
        language_selection.height = 40
        language_selection.position.set(280, 185)
        InfoContainer.addChild(language_selection)

        const bt_ch = new Button3(100, 30, '中文')
        bt_ch.position.set(330, 190)
        bt_ch.setText(style13)
        bt_ch.setBorder(0)
        bt_ch.setCornerRadius(10)
        bt_ch.setBackgroundColor(0xfbffe0)
        bt_ch.interactive = true
        bt_ch.buttonMode = true
        bt_ch.click = function () {
            language_selection.position.set(280, 185)
            // changelanguage...
        }
        InfoContainer.addChild(bt_ch)

        const bt_en = new Button3(100, 30, '英文')
        bt_en.position.set(570, 190)
        bt_en.setText(style13)
        bt_en.setBorder(0)
        bt_en.setCornerRadius(10)
        bt_en.setBackgroundColor(0xfbffe0)
        bt_en.interactive = true
        bt_en.buttonMode = true
        bt_en.click = function () {
            language_selection.position.set(520, 185)
            // changelanguage...
        }
        InfoContainer.addChild(bt_en)

        this.dialog.addChild(InfoContainer)
    }
}
