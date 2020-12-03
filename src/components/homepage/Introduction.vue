<template>
  <v-container
    class="ma-0 pa-0"
    fluid
    fill-height
  >
    <v-carousel
      id="carousel"
      ref="carousel"
      v-model="getValue"
      class="ma-0 pa-0"
      height="100%"
      vertical
      vertical-delimiters
      hide-delimiter-background
    >
      <v-carousel-item>
        <v-sheet
          :color="colors[0]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-overlay
              light
              opacity="0.1"
            >
              <v-col>
                <v-card
                  class="text-center mx-auto"
                  light
                  color="#FFFFFFEE"
                  elevation="24"
                  shaped
                >
                  <v-card-text
                    class="text-h4 font-weight-bold"
                    v-text="intro.title"
                  />
                  <v-card-text
                    class="headline"
                    v-text="intro.text"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-chip
                  v-for="(f, i) in intro.features"
                  :key="i"
                  class="ma-2"
                  :color="f.color"
                  x-large
                  v-text="f.text"
                />
              </v-col>
              <v-col class="text-center">
                <v-card
                  class="text-center mx-auto"
                  light
                  color="#000000CC"
                  elevation="24"
                  shaped
                >
                  <v-card-text
                    class="text-h6 font-weight-bold white--text"
                    v-text="intro.end"
                  />
                </v-card>
              </v-col>
            </v-overlay>
            <v-carousel
              cycle
              height="690"
              class="ma-0 pa-0"
              hide-delimiter-background
              hide-delimiters
              :show-arrows="false"
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                light
                aspect-ratio="1"
                reverse-transition="fade-transition"
                transition="fade-transition"
              />
            </v-carousel>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
        eager
      >
        <v-sheet
          :color="colors[1]"
          height="100%"
        >
          <v-row
            class="fill-height ma-2"
            align="center"
            justify="center"
          >
            <v-col
              align="center"
              justify="center"
              class="ma-5"
            >
              <v-card>
                <canvas
                  id="enviro1"
                  v-resize="onResizeCanvas"
                  class="enviro"
                  style="display:'none';"
                />
                <v-overlay
                  v-if="(!scene[0].load || isPaused)"
                  transition="fade-transition"
                  color="rgba(0, 0, 0, 0.5)"
                  absolute
                >
                  <v-btn
                    v-if="!scene[0].load"
                    tile
                    color="black"
                    @click="creatScene(0)"
                  >
                    reload
                  </v-btn>
                  <v-btn
                    v-if="scene[0].load"
                    tile
                    color="black"

                    @click="startScene(0)"
                  >
                    Continue
                  </v-btn>
                </v-overlay>
              </v-card>
            </v-col>
            <v-col
              align="center"
              justify="center"
            >
              <v-card
                class="text-center pa-2"
                light
                elevation="10"
                color="#FFFFFFAA"
                width="80%"
              >
                <v-card-title class="text-h3 font-weight-bold">
                  {{ mode[0].title }}
                </v-card-title>
                <v-card-subtitle class="headline">
                  {{ mode[0].text }}
                </v-card-subtitle>
                <v-card-text
                  class="text-h6"
                  align="left"
                >
                  {{ mode[0].features }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
        eager
      >
        <v-sheet
          :color="colors[2]"
          height="100%"
        >
          <v-row
            class="fill-height ma-2"
            align="center"
            justify="center"
          >
            <v-col
              align="center"
              justify="center"
            >
              <v-card
                class="text-center pa-2"
                light
                elevation="10"
                color="#FFFFFFAA"
                width="80%"
              >
                <v-card-title class="text-h3 font-weight-bold">
                  {{ mode[1].title }}
                </v-card-title>
                <v-card-subtitle class="headline">
                  {{ mode[1].text }}
                </v-card-subtitle>
                <v-card-text
                  class="text-h6"
                  align="left"
                >
                  {{ mode[1].features }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              align="center"
              justify="center"
              class="ma-5"
            >
              <v-card>
                <canvas
                  id="enviro2"
                  v-resize="onResizeCanvas"
                  class="enviro"
                  style="background:#ffffff"
                />
                <v-overlay
                  v-if="(!scene[1].load || isPaused)"
                  transition="fade-transition"
                  color="rgba(0, 0, 0, 0.5)"
                  absolute
                >
                  <v-btn
                    v-if="!scene[1].load"
                    tile
                    color="black"
                    @click="creatScene(1)"
                  >
                    reload
                  </v-btn>
                  <v-btn
                    v-if="scene[1].load"
                    tile
                    color="black"
                    @click="startScene(1)"
                  >
                    Continue
                  </v-btn>
                </v-overlay>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
        eager
      >
        <v-sheet
          :color="colors[3]"
          height="100%"
        >
          <v-row
            class="fill-height ma-2"
            align="center"
            justify="center"
          >
            <v-col
              align="center"
              justify="center"
              class="ma-5"
            >
              <v-card>
                <canvas
                  id="enviro3"
                  v-resize="onResizeCanvas"
                  class="enviro"
                  :style="getValue== 2?`border:1px solid #000000;display: none;` : `border:1px solid #000000;display:none`"
                />
                <v-overlay
                  v-if="(!scene[2].load || isPaused)"
                  transition="fade-transition"
                  color="rgba(0, 0, 0, 0.5)"
                  absolute
                >
                  <v-btn
                    v-if="!scene[2].load"
                    tile
                    color="black"
                    @click="creatScene(2)"
                  >
                    reload
                  </v-btn>
                  <v-btn
                    v-if="scene[2].load"
                    tile
                    color="black"

                    @click="startScene(2)"
                  >
                    Continue
                  </v-btn>
                </v-overlay>
              </v-card>
            </v-col>
            <v-col
              align="center"
              justify="center"
            >
              <v-card
                class="text-center pa-2"
                light
                elevation="10"
                color="#FFFFFFAA"
                width="80%"
              >
                <v-card-title class="text-h3 font-weight-bold">
                  {{ mode[2].title }}
                </v-card-title>
                <v-card-subtitle class="headline">
                  {{ mode[2].text }}
                </v-card-subtitle>
                <v-card-text
                  class="text-h6"
                  align="left"
                >
                  {{ mode[2].features }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
        eager
      >
        <v-sheet
          :color="colors[4]"
          height="100%"
        >
          <v-row
            class="fill-height ma-2"
            align="center"
            justify="center"
          >
            <v-col>
              <v-row
                align="center"
                justify="center"
              >
                <v-card
                  class="text-center"
                  dark
                  color="#00000000"
                  elevation="0"
                >
                  <v-card-title class="text-h2 font-weight-bold brown--text">
                    {{ mode[3].title }}
                  </v-card-title>
                  <v-card-text class="text-h3 font-weight-bold orange--text">
                    {{ mode[3].text }}
                  </v-card-text>
                </v-card>
              </v-row>
              <v-row
                v-for="(item, i) in mode[3].features"
                :key="i"
                :justify="i%2==0 ? 'start' : 'end'"
                class="ma-3"
              >
                <v-chip
                  x-large
                >
                  {{ item }}
                </v-chip>
              </v-row>
              <v-row
                align="center"
                justify="center"
                class="ma-5"
              >
                <v-card
                  class="text-center"
                  dark
                  color="#00000000"
                  elevation="0"
                >
                  <v-card-text class="text-h6 font-weight-black black--text font-italic">
                    {{ mode[3].end }}
                  </v-card-text>
                </v-card>
              </v-row>
            </v-col>
            <v-col
              align="center"
              justify="center"
              class="ma-5"
            >
              <v-card>
                <canvas
                  id="enviro4"
                  v-resize="onResizeCanvas"
                  class="enviro"
                  :style="getValue== 3?`border:1px solid #000000;display: none;` : `border:1px solid #000000;display:none`"
                />
                <v-overlay
                  v-if="(!scene[3].load || isPaused)"
                  transition="fade-transition"
                  color="rgba(0, 0, 0, 0.5)"
                  absolute
                >
                  <v-btn
                    v-if="!scene[3].load"
                    tile
                    color="black"
                    @click="creatScene(3)"
                  >
                    reload
                  </v-btn>
                  <v-btn
                    v-if="scene[3].load"
                    tile
                    color="black"
                    light
                    @click="startScene(3)"
                  >
                    Continue
                  </v-btn>
                </v-overlay>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          :color="colors[5]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-col>
              <v-row
                align="center"
                justify="center"
              >
                <v-card
                  class="text-center pa-2 ma-2"
                  light
                  color="#FF000000"
                  elevation="0"
                  width="100%"
                >
                  <v-card-text class="text-h3 font-weight-black">
                    {{ identityIntro.title }}
                  </v-card-text>
                  <v-card-text class="text-h6 font-weight-bold">
                    {{ identityIntro.text }}
                  </v-card-text>
                </v-card>
              </v-row>
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  v-for="(item,i) in identityIntro.features"
                  :key="i"
                  cols="4"
                  align="center"
                >
                  <v-card
                    class="ma-2"
                    light
                    elevation="24"
                    :color="(i%2==0)?'yellow':'light-green accent-2'"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-h6 font-weight-black">
                          <v-icon
                            light
                          >
                            {{ item.icon }}
                          </v-icon>
                          {{ item.id }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                    <v-list-item
                      v-for="(fun,j) in item.function"
                      :key="j"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ fun.item }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon
                            light
                            :color="(fun.yn=='y')?'green':'red'"
                          >
                            {{ (fun.yn=='y')?'mdi-checkbox-marked-circle':'mdi-cancel' }}
                          </v-icon>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          :color="colors[6]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-card
              class="text-center"
              light
              color="#FF000000"
              width="800"
            >
              <v-card-text class="text-h2">
                幫助我們
              </v-card-text>
            </v-card>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import * as PIXI from 'pixi.js'
import Sound from 'pixi-sound'
import TrainModeScene from '@/js/game/scene/TrainModeScene'
import PracticeModeScene from 'Scene/PracticeModeScene'
import TestModeScene from 'Scene/TestModeScene'
import CreateRoleScene from 'Scene/CreateRoleScene'

import {
    apiManageEnviroment,
    apiManageObject,
    apiManageAudio,
    apiGetFolderFileList,
    apiManageFile
} from '@/js/api'
import ResourcesManager from '@/js/game/engine/ResourcesManager'

const Application = PIXI.Application
const Container = PIXI.Container
const loader = PIXI.loader
const resources = PIXI.loader.resources
const TextureCache = PIXI.utils.TextureCache
const Sprite = PIXI.Sprite

export default {
    props: ['value'],
    data () {
        return {
            isActive: false,
            colors: [
                'white',
                'teal accent-3',
                'pink lighten-1',
                'light-blue lighten-2',
                'yellow lighten-1',
                '#00CEDA',
                'amber darken-1'
                // "cyan lighten-5",
                // "pink lighten-5",
                // "yellow lighten-4",
            ],

            slides: [
                'index1',
                'Introduction1',
                'Introduction2',
                'Introduction3',
                'help'
            ],
            scrollable: true,
            items: [
                { src: '../static/images/enviro/background/kitchen.jpg' },
                { src: '../static/images/enviro/background/純背景@4x.png' },
                { src: '../static/images/enviro/background/1762.jpg' }
            ],
            intro: {
                title: '情境式環境音訓練平台',
                text: '為了學齡前聽障兒童所打造的一套聽能訓練平台。',
                features: [
                    { text: '遊戲化元素', color: 'success' },
                    { text: '3種學習模式', color: 'primary' },
                    { text: '多元情境圖', color: 'deep-purple accent-4' },
                    { text: '多樣環境音', color: 'indigo darken-3' },
                    { text: '客製化角色', color: 'pink accent-4' }
                ],
                end: '透過以上內容來增加受訓者對環境和聲音的印象。'
            },
            mode: [
                {
                    title: '探索模式',
                    text: '「認識情境圖有哪些環境音」',
                    features: '點選情境裡帶有紫色邊框的物件聆聽物件聲音，或是點選情境圖下⽅的物件列表聆聽。'
                },
                {
                    title: '練習模式',
                    text: '「練習辨認各情境圖之環境音」',
                    features: '聆聽後點選適合該聲⾳的物件，立即顯示該題是否正確。可無限練習，直到手動結束。'
                },
                {
                    title: '測驗模式',
                    text: '「立即檢視學習成效」',
                    features: '聆聽後點選適合該聲音的物件，測驗結束顯⽰此次作答情況。一次作答題數為10題。'
                },
                {
                    title: '角色系統',
                    text: '「創建屬於自己的角色」',
                    features: ['依照喜好自己搭配服飾', '或是由系統幫你隨機搭配', '選擇第一套服飾陪伴你學習'],
                    end: '更多服飾等著你去收集！'
                }

            ],
            identityIntro: {
                title: '身分介紹',
                text: '分為「老師」以及「學生」',
                features: [
                    {
                        id: '老師 Teacher',
                        icon: 'mdi-teach',
                        function: [
                            { item: '遊玩遊戲', yn: 'y' },
                            { item: '查看個人學習紀錄', yn: 'y' },
                            { item: '協助編輯教材', yn: 'y' },
                            { item: '提供教學素材', yn: 'y' },
                            { item: '批次匯入班級帳號', yn: 'y' },
                            { item: '查看學生學習狀況', yn: 'y' }
                        ]
                    },
                    {
                        id: '學生 Student',
                        icon: 'mdi-human-child',
                        function: [
                            { item: '遊玩遊戲', yn: 'y' },
                            { item: '查看個人各模式學習紀錄', yn: 'y' },
                            { item: '協助編輯教材', yn: 'n' },
                            { item: '提供教學素材', yn: 'n' },
                            { item: '批次匯入班級帳號', yn: 'n' },
                            { item: '查看學生學習狀況', yn: 'n' }
                        ]
                    }
                ],
                end: ''
            },
            audio: [],
            audio_type_arr: [],
            enviro_container: null,
            environment: null,
            scene: [
                {
                    load: false,
                    app: null
                },
                {
                    load: false,
                    app: null
                },
                {
                    load: false,
                    app: null
                },
                {
                    load: false,
                    app: null
                }
            ],
            load: false
        }
    },
    computed: {
        getValue: {
            get: function () {
                return this.value
            },
            set: function (value) {
                this.$emit('getValue', value)
                // this.value = 0;
            }
        },
        isPaused () {
            const no = this.getValue - 1
            // return true
            if (this.scene[no] == null) return false
            if (this.scene[no].app == null || this.scene[no].app == undefined) return false
            console.log(!this.scene[no].app.ticker.started)
            return !this.scene[no].app.ticker.started
        }
    },
    watch: {
        getValue: {
            handler (val) {
                if (this.load) {
                    this.scene.forEach((scene, index) => {
                        if (this.isSceneLoaded(index) && index != val) {
                            this.pauseScene(index)
                        }
                    })
                }
            }
        }
    },
    async mounted () {
        document.querySelector('.v-carousel__controls').style.right = 0
        this.setCarouselEvent()
        const simple_id = 1
        await this.requestDataAndLoad(simple_id)
    },
    methods: {
        setCarouselEvent () {
            const app = this
            window.addEventListener('wheel', function (event) {
                if (!app.scrollable) return
                app.scrollable = false
                Sound.stopAll()
                const offset = event.deltaY < 0 ? -1 : 1
                const slides_length = app.$refs.carousel.$slots.default.length
                const value =
                    app.getValue + offset < slides_length &&
                    app.getValue + offset >= 0
                        ? app.getValue + offset
                        : app.getValue
                app.getValue = value
                if (
                    !(
                        app.getValue + offset < slides_length &&
                        app.getValue + offset >= 0
                    )
                ) {
                    app.scrollable = true
                }
                this.setTimeout(() => (app.scrollable = true), 1000)
            })
            const transition = document.querySelector('#carousel')
            transition.addEventListener('transitionend', (e) => {
                if (e.propertyName.indexOf('transform') != -1) { app.scrollable = true }
            })
        },
        /** 將情境化面調整到適當大小(當視窗大小改變時，執行此函式) */
        onResizeCanvas () {
            const default_width = 1600
            const default_height = 900

            const space_width = window.innerWidth - 320 * 1.2
            const space_height = window.innerHeight - 264 * 1.2

            const aspect_ratio = Math.min(
                space_width / default_width,
                space_height / default_height
            )

            const element = document.getElementsByClassName('enviro')
            for (let index = 0; index < element.length; index++) {
                element[index].style.cssText = `width: ${default_width * aspect_ratio}px; 
                                        height: ${
    default_height * aspect_ratio
}px;`
            }
        },
        creatEnvrioment () {
            PIXI.settings.RESOLUTION = window.devicePixelRatio || 1

            const Application = PIXI.Application
            const Container = PIXI.Container
            const loader = PIXI.loader
            const resources = PIXI.loader.resources
            const TextureCache = PIXI.utils.TextureCache
            const Sprite = PIXI.Sprite

            for (let i = 0; i < this.mode.length; i++) {
                const app = new Application({
                    width: 1600,
                    height: 900,
                    antialias: true,
                    transparent: false,
                    resolution: 1,
                    view: document.getElementById('enviro' + (i + 1))
                })
                let environment
                switch (i) {
                case 0: environment = new TrainModeScene()
                    environment.init(this.enviro.id)
                    break
                case 1: environment = new PracticeModeScene()
                    environment.init(this.enviro.id)
                    environment.character.gender = 'mm'
                    break
                case 2: environment = new TestModeScene()
                    environment.init(this.enviro.id)
                    break
                case 3: environment = new CreateRoleScene()
                    break
                }
                environment.position.set(0, 0)
                app.stage.addChild(environment)
                console.log('render', app)
            }
        },
        pauseScene (no) {
            this.scene[no].app.ticker.stop()
        },
        startScene (no) {
            this.scene[no].app.ticker.start()
        },
        async creatScene (no) {
            if (this.scene[no].load) return
            this.scene[no].load = true
            let app
            const options = {
                width: 1600,
                height: 900,
                antialias: true,
                transparent: false,
                resolution: 1,
                view: document.getElementById('enviro' + (no + 1))
            }
            console.log(this.scene[no].app)
            PIXI.settings.RESOLUTION = window.devicePixelRatio || 1
            if (this.scene[no].app) {
                await this.scene[no].app.destroy(false)
                app = this.scene[no].app
                app = PIXI.autoDetectRenderer(options)
            } else {
                app = new Application(options)
            }

            let environment
            switch (no) {
            case 0: environment = new TrainModeScene()
                await environment.init(this.enviro.id)
                break
            case 1: environment = new PracticeModeScene()
                await environment.init(this.enviro.id)
                environment.character.gender = 'mm'
                break
            case 2: environment = new TestModeScene()
                await environment.init(this.enviro.id)
                break
            case 3: environment = new CreateRoleScene()
                break
            }
            environment.position.set(0, 0)
            app.stage.addChild(environment)
            console.log('render', app)
            this.scene[no].load = true
            this.scene[no].app = app
        },
        isSceneLoaded (no) {
            return this.scene[no].load
        },
        requestDataAndLoad: async function (enviro_name) {
            const app = this

            if (enviro_name != -1) {
                await this.get_enviro_data(enviro_name)
                await this.get_object_data(this.enviro.object.split(','))
            }
            await this.getAudioData()
            this.loadResourses()
        },
        /** 判定資源是否已載入過，若無則放入陣列中，最後載入資源並執行情境建立與設定 */
        loadResourses () {
            // 將需加載的資源放入陣列

            let load_arr = []

            const data = Object.values(ResourcesManager)
            load_arr = data.filter(
                (item, index, self) =>
                    index === self.indexOf(item) && !PIXI.loader.resources[item]
            )
            if (
                !PIXI.loader.resources[
                    '../static/images/enviro/object/object.png'
                ]
            ) { load_arr.push('../static/images/enviro/object/object.png') }

            if (
                this.enviro.background_src != undefined &&
                !PIXI.loader.resources[this.enviro.background_src]
            ) { load_arr.push(this.enviro.background_src) }

            this.objects.forEach((object) => {
                if (!PIXI.loader.resources[object.pic_src]) { load_arr.push(object.pic_src) }
            })

            this.audio.forEach((audio) => {
                if (!PIXI.loader.resources[audio.sound_src]) { load_arr.push(audio.sound_src) }
            })

            // 判定有無資源須加載，並執行情境建立與設定
            // console.log("2.3", load_arr);
            if (load_arr.length <= 0) {
                // this.creatEnvrioment()
            } else { PIXI.loader.add(load_arr).load() }
            // console.log("2.4");
            this.load = true
        },
        /** 請求後端並取得該情境教材資料
         * @async
         */
        get_enviro_data (id) {
            return apiManageEnviroment({ type: 'get', amount: 'one', item: id })
                .then((res) => {
                    console.log(res.data)
                    this.enviro = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /** 請求後端並取得該情境教材所需的物件資料
         * @async
         */
        get_object_data (object_arr) {
            return apiManageObject({
                type: 'get',
                amount: 'part',
                items: object_arr
            })
                .then((res) => {
                    console.log(res.data)
                    this.objects = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /** 請求後端並取得所有聲音資源資料
         * @async
         */
        getAudioData () {
            const audio_arr = this.objects.map((item) => item.sound_src)
            return apiManageAudio({
                type: 'get',
                amount: 'part',
                items: audio_arr
            })
                .then((res) => {
                    console.log(res.data)
                    this.audio = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>

<style scoped>
.v-window-x-transition-enter-active,
.v-window-x-transition-leave-active,
.v-window-x-reverse-transition-enter-active,
.v-window-x-reverse-transition-leave-active,
.v-window-y-transition-enter-active,
.v-window-y-transition-leave-active,
.v-window-y-reverse-transition-enter-active,
.v-window-y-reverse-transition-leave-active {
    transition: all 1000ms ease 0s;
}
.enviro{
  background-color: aliceblue !important;
}
</style>
