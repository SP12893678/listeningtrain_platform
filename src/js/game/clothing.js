import * as PIXI from 'pixi.js'
import dragonBones from 'pixi-dragonbones';
import { apiManageRoleData } from '@/js/api'
import { GlowFilter} from 'pixi-filters'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import character_tex_json from '@/assets/json/Character_tex.json'
import Config from '@/js/game/Config'
import ScenesManager from '@/js/game/engine/ScenesManager'


let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Clothing{
    constructor(armatureDisplay,factory,gender) {
        this.armatureDisplay = armatureDisplay;
        this.factory = factory;
        this.gender = gender;
        this.item_data = {}
        this.wardrobe_data = {}
        this.wardrobeOrder = {}
        this.property_data = {}
        this.property = []
        this.clothing_data = {}
        this.clothingData = {}
        this.dressing_room = new Container();
        this.IconContainer = new Container();
        this.replacement = new Container();
        
        this.loadData(character_tex_json);
    }
    async loadData(itemPath){
        this.initialClothing();//一開始default的skin
        await this.item_classifier(itemPath);
        await this.getWardrobeClothes()
        if(this.property.length != 0){
            this.property_data = await this.clothes_classifier(this.property)
            this.wardrobe_data = this.property_data
            this.wardrobeOrder = this.property
            // this.addWardrobeClothes('hair',6)
        }
        else{
            this.wardrobe_data = await this.clothes_classifier(Config.initClothes)
        }
            // this.wardrobe_data = this.item_data
    }
    /*--------------------------------------------------------------------------------*/
    /* 將讀取的json檔內容 配件info做好分類 */
    item_classifier(itemPath){
        let temp = itemPath;
        let itemClass = {'gg':{'hair':{},'clothes':{},'cleft':{},'cright':{},'bottoms':{},'shoe':{},'sright':{},'h_deco':{},'wrist_deco':{}},
                         'mm':{'hair':{},'clothes':{},'cleft':{},'cright':{},'bottoms':{},'shoe':{},'sright':{},'h_deco':{},'wrist_deco':{}}
        };
        let itemName = Object.keys(Object.values(itemClass)[0]);

        for(let i=0;i<temp.SubTexture.length;i++){
            let str = temp.SubTexture[i];
            itemName.forEach(item=>{
                if(str.name.indexOf(item) > -1){
                    let no = str.name.match(/\d+/g)[0];
                    if(str.name.indexOf('gg') > -1){
                        itemClass['gg'][item][no] = str;
                    }
                    if(str.name.indexOf('mm') > -1){
                        itemClass['mm'][item][no] = str;
                    }
                }
            });
        }
        // console.log(itemClass.mm.hair[1]);//可以叫出mm hair1的info
        this.item_data = itemClass;
    }
    /* 初始化的角色服飾data */
   clothes_classifier(data){
        let temp = data;
        let tempClass = {'gg':{'hair':{},'clothes':{},'cleft':{},'cright':{},'bottoms':{},'shoe':{},'sright':{},'h_deco':{},'wrist_deco':{}},
                         'mm':{'hair':{},'clothes':{},'cleft':{},'cright':{},'bottoms':{},'shoe':{},'sright':{},'h_deco':{},'wrist_deco':{}}
        };
        let itemName = Object.keys(Object.values(tempClass)[0]);
        Object.keys(temp).forEach( i =>{
            itemName.forEach(item=>{
                let gender = temp[i].gender
                let str = temp[i][item]
                if(str != ""){
                    let strAry = str.split(',');
                    strAry.forEach(no=>{
                        tempClass[gender][item][no] = this.item_data[gender][item][no].name//只丟名字就好
                    });
                }
            });
        })
        return tempClass;
    }
    /*--------------------------------------------------------------------------------*/
    /* 初始化角色當前身上的服飾 */
    initialClothing(){
        this.clothingData = {'hair':'','clothes':'','cleft':'','cright':'','bottoms':'','shoe':'','sright':'','h_deco':'','wrist_deco':''};
        let itemName = Object.keys(this.clothingData);
        let armature = this.armatureDisplay._armature;
        itemName.forEach(item =>{
            if(armature.getSlot(item)._textureData){
               this.clothingData[item] = armature.getSlot(item)._textureData.name;
            }
        });
    }
    /* 角色切換時須重新紀錄當前服飾 */
    change_character_clothing(armatureDisplay,factory,gender){
        this.armatureDisplay = armatureDisplay;
        this.factory = factory;
        this.gender = gender;
        this.initialClothing();
    }
    /*--------------------------------------------------------------------------------*/
     /* 建立換衣間 */
     create_dressing_room(){
        /* Create a dressing room */
        let dressing_room = this.dressing_room
        /*----------------------------------------*/
        /* Create icons */
        /* Icon container */
        let IconContainer = this.IconContainer
        dressing_room.addChild(IconContainer);
        IconContainer.position.set(0,0);
        /* Hair_icon setting */
        this.create_replacement_icon("hair",ResourcesManager.icon_hair);
        /* Clothes_icon setting */
        this.create_replacement_icon("clothes",ResourcesManager.icon_clothes);
        /* Bottoms_icon setting */
        this.create_replacement_icon("bottoms",ResourcesManager.icon_pant);
        /* Shoes_icon setting */
        this.create_replacement_icon("shoe",ResourcesManager.icon_shoes);
        /* HairDeco_icon setting */
        this.create_replacement_icon("h_deco",ResourcesManager.icon_hairdeco);
        /* WristDeco_icon setting */
        this.create_replacement_icon("wrist_deco",ResourcesManager.icon_wristdeco);
        /*----------------------------------------*/
        /* Draws a wardrobe */
        let wardrobe = new PIXI.Graphics();
        wardrobe.name = "wardrobe"
        wardrobe.lineStyle(4,0xFFFFFF);
        wardrobe.beginFill( 0xCCDDFF,0.6);//填充
        wardrobe.drawRoundedRect(0,0,600,450,10);
        wardrobe.endFill();
        wardrobe.position.set(0,236*0.3);
        dressing_room.addChild(wardrobe);
        this.wardrobeWidth = 600-40;
        this.wardrobeHeight= 4502-40;
        /*----------------------------------------*/
        /* Replacements' area */
        let replacement = this.replacement
        dressing_room.addChild(replacement);
        replacement.position.set(wardrobe.x+20,wardrobe.y+10)
        /*----------------------------------------*/
        return dressing_room;
    }
    create_replacement_icon(iconName,iconPic){
        let t = this;
        let icon = new Sprite(PIXI.loader.resources[iconPic].texture);
        icon.name = iconName;
        icon.scale.set(0.3,0.3);
        icon.position.set(280*0.3*(this.IconContainer.children.length),0);
        icon.interactive = true; // 設定可以互動
        icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        icon.click = function(){
            t.choose_replacement(icon);
        }
        this.IconContainer.addChild(icon);
    }
    choose_replacement(which_icon){
        let choose_icon = which_icon;
        let t = this;
        this.IconContainer.children.forEach(item=>{
                if(item.name == choose_icon.name){
                    item.filters = [new GlowFilter(10,5,0,0xffffff)];
                    this.show_item(item.name);
                    t.itemName = item.name;
                }
                else
                    item.filters = null;
            }
        );
    }
    show_item(itemName){
        this.replacement.removeChildren();
        let temp = this.wardrobe_data;
        let xx=0;
        let yy=0;
        let item = temp[this.gender][itemName];
        let order
        if(Object.getOwnPropertyNames(this.wardrobeOrder).length == 0){
            order = Object.keys(item)
        }
        else{
            let list = this.wardrobeOrder[this.gender][itemName]
            order = list.split(',')
        }
        order.forEach( i =>{
            if(i!=""){
                // let height = item[i].height;
                // let width = item[i].width;
                // let x = item[i].x;
                // let y = item[i].y;

                if((xx+110)>this.wardrobeWidth){
                    yy += 110;
                    xx = 0;
                }
                /* 針對clothes的顯示 */
                if(itemName == 'clothes'){
                    this.replacement.addChild(this.show_itemPic('cleft',i,xx,yy));
                    this.replacement.addChild(this.show_itemPic('cright',i,xx,yy));
                }
                /* 針對shoes的顯示 */
                else if(itemName == 'shoe'){
                    this.replacement.addChild(this.show_itemPic('sright',i,xx,yy));
                }
                this.replacement.addChild(this.show_itemPic(itemName,i,xx,yy));
                xx += 110;
            }
        })
    }

    show_itemPic(itemName,no,xx=0,yy=0) {
        let item_data = this.item_data[this.gender][itemName]
        let height = item_data[no].height;
        let width = item_data[no].width;
        let x = item_data[no].x;
        let y = item_data[no].y;
        //從紋理創建精靈
        let texture = PIXI.utils.TextureCache[ResourcesManager.Character_tex].clone();
        //創建一個定義位置矩形對象
        //並且要從紋理中提取的子圖像的大小
        //`Rectangle`是`PIXI.Rectangle`的别名
        let rectangle = new PIXI.Rectangle(x, y, width, height);
        //告訴紋理使用該矩形的形塊
        texture.frame = rectangle;
        //從紋理中創建一個精靈
        let show = new PIXI.Sprite(texture);

        /* 針對clothes的顯示 */
        if(itemName == 'clothes' || itemName == 'cleft' || itemName == 'cright'){
            if(itemName == 'cleft'){
                show.position.set(xx+10,yy+20);
                show.scale.set(40/width);
            }
            else if(itemName == 'cright'){//126*130 91*96
                show.position.set(xx+70,yy+20);
                show.scale.set(40/width);
            }
            else{//208
                show.position.set(xx+20,yy+20);
                show.scale.set(78/width);
            }
        }
        /* 針對女生hair的顯示 */
        else if(itemName == 'hair' && this.gender == 'mm'){
            // show.position.set(xx+10+(90-width*0.2)/2,yy);
            // show.scale.set(0.2);
            show.position.set(xx+10+(90-width*(90/height))/2,yy+10+(90-height*(90/height))/2);
            show.scale.set(90/height);
        }
        /* 針對shoe的顯示 */
        else if(itemName == 'shoe' || itemName == 'sright'){
            if(itemName == 'shoe'){
                show.position.set(xx+(90-width*(45/height))/2,yy+10+(90-height*(45/height))/2);
                show.scale.set(40/height);
            }
            else{
                show.position.set(xx+45+(90-width*(45/height))/2,yy+10+(90-height*(45/height))/2);
                show.scale.set(40/height);
            }
        }
        /* 針對wrist_deco的顯示 */
        else if(itemName == 'wrist_deco'){
            show.position.set(xx+10+(90-width*(90/width))/2,yy+10+(90-height*(90/width))/2);
            show.scale.set(1);
        }
        else{
            let sc = (90/width)<(90/height) ? (90/width) : (90/height);
            show.position.set(xx+10+(90-width*sc)/2,yy+10+(90-height*sc)/2);
            show.scale.set(sc);
        }
        /*----------------------------------------*/
        let temp = this.item_data[this.gender]
        show.interactive = true; // 設定可以互動
        show.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        let t = this;
        let role = (this.gender == 'gg') ? 'Girl' : 'Boy';//目前只能這樣
        show.click = function(){
            let armature = t.armatureDisplay._armature;
            /* clothes換裝調整 */
            if(itemName == 'clothes' || itemName == 'cleft' || itemName == 'cright'){  
                let c = temp['clothes'][no].name;
                let cl = temp['cleft'][no].name;
                let cr = temp['cright'][no].name;
                t.clothingData['clothes'] = c;
                t.clothingData['cleft'] = cl;
                t.clothingData['cright'] = cr;
                t.takeoff_item(armature,'clothes',c);
                t.takeoff_item(armature,'cleft',cl);
                t.takeoff_item(armature,'cright',cr);
                t.factory.replaceSlotDisplay( "Character", role,'clothes',c,armature.getSlot("clothes"));//局部換裝
                t.factory.replaceSlotDisplay( "Character", role,'cleft',cl,armature.getSlot("cleft"));//局部換裝
                t.factory.replaceSlotDisplay( "Character", role,'cright',cr,armature.getSlot("cright"));//局部換裝
            }
             /* shoes換裝調整 */
            else if(itemName == 'shoe' || itemName == 'sright'){
                let sl = temp['shoe'][no].name;
                let sr = temp['sright'][no].name;
                t.clothingData['shoe'] = sl;
                t.clothingData['sright'] = sr;
                t.takeoff_item(armature,'shoe',sl);
                t.takeoff_item(armature,'sright',sr);
                t.factory.replaceSlotDisplay( "Character", role,'shoe',sl,armature.getSlot("shoe"));//局部換裝
                t.factory.replaceSlotDisplay( "Character", role,'sright',sr,armature.getSlot("sright"));//局部換裝
            }
            else{
                /* 可以拿掉配件 */
                let str = temp[itemName][no].name;
                t.clothingData[itemName] = str;
                t.takeoff_item(armature,itemName,str);
                //factory.replaceSlotDisplay(dragonBonesName, armatureName, slotName, displayName, slot, displayIndex)
                t.factory.replaceSlotDisplay( "Character", role,itemName,str,armature.getSlot(itemName));//局部換裝
            }
        }
        //將精靈添加到舞台中
        // this.replacement.addChild(show);
        return show
    }
    /* 可以拿掉配件 */
    takeoff_item(armature,itemName,str){
        let clothingData = this.clothingData
        if(armature.getSlot(itemName).displayIndex > -1 && armature.getSlot(itemName)._textureData.name == str){
            armature.getSlot(itemName).displayIndex = -1;
            clothingData[itemName] = "";
        }
        else
            armature.getSlot(itemName).displayIndex = 1;//讓原本空卡槽的部分顯示圖片
    }
    /*--------------------------------------------------------------------------------*/
    /* 根據內容進行換裝 */
    changeClothes(data){
        let temp = data;
        let gender = this.gender;
        let itemName = ['hair','clothes','cleft','cright','bottoms','shoe','sright','h_deco','wrist_deco'];
        itemName.forEach(item=>{
            let str = temp[item];
            let aramature = this.armatureDisplay._armature
            if(str != ""){
                if(aramature.getSlot(item).displayIndex == -1) aramature.getSlot(item).displayIndex = 1;
                this.clothingData[item] = str;
                this.factory.replaceSlotDisplay("Character",(gender == 'gg')?'Girl':'Boy',item,str,aramature.getSlot(item));//局部換裝
            }
            else aramature.getSlot(item).displayIndex = -1;
        });
    }
    /* 隨機換裝 */
    randomChangeClothes(){
        let temp = this.wardrobe_data;
        let itemName = Object.keys(temp[this.gender]);
        itemName.forEach(item=>{
            if(item != 'cright' && item != 'cleft' && item != 'sright'){
                let number = Object.keys(temp[this.gender][item]).length;
                if(number > 0){
                    let random_no = Math.floor(Math.random() * number) + 1;
                    this.factory.replaceSlotDisplay("Character",(this.gender == 'gg')?'Girl':'Boy',item,temp[this.gender][item][random_no].name,this.armatureDisplay._armature.getSlot(item));//局部換裝
                    this.clothingData[item] = temp[this.gender][item][random_no].name;
                    if(item == 'clothes'){
                        this.factory.replaceSlotDisplay("Character",(this.gender == 'gg')?'Girl':'Boy','cleft',temp[this.gender]['cleft'][random_no].name,this.armatureDisplay._armature.getSlot('cleft'));//局部換裝
                        this.factory.replaceSlotDisplay("Character",(this.gender == 'gg')?'Girl':'Boy','cright',temp[this.gender]['cright'][random_no].name,this.armatureDisplay._armature.getSlot('cright'));//局部換裝
                        this.clothingData['cleft'] = temp[this.gender]['cleft'][random_no].name;
                        this.clothingData['cright'] = temp[this.gender]['cright'][random_no].name;
                        if(this.armatureDisplay._armature.getSlot('cleft').displayIndex == -1)
                            this.armatureDisplay._armature.getSlot('cleft').displayIndex = 1;
                        if(this.armatureDisplay._armature.getSlot('cright').displayIndex == -1)
                            this.armatureDisplay._armature.getSlot('cright').displayIndex = 1;
                    }
                    if(item == 'shoe'){
                        this.factory.replaceSlotDisplay("Character",(this.gender == 'gg')?'Girl':'Boy','sright',temp[this.gender]['sright'][random_no].name,this.armatureDisplay._armature.getSlot('sright'));//局部換裝
                        this.clothingData['sright'] = temp[this.gender]['sright'][random_no].name;
                        if(this.armatureDisplay._armature.getSlot('sright').displayIndex == -1)
                            this.armatureDisplay._armature.getSlot('sright').displayIndex = 1;
                    }
                    if(this.armatureDisplay._armature.getSlot(item).displayIndex == -1)
                        this.armatureDisplay._armature.getSlot(item).displayIndex = 1;
                }
            }
        });
    }
    /* 整套衣服轉為獲得服飾 */
    async clothingDataToProperty(){
        if(this.property.length == 0){
            this.property_data = this.clothes_classifier(this.property)
            //initial this.property 
            this.property = {'gg':{'gender':'gg','hair':"",'clothes':"",'cleft':"",'cright':"",'bottoms':"",'shoe':"",'sright':"",'h_deco':"",'wrist_deco':""},
            'mm':{'gender':'mm','hair':"",'clothes':"",'cleft':"",'cright':"",'bottoms':"",'shoe':"",'sright':"",'h_deco':"",'wrist_deco':""}}
        }
        let itemName = Object.keys(this.clothingData)
        let temp = this.clothingData
        for(let i=0 ; i<itemName.length ; i++){
            let str = temp[itemName[i]]
            if(str != ""){
                let no = str.match(/\d+/g)[0]
                await this.addWardrobeClothes(itemName[i],no)
            }
        }
    }
    /* 加入獲得的服飾 */
    async addWardrobeClothes(category,itemNo){
        this.property_data[this.gender][category][itemNo] = this.item_data[this.gender][category][itemNo]
        let list = this.property[this.gender]
        let Category = list[category]
        let now = (Category != [])?Category.split(','):[]
        if(now.indexOf(itemNo.toString())!= -1)//==-1表示找不到
            return -1 //repeat
        now.push(itemNo.toString())
        let update = now.join()
        list[category] = update
        await this.saveClothes(category,update)
        if(ScenesManager.scenes['backpack']){
            ScenesManager.scenes['backpack'].character.clothing.property = this.property
            ScenesManager.scenes['backpack'].character.clothing.wardrobeOrder = this.wardrobeOrder
        }

        return 0 //success
    }
    /* 顯示角色服飾 */
    showClothes(itemName,no,xx=0,yy=0){
        let tempContainer = new Container()
        /* 針對clothes的顯示 */
        if(itemName == 'clothes'){
            let cleft = this.show_itemPic('cleft',no,xx,yy)
            cleft.interactive = false
            cleft.buttonMode = false
            tempContainer.addChild(cleft)
            let cright = this.show_itemPic('cright',no,xx,yy)
            cright.interactive = false
            cright.buttonMode = false
            tempContainer.addChild(cright)
        }
        /* 針對shoes的顯示 */
        else if(itemName == 'shoe'){
            tempContainer.addChild(this.show_itemPic('sright',no,xx,yy))
        }
        let item = tempContainer.addChild(this.show_itemPic(itemName,no,xx,yy))
        item.interactive = false
        item.buttonMode = false

        return tempContainer
    }
    /*--------------------------------------------------------------------------------*/
    /* 讀取角色擁有的服飾 */
    getWardrobeClothes() {
        return apiManageRoleData({ type: 'getClothes' })
        .then((res) => {
            // console.log('property',res.data)
            this.property = res.data
        })
        .catch((error) => {
            console.error(error);
        })
    } 
    /* 將服裝info上傳至資料庫  */
    saveClothing(){
        return apiManageRoleData({
            type: 'saveClothing',
            gender: this.gender,
            hair: this.clothingData.hair,
            clothes: this.clothingData.clothes,
            cleft: this.clothingData.cleft,
            cright: this.clothingData.cright,
            bottoms: this.clothingData.bottoms,
            shoe: this.clothingData.shoe ,
            sright: this.clothingData.sright,
            h_deco: this.clothingData.h_deco,
            wrist_deco: this.clothingData.wrist_deco
        })
        .then((res) => {
            console.log('saving clothing',res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
    /* 存取角色獲得的服飾(單一類別) */
    saveClothes(category,itemNoList){
        return apiManageRoleData({
            type: 'saveClothes',
            gender: this.gender,
            category: category,
            itemNoList: itemNoList
        })
        .then((res) => {
            console.log('saving clothes',res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
}