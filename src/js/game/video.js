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
import TrainModeScene from './scene/TrainModeScene'


let Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite

export default class video extends PIXI.Container {
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
        dialog.setBackgroundColor(0x2894FF, 0.95)
        dialog.setCloseBtnBackgroundColor(0xf8ba00, 0.95)
        dialog.closeBtn.click = () => {
            dialog.visible = false

        }
        this.addChild(dialog)
    }
    setInfoContainer() {


        // PIXI.loader
        //     .add("video1", './src/assets/video/trainmode.mp4')
        //     .load(init);

        // function init() {

        let InfoContainer = this.InfoContainer
        InfoContainer.position.set(
            this.dialog.dialog.x,
            this.dialog.dialog.y
        )
        /* title:操作說明 */
        let learningTitle = new PIXI.Text("導覽影片", style14)
        learningTitle.position.set(400, 20)
        InfoContainer.addChild(learningTitle)

        // var avatar = new PIXI.Sprite(PIXI.loader.resources.video1.texture);
        // console.warn(texture.baseTexture)
        // avatar.interactive = true;
        // avatar.autoplay = true;

        // }
        // InfoContainer.addChild(avatar);


        // ../../assets/video/TrainModeScene.mp4

        this.dialog.addChild(InfoContainer)
    }

}
