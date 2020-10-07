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
import trainmodevideo from '-!file-loader!@/assets/video/trainmode.mp4'
import practicemodevideo from '-!file-loader!@/assets/video/practicemode.mp4'



let Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite

export default class video extends PIXI.Container {
    constructor(type = 0) {
        super()
        this.type = type
        this.trainmodevideo = trainmodevideo
        this.dialog = new Dialog('', 3)
        this.btn_play = new Button2(150, 70, ResourcesManager.start, '播放')
        this.btn_stop = new Button2(150, 70, ResourcesManager.pause, '停止')
        this.btn_goback = new Button2(150, 70, ResourcesManager.goBack, '')
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
        dialog.setSize(1000, 700)
        dialog.setBackgroundColor(0x2894FF, 0.95)
        dialog.setCloseBtnBackgroundColor(0xf8ba00, 0.95)
        // dialog.closeBtn.click = () => {

        //     dialog.visible = false
        // }
        this.addChild(dialog)
    }
    setInfoContainer() {

        let InfoContainer = this.InfoContainer
        InfoContainer.position.set(
            this.dialog.dialog.x,
            this.dialog.dialog.y
        )
        /* title:操作說明 */
        let learningTitle = new PIXI.Text("導覽影片", style14)
        learningTitle.position.set(400, 20)
        InfoContainer.addChild(learningTitle)


        //视频纹理
        let videoTexture;
        //需要用到的精灵 
        let videoSprite;
        //视频元素
        let videoSource;
        switch (this.type) {
            case 0:
                //加载视频纹理
                videoTexture = PIXI.Texture.fromVideo(trainmodevideo);
                break;
            case 1:
                //加载视频纹理
                videoTexture = PIXI.Texture.fromVideo(practicemodevideo);
                break;
        }

        //创建视频精灵
        videoSprite = new PIXI.Sprite(videoTexture);
        //设置视频精灵的宽度和高度
        videoSprite.width = 800;
        videoSprite.height = 515;

        //视频元素
        videoSource = videoTexture.baseTexture.source;
        videoSource.loop = true
        window.setTimeout((() => videoSource.pause()), 300);

        videoSprite.position.set(100, 90)

        InfoContainer.addChild(videoSprite);


        let btn_play = this.btn_play
        btn_play.position.set(200, 620)
        btn_play.setBorder(0)
        btn_play.setBackgroundColor('', 0)
        btn_play.setText(style15)
        btn_play.mouseover = function (mouseData) {
            btn_play.scale.set(1.1)
        }
        btn_play.mouseout = function (mouseData) {
            btn_play.scale.set(1)
        }

        btn_play.click = () => {
            videoSource.play();
        }
        InfoContainer.addChild(btn_play);

        let btn_stop = this.btn_stop
        btn_stop.position.set(500, 620)
        btn_stop.setBorder(0)
        btn_stop.setBackgroundColor('', 0)
        btn_stop.setText(style15)
        btn_stop.mouseover = function (mouseData) {
            btn_stop.scale.set(1.1)
        }
        btn_stop.mouseout = function (mouseData) {
            btn_stop.scale.set(1)
        }

        btn_stop.click = () => {
            videoSource.pause();
        }
        InfoContainer.addChild(btn_stop);

        let btn_goback = this.btn_goback
        btn_goback.position.set(880, -50)
        btn_goback.setBorder(0)
        btn_goback.setBackgroundColor('', 0)
        btn_goback.scale.set(1.5)
        btn_goback.mouseover = function (mouseData) {
            btn_goback.scale.set(1.6)
        }
        btn_goback.mouseout = function (mouseData) {
            btn_goback.scale.set(1.5)
        }

        btn_goback.click = () => {
            videoSource.pause();
            this.dialog.visible = false
        }
        InfoContainer.addChild(btn_goback);

        this.dialog.addChild(InfoContainer)
    }



}
