import * as PIXI from 'pixi.js'

let TextStyle = PIXI.TextStyle
/**
 * Custom font was added by game.css
 */

const style1 = new TextStyle({
    fontFamily: 'jf-openhuninn',
    fontSize: 24,
    fill: '#000000',
})
const style2 = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: ' white ',
    stroke: '#0x66FF33',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
})

export { style1,style2 }
