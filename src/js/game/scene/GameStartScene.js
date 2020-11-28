import * as PIXI from 'pixi.js'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Config from '@/js/game/Config'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import Dialog from 'Component/dialog'
import { apiManageRoleData } from '@/js/api'
import { apiManageLogin } from "@/js/api";
import emitter3 from '@/assets/json/emitter3.json'
import * as particles from 'pixi-particles'

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
        this.dialog = new Dialog('請先登入', 2)
        this.interactive = true
        this.buttonMode = true
        this.click = () => this.gotoNextScene()
        // this.setBackground()
        this.setButton()
        this.setDialog()

        this.logindata = null


        emitter3.pos.x = 500
        emitter3.pos.y = 500
        var emitter = new particles.Emitter(
            this,
            [PIXI.Texture.fromImage(ResourcesManager.particles)],
            emitter3
        )
        var elapsed = Date.now()
        var update = function () {
            requestAnimationFrame(update)
            var now = Date.now()

            emitter.update((now - elapsed) * 0.001)
            elapsed = now
        }

        /**執行效果 */
        emitter.emit = true
        update()
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
    setDialog() {
        let dialog = this.dialog
        dialog.visible = false
        dialog.setSize(Config.screen.width * 0.3, Config.screen.height * 0.3)
        dialog.yesBtn.setBorder(0)
        dialog.yesBtn.setCornerRadius(10)
        dialog.yesBtn.click = () => {
            window.location.href = "./index.html";
        }
        this.addChild(dialog)
    }

    async gotoNextScene() {
        await apiManageLogin({ type: "checklogin", })
            .then((res) => {
                console.log('checkLogin', res.data);
                this.logindata = res.data;
            })
            .catch((error) => {
                console.error(error);
            });
        if (this.logindata.islogin != "1") {
            this.dialog.visible = true
            this.interactive = false
            this.buttonMode = false
            return
        }
        // window.sessionStorage.setItem('account', this.logindata.user.account);//儲存帳號

        await apiManageRoleData({ type: 'getData' })
            .then((res) => {
                console.log('character_data', res.data)
                let scene = ''
                if (res.data != null) {
                    scene = 'game_main'
                } else {
                    scene = 'create_role'
                }
                Events.emit('goto', { id: scene, animate: 'fadeIn' })
            })
            .catch((error) => {
                console.error(error)
            })

    }
}
