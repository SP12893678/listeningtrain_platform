import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';
import talkBubble from 'Component/talkBubble'

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
            switch(event.animationState.name){
                case 'emoji_sad':
                    this.talkBubble.talkMessage('Bad',event.animationState.totalTime)
                    // this.talkBubble.talkMessage('好棒喔！',5)
                    console.log('test start')
                    break
                case 'clapHand':
                    this.talkBubble.talkMessage('Good',event.animationState.totalTime)
                    // this.talkBubble.talkMessage('好棒喔！',5)
                    console.log('test start')
                    break
                case 'shakeHand':
                    this.talkBubble.talkMessage('Hello',event.animationState.totalTime)
                    console.log('shake Hand start')
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