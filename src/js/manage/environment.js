import * as PIXI from 'pixi.js'
import { OutlineFilter } from 'pixi-filters'
import { Text } from 'pixi.js/lib/core'

const Application = PIXI.Application
const Container = PIXI.Container
const loader = PIXI.loader
const resources = PIXI.loader.resources
const TextureCache = PIXI.utils.TextureCache
const Sprite = PIXI.Sprite

export class Environment {
    constructor (app, enviro_data, object_data) {
        this.app = app
        this.enviro_data = enviro_data
        this.object_data = object_data
        this.enviro_container = new Container()
        this.enviro_bg = new Sprite()
        this.setup()
    }

    setup () {
        this.drawText()
        this.creat_Background()
        this.creat_Objects()
    }

    drawText () {
        const text = new Text('請使用右側編輯區功能匯入情境背景與物件')
        const style = new PIXI.TextStyle({
            fontFamily: 'jf-openhuninn',
            fontSize: 36,
            fill: '#ffffff'
        })
        text.style = style
        text.position.set((1000 - text.width) / 2, (625 - text.height) / 2)
        this.enviro_container.addChild(text)
    }

    creat_Background () {
        // 新增情境背景並設定大小
        this.enviro_bg = new Sprite()
        if (this.enviro_data.background_src != undefined) {
            const texture = resources[this.enviro_data.background_src].texture
            this.enviro_bg.texture = texture
        }
        const scale = this.app.screen.width / this.enviro_bg.width
        this.enviro_bg.scale.set(scale, scale)
        this.enviro_container.addChild(this.enviro_bg)
    }

    creat_Objects () {
        this.object_data.forEach((object_item) => {
            const object_texture = resources[object_item.pic_src].texture
            const object = this.creat_Object(object_item, object_texture)
            this.enviro_container.addChild(object)
            object_item.sprite = object
        })
    }

    creat_Object (object_item, texture) {
        const object = new Sprite(texture)
        const scale = object_item.size / object.width
        object.scale.set(object_item.scale)
        // object.pivot.set(object.width / 2, object.height / 2);
        // console.log(object.pivot)
        const position_arr = object_item.coordinate.split(',')
        object.position.set(position_arr[0], position_arr[1])

        object.filters = [new OutlineFilter(3, 0xf0aaee)] // 邊框

        object.interactive = true // 設定可以互動
        object.buttonMode = true // 當滑鼠滑過時顯示為手指圖示
        object.mouseover = function () {
            object.filters = [new OutlineFilter(3, 0x99ff99)]
        }
        object.mouseout = function () {
            object.filters = [new OutlineFilter(3, 0xf0aaee)]
        }
        return object
        // this.enviro_container.addChild(object);
        // object_item.sprite = object;
    }

    getBackground () {
        return this.enviro_bg
    }

    getEnvironment () {
        return this.enviro_container
    }
}

export class Editor extends Environment {
    constructor (editor, app, enviro_data, object_data) {
        super(app, enviro_data, object_data)
        this.editor = editor
        this.control()
    }

    control () {
        const app = this
        if (this.object_data.length <= 0) return
        this.object_data.forEach((object_item) => {
            object_item.sprite.click = function () {
                app.object_click(object_item)
            }
            app.object_drag(object_item)
        })
    }

    object_click (object_item) {
        const app = this
        app.object_data.forEach((object_item) => {
            object_item.sprite.filters = [new OutlineFilter(3, 0xf0aaee)]
            object_item.sprite.mouseover = function () {
                this.filters = [new OutlineFilter(3, 0x99ff99)]
            }
            object_item.sprite.mouseout = function () {
                this.filters = [new OutlineFilter(3, 0xf0aaee)]
            }
        })
        object_item.sprite.mouseover = null
        object_item.sprite.mouseout = null
        object_item.sprite.filters = [new OutlineFilter(3, 0x11aaff)]
        // console.log(object_item)
        app.editor.sprite = object_item.sprite
        app.editor.select_object.id = object_item.id

        app.editor.select_object.name = object_item.name
        if (object_item.audio != null) app.editor.audio_type = object_item.audio.category[0]
        else app.editor.audio_type = null
        app.editor.select_object.audio = object_item.audio
        app.editor.select_object.position.x = object_item.sprite.position.x
        app.editor.select_object.position.y = object_item.sprite.position.y
        app.editor.select_object.scale = object_item.sprite.scale.x
        app.editor.select_object.degree = object_item.sprite.rotation * (180 / Math.PI)

        app.editor.model = app.editor.objects.indexOf(object_item)
    }

    object_drag (object_item) {
        object_item.sprite
            .on('mousedown', this.onDragStart)
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('mousemove', this.onDragMove)
    }

    onDragStart (event) {
        this.data = event.data
        this.alpha = 0.7
        this.dragging = true

        this.offset_x = this.data.getLocalPosition(this.parent).x - this.position._x
        this.offset_y = this.data.getLocalPosition(this.parent).y - this.position._y
    }

    onDragEnd () {
        this.alpha = 1
        this.dragging = false
        this.data = null
    }

    onDragMove () {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent)
            this.position.x = newPosition.x - this.offset_x
            this.position.y = newPosition.y - this.offset_y
        }
    }
}
