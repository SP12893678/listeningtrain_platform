import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';
import { apiManageRoleData } from '@/js/api'
import clothing from './clothing'
import action from './action'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import character_tex_json from '@/assets/json/Character_tex.json'
import character_ske_json from '@/assets/json/Character_ske.json'


let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Character {
    constructor() {
        this.nickname = ''
        this.gender = 'gg';
        this.birthday = '2020-20-20'
        this.title = 'newPlayer'
        this.money = 0
    }
    show_character(gender) {
        /* Character */
        let textureImg = resources[ResourcesManager.Character_tex].texture; //紋理圖png
        let textureData = character_tex_json//紋理圖data
        let skeletonData = character_ske_json //骨骼data

        this.factory = new dragonBones.PixiFactory();
        this.factory.parseDragonBonesData(skeletonData);
        this.factory.parseTextureAtlasData(textureData, textureImg);

        this.armatureDisplay = this.factory.buildArmatureDisplay((gender == 'gg') ? 'Boy' : 'Girl');//預設男孩
        // armatureDisplay.animation.play('handmove',0);

        // this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE,()=>{
        //     this.armatureDisplay.animation.gotoAndStopByTime('clapHand',0)
        // })
        if (this.clothing != null) this.clothing.change_character_clothing(this.armatureDisplay, this.factory, gender);
    }
    // animationEventHandler(event) {
    //     if (event.type === dragonBones.EventObject.COMPLETE) {
    //         if (event.animationState.name === "clapHand") {
    //             console.log("clapHand 動作完畢！！！");    
    //             this.armatureDisplay.animation.gotoAndStopByTime('clapHand',0)    
    //             //TODO:
    //         }
    //     }
    // }
    get_character_data() {
        return apiManageRoleData({ type: 'getData' })
            .then((res) => {
                // console.log('data',res.data)
                if (res.data != null) {
                    this.account = res.data.account
                    this.gender = res.data.gender
                    this.nickname = res.data.nickname
                    this.birthday = res.data.birthday
                    this.title = res.data.title
                    this.money = res.data.money
                }
                this.clothing_data = res.data;
            })
            .catch((error) => {
                console.error(error);
            })
    }
    async check_if_has_data() {
        await this.get_character_data();
        await this.show_character(this.gender);
        this.clothing = new clothing(this.armatureDisplay, this.factory, this.gender);
        this.action = new action(this.armatureDisplay)
        if (this.clothing_data != '' && this.clothing_data != null) {
            await this.clothing.changeClothes(this.clothing_data);
        }
    }
    save_character_data() {
        let gender = this.gender
        let nickname = this.nickname //暱稱
        let today = new Date();
        let birthday = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()//生日
        let title = this.title//稱號
        let money = this.money //金錢
        return apiManageRoleData({
            type: 'saveData',
            gender: gender,
            nickname: nickname,
            birthday: birthday,
            title: title,
            money: money,
        })
            .then((res) => {
                console.log('saving data', res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }
}
