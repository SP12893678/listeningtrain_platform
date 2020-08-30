import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import Dialog from 'Component/dialog'
import { apiManageRoleData } from '@/js/api'
import { apiManageLogin } from "@/js/api";

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameStartScene extends Scene {
    constructor() {
        super()
        this.background = new Sprite()
        this.button = new Button(150, 50, 20)
        this.dialog = new Dialog('請先登入',2)
        this.interactive = true
        this.buttonMode = true
        this.click = () => this.gotoNextScene()
        this.setBackground()
        this.setButton()
        this.setDialog()

        this.logindata = null
    }

    setBackground() {
        let background = this.background
        background.texture = resources[ResourcesManager.create_role_bg].texture
        let scale = Config.screen.width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        let button = this.button
        button.position.set((Config.screen.width - button.width) / 2, 750)
        button.click = () => this.gotoNextScene()
        this.addChild(button)
    }
    setDialog(){
        let dialog = this.dialog
        dialog.visible = false
        dialog.setSize(Config.screen.width*0.3,Config.screen.height*0.3)
        dialog.yesBtn.setBorder(0)
        dialog.yesBtn.setCornerRadius(10)
        dialog.yesBtn.click = () =>{
            window.location.href = "./index.html";
        }
        this.addChild(dialog)
    }

    async gotoNextScene() {
        await apiManageLogin({type: "checklogin",})
        .then((res) => {
            console.log('checkLogin',res.data);
            this.logindata = res.data;
            
            if(this.logindata[0] == "0"){
                this.dialog.visible = true
                this.interactive = false
                this.buttonMode = false
            }
        })
        .catch((error) => {
            console.error(error);
        });
        
        window.sessionStorage.setItem('account', this.logindata[0]);//儲存帳號

        if(this.logindata[0] != "0"){
            await apiManageRoleData({ type: 'getData', account: this.logindata[0] })
            .then((res) => {
                console.log('character_data', res.data)
                let scene = ''
                if(res.data.length != 0){
                    scene = 'game_main'
                    // window.sessionStorage.setItem('gender', res.data[2]);
                }else{
                    scene = 'create_role'
                }
                Events.emit('goto', { id: scene, animate: 'fadeIn'})
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }
}
