<template>
    <v-container fluid>
        <!--聲音資源標題 & 新增資料類別;頻率;波形/儲存按鈕 -->
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2">聲音資源編輯</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="addAudioData" text>
                    <v-icon left>mdi-playlist-plus</v-icon>新增一筆
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="addCategoryAsk" color="green" text>
                    <v-icon left>mdi-shape-plus</v-icon>新增類別
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="addFrequencyAsk" color="blue" text>
                    <v-icon left>mdi-chart-bell-curve</v-icon>新增頻率
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="addWaveformAsk" color="purple" text>
                    <v-icon left>mdi-waveform</v-icon>新增波形
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="saveAudioData" color="red" text>
                    <v-icon left>mdi-content-save</v-icon>儲存資源
                </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item class="mt-4" two-line>
            <v-list-item-content>
                <v-data-table
                    :headers="audio_header"
                    :items="audio"
                    item-key="index"
                    class="elevation-1"
                    multi-sort
                >
                    <template v-slot:item.name="{ item }">
                        <v-text-field v-model="item.name" :rules="rules.name" required clearable></v-text-field>
                    </template>
                    <template v-slot:item.audio_id="{ item }">
                        <v-text-field v-model="item.audio_id" :rules="rules.id" required clearable></v-text-field>
                    </template>
                    <template v-slot:item.category="{ item }">
                        <v-select
                            v-model="item.category"
                            :items="category_options"
                            :rules="rules.category"
                            required
                            multiple
                        >
                            <template v-slot:selection="{ item, index }">
                                <v-chip :color="getColor(item)" label small>
                                    <span>{{ item }}</span>
                                </v-chip>
                            </template>
                        </v-select>
                    </template>
                    <template v-slot:item.frequency="{ item }">
                        <v-select
                            v-model="item.frequency"
                            :items="frequency_options"
                            :rules="rules.frequency"
                            required
                            multiple
                        ></v-select>
                    </template>
                    <template v-slot:item.waveform="{ item }">
                        <v-select
                            v-model="item.waveform"
                            :items="waveform_options"
                            :rules="rules.waveform"
                            required
                        ></v-select>
                    </template>
                    <template v-slot:item.upload="{ item }">
                        <v-file-input
                            v-model="item.file"
                            @change="onChange($event, item)"
                            :rules="rules.file"
                            accept="audio/mp3, audio/wav"
                            class="ma-0 pa-0"
                            prepend-icon="mdi-cloud-upload"
                            hide-input
                        ></v-file-input>
                    </template>
                    <template v-slot:item.sound="{ item }">
                        <v-btn @click="playAudio(item)" icon>
                            <v-icon>mdi-volume-high</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:item.delete="{ item }">
                        <v-btn @click="deleteAudioData(item)" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
                <v-dialog v-model="dialog.body" max-width="800" persistent>
                    <v-card>
                        <v-card-title>{{ dialog.title }}</v-card-title>
                        <v-card-text>
                            <v-combobox
                                v-model="dialog.items"
                                label="輸入完按Enter鍵插入"
                                multiple
                                small-chips
                            ></v-combobox>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog.body = false" color="blue darken-1" text>離開</v-btn>
                            <v-btn @click="addOption" color="red darken-1" text>插入</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-list-item-content>
        </v-list-item>
        <v-dialog v-model="alert.dialog" width="600">
            <v-card>
                <v-card-title>{{alert.title}}</v-card-title>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import audio_format from "@/assets/json/audio_format.json";
import { apiManageAudio, apiPostAudio } from "@/js/api";

