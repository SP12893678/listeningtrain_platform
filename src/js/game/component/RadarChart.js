import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { style1, style5 } from '@/js/game/engine/TextStyleManager'

export default class RadarChart extends PIXI.Container {
    constructor(labels, datasets) {
        super()
        this.labels = labels
        this.datasets = datasets
        this.drawRadar()
        // this.dataview = this.setDataview()

        this.chart = {}
        this.colors = [0x4ec9f5, 0xf54e99]

        this.datasets.forEach((dataset) => {
            this.addChart(dataset.name, dataset.data)
        })
    }

    setLabel() {}

    setDataview() {
        let container = new PIXI.Container()
        let background = new PIXI.Graphics()
        background.beginFill(0x000000, 0.7)
        background.drawRoundedRect(0, 0, 120, 50, 12)
        background.endFill()
        let label = new PIXI.Text()
        let name = new PIXI.Text()
        let value = new PIXI.Text()
        container.addChild(background)
        container.addChild(label)
        name.position.set(0, label.height + 5)
        container.addChild(name)
        value.position.set(name.width + 5, label.height + 5)
        container.addChild(value)
        this.addChild(container)
        return { container: container, label: label, name: name, value: value }
    }

    getPath(radius, sides) {
        let path = []
        let start_degree = -Math.PI / 2
        for (let index = 0; index < sides; index++) {
            path.push({
                x: radius * Math.cos(start_degree + ((Math.PI * 2) / sides) * index),
                y: radius * Math.sin(start_degree + ((Math.PI * 2) / sides) * index),
            })
        }
        return path
    }

    drawPolygon(radius, sides) {
        let path = this.getPath(radius, sides)
        var polygon = new PIXI.Graphics()
        polygon.lineStyle(2, 0x333333, 0.3)
        polygon.moveTo(path[0].x, path[0].y)
        path.forEach((point) => {
            polygon.lineTo(point.x, point.y)
        })
        polygon.closePath()
        polygon.endFill()
        this.addChild(polygon)
    }

    drawRadar() {
        let sides = this.labels.length
        let radius = 25
        let max_radius = 150
        while (radius <= max_radius) {
            this.drawPolygon(radius, sides)
            radius += 25
        }

        let path = this.getPath(max_radius, sides)
        let line = new PIXI.Graphics()
        line.lineStyle(2, 0x333333, 0.3)

        path.forEach((point) => {
            line.moveTo(0, 0)
            line.lineTo(point.x, point.y)
        })

        path = this.getPath(160, sides)
        this.labels.forEach((label, index) => {
            let text = new PIXI.Text(label, style5)
            console.log(label, path[index].x)
            let anchor = 0.5
            if (path[index].x > 75) anchor = 0
            if (path[index].x < 0) anchor = 1
            text.anchor.set(anchor, 0.5)
            text.position.set(path[index].x, path[index].y)
            this.addChild(text)
        })

        this.addChild(line)
    }

    addChart(id, data) {
        let color = this.colors[Object.keys(this.chart).length]
        let sides = this.labels.length
        let chart = new PIXI.Container()
        let path = this.getPath(150, sides)
        let polygon = new PIXI.Graphics()
        polygon.lineStyle(4, color, 1)
        polygon.beginFill(color, 0.3)
        polygon.moveTo((path[0].x * data[0]) / 150, (path[0].y * data[0]) / 150)

        let dots = []
        path.forEach((point, index) => {
            polygon.lineTo((point.x * data[index]) / 150, (point.y * data[index]) / 150)
            let dot = new PIXI.Graphics()
            dot.beginFill(0xffffff, 1)
            dot.drawCircle((point.x * data[index]) / 150, (point.y * data[index]) / 150, 6)
            dot.beginFill(color, 1)
            dot.drawCircle((point.x * data[index]) / 150, (point.y * data[index]) / 150, 5)
            dot.endFill()

            dot.interactive = true
            dot.buttonMode = true
            dot.mouseover = () => {
                dot.clear()
                dot.beginFill(color, 1)
                dot.drawCircle((point.x * data[index]) / 150, (point.y * data[index]) / 150, 6)
                dot.beginFill(0xffffff, 1)
                dot.drawCircle((point.x * data[index]) / 150, (point.y * data[index]) / 150, 5)
                dot.endFill()

                // console.log((point.x * data[index]) / 150, (point.y * data[index]) / 150)
                // this.dataview.container.position.set((point.x * data[index]) / 150, (point.y * data[index]) / 150 - this.dataview.container.height)
            }
            dot.mouseout = () => {
                dot.clear()
                dot.beginFill(0xffffff, 1)
                dot.drawCircle((point.x * data[index]) / 150, (point.y * data[index]) / 150, 6)
                dot.beginFill(color, 1)
                dot.drawCircle((point.x * data[index]) / 150, (point.y * data[index]) / 150, 5)
                dot.endFill()
            }

            dots.push(dot)
        })
        polygon.closePath()

        chart.addChild(polygon)
        dots.forEach((dot) => chart.addChild(dot))
        this.addChild(chart)
        this.addBar(id)
        this.chart[id] = { chart: chart, data: data }
    }
    addChartDatas(arr) {}

    addBar(id) {
        let color = this.colors[Object.keys(this.chart).length]
        let bar = new PIXI.Container()
        let rectangle = new PIXI.Graphics()
        rectangle.lineStyle(4, color, 1)
        rectangle.beginFill(color, 0.3)
        rectangle.drawRect(0, 0, 50, 15)
        rectangle.endFill()
        style1.fontSize = 18
        let text = new PIXI.Text(id, style1)
        text.position.set(60, 0)
        bar.addChild(text)
        bar.interactive = true
        bar.buttonMode = true
        bar.click = () => {
            this.chart[id].chart.visible = !this.chart[id].chart.visible
        }
        bar.addChild(rectangle)
        bar.position.set(150, -150 + Object.keys(this.chart).length * 40)
        this.addChild(bar)
    }
}
