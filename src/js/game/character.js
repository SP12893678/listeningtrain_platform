import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';
import { apiManageRoleClothes } from '@/js/api'
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
    constructor(name) {
        this.name = name
        this.gender ='gg';
        this.show_character(this.gender);
        this.clothing = new clothing(this.armatureDisplay,this.factory,this.gender,name);
        this.check_if_has_clothing(name);
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
    get_character_clothing_data(name) {
        return apiManageRoleClothes({ type: 'get',name: name })
        .then((res) => {
            console.log('clothing_data',res.data);
            this.clothing.clothing_data = res.data;
            this.gender = res.data[2]
        })
        .catch((error) => {
            console.error(error);
        })
    } 
    async check_if_has_clothing(name){
        await this.get_character_clothing_data(name);
        if(this.clothing.clothing_data.length != 0){
            await this.clothing.changeClothes();
            this.clothing.initialClothing();
        }
    }
}
