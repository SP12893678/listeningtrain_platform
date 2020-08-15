import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'

import character from '@/js/game/character'
import TextInput from 'Component/TextInput'
import Dialog from 'Component/dialog'
import { style1,style8,style9,style10,style11,style13} from '@/js/game/engine/TextStyleManager'
import RadarChart from 'Component/RadarChart'
import Button2 from 'Component/button2'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameMainScene extends Scene {
    constructor() {
        super()
        this.setBackground()
        this.setButton()
        this.setCharacter()
        this.setTextField()
        this.setDialog()
        this.setPersonInfoPanel()
        this.setLearningPanel()
        this.setStandardPanel()
        this.nickname = 'Mary'

    }

    setBackground() {
        // var background = new Sprite(resources[ResourcesManager.game_main].texture)
        // var scale = Config.screen.width / background.width
        // background.scale.set(scale, scale)

        let background = new PIXI.Graphics()
        background.beginFill(0xffffff)
        background.drawRect(0, 0, Config.screen.width, Config.screen.height)
        background.endFill()
        this.addChild(background)
    }
    /* 建立角色 */
    setCharacter() {
        /* Character */
        this.character = new character('Mary')
        this.factory = this.character.factory
        this.armatureDisplay = this.character.armatureDisplay
        this.armatureDisplay.position.set(395, 490)
        this.armatureDisplay.scale.set(0.4)
        this.addChild(this.armatureDisplay)
        this.armatureDisplay.interactive = true
        this.armatureDisplay.buttonMode = true
        let t = this
        this.armatureDisplay.mouseover = function(mouseData) {
            t.armatureDisplay.animation.play('shakeHand', 1)
        }
        this.armatureDisplay.mouseout = function(mouseData) {}
        this.armatureDisplay.click = function() {
            if (t.dialog == null) {
                t.setDialog()
                t.dialog.click = () => {
                    t.dialog.visible = false
                }
            } else {
                t.dialog.visible = true
            }
        }
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    setDialog() {
        this.dialog = new Dialog('',1)
        this.dialog.visible = false
        this.addChild(this.dialog)
        this.dialog.setSize(1000,530)
        this.dialog.setBackgroundColor(0xFF9300,0.95)
        this.dialog.setCloseBtnBackgroundColor(0xF8BA00,0.95)

    }
    /* 建立一個textfield */
    setTextField() {
        // this.tempNickname = this.character.name
        this.input = new TextInput({
            input: {
                fontFamily: 'jf-openhuninn',
                fontSize: '20px',
                padding: '3px',
                width: '170px',
                color: '#000000',
            },
            box:{
                default: {fill: '', rounded: 1, stroke: {color: '', width: 0}},
                focused: {fill: '', rounded: 1, stroke: {color: 0xffffff, width: 2}},
                disabled: {fill: '', rounded: 1}
            }
        })
        this.input._placeholderColor = 0x000000
        this.input.maxLength = 10 
        // this.input.text = this.tempNickname
        // this.input.placeholder = '輸入你的暱稱...'
        // this.input.x = Config.screen.width/2
        // this.input.y = Config.screen.height/2
        // this.input.pivot.x = this.input.width/2
        // this.input.pivot.y = this.input.height/2
    }
    setEditSaveBtn() {
        /* Button to edit nickname */
        this.editBtn = new Sprite(PIXI.loader.resources[ResourcesManager.edit].texture)
        this.saveBtn = new Sprite(PIXI.loader.resources[ResourcesManager.save].texture)
        let t = this
        this.input.disabled = true
        this.editBtn.width = 30
        this.editBtn.height = 30
        this.editBtn.anchor.set(0.5)
        this.editBtn.position.set(this.input.x+this.input.width+20,this.input.y+13)
        this.editBtn.visible = true
        this.editBtn.interactive = true // 設定可以互動
        this.editBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        this.editBtn.click = function() {
            t.editBtn.visible = false
            t.saveBtn.visible = true
            t.input.disabled = false
            t.input.focus() //直接開始編輯
            // t.input.select() //全選編輯
            console.log('now is saveBtn')
        }
        this.saveBtn.width = 25
        this.saveBtn.height = 25
        this.saveBtn.anchor.set(0.5)
        this.saveBtn.position.set(this.editBtn.x,this.editBtn.y)
        this.saveBtn.visible = false
        this.saveBtn.interactive = true // 設定可以互動
        this.saveBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        this.saveBtn.click = function() {
            t.editBtn.visible = true
            t.saveBtn.visible = false
            t.input.disabled = true
            console.log('You have entered', t.input.text)
            console.log('now is editBtn')
            t.nickname = t.input.text
        }
        /*All events are dispatched via the default pixi EventEmitter.*/
        this.input.on('keydown', (keycode) => {
            //搭配著input focus的部分
            if(keycode == 13){
                t.editBtn.visible = true
                t.saveBtn.visible = false
                t.input.disabled = true
                console.log('enter')
                t.nickname = t.input.text
            }   
        })
    }
    setPersonInfoPanel(){
        this.personInfoContainer = new Container()
        this.personInfoContainer.position.set(this.dialog.dialog.x,this.dialog.dialog.y)
        /* panel */
        let personInfoPanel = new PIXI.Graphics()
        personInfoPanel.beginFill(0xFBFFE0)
        personInfoPanel.drawRoundedRect(15,10,620,500,10)
        personInfoPanel.endFill()
        personInfoPanel.beginFill(0xFEC036)
        personInfoPanel.drawRoundedRect(40,70,248,392,10)
        personInfoPanel.endFill()
        this.personInfoContainer.addChild(personInfoPanel)
        /* character background */
        let characterBg = new Sprite(
            PIXI.loader.resources[ResourcesManager.profileBg].texture
        )
        let scale = 240 / characterBg.width
        characterBg.scale.set(scale)
        characterBg.position.set(44,76)
        this.personInfoContainer.addChild(characterBg)
        /* rank or title */
        let showtitle = new Sprite(PIXI.loader.resources[ResourcesManager.newPlayer].texture)
        showtitle.scale.set(50/showtitle.height)
        showtitle.position.set(115,50)
        this.personInfoContainer.addChild(showtitle)
        /* character */
        let person = new character('Mary').armatureDisplay
        person.scale.set(0.35)
        person.position.set(164,310)
        person.interactive = false
        person.buttonMode = false
        this.personInfoContainer.addChild(person)
        /* title:基本資料 */
        let infoTitle = new PIXI.Text('基本資料',style10)
        infoTitle.position.set(390,75)
        this.personInfoContainer.addChild(infoTitle)
        /* profile item */
        this.personInfoItemContainer = new Container()
        this.personInfoContainer.addChild(this.personInfoItemContainer)
        this.personInfoItemContainer.position.set(307,150)
        let id = '123'
        this.create_item(' I D',id,ResourcesManager.id)
        let temp = new Container()
        this.setTextField()
        temp.addChild(this.input)
        let name = 'Mary'
        this.input.text = name
        this.input.placeholder = '輸入你的暱稱...'
        this.setEditSaveBtn()
        temp.addChild(this.editBtn)
        temp.addChild(this.saveBtn)
        this.create_item('姓名',temp,ResourcesManager.name)
        let gender = '男'
        this.create_item('性別',gender,ResourcesManager.gender)
        let birthday = '2020.20.20'
        this.create_item('生日',birthday,ResourcesManager.birthday)
        let title = new Sprite(PIXI.loader.resources[ResourcesManager.newPlayer].texture)
        title.scale.set(30/title.height)
        this.create_item('稱號',title,ResourcesManager.title)
        let money = '$'+ 500
        this.create_item('金幣',money,ResourcesManager.money)
        

        this.dialog.addChild(this.personInfoContainer)
    }
    create_item(itemName,itemValue,iconPic){
        let tempContainer = new Container()
        /* panel */
        let g = new PIXI.Graphics()
        g.beginFill(0xFF644E)
        g.drawRoundedRect(0,0,308,38,10)
        g.endFill()
        g.beginFill(0xF8BA00)
        g.drawRoundedRect(78,3,231,35,10)
        g.endFill()
        tempContainer.addChild(g)
        /* icon */
        let icon = new Sprite(PIXI.loader.resources[iconPic].texture)
        icon.width = 24
        icon.height = 24
        icon.position.set(g.x+5,g.y+6)
        tempContainer.addChild(icon)
        /* itemName */
        let item = new PIXI.Text(itemName,style8)
        item.position.set(g.x+icon.width+9,8)
        tempContainer.addChild(item)
        /* itemValue */
        let value;
        if(typeof(itemValue) == "string"){
            value = new PIXI.Text(itemValue,style9)
            value.position.set(85,10)
        }
        else{ 
            value = itemValue 
            value.position.set(83,7)
        }
        tempContainer.addChild(value)
        
        tempContainer.position.set(0,this.personInfoItemContainer.children.length*40)
        this.personInfoItemContainer.addChild(tempContainer)
    }
    setLearningPanel(){
        this.learningContainer = new Container()
        this.learningContainer.position.set(this.dialog.dialog.x+650,this.dialog.dialog.y)
        /* title:學習狀況 */
        let learningTitle = new PIXI.Text('學習狀況',style11)
        learningTitle.position.set(100,75)
        this.learningContainer.addChild(learningTitle)
        /* 雷達圖 */
        let labels = ['正確率', '反應\n速度', '  低頻\n辨識率', '  高頻\n辨識率','完成度']
        let datasets = [
            { name: '最近一次測驗', data: [50, 10, 75, 150, 100] },
            { name: '個人學習平均值', data: [100, 70, 150, 80, 30] },
        ]
        let chart = new RadarChart(labels, datasets)
        chart.position.set(175, 275)
        chart.barLabel.position.set(-350,350)
        chart.scale.set(325/chart.width)
        this.learningContainer.addChild(chart)
        /* button:各能力計算標準 */
        let standardBtn = new Button2(150,30, ResourcesManager.question, '能力計算標準')
        standardBtn.position.set(180,470)
        standardBtn.setText(style1)
        standardBtn.setBorder(0)
        standardBtn.setCornerRadius(10)
        standardBtn.setBackgroundColor(0xFBFFE0)
        standardBtn.interactive = true
        standardBtn.buttonMode = true
        let t = this;
        standardBtn.click = function(){
            t.personInfoContainer.visible = !t.personInfoContainer.visible
            t.standardContainer.visible = !t.standardContainer.visible
        }
        this.learningContainer.addChild(standardBtn)

        this.dialog.addChild(this.learningContainer)
        
    }
    setStandardPanel(){
        this.standardContainer = new Container()
        this.standardContainer.visible = false
        this.standardContainer.position.set(this.dialog.dialog.x,this.dialog.dialog.y)
        /* panel */
        let standardPanel = new PIXI.Graphics()
        standardPanel.beginFill(0xFBFFE0)
        standardPanel.drawRoundedRect(15,10,620,500,10)
        standardPanel.endFill()
        this.standardContainer.addChild(standardPanel)
        /* title:※各能力的計算標準? */
        let standardTitle = new PIXI.Text('※各能力的計算標準?',style10)
        standardTitle.position.set(160,75)
        this.standardContainer.addChild(standardTitle)
        /* standard */
        let standard  = [
            { name: '正確率', data:'答對總數/題目總數。' },
            { name: '完成度', data:'已完成情境測類總數/各類情境測驗總數。' },
            { name: '反應速度', data:'第一次測驗結果為0.5分，往後以第一次測驗數據為基準進行評分。' },
            { name: '高頻辨識率', data:'高頻類題目答對總數/高頻類題目總數。' },
            { name: '低頻辨識率', data:'低頻類題目答對總數/低頻類題目總數。' },
        ]
        let index = 1
        standard.forEach( standard =>{
            let str = '-' + standard.name
            let name = new PIXI.Text(str,style13)
            name.position.set(50,90+65*index)
            this.standardContainer.addChild(name)
            str = ':'+standard.data
            let data = new PIXI.Text(str,style9)
            data.position.set(name.x+name.width+5,name.y+3)
            this.standardContainer.addChild(data)
            index++
        });
        this.dialog.addChild(this.standardContainer)
        
    }
    /*---------*/
    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '返回'
        button.position.set(700, 400)
        button.click = () => {
            Events.emit('goto', { id: 'enviro_select', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    update() {
        super.update()
    }
}
