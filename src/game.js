import 'babel-polyfill'
import './game.css'
import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
import ScenesManager from '@/js/game/engine/ScenesManager'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Events from '@/js/game/Events'
import Config from '@/js/game/Config'

import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
/**----------------------------- */
;(function() {
    function loadProgressHandler(loader, resource) {
        if (resources[ResourcesManager.create_role_bg].texture && scenesManager.scenes['loading'] == null) Events.emit('goto', { id: 'loading' })
        if (scenesManager.scenes['loading'] != null) {
            scenesManager.scenes['loading'].progress_bar.setProgress(loader.progress / 100)
        }
    }

    function getloadResources(resources) {
        let data = Object.values(resources)
        return data.filter((item, index, self) => index === self.indexOf(item) && !PIXI.loader.resources[item])
    }

    function start() {
        console.log('game ready')
        Events.emit('goto', { id: 'game_start' })
    }

    /**--------------------------------------------------- */
    /**開啟全螢幕 */
    // document.documentElement.requestFullscreen()

    // let console = {
    //     isDev: false,
    //     log(...args) {
    //         if (!this.isDev) return
    //         window.console.log(...args)
    //     },
    // }
    // window.console = console

    let Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite

    let scenesManager = ScenesManager
    scenesManager.create()

    loader
        .add(getloadResources(ResourcesManager))
        .on('progress', loadProgressHandler)
        .load(start)

    // console.log(img)
    const gui = new dat.GUI()
    var effectController = {
        button: { X: 1, Y: 1 },
        menu: { X: 1, Y: 1 },
    }

    // 滑動的 controller，拖動範圍為 3~15，間隔為1
    var button = gui.addFolder('Button')
    button.add(effectController.button, 'X', 0, 1600, 1).onChange(countChange)
    button.add(effectController.button, 'Y', 0, 900, 1).onChange(countChange)
    button.open()

    var menu = gui.addFolder('Menu')
    menu.add(effectController.menu, 'X', 0, 1600, 1).onChange(countChange)
    menu.add(effectController.menu, 'Y', 0, 900, 1).onChange(countChange)
    menu.open()

    function countChange() {
        if (scenesManager.scenes['game_start']) {
            scenesManager.scenes['game_start'].button.position.set(effectController.button.X, effectController.button.Y)
        }
        if (scenesManager.scenes['create_role']) {
            scenesManager.scenes['create_role'].menu.background.position.set(effectController.menu.X, effectController.menu.Y)
        }
    }
})()
