import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import character from '@/js/game/character'
import TextInput from 'Component/TextInput'
import Dialog from 'Component/dialog'
import {
    style1,
    style8,
    style9,
    style10,
    style11,
    style13,
} from '@/js/game/engine/TextStyleManager'
import RadarChart from 'Component/RadarChart'
import Button2 from 'Component/button2'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class profile extends PIXI.Container {
    constructor(account) {
        super()
        this.account = account
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
        this.editBtn = new Sprite()
        this.saveBtn = new Sprite()
        this.person = new character(this.account)
        this.personInfoContainer = new Container()
        this.learningContainer = new Container()
        this.standardContainer = new Container()

        this.init()
    }
    async init() {
        await this.checkData()
        this.setDialog()
        this.setTextField()
        this.setEditSaveBtn()
        this.setPersonInfoPanel()
        this.setLearningPanel()
        this.setStandardPanel()
    }
    async checkData() {
        await this.person.get_character_data(this.account)
        console.log(this.person.gender)
    }
    setDialog() {
        let dialog = this.dialog
        dialog.visible = false
        dialog.setSize(1000, 530)
        dialog.setBackgroundColor(0xff9300, 0.95)
        dialog.setCloseBtnBackgroundColor(0xf8ba00, 0.95)
        dialog.closeBtn.click = () => {
            dialog.visible = false
            this.personInfoContainer.visible = true
            this.standardContainer.visible = false
        }
        this.addChild(dialog)
    }
    /* 建立一個textfield */
    setTextField() {
        let input = this.input
        input._placeholderColor = 0x000000
        input.maxLength = 10
    }
    setEditSaveBtn() {
        /* Button to edit nickname */
        let editBtn = this.editBtn
        let saveBtn = this.saveBtn
        editBtn.texture = resources[ResourcesManager.edit].texture
        saveBtn.texture = resources[ResourcesManager.save].texture
        let t = this
        this.input.disabled = true
        editBtn.width = 30
        editBtn.height = 30
        editBtn.anchor.set(0.5)
        editBtn.position.set(
            this.input.x + this.input.width + 20,
            this.input.y + 13
        )
        editBtn.visible = true
        editBtn.interactive = true // 設定可以互動
        editBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        editBtn.click = function () {
            t.editBtn.visible = false
            t.saveBtn.visible = true
            t.input.disabled = false
            t.input.focus() //直接開始編輯
            // t.input.select() //全選編輯
            console.log('now is saveBtn')
        }
        saveBtn.width = 25
        saveBtn.height = 25
        saveBtn.anchor.set(0.5)
        saveBtn.position.set(editBtn.x, editBtn.y)
        saveBtn.visible = false
        saveBtn.interactive = true // 設定可以互動
        saveBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        saveBtn.click = async function () {
            editBtn.visible = true
            saveBtn.visible = false
            t.input.disabled = true
            t.person.nickname = await t.input.text
            await t.person.save_character_data()
            console.log('You have entered', t.input.text)
            console.log('now is editBtn')
        }
        /*All events are dispatched via the default pixi EventEmitter.*/
        this.input.on('keydown', async (keycode) => {
            //搭配著input focus的部分
            if (keycode == 13) {
                editBtn.visible = true
                saveBtn.visible = false
                t.input.disabled = true
                t.person.nickname = await t.input.text
                await t.person.save_character_data()
                console.log('enter')
            }
        })
    }
    setPersonInfoPanel() {
        let personInfoContainer = this.personInfoContainer
        personInfoContainer.position.set(
            this.dialog.dialog.x,
            this.dialog.dialog.y
        )
        /* panel */
        let personInfoPanel = new PIXI.Graphics()
        personInfoPanel.beginFill(0xfbffe0)
        personInfoPanel.drawRoundedRect(15, 10, 620, 500, 10)
        personInfoPanel.endFill()
        personInfoPanel.beginFill(0xfec036)
        personInfoPanel.drawRoundedRect(40, 70, 248, 392, 10)
        personInfoPanel.endFill()
        personInfoContainer.addChild(personInfoPanel)
        /* character background */
        let characterBg = new Sprite(
            PIXI.loader.resources[ResourcesManager.profileBg].texture
        )
        let scale = 240 / characterBg.width
        characterBg.scale.set(scale)
        characterBg.position.set(44, 76)
        personInfoContainer.addChild(characterBg)
        /* rank or title */
        let showtitle = new Sprite(
            PIXI.loader.resources[ResourcesManager.newPlayer].texture
        )
        showtitle.scale.set(50 / showtitle.height)
        showtitle.position.set(115, 50)
        personInfoContainer.addChild(showtitle)
        /* character */
        let c = this.person
        let person = this.person.armatureDisplay
        person.scale.set(0.35)
        person.position.set(164, 310)
        person.interactive = false
        person.buttonMode = false
        personInfoContainer.addChild(person)
        /* title:基本資料 */
        let infoTitle = new PIXI.Text('基本資料', style10)
        infoTitle.position.set(390, 75)
        personInfoContainer.addChild(infoTitle)
        /* profile item */
        this.personInfoItemContainer = new Container()
        personInfoContainer.addChild(this.personInfoItemContainer)
        this.personInfoItemContainer.position.set(307, 150)
        //ID
        let id = this.account
        this.create_item(' I D', id, ResourcesManager.id)
        //姓名
        let temp = new Container()
        this.setTextField()
        temp.addChild(this.input)
        let name = this.person.nickname
        this.input.text = name
        this.input.placeholder = '輸入你的暱稱...'
        this.setEditSaveBtn()
        temp.addChild(this.editBtn)
        temp.addChild(this.saveBtn)
        this.create_item('姓名', temp, ResourcesManager.name)
        //性別
        let gender = this.person.gender
        this.create_item('性別', gender, ResourcesManager.gender)
        //生日
        let birthday = this.person.birthday
        this.create_item('生日', birthday, ResourcesManager.birthday)
        //稱號
        let title = new Sprite(
            PIXI.loader.resources[ResourcesManager[this.person.title]].texture
        )
        title.scale.set(30 / title.height)
        this.create_item('稱號', title, ResourcesManager.title)
        //金錢
        let money = '$' + this.person.money
        this.create_item('金幣', money, ResourcesManager.money)

        this.dialog.addChild(personInfoContainer)
    }
    create_item(itemName, itemValue, iconPic) {
        let tempContainer = new Container()
        /* panel */
        let g = new PIXI.Graphics()
        g.beginFill(0xff644e)
        g.drawRoundedRect(0, 0, 308, 38, 10)
        g.endFill()
        g.beginFill(0xf8ba00)
        g.drawRoundedRect(78, 3, 231, 35, 10)
        g.endFill()
        tempContainer.addChild(g)
        /* icon */
        let icon = new Sprite(PIXI.loader.resources[iconPic].texture)
        icon.width = 24
        icon.height = 24
        icon.position.set(g.x + 5, g.y + 6)
        tempContainer.addChild(icon)
        /* itemName */
        let item = new PIXI.Text(itemName, style8)
        item.position.set(g.x + icon.width + 9, 8)
        tempContainer.addChild(item)
        /* itemValue */
        let value
        if (typeof itemValue == 'string') {
            value = new PIXI.Text(itemValue, style9)
            value.position.set(85, 10)
        } else {
            value = itemValue
            value.position.set(83, 7)
        }
        tempContainer.addChild(value)

        tempContainer.position.set(
            0,
            this.personInfoItemContainer.children.length * 40
        )
        this.personInfoItemContainer.addChild(tempContainer)
    }
    setLearningPanel() {
        let learningContainer = this.learningContainer
        learningContainer.position.set(
            this.dialog.dialog.x + 650,
            this.dialog.dialog.y
        )
        /* title:學習狀況 */
        let learningTitle = new PIXI.Text('學習狀況', style11)
        learningTitle.position.set(100, 75)
        learningContainer.addChild(learningTitle)
        /* 雷達圖 */
        let labels = [
            '正確率',
            '反應速度',
            '  低頻辨識率',
            '  高頻辨識率',
            '完成度',
        ]
        let datasets = [
            { name: '最近一次測驗', data: [50, 10, 75, 150, 100] },
            { name: '個人學習平均值', data: [100, 70, 150, 80, 30] },
        ]
        let chart = new RadarChart(labels, datasets)
        chart.position.set(175, 275)
        chart.barLabel.position.set(-350, 350)
        chart.scale.set(325 / chart.width)
        learningContainer.addChild(chart)
        /* button:各能力計算標準 */
        let standardBtn = new Button2(
            150,
            30,
            ResourcesManager.question,
            '能力計算標準'
        )
        standardBtn.position.set(180, 470)
        standardBtn.setText(style1)
        standardBtn.setBorder(0)
        standardBtn.setCornerRadius(10)
        standardBtn.setBackgroundColor(0xfbffe0)
        standardBtn.interactive = true
        standardBtn.buttonMode = true
        let t = this
        standardBtn.click = function () {
            t.personInfoContainer.visible = !t.personInfoContainer.visible
            t.standardContainer.visible = !t.standardContainer.visible
        }
        learningContainer.addChild(standardBtn)

        this.dialog.addChild(learningContainer)
    }
    setStandardPanel() {
        let standardContainer = this.standardContainer
        standardContainer.visible = false
        standardContainer.position.set(
            this.dialog.dialog.x,
            this.dialog.dialog.y
        )
        /* panel */
        let standardPanel = new PIXI.Graphics()
        standardPanel.beginFill(0xfbffe0)
        standardPanel.drawRoundedRect(15, 10, 620, 500, 10)
        standardPanel.endFill()
        standardContainer.addChild(standardPanel)
        /* title:※各能力的計算標準? */
        let standardTitle = new PIXI.Text('※各能力的計算標準?', style10)
        standardTitle.position.set(160, 75)
        standardContainer.addChild(standardTitle)
        /* standard */
        let standard = [
            { name: '正確率', data: '答對總數/題目總數。' },
            { name: '完成度', data: '已完成情境測類總數/各類情境測驗總數。' },
            {
                name: '反應速度',
                data:
                    '第一次測驗結果為0.5分，往後以第一次測驗數據為基準進行評分。',
            },
            { name: '高頻辨識率', data: '高頻類題目答對總數/高頻類題目總數。' },
            { name: '低頻辨識率', data: '低頻類題目答對總數/低頻類題目總數。' },
        ]
        let index = 1
        standard.forEach((standard) => {
            let str = '-' + standard.name
            let name = new PIXI.Text(str, style13)
            name.position.set(50, 90 + 65 * index)
            standardContainer.addChild(name)
            str = ':' + standard.data
            let data = new PIXI.Text(str, style9)
            data.position.set(name.x + name.width + 5, name.y + 3)
            standardContainer.addChild(data)
            index++
        })
        this.dialog.addChild(standardContainer)
    }
}
