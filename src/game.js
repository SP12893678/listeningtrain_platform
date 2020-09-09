import 'babel-polyfill'
import './game.css'
import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
import ScenesManager from '@/js/game/engine/ScenesManager'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Events from '@/js/game/Events'
import Config from '@/js/game/Config'
import {
    apiGetFolderFileList,
    apiManageEnviroment,
    apiManageObject,
    apiManageAudio,
} from '@/js/api'

import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
/**----------------------------- */
;(function() {
    function loadProgressHandler(loader, resource) {
        if (
            resources[ResourcesManager.create_role_bg].texture &&
            scenesManager.scenes['loading'] == null
        )
            Events.emit('goto', { id: 'loading' })
        if (scenesManager.scenes['loading'] != null) {
            scenesManager.scenes['loading'].progress_bar.setProgress(
                loader.progress / 100
            )
        }
    }

    function getloadResources(resources) {
        let data = Object.values(resources)
        return data.filter(
            (item, index, self) =>
                index === self.indexOf(item) && !PIXI.loader.resources[item]
        )
    }

    function start() {
        console.log('game ready')
        Events.emit('goto', { id: 'game_start' })
    }

    async function init() {
        let object_arr = []
        let audio_arr = []
        let data = []

        await apiManageEnviroment({ type: 'get', amount: 'all' }).then(
            (res) => {
                data.push(...res.data.map((item) => item.background_src))
                res.data.forEach((item) =>
                    object_arr.push(...item.object.split(','))
                )
            }
        )

        await apiManageObject({
            type: 'get',
            amount: 'part',
            items: object_arr,
        }).then((res) => {
            data.push(...res.data.map((item) => item.pic_src))
            audio_arr = res.data.map((item) => item.sound_src)
        })

        await apiManageAudio({
            type: 'get',
            amount: 'part',
            items: audio_arr,
        }).then((res) => {
            data.push(...res.data.map((item) => item.sound_src))
        })

        data.push("../static/sound/effect/correct.mp3")
        data.push("../static/sound/effect/wrong.mp3")

        // await apiGetFolderFileList({
        //     path: 'images-enviro-background',
        //     extensions: ['*.gif', '*.jpg', '*.png'],
        // })
        //     .then((res) => {
        //         data.push(...res.data)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
        // await apiGetFolderFileList({
        //     path: 'images-enviro-object',
        //     extensions: ['*.png'],
        // })
        //     .then((res) => {
        //         data.push(...res.data)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

        loader
            .add(getloadResources(ResourcesManager))
            .add(data)
            .on('progress', loadProgressHandler)
            .load(start)
    }

    /**--------------------------------------------------- */
    let Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite
    let scenesManager = ScenesManager
    scenesManager.create()
    init()
    /**開啟全螢幕 */
    // document.documentElement.requestFullscreen()

    // let console = {
    //     isDev: false,
    //     log(...args) {
    //         if (!console.isDev) return
    //         window.console.log(...args)
    //     },
    // }
    // window.console = console

    // console.log(img)
    // const gui = new dat.GUI()
    // var effectController = {
    //     button: { X: 1, Y: 1 },
    //     menu: { X: 1, Y: 1 },
    // }

    // // 滑動的 controller，拖動範圍為 3~15，間隔為1
    // var button = gui.addFolder('Button')
    // button.add(effectController.button, 'X', 0, 1600, 1).onChange(countChange)
    // button.add(effectController.button, 'Y', 0, 900, 1).onChange(countChange)
    // button.open()

    // var menu = gui.addFolder('Menu')
    // menu.add(effectController.menu, 'X', 0, 1600, 1).onChange(countChange)
    // menu.add(effectController.menu, 'Y', 0, 900, 1).onChange(countChange)
    // menu.open()

    // function countChange() {
    //     if (scenesManager.scenes['game_start']) {
    //         scenesManager.scenes['game_start'].button.position.set(effectController.button.X, effectController.button.Y)
    //     }
    //     if (scenesManager.scenes['create_role']) {
    //         scenesManager.scenes['create_role'].menu.background.position.set(effectController.menu.X, effectController.menu.Y)
    //     }
    // }
})()
