import * as PIXI from 'pixi.js'
import {style12} from '@/js/game/engine/TextStyleManager'

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
        this.btnBgColorAlpha = 1
        this.cornerRadius = 30
        this.btnBgColor = '0x000000'
        this.iconPath = iconPath
        this.btnLabel = btnLabel
        this.icon = new Sprite(PIXI.loader.resources[this.iconPath].texture)
        this.buttonContainer = new Container()
        this.setBackground()
        this.setIcon()
        this.fontFamily = style12
        this.setText(this.fontFamily)
        this.setButton()
        this.interactive = true
        this.buttonMode = true
        this.mouseover = function(mouseData) {
            this.alpha = 0.85
        }
        this.mouseout = function(mouseData) {
            this.alpha = 1
        }
    }
    setBackground(){
        /* Draws a button */
        this.button = new PIXI.Graphics()
        this.button.lineStyle(this.btnBorder, this.btnBorderColor)
        this.button.beginFill(this.btnBgColor,this.btnBgColorAlpha) //填充
        this.button.drawRoundedRect(0, 0, this.btnWidth, this.btnHeight, this.cornerRadius)
        this.button.endFill()
        this.addChild(this.button)
    }
    setButton() {
        let buttonContainer = this.buttonContainer
        buttonContainer.pivot.set((this.text.x+this.text.width)/2,this.icon.height/2)
        buttonContainer.position.set(this.btnWidth/2+this.btnBorder,this.btnHeight/2+this.btnBorder)
        this.addChild(buttonContainer)
    }
    setIcon(){
        let icon = this.icon
        icon.width = this.btnHeight * 0.7
        icon.height = this.btnHeight * 0.7
        icon.position.set(0,0)
        this.buttonContainer.addChild(icon)
    }
    setBorder(btnBorder) {
        this.btnBorder = btnBorder
        this.reDraw()
        this.setButton()
    }
    setBorderColor(btnBorderColor) {
        this.btnBorderColor = btnBorderColor
        this.reDraw()
        this.setButton()
    }
    setBackgroundColor(backgroundColor,alpha){
        this.btnBgColor = backgroundColor;
        this.btnBgColorAlpha = alpha;
        this.reDraw()
        this.setButton()
    }
    setCornerRadius(cornerRadius) {
        this.cornerRadius = cornerRadius
        this.reDraw()
        this.setButton()
    }
    reDraw() {
        this.button.clear()
        this.button.lineStyle(this.btnBorder, this.btnBorderColor)
        this.button.beginFill(this.btnBgColor,this.btnBgColorAlpha) //填充
        this.button.drawRoundedRect(0, 0, this.btnWidth, this.btnHeight, this.cornerRadius)
        this.button.endFill()
    }
    setText(fontFamily) {
        this.buttonContainer.removeChild(this.text)
        this.text = new PIXI.Text(this.btnLabel,fontFamily)
        this.text.position.set(this.icon.width+3,(this.icon.height-this.text.height)/2)
        this.buttonContainer.addChild(this.text)
    }
}
