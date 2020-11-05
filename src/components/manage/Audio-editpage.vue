<template>
    <v-container fluid>
        <!--聲音資源標題 & 新增資料類別;頻率;波形/儲存按鈕 -->
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >聲音資源編輯</v-list-item-title
                >
            </v-list-item-content>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn
                    @click="addAudioData"
                    data-v-step="Audio-editpage-add"
                    text
                >
                    <v-icon left>mdi-playlist-plus</v-icon>新增一筆
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn
                    @click="addCategoryAsk"
                    color="green"
                    data-v-step="Audio-editpage-category"
                    text
                >
                    <v-icon left>mdi-shape-plus</v-icon>新增類別
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn
                    @click="addFrequencyAsk"
                    color="blue"
                    data-v-step="Audio-editpage-frequency"
                    text
                >
                    <v-icon left>mdi-chart-bell-curve</v-icon>新增頻率
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn
                    @click="addWaveformAsk"
                    color="purple"
                    data-v-step="Audio-editpage-waveform"
                    text
                >
                    <v-icon left>mdi-waveform</v-icon>新增波形
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn
                    @click="saveAudioData"
                    color="red"
                    data-v-step="Audio-editpage-save"
                    text
                >
                    <v-icon left>mdi-content-save</v-icon>儲存資源
                </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-form v-model="valid" lazy-validation ref="form">
            <v-list-item class="mt-4" two-line>
                <v-list-item-content>
                    <v-data-table
                        :headers="audio_header"
                        :items="audio"
                        item-key="index"
                        class="elevation-1"
                        data-v-step="Audio-editpage-audio-table"
                        multi-sort
                    >
                        <template v-slot:item.name="{ item }">
                            <v-text-field
                                v-model="item.name"
                                :rules="rules.name"
                                required
                                clearable
                            ></v-text-field>
                        </template>
                        <template v-slot:item.audio_id="{ item }">
                            <v-text-field
                                v-model="item.audio_id"
                                :rules="rules.id"
                                required
                                clearable
                            ></v-text-field>
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
                                <v-btn
                                    @click="dialog.body = false"
                                    color="blue darken-1"
                                    text
                                    >離開</v-btn
                                >
                                <v-btn
                                    @click="addOption"
                                    color="red darken-1"
                                    text
                                    >插入</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-list-item-content>
            </v-list-item>
        </v-form>
        <v-dialog v-model="alert.dialog" width="600">
            <v-card>
                <v-card-title>{{ alert.title }}</v-card-title>
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

        <v-tour :name="this.$route.name" :steps="steps"></v-tour>
    </v-container>
</template>

<script>
import audio_format from "@/assets/json/audio_format.json";
import { apiManageAudio, apiPostAudio, apiManageFile } from "@/js/api";

export default {
    props: ["passdata"],
    data() {
        return {
            valid: true,
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
                    (v) => (v && v.length <= 10) || "最大10個字",
                ],
                id: [
                    (v) => !!v || "必填!",
                    (v) => (v && v.length <= 20) || "最大20個字",
                ],
                category: [(v) => v.length >= 1 || "至少一種"],
                frequency: [(v) => v.length >= 1 || "至少一種"],
                waveform: [(v) => !!v || "必填!"],
                file: [
                    (v) => !v || v.size < 3000000 || "檔案大小必須小於3MB",
                    (v) => !v || v.size > 0 || "需要有聲音檔",
                ],
            },
            progress: {
                dialog: false,
                value: 0,
                text: "儲存進度流程",
            },
            stepper: {
                steps: [{ text: "上傳聲音檔" }, { text: "儲存聲音資料" }],
                progress: 0,
            },
            steps: [
                {
                    target: '[data-v-step="Audio-editpage-audio-table"]',
                    header: {
                        title: "聲音資源編輯資料表",
                    },
                    content: `將列出編輯的聲音資源資料表，可於表中查看並編輯各項內容和屬性，在最右側有刪除按鈕可取消該筆資料新增或編輯。`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Audio-editpage-add"]',
                    header: {
                        title: "新增一筆空白聲音資源",
                    },
                    content: `點選後將新增一筆空白資料的聲音資源於資料表中。`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Audio-editpage-category"]',
                    header: {
                        title: "新增聲音資源類別項目按鈕",
                    },
                    content: `點選此按鈕可增加新的類別，可用於資料編輯中。`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Audio-editpage-frequency"]',
                    header: {
                        title: "新增聲音資源頻率項目按鈕",
                    },
                    content: `點選此按鈕可增加新的頻率，可用於資料編輯中。`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Audio-editpage-waveform"]',
                    header: {
                        title: "新增聲音資源波形項目按鈕",
                    },
                    content: `點選此按鈕可增加新的波形，可用於資料編輯中。`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Audio-editpage-save"]',
                    header: {
                        title: "儲存聲音資源按鈕",
                    },
                    content: `編輯完聲音資源資料後，可點選此按鈕進行儲存。`,
                    params: {
                        enableScrolling: false,
                    },
                },
            ],
        };
    },
    async mounted() {
        if (this.passdata.audio == null) this.$router.back();
        if (this.passdata.audio.id.length > 0) await this.getAudioData();
        await this.getAudioFormat();
        this.setCategoryColor();
        if (this.passdata.audio.id.length <= 0) this.addAudioData();
    },
    methods: {
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
                    this.audio = res.data;
                    this.audio.forEach((item) => {
                        item.category = item.category.split(";");
                        item.frequency = item.frequency.split(";");
                    });
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
            let file = event;
            if (event != undefined) {
                var reader = new FileReader();
                var app = this;
                reader.onload = function (event) {
                    let audio_type = ["audio/mpeg", "audio/wav"];
                    if (audio_type.indexOf(file.type) == -1) return;
                    item.sound_src = event.target.result;
                };
                reader.readAsDataURL(event);
            }
        },
        playAudio(item) {
            if (item.sound_src != undefined && item.sound_src != null) {
                this.audio_player.src = item.sound_src;
                this.audio_player.play();
            }
        },
        isNeedFileUpload(files, upload_files) {
            this.audio.forEach((audio, index) => {
                if (audio.file != null && audio.file != undefined) {
                    upload_files.push({ index: index });
                    files.push(audio.file);
                }
            });
            return upload_files.length > 0;
        },
        async uploadFiles(files, data) {
            let formData = new FormData();
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
            await apiPostAudio(
                formData,
                { type: "upload", data: data },
                config.onUploadProgress
            ).then((res) => {
                res.data.forEach((item) => {
                    this.audio[item.index].sound_src = item.filename;
                    delete this.audio[item.index].file;
                });
            });
        },
        async saveAudioData() {
            /**檢查欄位是否都已填好 */
            if (!this.$refs.form.validate()) return;
            this.stepper.progress = 0;
            this.progress.dialog = true;

            /**確認需要上傳的檔案 & 上傳檔案*/
            let upload_files = [];
            let files = [];
            if (this.isNeedFileUpload(files, upload_files))
                await this.uploadFiles(files, upload_files);

            /**上傳聲音資料 */
            let saveAudio = new Promise((resolve, reject) => {
                this.stepper.progress = 1;
                let count = 0;
                this.audio.forEach((audio, index) => {
                    apiManageAudio({ type: "update", item: audio }).then(
                        (res) => {
                            if (res.data.result) audio.id = res.data.id;
                            if (++count >= this.audio.length) resolve();
                        }
                    );
                });
            });

            saveAudio.then(() => {
                this.stepper.progress = 2;
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
