import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import TextInput from 'Component/TextInput'
import Dialog from 'Component/dialog'
import {
    style1,
    style2,
    style3,
    style4,
    style5,
    style6,
    style7,
    style8,
    style9,
    style10,
    style11,
    style12,
    style13,
    style14,
    style15,
    style16,
    style17,
    style18,
    style19,
    style20,
} from '@/js/game/engine/TextStyleManager'
import Button2 from 'Component/button2'


let Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite

export default class ptdescription extends PIXI.Container {
    constructor() {
        super()
        this.dialog = new Dialog('', 1)
        this.input = new TextInput({
            input: {
                fontFamily: 'jf-openhuninn',
                fontSize: '20px',
                padding: '3px',
                width: '170px',
                color: '#000000',
            },
            box: {
                default: {
                    fill: '',
                    rounded: 1,
                    stroke: { color: '', width: 0 },
                },
                focused: {
                    fill: '',
                    rounded: 1,
                    stroke: { color: 0xffffff, width: 2 },
                },
                disabled: { fill: '', rounded: 1 },
            },
        })
        this.InfoContainer = new Container()
        this.init()

    }
    async init() {

        this.setDialog()
        this.setInfoContainer()
    }

    setDialog() {
        let dialog = this.dialog
        dialog.visible = false
        dialog.setSize(1000, 530)
        dialog.setBackgroundColor(0xff9300, 0.95)
        dialog.setCloseBtnBackgroundColor(0xf8ba00, 0.95)
        dialog.closeBtn.click = () => {
            dialog.visible = false

        }
        this.addChild(dialog)
    }
    setInfoContainer() {
        let InfoContainer = this.InfoContainer
        InfoContainer.position.set(
            this.dialog.dialog.x,
            this.dialog.dialog.y
        )
        /* title:操作說明 */
        let learningTitle = new PIXI.Text("模式說明", style14)
        learningTitle.position.set(400, 20)
        InfoContainer.addChild(learningTitle)

        let standard = [
            { data: '進入練習模式後，點擊開始系統將開始撥放題目的聲音，' },
            { data: '接著我們該去情境內找找是什麼東西會有這樣的聲音呢?' },
            { data: '找到之後點選他,就會知道你的答案是不是對摟，' },
            { data: '想跳到下一題就直接按下一題的按鈕就可以，' },
            { data: '如果聽不清楚也可以選擇再聽一次，' },
            { data: '想休息的話就點選左上方的返回或右下方的結束練習就可以了' },
        ]
        let index = 1
        standard.forEach((standard) => {
            let str = standard.data
            let data = new PIXI.Text(str, style13)
            data.position.set(100, 60 + 65 * index)
            InfoContainer.addChild(data)
            index++
        })

        this.dialog.addChild(InfoContainer)
    }

}
