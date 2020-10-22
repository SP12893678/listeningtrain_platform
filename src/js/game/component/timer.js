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
        this.sec = 0
        this.millisec = -1
        this.state = false //stop
        this.text = new PIXI.Text()

        this.startTime()
        this.setText()
        this.setEvent()
    }

    startTime(){
        let mm = this.min
        let ss = this.sec
        let ms = this.millisec
        if(ms > 99){
            ss += 1
            ms = 0
        }
        if(ss > 59){
            mm += 1
            ss = 0
        }
        this.min = mm
        this.sec = ss
        this.millisec = ms + 1
        mm = this.checkTime(mm)
        ss = this.checkTime(ss)
        ms = this.checkTime(ms)
        let time = mm + ":" + ss + "." + ms//Math.floor(ms/10)
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
        this.state = false
        clearInterval(this.timer); 
        let text = this.text
        this.min = 0
        this.sec = 0
        this.millisec = 0
        this.startTime()
        text.text = this.time
        console.log('reset')
    }
    start(){
        if(!this.state){
            this.state = true
            let text = this.text
            this.timer = setInterval(() => {
                this.startTime()
                text.text = this.time
            }, 10)
        }
        console.log('start')
    }
    stop(){
        this.state = false
        clearInterval(this.timer)
        console.log('stop')
    }
    countTimes(count){
        let min = this.checkTime(parseInt((count / (1000 * 60)) % 60))
        let sec = this.checkTime(parseInt((count / 1000) % 60))
        let ms = this.checkTime(parseInt((count / 10) % 100))
        count =  min + ":" + sec + "." + ms

        return count
    }
    differ(time1,time2){
        if(!time1)time1 = "00:00.00"
        if(!time2)time2 = "00:00.00"
        let a = time1.split(/[:]|\./)
        let b = time2.split(/[:]|\./)
        let count = ((b[0]*60+b[1])*1000+b[2]*10) - ((a[0]*60+a[1])*1000+a[2]*10)
        if(count>0)
            return this.countTimes(count)
        else
            return "00:00.00"
    }
    average(time,amount){
        if(!time)time = "00:00.00"
        if(amount <= 0) amount=1
        let a = time.split(/[:]|\./)
        let count = Math.ceil(((a[0]*60+a[1])*1000+a[2]*10) / amount)

        return this.countTimes(count)
    }
}
