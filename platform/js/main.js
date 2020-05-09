var enviro_data = [];
var enviro_index = 0;
var object_data = [];
var load_arr = [];
/*------------------------------------------------*/
PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;
//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
  width: 1000,
  height: 625,
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1,       // default: 1      
  view: document.getElementById('envrio')
});

RequestDataAndLoad();

function setup() {
  console.log('ready');
  var enviro_object_data = [];
  var tmp_arr = enviro_data[enviro_index].object.split(",")
  object_data.forEach(o => {
    if (tmp_arr.indexOf(o.id) >= 0) {
      enviro_object_data.push(o);
    }
  })
  var enviro = new Editor(enviro_data[enviro_index], enviro_object_data);
  var enviro_container = enviro.getEnvironment();
  enviro_container.position.set(0, 0);
  app.stage.addChild(enviro_container);
  console.log('render');
}

async function RequestDataAndLoad() {

  // 請求情境的資料
  await call_enviro_data()
    .then((returnVal) => { console.log('<--finish call enviro data-->'); })
    .catch(err => console.log("Axios err: ", err));

  // 請求情境物件的資料
  await call_object_data(getObject_arr())
    .then((returnVal) => { console.log('<--finish call object data-->'); })
    .catch(err => console.log("Axios err: ", err));

  // 請求情境物件聲音的資料
  await call_audio_data(getAudio_arr())
    .then((returnVal) => { console.log('<--finish call audio data-->'); })
    .catch(err => console.log("Axios err: ", err));

  // 將需加載的資源放入陣列
  load_arr = [];
  enviro_data.forEach(data => { load_arr.push(data.background_src) });
  object_data.forEach(object => {
    load_arr.push(object.pic_src);
    load_arr.push(object.audio.sound_src);
  });

  // 加載資源並執行情境設定
  loader
    .add(load_arr)
    .load(setup);
}

//取得情境物件內所包含的聲音ID
function getAudio_arr() {
  var audio_arr = [];
  object_data.forEach(object => {
    audio_arr.push(object.sound_src);
  });
  return audio_arr;
}

//取得情境內所包含的物件ID
function getObject_arr() {
  var object_arr = [];
  enviro_data.forEach(data => {
    var tmp = object_arr;
    object_arr = tmp.concat(data.object.split(","));
  });
  return object_arr;
}

/*------------------------------------------------*/

function call_enviro_data() {
  return axios.get('./php/test.php', { params: { type: "enviro" } })
    .then((res) => {
      // console.log(res.data);
      enviro_data = res.data;
    })
    .catch((error) => { console.error(error) })
}

function call_object_data(object_arr) {
  return axios.get('./php/test.php', { params: { type: "object", data: object_arr } })
    .then((res) => {
      // console.log(res.data);
      object_data = res.data;
    })
    .catch((error) => { console.error(error) })
}

function call_audio_data(audio_arr) {
  return axios.get('./php/test.php', { params: { type: "audio", data: audio_arr } })
    .then((res) => {
      // console.log(res.data);
      var audio_data = res.data;
      object_data.forEach(object => {
        audio_data.forEach(audio => {
          if (object.sound_src == audio.id)
            object.audio = audio;
        });
      });
    })
    .catch((error) => { console.error(error) })
}

/*------------------------------------------------*/