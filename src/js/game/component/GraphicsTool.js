import * as PIXI from 'pixi.js'

const GraphicsTool = {
    setPaintingContainer(container) {
        this.graphics = container
    },

    drawRoundedRect(width, height, top_left, top_right, bottom_left, bottom_right) {
        this.graphics.moveTo(top_left, 0)
        this.graphics.lineTo(width - top_right, 0)
        this.graphics.quadraticCurveTo(width, 0, width, top_right)
        this.graphics.lineTo(width, height - bottom_right)
        this.graphics.quadraticCurveTo(width, height, width - bottom_right, height)
        this.graphics.lineTo(bottom_left, height)
        this.graphics.quadraticCurveTo(0, height, 0, height - bottom_left)
        this.graphics.lineTo(0, top_left)
        this.graphics.quadraticCurveTo(0, 0, top_left, 0)
    },

    drawDashLine(linestyle, direction, length, radius) {},
}

export default GraphicsTool
