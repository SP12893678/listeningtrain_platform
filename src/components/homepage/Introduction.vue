<template>
    <v-container class="ma-0 pa-0" fluid fill-height>
        <v-carousel
            ref="carousel"
            id="carousel"
            v-model="getValue"
            class="ma-0 pa-0"
            height="100%"
            vertical
            vertical-delimiters
            hide-delimiter-background
        >
            <v-carousel-item>
                <v-sheet :color="colors[0]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-overlay light opacity="0.1">
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
                                    ></v-card-text>
                                    <v-card-text
                                        class="headline"
                                        v-text="intro.text"
                                    ></v-card-text>
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
                                >
                                </v-chip>
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
                                    ></v-card-text>
                                </v-card>
                            </v-col>
                        </v-overlay>
                        <v-carousel
                            cycle
                            height="680"
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
                            ></v-carousel-item>
                        </v-carousel>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[1]" height="100%">
                    <v-row
                        class="fill-height ma-2"
                        align="center"
                        justify="center"
                    >
                        <v-col align="center" justify="center">
                            <v-lazy
                                v-model="isActive"
                                :options="{
                                    threshold: 0.5,
                                }"
                                min-height="200"
                                transition="fade-transition"
                            >
                                <canvas
                                    v-resize="onResizeCanvas"
                                    id="enviro1"
                                    class="enviro"
                                    style="border: 1px solid #000000"
                                ></canvas>
                            </v-lazy>
                        </v-col>
                        <v-col align="center" justify="center">
                            <v-card
                                class="text-center pa-2"
                                light
                                elevation="10"
                                color="#FFFFFFAA"
                                width="80%"
                            >
                                <v-card-title
                                    class="text-h3 font-weight-bold"
                                    >{{ mode1.title }}</v-card-title
                                >
                                <v-card-subtitle class="headline">{{
                                    mode1.text
                                }}</v-card-subtitle>
                                <v-card-text class="text-h6" align="left">{{
                                    mode1.features
                                }}</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[2]" height="100%">
                    <v-row
                        class="fill-height ma-2"
                        align="center"
                        justify="center"
                    >
                        <v-col align="center" justify="center">
                            <v-card
                                class="text-center pa-2"
                                light
                                elevation="10"
                                color="#FFFFFFAA"
                                width="80%"
                            >
                                <v-card-title
                                    class="text-h3 font-weight-bold"
                                    >{{ mode2.title }}</v-card-title
                                >
                                <v-card-subtitle class="headline">{{
                                    mode2.text
                                }}</v-card-subtitle>
                                <v-card-text class="text-h6" align="left">{{
                                    mode2.features
                                }}</v-card-text>
                            </v-card>
                        </v-col>
                        <v-col align="center" justify="center">
                            <canvas
                                v-resize="onResizeCanvas"
                                id="enviro2"
                                class="enviro"
                                style="border: 1px solid #000000"
                            ></canvas>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[3]" height="100%">
                    <v-row
                        class="fill-height ma-2"
                        align="center"
                        justify="center"
                    >
                        <v-col align="center" justify="center">
                            <canvas
                                v-resize="onResizeCanvas"
                                id="enviro3"
                                class="enviro"
                                style="border: 1px solid #000000"
                            ></canvas>
                        </v-col>
                        <v-col align="center" justify="center">
                            <v-card
                                class="text-center pa-2"
                                light
                                elevation="10"
                                color="#FFFFFFAA"
                                width="80%"
                            >
                                <v-card-title
                                    class="text-h3 font-weight-bold"
                                    >{{ mode3.title }}</v-card-title
                                >
                                <v-card-subtitle class="headline">{{
                                    mode3.text
                                }}</v-card-subtitle>
                                <v-card-text class="text-h6" align="left">{{
                                    mode3.features
                                }}</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[4]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">角色系統</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[5]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">身分功能</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[6]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">幫助我們</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script>
