// Aliases 
let Application =  PIXI.Application ,
loader =  PIXI.loader ,
resources =  PIXI.loader.resources ,
Sprite =  PIXI.Sprite ;	

//load dragonbones元件
loader
	.add("./resource/NewProject_tex.png")
	.add("./icon/icon_hair.png")
	.add("./icon/icon_clothes.png")
	.add("./icon/icon_pant.png")
	.load(setup);
loader.load();

function setup(){
	// myBoy = Object.create(CharacterTalk);
	let myBoy = new CharacterTalk();
	// myBoy.talkTime("Welcome");//開始說話

	/*TEXT STYLE*/
	let style = new PIXI.TextStyle({
		fontFamily:"Arial",
		fontSize:36,
		fill:" white ",
		stroke:'#0x66FF33',
		strokeThickness:4,
		dropShadow:true,
		dropShadowColor:"#000000",
		dropShadowBlur:4,
		dropShadowAngle:Math.PI/6,
		dropShadowDistance:6,
	});
	/*TEXT:ITEM*/
	let message =  new PIXI.Text ("Item",style);
	app.stage.addChild(message);
	message.position.set(380,60);
	/*----------------------------------------*/
	/*Draws a Wardrobe*/
	let rectangle =  new  PIXI.Graphics ();
	rectangle.lineStyle(4,0xFFFFFF);
	// rectangle.beginFill( 0x66CCFF );
	rectangle.drawRoundedRect(0,0,320,300,10);
	rectangle.endFill();
	rectangle.x  =  260;
	rectangle.y  =  190 ;
	app.stage.addChild (rectangle);
	/*----------------------------------------*/
	/*hair_icon setting*/
	let hair_icon =  new  PIXI.Sprite (
		PIXI.loader.resources ["./icon/icon_hair.png"].texture
	);
	hair_icon.scale.x=0.3;
	hair_icon.scale.y=0.3;
	hair_icon.position.set(0,0);
	hair_icon.interactive = true; // 設定可以互動
	hair_icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
	hair_icon.click = function(){
		showItem('hair');
		// new CharacterTalk("Hair");
		myBoy.talkTime("請選擇～髮型");
		// myBoy.init("Hair");
	}
	/*clothes_icon setting*/
	let clothes_icon =  new  PIXI.Sprite (
		PIXI.loader.resources ["./icon/icon_clothes.png"].texture
	);
	clothes_icon.scale.x=0.3;
	clothes_icon.scale.y=0.3;
	clothes_icon.position.set(236*0.3,0);
	clothes_icon.interactive = true; // 設定可以互動
	clothes_icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
	clothes_icon.click = function(){
		showItem('clothes');
		myBoy.talkTime("請選擇～衣服");
	}
	/*pant_icon setting*/
	let pant_icon =  new  PIXI.Sprite (
		PIXI.loader.resources ["./icon/icon_pant.png"].texture
	);
	pant_icon.scale.x=0.3;
	pant_icon.scale.y=0.3;
	pant_icon.position.set(236*0.3*2,0);
	pant_icon.interactive = true; // 設定可以互動
	pant_icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
	pant_icon.click = function(){
		showItem('pant');
		myBoy.talkTime("請選擇～褲子");
	}
	/*icon container*/
	var IconContainer = new PIXI.Container();
	app.stage.addChild(IconContainer);
	IconContainer.x = 280;
	IconContainer.y = 120;
	IconContainer.addChild(hair_icon,clothes_icon,pant_icon);
	/*----------------------------------------*/
}

/*create new container for all items*/
var container = new PIXI.Container();
app.stage.addChild(container);
container.x = 290;
container.y = 210;
var containerWidth = 290;
var containerHeight= 270;

function showItem(itemName){
	container.removeChildren();

	var mJson=$.ajax({url:"./resource/NewProject_tex.json",async:false});//改axios
	var temp=JSON.parse(mJson.responseText);//將 JavaScript 物件表示法 (JSON) 字串轉換為物件。
	var xx=0;
	var yy=0;

	for(var i=0;i<temp.SubTexture.length;i++){
		var str = temp.SubTexture[i].name;
		var yn = str.indexOf(itemName);
		if(yn > -1){
			let height = temp.SubTexture[i].height;
			let width = temp.SubTexture[i].width;
			let  x = temp.SubTexture[i].x;
			let y = temp.SubTexture[i].y;
			if((xx+width*0.3)>containerWidth){
				yy += 80;
				xx = 0;
			}
			showItemPic(itemName,str,xx,yy,x,y,height,width);
			xx+=(width+50)*0.3;
		}
	}
}

function showItemPic(itemName,str,xx,yy,x,y,height,width) {
	// //從紋理創建精靈
	 let texture = PIXI.utils.TextureCache["./resource/NewProject_tex.png"].clone();

	//創建一個定義位置矩形對象
	//並且要從紋理中提取的子圖像的大小
	//`Rectangle`是`PIXI.Rectangle`的别名
	let rectangle = new PIXI.Rectangle(x, y, width, height);
	//告訴紋理使用該矩形的形塊
	texture.frame = rectangle;
	//從紋理中創建一個精靈
	// let show = new PIXI.Sprite(texture);
	let show = new PIXI.Sprite(texture);
	//定位精靈在canvas畫布上
	show.x = xx;
	show.y = yy;
	show.scale.set(0.3,0.3);
	// show.scale.x = 0.3;
	// show.scale.y = 0.3;
	//show.name = str;
	show.interactive = true; // 設定可以互動
	show.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
	show.click = function(){
		factory.replaceSlotDisplay( "NewProject", "Boy",itemName,str,armature.getSlot(itemName));//局部換裝
	}


	//將精靈添加到舞台中
	container.addChild(show);
	//重新渲染舞台 
	app.renderer.render(app.stage);
}