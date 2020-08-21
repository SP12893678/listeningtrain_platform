import * as PIXI from 'pixi.js'
import {style6 } from '@/js/game/engine/TextStyleManager'
import Config from '@/js/game/Config'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class Timer extends PIXI.Container {
    constructor() {
        super()
        this.min = 0
        this.sec = -1
        this.state = 0 //stop
        this.text = new PIXI.Text()

        this.startTime()
        this.setText()
        this.setEvent()
    }

    startTime(){
        let mm = this.min;
        let ss = this.sec;
        if(ss > 59){
            mm += 1
            ss = 0
        }
        this.min = mm
        this.sec = ss+1
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);
        let time = mm + ":" + ss;
        this.time = time
    } 
    checkTime(i){
        if(i < 10) {
            i = "0" + i;
        }
        return i;
    }
    setText() {
        let text = this.text
        text.text = ''
        text.style = style6
        text.style.fontSize = 28
        text.position.set(0,0)
        this.addChild(text)
    }
    setEvent() {
        let text = this.text
        this.startTime()
        text.text = this.time
    }
    reset(){
        this.state = 0
        let text = this.text
        this.min = 0
        this.sec = 0
        this.startTime()
        text.text = this.time
    }
    start(){
        this.state = 1
        let text = this.text
        this.timer = setInterval(() => {
            this.startTime()
            text.text = this.time
        }, 1000)
    }
    stop(){
        this.state = 0
        clearInterval(this.timer); 
    }
}