export default {
    props: ["passdata"],
    data() {
        return {
            dialog: {
                body: false,
                items: [],
                title: "新增類別",
                type: "category",
            },
            hello: "world",
            audio: [],
            audio_header: [
                {
                    text: "名稱",
                    align: "start",
                    value: "name",
                },
                { text: "代號", value: "audio_id" },
                { text: "分類", value: "category" },
                { text: "頻率", value: "frequency" },
                { text: "波形", value: "waveform" },
                { text: "上傳", value: "upload", sortable: false },
                { text: "聲音", value: "sound", sortable: false },
                { text: "刪除", value: "delete", sortable: false },
            ],
            category_options: [],
            frequency_options: [],
            waveform_options: [],
            colors: [],
            audio_player: new Audio(),
            // audio_data_table: {

            // }
            alert: {
                dialog: false,
                title: "",
            },
            rules: {
                name: [
                    (v) => !!v || "必填!",
                    (v) => (v && v.length <= 8) || "最大8個字",
                ],
                id: [
                    (v) => !!v || "必填!",
                    (v) => (v && v.length <= 12) || "最大12個字",
                ],
                category: [(v) => v.length >= 1 || "至少一種"],
                frequency: [(v) => v.length >= 1 || "至少一種"],
                waveform: [(v) => !!v || "必填!"],
                file: [
                    (v) => !v || v.size < 2000000 || "檔案大小必須小於2MB",
                    (v) => !v || v.size > 0 || "需要有聲音檔",
                ],
            },
        };
    },
    async mounted() {
        console.log("Audio edit Page run");
        // console.log(this.passdata);
        if (this.passdata.audio == null) this.$router.back();
        // console.log(this.passdata.audio == null);
        if (this.passdata.audio.id.length > 0) await this.getAudioData();
        await this.getAudioFormat();
        this.setCategoryColor();
        if (this.passdata.audio.id.length <= 0) this.addAudioData();
    },
    methods: {
        test(item) {
            console.log(item);
        },
        setCategoryColor() {
            var app = this;
            for (let index = 0; index < this.category_options.length; index++) {
                var r = Math.round(Math.random() * 255);
                var g = Math.round(Math.random() * 255);
                var b = Math.round(Math.random() * 255);

                var color = `rgba(${r}, ${g}, ${b}, 0.5)`;
                app.colors.push(color);
            }
        },
        getAudioData() {
            return apiManageAudio({
                type: "get",
                amount: "part",
                items: this.passdata.audio.id,
            })
                .then((res) => {
                    console.log(res.data);
                    this.audio = res.data;
                    this.audio.forEach((item) => {
                        item.category = item.category.split(";");
                        item.frequency = item.frequency.split(";");
                    });
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getAudioFormat() {
            this.frequency_options = audio_format.frequency;
            this.waveform_options = audio_format.waveform;
            this.category_options = audio_format.category;
        },
        getColor(category) {
            var index = this.category_options.indexOf(category);
            return this.colors[index];
        },
        addCategoryAsk() {
            this.dialog.title = "新增類別";
            this.dialog.type = "category";
            this.dialog.body = true;
        },
        addFrequencyAsk() {
            this.dialog.title = "新增頻率";
            this.dialog.type = "frequency";
            this.dialog.body = true;
        },
        addWaveformAsk() {
            this.dialog.title = "新增波形";
            this.dialog.type = "waveform";
            this.dialog.body = true;
        },
        addOption() {
            switch (this.dialog.type) {
                case "category":
                    var new_arr = this.dialog.items.filter((item) => {
                        return this.category_options.indexOf(item) < 0;
                    });
                    this.category_options.push(...new_arr);
                    break;
                case "frequency":
                    var new_arr = this.dialog.items.filter((item) => {
                        return this.frequency_options.indexOf(item) < 0;
                    });
                    this.frequency_options.push(...new_arr);
                    break;
                case "waveform":
                    var new_arr = this.dialog.items.filter((item) => {
                        return this.waveform_options.indexOf(item) < 0;
                    });
                    this.waveform_options.push(...new_arr);
                    break;
                default:
                    break;
            }
            this.dialog.items = [];
            this.dialog.body = false;
        },
        onChange: function (event, item) {
            console.log(event);
            if (event != undefined) {
                var reader = new FileReader();
                var app = this;
                reader.onload = function (event) {
                    console.log(event);
                    item.sound_src = event.target.result;
                };
                reader.readAsDataURL(event);
            }
        },
        playAudio(item) {
            console.log(item.sound_src);
            if (item.sound_src != undefined && item.sound_src != null) {
                this.audio_player.src = item.sound_src;
                this.audio_player.play();
            }
        },
        saveAudioData() {
            var formData = new FormData();
            this.audio.forEach((audio) => {
                formData.append("file[]", audio.file);
            });
            // formData.append("file", this.audio[0].file);
            console.log(formData);
            console.log("audio", this.audio);
            apiPostAudio(formData, { type: "upload" }).then((res) => {
                console.log(res.data);
            });
        },
        addAudioData() {
            var emptydata = {
                id: "-1",
                audio_id: "",
                category: [],
                created_time: "",
                frequency: [],
                name: "",
                pic_src: "",
                sound_src: "",
                waveform: "",
            };

            this.audio.splice(0, 0, emptydata);
        },
        deleteAudioData(item) {
            this.audio.splice(this.audio.indexOf(item), 1);
        },
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
