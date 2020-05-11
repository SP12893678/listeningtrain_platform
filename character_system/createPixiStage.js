//创建Pixi 应用 和 舞台

//Create a Pixi Application
var app = new PIXI.Application({
	width: 800,         // default: 800
	height: 600,        // default: 600
	antialias: true,    // default: false
	transparent: false, // default: false
	resolution: 1,      // default: 1
	backgroundColor: 0xC9DDF0
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);