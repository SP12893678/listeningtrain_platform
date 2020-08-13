import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'

import character from '@/js/game/character'
import TextInput from 'Component/TextInput'
import Dialog from 'Component/dialog'


let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameMainScene extends Scene {
    constructor() {
        super()
        // this.setBackground()
        this.setCharacter()
        this.setTextField()
        this.setButton()
        this.setDialog()
    }

    setBackground() {
        // var background = new Sprite(resources[ResourcesManager.game_main].texture)
        // var scale = Config.screen.width / background.width
        // background.scale.set(scale, scale)

        let background = new PIXI.Graphics()
        background.beginFill(0xffffff)
        background.drawRect(0,0,Config.screen.width,Config.screen.height)
        background.endFill();
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
            t.armatureDisplay.animation.play('shakeHand',1);
        }
        this.armatureDisplay.mouseout = function(mouseData) {
            
        }
        this.armatureDisplay.click = function() {
            if (t.dialog == null) {
                t.setDialog()
                t.dialog.click = () => {
                    t.dialog.visible = false;
                }
            } else {
                t.dialog.visible = true
            }
        }
        //this.armatureDisplay.animation.play('shakeHand',1);
    }
    setDialog() {
        this.dialog = new Dialog('',1)
        this.addChild(this.dialog)
        this.dialog.setSize(100,60)
        this.dialog.setSize(1000,600)
        this.dialog.setBackgroundColor(0xFF9300,0.95)
        this.dialog.setCloseBtnBackgroundColor(0xF8BA00,0.95)
        this.setTextField();
        this.dialog.addChild(this.input)
        this.setEditSaveBtn();
       console.log( this.dialog.children)
    }
        /* 建立一個textfield */
    setTextField() {
        this.tempNickname = this.character.name
        this.input = new TextInput({
            input: {
                fontSize: '24px',
                padding: '12px',
                width: '200px',
                color: '#26272E',
            },
            box:{
                default: {fill: '', rounded: 12, stroke: {color: 0x000000, width: 2}},
                focused: {fill: '', rounded: 12, stroke: {color: 0xffffff, width: 2}},
                disabled: {fill: '', rounded: 12}
            }
        })
        this.input.text = this.tempNickname
        this.input._placeholderColor = 0x000000
        this.input.maxLength = 10 
        this.input.placeholder = '輸入你的暱稱...'
        this.input.x = Config.screen.width/2
        this.input.y = Config.screen.height/2
        this.input.pivot.x = this.input.width/2
        this.input.pivot.y = this.input.height/2
    }
    setEditSaveBtn() {
        /* Button to edit nickname */
        let editBtn = new Sprite(PIXI.loader.resources[ResourcesManager.edit].texture)
        let saveBtn = new Sprite(PIXI.loader.resources[ResourcesManager.save].texture)
        let t = this
        this.input.disabled = true
        editBtn.width = 40
        editBtn.height = 40
        editBtn.anchor.set(0.5)
        editBtn.position.set(this.input.x+this.input.width/2+this.input._input_style.padding.split("px")[0]*2, this.input.y)
        editBtn.visible = true
        editBtn.interactive = true // 設定可以互動
        editBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        editBtn.click = function() {
            editBtn.visible = false
            saveBtn.visible = true
            t.input.disabled = false
            t.input.focus() //直接開始編輯
            // t.input.select() //全選編輯
            console.log('now is saveBtn')
        }
        saveBtn.width = 35
        saveBtn.height = 35
        saveBtn.anchor.set(0.5)
        saveBtn.position.set(this.input.x+this.input.width/2+this.input._input_style.padding.split("px")[0]*2, this.input.y)
        saveBtn.visible = false
        saveBtn.interactive = true // 設定可以互動
        saveBtn.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        saveBtn.click = function() {
            editBtn.visible = true
            saveBtn.visible = false
            t.input.disabled = true
            console.log('You have entered',t.input.text)
            console.log('now is editBtn')
        }
        /*All events are dispatched via the default pixi EventEmitter.*/
        this.input.on('keydown', keycode => {
            //搭配著input focus的部分
            if(keycode == 13){
                editBtn.visible = true
                saveBtn.visible = false
                t.input.disabled = true
                console.log('enter')
            }   
        })
        this.dialog.addChild(editBtn)
        this.dialog.addChild(saveBtn)
    }
    /*---------*/
    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '返回'
        button.position.set(700, 400)
        button.click = () => {
            Events.emit('goto', { id: 'create_role', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    update() {
        super.update()
    }
}
