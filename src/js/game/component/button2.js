import * as PIXI from 'pixi.js'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

/**
 * A button component
 * @constructor
 * @param {number} btnWidth - The btnWidth of the button
 * @param {number} btnHeight - The btnHeight of the button
 * @param {number} btnBorder - The btnBorder of the button
 * @param {number} cornerRadius - The corner radius of the button
 * @param {number} btnBgColor - The background color of the button
 * @param {string} iconPath - The resource of the icon
 * @param {string} btnLabel - The btnLabel(Text) of the button
 */
export default class Button2 extends PIXI.Container {
    constructor(btnWidth, btnHeight, iconPath, btnLabel) {
        super()
        this.btnWidth = btnWidth
        this.btnHeight = btnHeight
        this.btnBorder = 4
        this.btnBorderColor = '0xFFFFFF'
        this.cornerRadius = 30
        this.btnBgColor = '0x000000'
        this.iconPath = iconPath
        this.btnLabel = btnLabel
        this.setButton()
        this.setText()
        this.interactive = true
        this.buttonMode = true
        this.mouseover = function(mouseData) {
            this.alpha = 0.85
        }
        this.mouseout = function(mouseData) {
            this.alpha = 1
        }
    }

    setButton() {
        /* Draws a button */
        this.button = new PIXI.Graphics()
        this.button.lineStyle(this.btnBorder, this.btnBorderColor)
        this.button.beginFill(this.btnBgColor) //填充
        this.button.drawRoundedRect(0, 0, this.btnWidth, this.btnHeight, this.cornerRadius)
        this.button.endFill()
        var icon = new Sprite(PIXI.loader.resources[this.iconPath].texture)
        icon.width = this.btnHeight * 0.7
        icon.height = this.btnHeight * 0.7
        icon.position.set(this.btnWidth * 0.1, (this.btnHeight * 0.3) / 2)
        this.button.addChild(icon)
        this.addChild(this.button)
    }
    setBorder(btnBorder) {
        this.btnBorder = btnBorder
        this.reDraw()
    }
    setBorderColor(btnBorderColor) {
        this.btnBorderColor = btnBorderColor
        this.reDraw()
    }
    setBackgroundColor(btnBgColor) {
        this.btnBgColor = btnBgColor
        this.reDraw()
    }
    setCornerRadius(cornerRadius) {
        this.cornerRadius = cornerRadius
        this.reDraw()
    }
    reDraw() {
        this.button.clear()
        this.button.lineStyle(this.btnBorder, this.btnBorderColor)
        this.button.beginFill(this.btnBgColor) //填充
        this.button.drawRoundedRect(0, 0, this.btnWidth, this.btnHeight, this.cornerRadius)
        this.button.endFill()
    }
    setText() {
        var text = new PIXI.Text(this.btnLabel, {
            fontFamily: 'Noto Sans TC',
            fontSize: this.btnHeight * 0.5,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.position.set((this.btnHeight * 0.8 + this.btnWidth - text.width) / 2, (this.btnHeight - text.height) / 2)
        this.addChild(text)
    }
}
