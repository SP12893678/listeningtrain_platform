import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';
import { apiManageRoleData } from '@/js/api'
import clothing from './clothing'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import character_tex_json from '@/assets/json/Character_tex.json'
import character_ske_json from '@/assets/json/Character_ske.json'


let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Character{
    constructor(account) {
        this.account = account
        this.nickname = account
        this.gender ='gg';
        this.birthday = '2020-20-20'
        this.title = 'newPlayer'
        this.money = 0

        this.show_character(this.gender);
        this.clothing = new clothing(this.armatureDisplay,this.factory,this.gender,account);
        this.check_if_has_data();
    }
    show_character(gender){
        /* Character */
        let textureImg = resources[ResourcesManager.Character_tex].texture; //紋理圖png
        let textureData = character_tex_json//紋理圖data
        let skeletonData = character_ske_json //骨骼data
                
        this.factory = new dragonBones.PixiFactory();
        this.factory.parseDragonBonesData(skeletonData);
        this.factory.parseTextureAtlasData(textureData, textureImg); 

        this.armatureDisplay = this.factory.buildArmatureDisplay((gender == 'gg')?'Boy':'Girl');//預設男孩
        // armatureDisplay.animation.play('handmove',0);
        if(this.clothing != null)
            this.clothing.change_character_clothing(this.armatureDisplay,this.factory,gender);
    }
    get_character_data() {
        return apiManageRoleData({ type: 'getData', account: this.account })
        .then((res) => {
            console.log('data',res.data)
            if(res.data.length != 0){
                this.gender = res.data[0].gender
                this.nickname = res.data[0].nickname
                this.birthday = res.data[0].birthday
                this.title = res.data[0].title
                this.money = res.data[0].money
            }
            this.clothing.clothing_data = res.data;
        })
        .catch((error) => {
            console.error(error);
        })
    } 
    async check_if_has_data(){
        await this.get_character_data();
        console.log('checkbug',this.clothing.clothing_data);
        if(this.clothing.clothing_data.length != 0){
            await this.clothing.changeClothes();
            this.clothing.initialClothing();
        }
    }
    save_character_data(){
        let account = this.account //帳號
        let gender = this.gender
        let nickname = this.nickname //暱稱
        let today = new Date();
        let birthday = today.getFullYear()+ "-" + (today.getMonth()+1) + "-" + today.getDate()//生日
        let title = this.title//稱號
        let money = this.money //金錢
        return apiManageRoleData({
            type: 'saveData',
            account: account,
            gender: gender,
            nickname: nickname,
            birthday: birthday,
            title: title,
            money: money,
        })
        .then((res) => {
            console.log('saving data',res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
}
