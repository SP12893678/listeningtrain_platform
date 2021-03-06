import * as PIXI from 'pixi.js'
import ScenesManager from '@/js/game/engine/ScenesManager'
import LoadingScene from 'Scene/LoadingScene'
import GameStartScene from 'Scene/GameStartScene'
import CreateRoleScene from 'Scene/CreateRoleScene'
import GameMainScene from 'Scene/GameMainScene'
import EnviromentSelectScene from 'Scene/EnviromentSelectScene'
import EnviromentDetailScene from 'Scene/EnviromentDetailScene'
import TrainModeScene from 'Scene/TrainModeScene'
import PracticeModeScene from 'Scene/PracticeModeScene'
import TestModeScene from 'Scene/TestModeScene'
import BackpackScene from 'Scene/BackpackScene'
import Dialog from 'Component/dialog'

import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const EventEmitter = require('eventemitter3')
const events = new EventEmitter()

events.on('goto', (val) => {
    // Events.emit('loading')
    if (ScenesManager.scenes[val.id]) ScenesManager.goToScene(val.id)
    else {
        switch (val.id) {
        case 'loading':
            ScenesManager.createScene(val.id, new LoadingScene())
            break
        case 'game_start':
            ScenesManager.createScene(val.id, new GameStartScene())
            break
        case 'create_role':
            ScenesManager.createScene(val.id, new CreateRoleScene())
            break
        case 'game_main':
            ScenesManager.createScene(val.id, new GameMainScene())
            break
        case 'enviro_select':
            ScenesManager.createScene(val.id, new EnviromentSelectScene())
            break
        case 'enviro_detail':
            ScenesManager.createScene(val.id, new EnviromentDetailScene())
            break
        case 'train_mode':
            ScenesManager.createScene(val.id, new TrainModeScene())
            ScenesManager.scenes[val.id].init(val.environmentId)
            break
        case 'practice_mode':
            ScenesManager.createScene(val.id, new PracticeModeScene())
            break
        case 'test_mode':
            ScenesManager.createScene(val.id, new TestModeScene())
            break
        case 'backpack':
            ScenesManager.createScene(val.id, new BackpackScene())
            break
        default:
            break
        }
        ScenesManager.goToScene(val.id)
    }

    if (val.animate == undefined) return
    ScenesManager.scenes[val.id].alpha = 0
    gsap.to(ScenesManager.scenes[val.id], {
        pixi: {
            alpha: 1
        },
        duration: 1
    })
})

events.on('loading', () => {
    ScenesManager.goToScene('loading')
    ScenesManager.scenes.loading.alpha = 0
    gsap.to(ScenesManager.scenes.loading, {
        pixi: {
            alpha: 1
        },
        duration: 1
    })
})

events.on('warning', (val) => {
    switch (val.no) {
    case -1:
        const warningDialog = new Dialog('你已獲得過此服裝', 2)
        warningDialog.name = 'repeatClothes'
        ScenesManager.currentScene.addChild(warningDialog)
        warningDialog.yesBtn.click = () => {
            ScenesManager.currentScene.removeChild(warningDialog)
        }
        break
    default:
        break
    }
})

events.on('receive', (val) => {
    switch (val.no) {
    case -1:
        const warningDialog = new Dialog('你已獲得過此服裝', 2)
        warningDialog.name = 'repeatClothes'
        ScenesManager.currentScene.addChild(warningDialog)
        warningDialog.yesBtn.click = () => {
            ScenesManager.currentScene.removeChild(warningDialog)
        }
        break
    default:
        break
    }
})

export default events
