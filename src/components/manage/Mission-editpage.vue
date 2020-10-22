<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2">
                    任務系統編輯
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="ml-4 mb-0">
                <v-btn @click="openNewMissionDialog" text>
                    <v-icon left>mdi-book-plus-multiple</v-icon>新增
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-4 mb-0">
                <v-btn
                    @click="saveMission"
                    :loading="save_loading"
                    color="red"
                    text
                >
                    <v-icon left>mdi-content-save</v-icon>儲存
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>

        <v-data-table
            :headers="mission_headers"
            :items="missions"
            item-key="title"
        >
            <template v-slot:[`item.action`]="{ item }">
                <v-btn @click="openEditMissionDialog(item)" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deleteMission(item)" icon>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <v-dialog v-model="missionEditArea.dialog" width="800">
            <v-card>
                <v-tabs v-model="missionEditArea.tab" grow>
                    <v-tab>基本設定</v-tab>
                    <v-tab>任務需求</v-tab>
                    <v-tab>任務獎勵</v-tab>
                </v-tabs>
                <v-tabs-items v-model="missionEditArea.tab">
                    <v-tab-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-select
                                    v-model="mission.type"
                                    :items="missionEditArea.missionType"
                                    label="任務類型"
                                ></v-select>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-text-field
                                    v-model="mission.title"
                                    label="任務標題"
                                ></v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-textarea
                                    v-model="mission.description"
                                    label="任務敘述"
                                ></v-textarea>
                            </v-list-item-content>
                        </v-list-item>
                    </v-tab-item>
                    <v-tab-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-select
                                    v-model="mission.required.mode"
                                    :items="missionRule.type"
                                    item-text="name"
                                    return-object
                                    label="模式類型"
                                ></v-select>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-select
                                    v-model="mission.required.counter"
                                    :items="missionRule.counter"
                                    item-text="name"
                                    return-object
                                    label="計算類型"
                                ></v-select>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="mission.required.mode != null">
                            <v-list-item-content>
                                <v-select
                                    v-model="mission.required.action"
                                    :items="
                                        missionRule[mission.required.mode.id]
                                            .action
                                    "
                                    item-text="name"
                                    label="動作類型"
                                ></v-select>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-text-field
                                    v-model="mission.required.times"
                                    label="次數 | 百分比(0-100)"
                                ></v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-row>
                                    <v-col cols="3">
                                        <v-switch
                                            v-model="
                                                missionEditArea.enviro.switch
                                            "
                                            @change="toogleEnviroRequest"
                                            label="特定情境"
                                            class="pt-0 mt-2"
                                            color="red"
                                        ></v-switch
                                    ></v-col>
                                    <v-col cols="2">
                                        <v-btn
                                            :disabled="
                                                !missionEditArea.enviro.switch
                                            "
                                            @click="
                                                missionEditArea.enviro.dialog = true
                                            "
                                            >選擇情境</v-btn
                                        ></v-col
                                    >
                                    <v-col cols="7">
                                        <v-text-field
                                            :value="
                                                mission.required.enviro != null
                                                    ? `名稱:${mission.required.enviro.name} | ID:${mission.required.enviro.id}`
                                                    : '尚未選擇'
                                            "
                                            label="選擇情境"
                                            class="pt-0 mt-0"
                                            readonly
                                        ></v-text-field
                                    ></v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-row>
                                    <v-col cols="3">
                                        <v-switch
                                            v-model="
                                                missionEditArea.object.switch
                                            "
                                            :disabled="
                                                !missionEditArea.enviro
                                                    .switch ||
                                                mission.required.enviro == null
                                            "
                                            @change="toogleEnviroRequest"
                                            label="特定物件"
                                            class="pt-0 mt-2"
                                            color="info"
                                        ></v-switch
                                    ></v-col>
                                    <v-col cols="2">
                                        <v-btn
                                            :disabled="
                                                !missionEditArea.object.switch
                                            "
                                            @click="
                                                missionEditArea.object.dialog = true
                                            "
                                            >選擇物件</v-btn
                                        ></v-col
                                    >
                                    <v-col cols="7">
                                        <v-text-field
                                            :value="
                                                mission.required.object != null
                                                    ? `名稱:${mission.required.object.name} | ID:${mission.required.object.id}`
                                                    : '尚未選擇'
                                            "
                                            label="選擇物件"
                                            class="pt-0 mt-0"
                                            readonly
                                        ></v-text-field
                                    ></v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-tab-item>
                    <v-tab-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-btn color="orange" outlined
                                    >新增金幣獎勵</v-btn
                                >
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-btn color="purple" outlined
                                    >新增物品獎勵</v-btn
                                >
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <!-- <v-data-table
                                    :headers="headers"
                                   
                                >
                                </v-data-table>  -->
                            </v-list-item-content></v-list-item
                        >
                    </v-tab-item>
                </v-tabs-items>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="missionEditArea.dialog = false"
                        color="red"
                        outlined
                        >取消</v-btn
                    >
                    <v-btn
                        v-if="missionEditArea.type == 'new'"
                        @click="newMission"
                        outlined
                        >確定新增</v-btn
                    >
                    <v-btn
                        v-if="missionEditArea.type == 'edit'"
                        @click="editMission"
                        outlined
                        >確定儲存</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="missionEditArea.enviro.dialog">
            <v-card>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="jf-title pa-2"
                            >情境教材</v-list-item-title
                        >
                    </v-list-item-content>
                    <v-text-field
                        v-model="enviro_cards.search"
                        append-icon="mdi-magnify"
                        label="情境教材搜尋"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <!--情境教材列表分頁欄-->
                        <v-pagination
                            v-model="enviro_cards.page"
                            :length="getPaginationPages"
                            data-v-step="Enviroment-dashboard-pagination"
                            prev-icon="mdi-menu-left"
                            next-icon="mdi-menu-right"
                        ></v-pagination>
                        <v-card
                            v-for="(enviro, index) in getEnviroCards"
                            :key="enviro.name + index"
                            class="ma-4"
                            max-width="250"
                        >
                            <v-img
                                :src="enviro.background_src"
                                height="150"
                            ></v-img>
                            <v-card-title>
                                {{ enviro.name }}
                                <v-spacer></v-spacer>
                                <v-chip
                                    class="ma-0"
                                    color="orange"
                                    outlined
                                    small
                                >
                                    <v-icon left
                                        >mdi-format-list-bulleted-type</v-icon
                                    >
                                    {{ enviro.category }}
                                </v-chip>
                            </v-card-title>
                            <v-card-subtitle class="pb-1">{{
                                enviro.created_time
                            }}</v-card-subtitle>
                            <v-card-actions>
                                <v-btn
                                    @click="selectEnviro(index)"
                                    color="blue"
                                    outlined
                                    rounded
                                    block
                                >
                                    選擇
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-dialog>

        <v-dialog v-model="missionEditArea.object.dialog">
            <v-card>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="jf-title pa-2">{{
                            `情境物件`
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-card
                            v-for="(object, index) in objects"
                            :key="object.name + index"
                            class="ma-4"
                            max-width="120"
                        >
                            <v-img
                                :src="object.pic_src"
                                height="120"
                                contain
                            ></v-img>
                            <v-card-title>
                                {{ object.name }}
                            </v-card-title>
                            <v-card-actions>
                                <v-btn
                                    @click="selectObject(index)"
                                    color="blue"
                                    outlined
                                    rounded
                                    block
                                >
                                    選擇
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-dialog>

        <!--消息提醒條 -->
        <v-snackbar v-model="snackbar.body" :timeout="snackbar.timeout">
            {{ snackbar.text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    v-bind="attrs"
                    @click="snackbar.body = false"
                    color="blue"
                    text
                    >Close</v-btn
                >
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import {
    apiManageEnviroment,
    apiManageObject,
    apiManageMission,
} from "@/js/api";
export default {
    props: ["passdata"],
    data() {
        return {
            save_loading: false,
            enviro_cards: {
                search: "",
                loading: true,
                page: 1,
                delete_dialog: false,
                delete_id: null,
            },
            enviros: [],
            objects: [],
            missionEditArea: {
                index: -1,
                type: "new",
                dialog: false,
                tab: 0,
                missionType: ["每日任務", "成長任務"],
                enviro: {
                    switch: false,
                    dialog: false,
                },
                object: {
                    switch: false,
                    dialog: false,
                },
                reward_header: [
                    { text: "種類", align: "start", value: "type" },
                    { text: "物品", value: "category" },
                ],
            },
            missionRule: {
                type: [
                    { id: "train", name: "訓練模式" },
                    { id: "practice", name: "練習模式" },
                    { id: "test", name: "測驗模式" },
                ],
                counter: [
                    { id: "once", name: "單次" },
                    { id: "total", name: "累計" },
                ],
                train: {
                    action: [{ id: "listen", name: "聆聽次數" }],
                },
                practice: {
                    action: [{ id: "correct-times", name: "正確次數" }],
                },
                test: {
                    action: [
                        { id: "play", name: "遊玩次數" },
                        { id: "correct-rate", name: "正確率" },
                    ],
                },
            },
            mission: {
                type: null,
                title: null,
                description: null,
                required: {
                    mode: null,
                    counter: null,
                    action: null,
                    times: null,
                    enviro: null,
                    object: null,
                },
                rewards: [{ type: "money", value: "100" }],
            },
            missions: [],
            mission_headers: [
                { text: "名稱", align: "start", value: "title" },
                { text: "敘述", value: "description" },
                { text: "類型", value: "type" },
                {
                    text: "動作",
                    value: "action",
                    sortable: false,
                    align: "right",
                },
            ],
            snackbar: { body: false, text: null, timeout: 2000 },
        };
    },
    async mounted() {
        console.log(this.passdata);
        if (this.passdata.mission == null) this.$router.back();
        if (this.passdata.mission.id.length > 0) await this.getMissionData();
        // setInterval(() => {
        //     console.log(this.mission.mode);
        // }, 1000);
        this.getEnviroData();
    },
    computed: {
        /**取得符合條件(搜尋條件 & 當前分頁)的情境教材物件 */
        getEnviroCards() {
            var app = this;
            var tmp = this.enviros.filter((item) => {
                return (
                    item.name.indexOf(app.enviro_cards.search) >= 0 ||
                    item.category.indexOf(app.enviro_cards.search) >= 0 ||
                    item.created_time.indexOf(app.enviro_cards.search) >= 0
                );
            });
            return tmp.filter((item, index) => {
                return (
                    index < 10 * app.enviro_cards.page &&
                    index >= 10 * (app.enviro_cards.page - 1)
                );
            });
        },
        /**取得分頁數量(每頁情境數量以10為限) */
        getPaginationPages() {
            var app = this;
            var tmp = this.enviros.filter((item) => {
                return (
                    item.name.indexOf(app.enviro_cards.search) >= 0 ||
                    item.category.indexOf(app.enviro_cards.search) >= 0 ||
                    item.created_time.indexOf(app.enviro_cards.search) >= 0
                );
            });
            return Math.ceil(tmp.length / 10);
        },
    },
    methods: {
        /**請求後端並取得情境教材
         * @async
         */
        getEnviroData() {
            return apiManageEnviroment({ type: "get", amount: "all" })
                .then((res) => {
                    console.log("enviro data", res.data);
                    this.enviros = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**請求後端並取得情境物件
         * @async
         */
        getObjectData() {
            let object_arr = this.mission.required.enviro.object.split(",");
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
        getMissionData() {
            return apiManageMission({
                type: "get",
                amount: "part",
                items: this.passdata.mission.id,
            })
                .then((res) => {
                    console.log(res.data);
                    this.missions = res.data;
                    this.missions.forEach((mission) => {
                        mission.required = JSON.parse(mission.required);
                        mission.rewards = JSON.parse(mission.rewards);
                        if (mission.required.enviro != null) {
                            apiManageEnviroment({
                                type: "get",
                                amount: "one",
                                item: mission.required.enviro,
                            })
                                .then((res) => {
                                    console.log("enviro data", res.data);
                                    mission.required.enviro = res.data;
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                        if (mission.required.object != null) {
                            apiManageObject({
                                type: "get",
                                amount: "part",
                                items: [mission.required.object],
                            })
                                .then((res) => {
                                    console.log(res.data);
                                    mission.required.object = res.data[0];
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        newMission() {
            this.mission.id = -1;
            let item = {};
            Object.assign(item, this.mission);
            this.missions.push(item);
            this.missionEditArea.dialog = false;
        },
        editMission() {
            Object.assign(
                this.missions[this.missionEditArea.index],
                this.mission
            );
            this.missionEditArea.dialog = false;
        },
        deleteMission(mission) {
            this.missions.splice(this.missions.indexOf(mission), 1);
        },
        async selectEnviro(index) {
            this.mission.required.enviro = this.enviros[index];
            this.mission.required.object = null;

            await this.getObjectData();

            this.missionEditArea.enviro.dialog = false;
        },
        selectObject(index) {
            this.mission.required.object = this.objects[index];
            this.missionEditArea.object.dialog = false;
        },
        toogleEnviroRequest() {
            this.mission.required.enviro = this.missionEditArea.enviro.switch
                ? this.mission.required.enviro
                : null;
            if (!this.missionEditArea.enviro.switch) {
                this.missionEditArea.object.switch = false;
                this.mission.required.object = null;
            }
        },
        openNewMissionDialog() {
            this.missionEditArea.type = "new";
            this.missionEditArea.dialog = true;
        },
        openEditMissionDialog(mission) {
            console.log(mission);
            let item = {};
            Object.assign(item, mission);
            this.mission = item;
            this.missionEditArea.type = "edit";
            this.missionEditArea.index = this.missions.indexOf(mission);
            this.missionEditArea.enviro.switch =
                this.mission.required.enviro != null;
            this.missionEditArea.object.switch =
                this.mission.required.object != null;
            this.missionEditArea.dialog = true;
        },
        saveMission() {
            this.save_loading = true;
            console.log(this.missions);
            let missions = [];
            missions.push(...this.missions);

            let saveMission = new Promise((resolve, reject) => {
                let count = 0;
                missions.forEach((mission, index) => {
                    if (mission.required.enviro != null)
                        mission.required.enviro = mission.required.enviro.id;
                    if (mission.required.object != null)
                        mission.required.object = mission.required.object.id;
                    apiManageMission({ type: "update", item: mission }).then(
                        (res) => {
                            console.log(res.data);
                            if (res.data.result)
                                this.missions[index].id = res.data.id;
                            if (++count >= missions.length) resolve();
                        }
                    );
                });
            });

            saveMission.then(() => {
                this.save_loading = false;
                this.snackbar.text = "儲存成功";
                this.snackbar.body = true;
            });
        },
    },
};
</script>

<style>
</style>