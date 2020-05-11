//load dragonbones元件
var factory;
var armature;
var armatureDisplay;
PIXI.loader.reset();
PIXI.loader
	.add("dragonBonesData", "./resource/NewProject_ske.json")
	.add("textureData", "./resource/NewProject_tex.json")
	.add("texture", "./resource/NewProject_tex.png");
PIXI.loader.once("complete", onComplete, this);
//PIXI.loader.load();

function onComplete(target,resource){

	var textureImg = resource["texture"].texture; //紋理圖png
	var textureData = resource["textureData"].data; //紋理圖data
	var skeletonData = resource["dragonBonesData"].data; //骨骼data
			
	factory = new dragonBones.PixiFactory();
	factory .parseDragonBonesData(skeletonData);
	factory .parseTextureAtlasData(textureData, textureImg); 

	armatureDisplay = factory.buildArmatureDisplay(skeletonData.armature[0].name);
	armatureDisplay.animation.play('handmove',0);
	armatureDisplay.x = 150.0;
	armatureDisplay.y = 350.0;
	armatureDisplay.scale.set(0.3,0.3);

	armature = armatureDisplay._armature;
	var tmpslot = armature.getSlot("clothes");
	var texture = PIXI.Texture.fromImage("./boy_replacement/boy_0005_black_clothes.png");
	// tmpslot.display.texture = texture;
	// tmpslot.offset.x = tmpslot.offset.x+10;
	//document.write("<p>"+armature.getBones()+"</p>");

	//------------------------------------------------------------
	//armature.removeSlot(tmpslot);//去掉clothes

	//--在插槽內的圖片選擇 局部換裝 （用指定资源替换指定插槽的显示对象）
	// tmpslot.displayIndex=0;//可透過插槽內的圖片index進行換裝

	//---現有局部換裝
	//factory.replaceSlotDisplay( "NewProject", "Boy", "clothes", "boy_0005_black_clothes",armature.getSlot("clothes"));//局部換裝
	//factory.replaceSlotDisplay( "NewProject", "Boy", "pant", "boy_0006_grey_pant",armature.getSlot("pant"));//局部換裝

	//------------------------------------------------------------


	app.stage.addChild(armatureDisplay);
}

// {"name":"boy_0005_black_clothes",
// "transform":{"x":2.17,
// "y":91.84}}]},