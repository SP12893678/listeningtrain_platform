import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';

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
        // else if(event.type === dragonBones.EventObject.START){
        //     switch(event.animationState.name){
        //         case 'clapHand':
        //             console.log('test start')
        //             break
        //         default://TODO:
        //             break
        //     }
        // }
    }
    animationPlayOriginal(){
        this.armatureDisplay.animation.fadeIn('original',0,1,0)
        // this.armatureDisplay.animation.gotoAndStopByTime('shakeHand',0)
    }
}