import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';
import talkBubble from 'Component/talkBubble'
import Sound from 'pixi-sound'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Action{
    constructor(armatureDisplay) {
        this.armatureDisplay = armatureDisplay
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler,this)
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.START, this.animationEventHandler, this);
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.animationEventHandler, this);
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.FADE_IN, this.animationEventHandler, this);
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this.animationEventHandler, this);
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.FADE_OUT, this.animationEventHandler, this);
        armatureDisplay.armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.animationEventHandler, this);
       
        this.talkBubble = new talkBubble()
    }
    animationEventHandler(event) {
        if (event.type === dragonBones.EventObject.COMPLETE) {
            switch(event.animationState.name){
                case 'clapHand':
                    this.armatureDisplay.animation.gotoAndStopByTime('clapHand',0)
                    break
                case 'shekeHand':
                    this.animationPlayOriginal()
                    break
                default://TODO:
                    break
            }
        }
        else if(event.type === dragonBones.EventObject.START){
            if(!this.armatureDisplay.parent.getChildByName('bubble')){
                this.talkBubble = new talkBubble()
                this.talkBubble.name = 'bubble'
                this.talkBubble.position.set(this.armatureDisplay.x,this.armatureDisplay.y-250)
                this.armatureDisplay.parent.addChild(this.talkBubble)
            }
            let gender = (this.armatureDisplay.armature.name == 'Boy')?'boy':'girl'
            switch(event.animationState.name){
                case 'emoji_sad':
                    this.talkBubble.talkMessage('答錯了再接再厲',event.animationState.totalTime)
                    // this.talkBubble.talkMessage('好棒喔！',5)
                    Sound.add('no', '../static/sound/effect/wrong_'+gender+'.mp3')
                    Sound.play('no')
                    break
                case 'clapHand':
                    this.talkBubble.talkMessage('恭喜你答對了',event.animationState.totalTime)
                    // this.talkBubble.talkMessage('好棒喔！',5)
                    Sound.add('bingo', '../static/sound/effect/correct_'+gender+'.mp3')
                    Sound.play('bingo')
                    break
                case 'shakeHand':
                    this.talkBubble.talkMessage('你好',event.animationState.totalTime)
                    Sound.stopAll()
                    Sound.add('hello', '../static/sound/effect/hello_'+gender+'.mp3')
                    Sound.play('hello')
                    break
                default://TODO:
                    break
            }
        }
    }
    animationPlayOriginal(){
        this.armatureDisplay.animation.fadeIn('original',0,1,0)
        // this.armatureDisplay.animation.gotoAndStopByTime('shakeHand',0)
    }
}