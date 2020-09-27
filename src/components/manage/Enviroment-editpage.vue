<template>
    <v-main class="pr-0">
        <canvas v-resize="onResizeCanvas" id="enviro" class="enviro"></canvas>
        <div class="objects-display">
            <v-card-title class="jf-title">物件列表</v-card-title>
            <v-divider></v-divider>
            <v-slide-group v-model="model" mandatory show-arrows center-active>
                <v-slide-item
                    v-for="(object, index) in objects"
                    :key="object.id"
                    v-slot:default="{ active, toggle }"
                >
                    <v-card
                        @click="clickObject(index)"
                        :color="active ? 'primary' : 'grey lighten-1'"
                        class="ma-4"
                        height="100"
                        width="100"
                    >
                        <v-img
                            :src="object.pic_src"
                            max-height="100"
                            min-height="100"
                            min-width="100"
                            contain
                        ></v-img>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </div>

        <v-navigation-drawer width="320px" app absolute permanent right>
            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium jf-title"
                            >編輯區域</v-list-item-title
                        >
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-btn @click="saveEnvironment" color="red" text>
                        <v-icon left>mdi-content-save</v-icon>儲存
                    </v-btn>
                </v-list-item>
            </template>
            <v-divider></v-divider>
            <v-list shaped>
                <v-list-group prepend-icon="mdi-image-area" value="true">
                    <template v-slot:activator>
                        <v-list-item-title>背景</v-list-item-title>
                    </template>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                v-model="enviro.name"
                                :rules="rules.must"
                                label="情境名稱"
                                outlined
                                clearable
                                hide-details
                            ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select
                                v-model="enviro.category"
                                :items="audio_type_arr"
                                :rules="rules.must"
                                label="情境類別"
                                dense
                                outlined
                                hide-details
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-btn
                                @click="background_img_profile.dialog = true"
                                class="mb-4"
                                color="secondary"
                                block
                                >選擇情境背景</v-btn
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-group prepend-icon="mdi-shape-plus">
                    <template v-slot:activator>
                        <v-list-item-title>物件</v-list-item-title>
                    </template>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-row>
                                <v-col cols="7" class="pt-0 pb-0">
                                    <v-btn
                                        @click="addnewObject"
                                        class="mb-4"
                                        block
                                        outlined
                                        >新增物件</v-btn
                                    >
                                </v-col>
                                <v-col cols="4" class="pt-0 pb-0">
                                    <v-btn
                                        @click="deleteObject"
                                        color="error"
                                        outlined
                                        >刪除物件</v-btn
                                    >
                                </v-col>
                            </v-row>

                            <v-text-field
                                v-model="select_object.name"
                                label="物件名稱"
                                :rules="rules.must"
                                dense
                                outlined
                                clearable
                                hide-details
                            ></v-text-field>
                            <v-row class="mt-2">
                                <v-col>
                                    <v-text-field
                                        v-model="select_object.position.x"
                                        label="X軸位置"
                                        dense
                                        outlined
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-model="select_object.position.y"
                                        label="Y軸位置"
                                        dense
                                        outlined
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn
                                @click="object_img_profile.dialog = true"
                                class="mt-2 mb-2"
                                color="secondary"
                                block
                                >選擇物件圖片</v-btn
                            >
                            <v-slider
                                v-model="select_object.scale"
                                max="20"
                                min="0.0001"
                                step="0.0001"
                                class="mb-3 mt-3"
                                prepend-icon="mdi-aspect-ratio"
                                hide-details
                            >
                                <template v-slot:append>
                                    <v-text-field
                                        v-model="select_object.scale"
                                        type="number"
                                        class="mt-0 pt-0"
                                        style="width: 60px"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </template>
                            </v-slider>

                            <v-slider
                                v-model="select_object.degree"
                                min="0"
                                max="360"
                                prepend-icon="mdi-format-rotate-90"
                                hide-details
                            >
                                <template v-slot:append>
                                    <v-text-field
                                        v-model="select_object.degree"
                                        type="number"
                                        class="mt-0 pt-0"
                                        style="width: 60px"
                                        hide-details
                                        single-line
                                    ></v-text-field>
                                </template>
                            </v-slider>

                            <v-row no-gutters class="mb-4 mt-4">
                                <v-col cols="12" sm="5" class="mr-2">
                                    <v-select
                                        v-model="audio_type"
                                        :items="audio_type_arr"
                                        :rules="rules.must"
                                        label="聲音類別"
                                        dense
                                        outlined
                                        hide-details
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="5" class="mr-0">
                                    <v-select
                                        v-model="select_object.audio"
                                        item-text="name"
                                        :items="audioName"
                                        :rules="rules.must"
                                        label="聲音名稱"
                                        return-object
                                        dense
                                        outlined
                                        hide-detail
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="1">
                                    <v-btn @click="playAudio" icon>
                                        <v-icon>mdi-volume-high</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-dialog
            v-model="object_img_profile.dialog"
            max-width="1000"
            max-height="600"
        >
            <v-card>
                <v-card-title>
                    <span class="jf-title">物件圖像庫</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="changeObjectImg" icon>
                        <v-icon color="grey lighten-1">mdi-check</v-icon>
                    </v-btn>
                </v-card-title>
                <v-tabs
                    v-model="object_img_profile.tab"
                    background-color="transparent"
                    color="basil"
                    grow
                >
                    <v-tab>雲端</v-tab>
                    <v-tab>從電腦上傳</v-tab>
                </v-tabs>
                <v-tabs-items v-model="object_img_profile.tab">
                    <v-tab-item>
                        <v-card>
                            <v-container fluid>
                                <v-item-group
                                    v-model="object_img_profile.cloud_select"
                                    mandatory
                                >
                                    <v-row>
                                        <v-col
                                            v-for="(item,
                                            i) in object_img_profile.cloud_img"
                                            :key="i"
                                            md="auto"
                                        >
                                            <v-item
                                                v-slot:default="{
                                                    active,
                                                    toggle,
                                                }"
                                                :value="item"
                                            >
                                                <v-card
                                                    :ripple="{
                                                        class: 'white--text',
                                                    }"
                                                    min-width="100"
                                                    min-height="150"
                                                    max-width="200"
                                                    max-height="150"
                                                >
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item"
                                                        :class="
                                                            active
                                                                ? 'border text-right pa-2'
                                                                : ' text-right pa-2'
                                                        "
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-file-input
                                v-model="object_img_profile.file_input"
                                @change="fileOnChange($event, 'object')"
                                class="ma-2"
                                color="deep-purple accent-4"
                                label="File input"
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                :show-size="1000"
                                multiple
                                counter
                                outlined
                            >
                                <template v-slot:selection="{ index, text }">
                                    <v-chip
                                        v-if="index < 2"
                                        color="deep-purple accent-4"
                                        dark
                                        label
                                        small
                                        >{{ text }}</v-chip
                                    >

                                    <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                        >+{{
                                            object_img_profile.file_input
                                                .length - 2
                                        }}
                                        File(s)</span
                                    >
                                </template>
                            </v-file-input>
                            <v-container fluid>
                                <v-item-group
                                    v-model="object_img_profile.local_select"
                                    mandatory
                                >
                                    <v-row>
                                        <v-col
                                            v-for="(item,
                                            i) in object_img_profile.local_img"
                                            :key="i"
                                            md="auto"
                                        >
                                            <v-item
                                                v-slot:default="{
                                                    active,
                                                    toggle,
                                                }"
                                                :value="item"
                                            >
                                                <v-card
                                                    :ripple="{
                                                        class: 'white--text',
                                                    }"
                                                    min-width="100"
                                                    min-height="150"
                                                    max-width="200"
                                                    max-height="150"
                                                >
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item.result"
                                                        :class="
                                                            active
                                                                ? 'border text-right pa-2'
                                                                : ' text-right pa-2'
                                                        "
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="background_img_profile.dialog"
            max-width="1000"
            max-height="600"
        >
            <v-card>
                <v-card-title>
                    <span class="jf-title">背景圖像庫</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="changeBackgroundImg" icon>
                        <v-icon color="grey lighten-1">mdi-check</v-icon>
                    </v-btn>
                </v-card-title>
                <v-tabs
                    v-model="background_img_profile.tab"
                    background-color="transparent"
                    color="basil"
                    grow
                >
                    <v-tab>雲端</v-tab>
                    <v-tab>從電腦上傳</v-tab>
                </v-tabs>
                <v-tabs-items v-model="background_img_profile.tab">
                    <v-tab-item>
                        <v-card>
                            <v-container fluid>
                                <v-item-group
                                    v-model="
                                        background_img_profile.cloud_select
                                    "
                                    mandatory
                                >
                                    <v-row>
                                        <v-col
                                            v-for="(item,
                                            i) in background_img_profile.cloud_img"
                                            :key="i"
                                            md="auto"
                                        >
                                            <v-item
                                                v-slot:default="{
                                                    active,
                                                    toggle,
                                                }"
                                                :value="item"
                                            >
                                                <v-card
                                                    :ripple="{
                                                        class: 'white--text',
                                                    }"
                                                    min-width="100"
                                                    min-height="150"
                                                    max-width="200"
                                                    max-height="150"
                                                >
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item"
                                                        :class="
                                                            active
                                                                ? 'border text-right pa-2'
                                                                : ' text-right pa-2'
                                                        "
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-file-input
                                v-model="background_img_profile.file_input"
                                @change="fileOnChange($event, 'background')"
                                :show-size="1000"
                                class="ma-2"
                                color="deep-purple accent-4"
                                label="File input"
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                outlined
                                counter
                                multiple
                            >
                                <template v-slot:selection="{ index, text }">
                                    <v-chip
                                        v-if="index < 2"
                                        color="deep-purple accent-4"
                                        dark
                                        label
                                        small
                                        >{{ text }}</v-chip
                                    >

                                    <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                        >+{{
                                            background_img_profile.file_input
                                                .length - 2
                                        }}
                                        File(s)</span
                                    >
                                </template>
                            </v-file-input>
                            <v-container fluid>
                                <v-item-group
                                    v-model="
                                        background_img_profile.local_select
                                    "
                                    mandatory
                                >
                                    <v-row>
                                        <v-col
                                            v-for="(item,
                                            i) in background_img_profile.local_img"
                                            :key="i"
                                            md="auto"
                                        >
                                            <v-item
                                                v-slot:default="{
                                                    active,
                                                    toggle,
                                                }"
                                                :value="item"
                                            >
                                                <v-card
                                                    :ripple="{
                                                        class: 'white--text',
                                                    }"
                                                    min-width="100"
                                                    min-height="150"
                                                    max-width="200"
                                                    max-height="150"
                                                >
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item.result"
                                                        :class="
                                                            active
                                                                ? 'border text-right pa-2'
                                                                : ' text-right pa-2'
                                                        "
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        class
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-dialog>

        <v-dialog v-model="alert.dialog" width="600">
            <v-card>
                <v-card-title>
                    <span class="jf-title">尚未完成情境教材</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="alert.dialog = false" icon>
                        <v-icon color="grey lighten-1">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>背景</v-card-text>
                <v-card-text>
                    <v-card width="300">
                        <v-row class="ma-0 pa-0" outlined tile>
                            <v-col>
                                <v-row justify="center" align-self="center"
                                    >圖片</v-row
                                >
                                <v-row justify="center" align-self="center">
                                    <v-icon
                                        :color="
                                            alert.enviro.background
                                                ? 'blue'
                                                : 'red'
                                        "
                                        >{{
                                            alert.enviro.background
                                                ? "mdi-check"
                                                : "mdi-close"
                                        }}</v-icon
                                    >
                                </v-row>
                            </v-col>
                            <v-col>
                                <v-row justify="center" align-self="center"
                                    >名稱</v-row
                                >
                                <v-row justify="center" align-self="center">
                                    <v-icon
                                        :color="
                                            alert.enviro.name ? 'blue' : 'red'
                                        "
                                        >{{
                                            alert.enviro.name
                                                ? "mdi-check"
                                                : "mdi-close"
                                        }}</v-icon
                                    >
                                </v-row>
                            </v-col>
                            <v-col>
                                <v-row justify="center" align-self="center"
                                    >類別</v-row
                                >
                                <v-row justify="center" align-self="center">
                                    <v-icon
                                        :color="
                                            alert.enviro.category
                                                ? 'blue'
                                                : 'red'
                                        "
                                        >{{
                                            alert.enviro.category
                                                ? "mdi-check"
                                                : "mdi-close"
                                        }}</v-icon
                                    >
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card-text>

                <v-card-text>物件</v-card-text>
                <v-card-text>
                    <v-card width="300">
                        <v-row class="ma-0 pa-0" outlined tile>
                            <v-col>
                                <v-row justify="center" align-self="center"
                                    >圖片</v-row
                                >
                            </v-col>
                            <v-col>
                                <v-row justify="center" align-self="center"
                                    >名稱</v-row
                                >
                            </v-col>
                            <v-col>
                                <v-row justify="center" align-self="center"
                                    >聲音</v-row
                                >
                            </v-col>
                        </v-row>
                        <v-row
                            v-for="(object, index) in alert.objects"
                            :key="index"
                            class="ma-0 pa-0"
                            outlined
                            tile
                        >
                            <v-col>
                                <v-row justify="center" align-self="center">
                                    <v-img
                                        aspect-ratio="1"
                                        :src="object.image"
                                        max-height="60"
                                        min-height="60"
                                        min-width="60"
                                        contain
                                    ></v-img>
                                </v-row>
                            </v-col>
                            <v-col>
                                <v-row justify="center" align-self="center">
                                    <v-icon
                                        :color="object.name ? 'blue' : 'red'"
                                        >{{
                                            object.name
                                                ? "mdi-check"
                                                : "mdi-close"
                                        }}</v-icon
                                    >
                                </v-row>
                            </v-col>
                            <v-col>
                                <v-row justify="center" align-self="center">
                                    <v-icon
                                        :color="object.audio ? 'blue' : 'red'"
                                        >{{
                                            object.audio
                                                ? "mdi-check"
                                                : "mdi-close"
                                        }}</v-icon
                                    >
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="alert.dialog = false" text block>
                        <v-icon>mdi-check</v-icon>確認
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="progress.dialog" max-width="600" persistent>
            <v-card>
                <v-card-title>{{ progress.text }}</v-card-title>
                <v-stepper :value="stepper.progress">
                    <v-stepper-header>
                        <template v-for="(step, index) in stepper.steps">
                            <v-stepper-step
                                :step="index"
                                :complete="stepper.progress > index"
                                :key="`${index}-step`"
                                >{{ step.text }}</v-stepper-step
                            >
                            <v-divider
                                v-if="index + 1 !== stepper.steps.length"
                                :key="index"
                            ></v-divider>
                        </template>
                    </v-stepper-header>
                </v-stepper>
                <v-progress-linear
                    :value="progress.value"
                    :buffer-value="progress.value"
                    color="light-blue"
                    stream
                    rounded
                    height="6"
                ></v-progress-linear>
                <v-card-actions>
                    <v-btn @click="progress.dialog = false" text block>
                        <v-icon>mdi-check</v-icon>完成
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import * as PIXI from "pixi.js";
import Sound from "pixi-sound";
import { Editor } from "@/js/manage/environment";
import {
    apiManageEnviroment,
    apiManageObject,
    apiManageAudio,
    apiGetFolderFileList,
    apiManageFile,
} from "@/js/api";

