class Environment {
    constructor(enviro_data, object_data) {
        this.enviro_data = enviro_data;
        this.object_data = object_data;
        this.enviro_container = new Container();
        this.setup();
    }

    setup() {
        this.creat_Background();
        this.creat_Object();
    }

    creat_Background() {
        // 新增情境背景並設定大小
        this.enviro_bg = new Sprite(resources[this.enviro_data.background_src].texture);
        var scale = app.screen.width / this.enviro_bg.width;
        this.enviro_bg.scale.set(scale, scale);
        this.enviro_container.addChild(this.enviro_bg);
    }

    creat_Object() {
        this.object_data.forEach(object_item => {
            var object = new Sprite(resources[object_item.pic_src].texture);
            var scale = object_item.size / object.width;
            object.scale.set(scale, scale);
            // object.pivot.set(object.width / 2, object.height / 2);
            // console.log(object.pivot)
            var position_arr = object_item.coordinate.split(",");
            object.position.set(position_arr[0], position_arr[1]);

            object.filters = [new PIXI.filters.OutlineFilter(3, 0xf0aaee)]; //邊框

            object.interactive = true; // 設定可以互動
            object.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
            object.mouseover = function () { object.filters = [new PIXI.filters.OutlineFilter(3, 0x99ff99)]; }
            object.mouseout = function () { object.filters = [new PIXI.filters.OutlineFilter(3, 0xf0aaee)]; }
            this.enviro_container.addChild(object);
            object_item.sprite = object;
        });
    }

    getEnvironment() {
        return this.enviro_container;
    }
}

class Editor extends Environment {

    creat_Object() {
        super.creat_Object();
        var enviro = this;
        this.object_data.forEach(object_item => {
            object_item.sprite.click = function () {
                enviro.object_data.forEach(object_item => {
                    object_item.sprite.filters = [new PIXI.filters.OutlineFilter(3, 0xf0aaee)];
                    object_item.sprite.mouseover = function () { this.filters = [new PIXI.filters.OutlineFilter(3, 0x99ff99)]; }
                    object_item.sprite.mouseout = function () { this.filters = [new PIXI.filters.OutlineFilter(3, 0xf0aaee)]; }
                });
                object_item.sprite.mouseover = null
                object_item.sprite.mouseout = null
                object_item.sprite.filters = [new PIXI.filters.OutlineFilter(3, 0x11aaff)];
                editor.t = object_item.sprite;
                editor.object.id = object_item.id;
                editor.object.name = object_item.name;
                editor.object.degree = object_item.sprite.rotation * (180 / Math.PI);
                editor.object.audio.type = object_item.audio.category;
                editor.object.audio.name = object_item.audio.name;
                editor.object.audio.src = object_item.audio.sound_src;
                editor.object.audio.id = object_item.audio.id;
            }
            object_item.sprite
                .on('mousedown', this.onDragStart)
                .on('mouseup', this.onDragEnd)
                .on('mouseupoutside', this.onDragEnd)
                .on('mousemove', this.onDragMove)
        });
    }

    onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.7;
        this.dragging = true;

        this.offset_x = this.data.getLocalPosition(this.parent).x - this.position._x;
        this.offset_y = this.data.getLocalPosition(this.parent).y - this.position._y;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        editor.object.position.x = this.position.x;
        editor.object.position.y = this.position.y;
    }

    onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x - this.offset_x;
            this.position.y = newPosition.y - this.offset_y;
        }
    }
}