import * as PIXI from "pixi.js";
import Sound from "pixi-sound";
import TrainModeScene from "@/js/game/scene/TrainModeScene";
import PracticeModeScene from "Scene/PracticeModeScene";
import TestModeScene from "Scene/TestModeScene";
import {
    apiManageEnviroment,
    apiManageObject,
    apiManageAudio,
    apiGetFolderFileList,
    apiManageFile,
} from "@/js/api";
import ResourcesManager from "@/js/game/engine/ResourcesManager";

export default {
    props: ["value"],
    data() {
        return {
            isActive: false,
            colors: [
                "white",
                "teal accent-3",
                "pink lighten-1",
                "light-blue lighten-2",
                "yellow lighten-1",
                "cyan accent-3",
                "amber darken-1",
                // "cyan lighten-5",
                // "pink lighten-5",
                // "yellow lighten-4",
            ],

            slides: [
                "index1",
                "Introduction1",
                "Introduction2",
                "Introduction3",
                "help",
            ],
            scrollable: true,
            items: [
                { src: "../static/images/enviro/background/kitchen.jpg" },
                { src: "../static/images/enviro/background/純背景@4x.png" },
                { src: "../static/images/enviro/background/1762.jpg" },
            ],
            intro: {
                title: "情境式環境音訓練平台",
                text: "為了學齡前聽障兒童所打造的一套聽能訓練平台。",
                features: [
                    { text: "遊戲化元素", color: "success" },
                    { text: "3種學習模式", color: "primary" },
                    { text: "多元情境圖", color: "deep-purple accent-4" },
                    { text: "多樣環境音", color: "indigo darken-3" },
                    { text: "客製化角色", color: "pink accent-4" },
                ],
                end: "透過以上內容來增加受訓者對環境和聲音的印象。",
            },
            mode1: {
                title: "探索模式",
                text: "「認識情境圖有哪些環境音」",
                features:
                    "點選情境裡帶有紫色邊框的物件聆聽物件聲音，或是點選情境圖下⽅的物件列表聆聽。",
            },
            mode2: {
                title: "練習模式",
                text: "「練習辨認各情境圖之環境音」",
                features:
                    "聆聽後點選適合該聲⾳的物件，立即顯示該題是否正確。可無限練習，直到手動結束。",
            },
            mode3: {
                title: "測驗模式",
                text: "「立即檢視學習成效」",
                features:
                    "聆聽後點選適合該聲音的物件，測驗結束顯⽰此次作答情況。一次作答題數為10題。",
            },
            audio: [],
            audio_type_arr: [],
            enviro_container: null,
            environment: null,
        };
    },
    // async mounted() {
    //     document.querySelector(".v-carousel__controls").style.right = 0;
    //     this.setCarouselEvent();
    //     console.log("1");
    //     let simple_id = 1;
    //     await this.requestDataAndLoad(simple_id);
    //     console.log("2");
    //     console.log("3");
    // },
    computed: {
        getValue: {
            get: function () {
                return this.value;
            },
            set: function (value) {
                this.$emit("getValue", value);
                // this.value = 0;
            },
        },
    },
    methods: {
        setCarouselEvent() {
            var app = this;
            window.addEventListener("wheel", function (event) {
                if (!app.scrollable) return;
                let offset = event.deltaY < 0 ? -1 : 1;
                let slides_length = app.$refs["carousel"].$slots.default.length;
                app.scrollable = false;
                let value =
                    app.getValue + offset < slides_length &&
                    app.getValue + offset >= 0
                        ? app.getValue + offset
                        : app.getValue;
                app.getValue = value;
                if (
                    !(
                        app.getValue + offset < slides_length &&
                        app.getValue + offset >= 0
                    )
                ) {
                    app.scrollable = true;
                }
                this.setTimeout(() => (app.scrollable = true), 1000);
            });
            const transition = document.querySelector("#carousel");
            transition.addEventListener("transitionend", (e) => {
                if (e.propertyName.indexOf("transform") != -1)
                    app.scrollable = true;
            });
        },
        /**將情境化面調整到適當大小(當視窗大小改變時，執行此函式) */
        onResizeCanvas() {
            const default_width = 1600;
            const default_height = 900;

            let space_width = window.innerWidth - 320 * 1.2;
            let space_height = window.innerHeight - 264 * 1.2;

            let aspect_ratio = Math.min(
                space_width / default_width,
                space_height / default_height
            );

            var element = document.getElementsByClassName("enviro")[0];
            element.style.cssText = `width: ${default_width * aspect_ratio}px; 
                                    height: ${
                                        default_height * aspect_ratio
                                    }px;`;
        },
        async creatEnvrioment() {
            PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

            let Application = PIXI.Application,
                Container = PIXI.Container,
                loader = PIXI.loader,
                resources = PIXI.loader.resources,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite;

            let app = new Application({
                width: 1600,
                height: 900,
                antialias: true,
                transparent: false,

                resolution: 1,
                view: document.getElementById("enviro1"),
            });

            let environment = new TrainModeScene();
            environment.init(this.enviro.id);
            environment.position.set(0, 0);
            app.stage.addChild(environment);
            console.log("render");
        },
        creatEnvrioment2() {
            PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

            let Application = PIXI.Application,
                Container = PIXI.Container,
                loader = PIXI.loader,
                resources = PIXI.loader.resources,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite;

            let app = new Application({
                width: 1600,
                height: 900,
                antialias: true,
                transparent: false,

                resolution: 1,
                view: document.getElementById("enviro2"),
            });

            let environment = new PracticeModeScene();
            environment.init(this.enviro.id);
            let enviro_container = environment;
            enviro_container.position.set(0, 0);
            app.stage.addChild(enviro_container);
            console.log("render");
            // this.environment.object_click(this.objects[0]);
        },
        requestDataAndLoad: async function (enviro_name) {
            var app = this;

            if (enviro_name != -1) {
                await this.get_enviro_data(enviro_name);
                await this.get_object_data(this.enviro.object.split(","));
            }
            await this.getAudioData();
            this.loadResourses();
        },
        /**判定資源是否已載入過，若無則放入陣列中，最後載入資源並執行情境建立與設定*/
        loadResourses() {
            // 將需加載的資源放入陣列

            var load_arr = [];

            let data = Object.values(ResourcesManager);
            load_arr = data.filter(
                (item, index, self) =>
                    index === self.indexOf(item) && !PIXI.loader.resources[item]
            );
            if (
                !PIXI.loader.resources[
                    "../static/images/enviro/object/object.png"
                ]
            )
                load_arr.push("../static/images/enviro/object/object.png");

            if (
                this.enviro.background_src != undefined &&
                !PIXI.loader.resources[this.enviro.background_src]
            )
                load_arr.push(this.enviro.background_src);

            this.objects.forEach((object) => {
                if (!PIXI.loader.resources[object.pic_src])
                    load_arr.push(object.pic_src);
            });

            this.audio.forEach((audio) => {
                if (!PIXI.loader.resources[audio.sound_src])
                    load_arr.push(audio.sound_src);
            });

            // 判定有無資源須加載，並執行情境建立與設定
            console.log("2.3", load_arr);
            if (load_arr.length <= 0) {
                console.log("hello");
                this.creatEnvrioment();
                this.creatEnvrioment2();
            } else
                PIXI.loader
                    .add(load_arr)
                    .load(this.creatEnvrioment)
                    .load(this.creatEnvrioment2);
            console.log("2.4");
        },
        /**請求後端並取得該情境教材資料
         * @async
         */
        get_enviro_data(id) {
            return apiManageEnviroment({ type: "get", amount: "one", item: id })
                .then((res) => {
                    console.log(res.data);
                    this.enviro = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**請求後端並取得該情境教材所需的物件資料
         * @async
         */
        get_object_data(object_arr) {
            return apiManageObject({
                type: "get",
                amount: "part",
                items: object_arr,
            })
                .then((res) => {
                    console.log(res.data);
                    this.objects = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**請求後端並取得所有聲音資源資料
         * @async
         */
        getAudioData() {
            let audio_arr = this.objects.map((item) => item.sound_src);
            return apiManageAudio({
                type: "get",
                amount: "part",
                items: audio_arr,
            })
                .then((res) => {
                    console.log(res.data);
                    this.audio = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
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
</style>