export default {
    props: ["passdata"],
    data() {
        return {
            enviro: {},
            objects: [],
            select_object: {
                name: null,
                position: { x: null, y: null },
                imagefile: null,
                scale: null,
                degree: null,
                audio: { name: null, category: null, sound_src: null },
                id: null,
            },
            sprite: null,
            audio: [],
            audio_type: null,
            audio_type_arr: [],
            object_img_profile: {
                cloud_img: [],
                local_img: [],
                file_input: [],
                cloud_select: [],
                local_select: [],
                tab: 0,
                dialog: false,
            },
            background_img_profile: {
                cloud_img: [],
                local_img: [],
                file_input: [],
                cloud_select: [],
                local_select: [],
                tab: 0,
                dialog: false,
            },
            enviro_container: null,
            environment: null,
            model: null,
            rules: {
                must: [(v) => !!v || "必填!"],
            },
            audio_player: new Audio(),
            alert: {
                dialog: false,
                enviro: {
                    background: false,
                    name: false,
                    category: false,
                },
                objects: [],
            },
            progress: {
                dialog: false,
                value: 0,
                text: "儲存進度流程",
            },
            stepper: {
                steps: [
                    { text: "上傳圖檔" },
                    { text: "儲存物件" },
                    { text: "儲存情境" },
                ],
                progress: 0,
            },
        };
    },
    async mounted() {
        console.log("Home Page run");
        if (this.passdata.enviro == null) this.$router.back();
        console.log(this.passdata);
        this.getCloudBackgroundImages();
        this.getCloudObjectImages();

        let simple_id =
            this.passdata.enviro.id == -1
                ? this.passdata.enviro.simple_id
                : this.passdata.enviro.id;
        await this.requestDataAndLoad(simple_id);
        this.enviro.id = this.passdata.enviro.id;
        if (this.passdata.enviro.id == -1)
            this.objects.forEach((object) => (object.id = -1));
        this.getAudiotypes();
    },
    computed: {
        /**取得符合該聲音類別的聲音資源 */
        audioName() {
            var app = this;
            if (app.audio_type == "全部") {
                return app.audio;
            } else if (app.audio_type != null) {
                return app.audio.filter((item) => {
                    return item.category.indexOf(app.audio_type) >= 0;
                });
            }
        },
    },
    methods: {
        test() {
            // console.log(this.selected);
            // console.log(this.object_img_profile.local_img);
            console.log(this.objects);
        },
        creatEnvrioment() {
            PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

            let Application = PIXI.Application,
                Container = PIXI.Container,
                loader = PIXI.loader,
                resources = PIXI.loader.resources,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite;

            let app = new Application({
                width: 1000,
                height: 625,
                antialias: true,
                transparent: false,
                resolution: 1,
                view: document.getElementById("enviro"),
            });

            this.environment = new Editor(this, app, this.enviro, this.objects);
            this.enviro_container = this.environment.getEnvironment();
            this.enviro_container.position.set(0, 0);
            app.stage.addChild(this.enviro_container);
            console.log("render");
            this.environment.object_click(this.objects[0]);
        },
        requestDataAndLoad: async function (enviro_name) {
            var app = this;
            await this.get_enviro_data(enviro_name);
            await this.get_object_data(this.enviro.object.split(","));
            await this.getAudioData();

            /**將聲音分類字串轉陣列 */
            this.audio.forEach((item) => {
                item.category = item.category.split(";");
            });

            /**將屬於該物件的聲音資源分配到該物件上 */
            this.objects.forEach((object) => {
                app.audio.forEach((audio) => {
                    if (object.sound_src == audio.id) object.audio = audio;
                });
            });

            this.loadResourses();
        },
        /**判定資源是否已載入過，若無則放入陣列中，最後載入資源並執行情境建立與設定 */
        loadResourses() {
            // 將需加載的資源放入陣列

            var load_arr = [];

            if (
                !PIXI.loader.resources[
                    "../static/images/enviro/object/object.png"
                ]
            )
                load_arr.push("../static/images/enviro/object/object.png");

            if (!PIXI.loader.resources[this.enviro.background_src])
                load_arr.push(this.enviro.background_src);

            this.objects.forEach((object) => {
                if (!PIXI.loader.resources[object.pic_src])
                    load_arr.push(object.pic_src);
            });

            // this.audio.forEach((audio) => {
            //     if (!PIXI.loader.resources[audio.sound_src])
            //         load_arr.push(audio.sound_src);
            // });

            // 判定有無資源須加載，並執行情境建立與設定
            if (load_arr.length <= 0) this.creatEnvrioment();
            else PIXI.loader.add(load_arr).load(this.creatEnvrioment);
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
            return apiManageAudio({ type: "get", amount: "all" })
                .then((res) => {
                    console.log(res.data);
                    this.audio = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**過濾聲音資源的分類 */
        getAudiotypes() {
            var app = this;
            this.audio_type_arr.push("全部");
            this.audio.forEach((item) => {
                item.category.forEach((c) => {
                    if (app.audio_type_arr.indexOf(c) < 0)
                        app.audio_type_arr.push(c);
                });
            });
        },
        /**取得雲端上的物件圖片 */
        getCloudObjectImages() {
            return apiGetFolderFileList({
                path: "images-enviro-object",
                extensions: ["*.png"],
            })
                .then((res) => {
                    console.log(res.data);
                    this.object_img_profile.cloud_img = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**取得雲端上的背景圖片 */
        getCloudBackgroundImages() {
            return apiGetFolderFileList({
                path: "images-enviro-background",
                extensions: ["*.gif", "*.jpg", "*.png"],
            })
                .then((res) => {
                    console.log(res.data);
                    this.background_img_profile.cloud_img = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**將選取好得檔案放入(背景/物件)圖庫中 */
        fileOnChange: function (event, type) {
            event.forEach((file) => {
                var reader = new FileReader();
                var app = this;
                reader.onload = function (event) {
                    let image_type = ["image/jpeg", "image/png"];
                    if (image_type.indexOf(file.type) == -1) return;
                    let img_obj = {
                        file: file,
                        result: event.target.result,
                    };
                    if (type == "background")
                        app.background_img_profile.local_img.push(img_obj);
                    else app.object_img_profile.local_img.push(img_obj);
                };
                reader.readAsDataURL(file);
            });
        },
        /**更改情境物件圖片 */
        changeObjectImg() {
            var select_img_file =
                this.object_img_profile.tab == 0
                    ? null
                    : this.object_img_profile.local_select.file;
            var select_img =
                this.object_img_profile.tab == 0
                    ? this.object_img_profile.cloud_select
                    : this.object_img_profile.local_select.result;
            this.sprite.texture = PIXI.Texture.from(select_img);

            var i = -1;
            this.objects.forEach((object, index) => {
                if (object.id == this.select_object.id) i = index;
            });
            this.objects[i].pic_src = select_img;
            this.objects[i].file = select_img_file;
            this.object_img_profile.dialog = false;
        },
        /**更改情境背景圖片 */
        changeBackgroundImg() {
            var select_img_file =
                this.background_img_profile.tab == 0
                    ? null
                    : this.background_img_profile.local_select.file;
            var select_img =
                this.background_img_profile.tab == 0
                    ? this.background_img_profile.cloud_select
                    : this.background_img_profile.local_select.result;

            var app = this;
            var bg_texture = PIXI.Texture.from(select_img);
            bg_texture.baseTexture.on("loaded", function () {
                var scale =
                    app.environment.getBackground().width / bg_texture.width;
                app.environment.getBackground().scale.set(scale, scale);
                app.environment.getBackground().texture = bg_texture;
                app.background_img_profile.dialog = false;
            });

            this.enviro.background_src = select_img;
            this.enviro.file = select_img_file;
        },
        /**新增物件並點選新物件 */
        addnewObject() {
            var app = this;
            var object_data = {
                coordinate: "0,0",
                id: "-1",
                name: null,
                pic_src: "../static/images/enviro/object/object.png",
                size: "100",
                sound_src: null,
                audio: null,
                scale: 1,
                angle: 0,
            };
            var object_texture = PIXI.Texture.from(
                "../static/images/enviro/object/object.png"
            );
            var object = this.environment.creat_Object(
                object_data,
                object_texture
            );
            object_data.sprite = object;
            object_data.sprite.click = function () {
                app.environment.object_click(object_data);
            };
            this.environment.object_drag(object_data);
            this.environment.getEnvironment().addChild(object);
            this.objects.push(object_data);
            this.clickObject(this.objects.length - 1);
        },
        /**刪除被選取之情境物件,並點擊物件陣列索引0的物件 */
        deleteObject() {
            var app = this;
            var delete_object_index = this.objects.findIndex(
                (object) => object.sprite == app.sprite
            );
            this.objects[delete_object_index].sprite.parent.removeChild(
                this.objects[delete_object_index].sprite
            );
            this.objects[delete_object_index].sprite.destroy({
                children: true,
                texture: true,
                baseTexture: true,
            });
            this.objects.splice(delete_object_index, 1);

            if (this.objects.length > 0) this.clickObject(0);
        },
        /**同步物件列表該物件被點擊事件 */
        clickObject(index) {
            this.model = index;
            this.environment.object_click(this.objects[index]);
        },
        playAudio() {
            // Sound.stopAll();
            // Sound.add(
            //     this.select_object.audio.audio_id,
            //     PIXI.loader.resources[this.select_object.audio.sound_src]
            // );
            // Sound.play(this.select_object.audio.audio_id);

            this.audio_player.pause = true;
            this.audio_player.src = this.select_object.audio.sound_src;
            this.audio_player.currentTime = 0;
            this.audio_player.play();
        },
        /**將情境化面調整到適當大小(當視窗大小改變時，執行此函式) */
        onResizeCanvas() {
            const default_width = 1000;
            const default_height = 625;

            let space_width = window.innerWidth - 320;
            let space_height = window.innerHeight - 264;

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
        checkEditComplete() {
            console.log(this.enviro);
            console.log(this.objects);
            let isComplete = false;
            let { background, name, category } = this.alert.enviro;
            background = this.enviro.background_src ? true : false;
            name = this.enviro.name ? true : false;
            category = this.enviro.category ? true : false;
            Object.assign(this.alert.enviro, { background, name, category });

            this.alert.objects = [];
            this.objects.forEach((object) => {
                let obj = {};
                obj.name = object.name ? true : false;
                obj.image = object.pic_src;
                obj.audio = object.audio ? true : false;
                this.alert.objects.push(obj);
            });

            let result = this.alert.objects.filter(
                (object) => !object.name || !object.audio
            );
            if (background && name && category && result.length == 0)
                isComplete = true;

            return isComplete;
        },
        async saveEnvironment() {
            this.stepper.progress = -1;
            if (!this.checkEditComplete() && this.showUnFinishedDialog())
                return;
            this.progress.dialog = true;

            /**upload image file */
            this.stepper.progress = 0;
            let upload_files = [];
            let files = [];
            if (this.isNeedFileUpload(files, upload_files))
                await this.uploadFiles(files, upload_files);

            /**save object */
            let saveObject = new Promise((resolve, reject) => {
                this.stepper.progress = 1;
                let count = 0;
                this.objects.forEach((object, index) => {
                    let item = Object.assign({}, object);
                    delete item.sprite;
                    delete item.file;
                    apiManageObject({ type: "update", item: item }).then(
                        (res) => {
                            console.log(object.name, res.data);
                            if (res.data.result) object.id = res.data.id;
                            if (++count >= this.objects.length) resolve();
                        }
                    );
                });
            });

            /**save enviro */

            saveObject.then(() => {
                this.stepper.progress = 2;
                let object_arr = this.objects.map((object) => object.id);
                this.enviro.object = object_arr.join(",");
                apiManageEnviroment({
                    type: "update",
                    item: this.enviro,
                }).then((res) => {
                    console.log(res.data);
                    this.stepper.progress = 3;
                    if (res.data.result) this.enviro.id = res.data.id;
                });
            });
        },
        showUnFinishedDialog() {
            this.alert.title = "未完成情境教材";
            this.alert.text = "尚有物件未完成";
            this.alert.dialog = true;
            return true;
        },
        isNeedFileUpload(files, upload_files) {
            if (this.enviro.file != null && this.enviro.file != undefined) {
                upload_files.push({ type: "background" });
                files.push(this.enviro.file);
            }

            this.objects.forEach((object, index) => {
                if (object.file != null && object.file != undefined) {
                    upload_files.push({
                        type: "object",
                        index: index,
                    });
                    files.push(object.file);
                }
            });

            return upload_files.length > 0;
        },
        async uploadFiles(files, data) {
            this.progress.text = "正在上傳檔案";

            var formData = new FormData();
            files.forEach((file) => formData.append("file[]", file));

            let app = this;
            let config = {
                onUploadProgress: (ProgressEvent) => {
                    let progress =
                        ((ProgressEvent.loaded / ProgressEvent.total) * 100) |
                        0;
                    this.progress.value = progress;
                },
            };

            await apiManageFile(
                formData,
                { type: "upload", data: data },
                config.onUploadProgress
            ).then((res) => {
                console.log(res.data);
                res.data.forEach((item) => {
                    switch (item.type) {
                        case "background":
                            this.enviro.background_src = item.filename;
                            break;
                        case "object":
                            this.objects[item.index].pic_src = item.filename;
                            break;
                        default:
                            break;
                    }
                });
            });
        },
    },
    watch: {
        select_object: {
            handler(val) {
                var app = this;
                var i = -1;
                this.objects.forEach((object, index) => {
                    if (object.id == app.select_object.id) i = index;
                });
                this.sprite.position.x = this.select_object.position.x;
                this.sprite.position.y = this.select_object.position.y;
                this.sprite.rotation =
                    this.select_object.degree * (Math.PI / 180);
                this.sprite.scale.set(
                    this.select_object.scale,
                    this.select_object.scale
                );

                this.objects[i].name = this.select_object.name;
                this.objects[i].audio = this.select_object.audio;
                this.objects[i].coordinate =
                    Math.round(this.select_object.position.x) +
                    "," +
                    Math.round(this.select_object.position.y);
                this.objects[i].degree = this.select_object.degree;
                this.objects[i].sound_src = this.select_object.audio.id;
                this.objects[i].scale = this.select_object.scale;
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 24px;
}
.app {
    max-height: calc(100vh - 64px) !important;
}
.enviro {
    width: 1000px;
    height: 625px;
}

.objects-display {
    width: calc(100% - 320px) !important;
    position: absolute;
    bottom: 0;
}
</style>
