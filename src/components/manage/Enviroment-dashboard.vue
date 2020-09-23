<template>
    <v-container fluid>
        <!--情境教材標題 & 搜尋欄 & 新增情境教材按鈕 -->
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2">情境教材</v-list-item-title>
            </v-list-item-content>
            <v-text-field
                v-model="enviro_cards.search"
                data-v-step="Enviroment-dashboard-search"
                append-icon="mdi-magnify"
                label="情境教材搜尋"
                single-line
                hide-details
            ></v-text-field>
            <v-list-item-action>
                <v-btn @click="test" data-v-step="Enviroment-dashboard-2">
                    <v-icon left>mdi-pencil-plus</v-icon>新增
                </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <!--情境教材列表-->
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <!--情境教材列表分頁欄-->
                <v-pagination
                    v-model="enviro_cards.page"
                    :length="getPaginationPages"
                    data-v-step="Enviroment-dashboard-pagination"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                ></v-pagination>

                <!--情境教材卡片骨架裝載器(模擬情境教材載入狀態)-->
                <v-card
                    v-if="enviro_cards.loading"
                    v-for="(item, index) in 3"
                    :key="index"
                    class="ma-4"
                    height="300"
                    width="300"
                    max-width="300"
                >
                    <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                </v-card>

                <!--情境教材卡片-->
                <v-hover
                    v-for="(item, index) in getEnviroCards"
                    :key="item.id + item.name"
                    v-slot:default="{ hover }"
                >
                    <v-card
                        v-if="!enviro_cards.loading"
                        :elevation="hover ? 10 : 2"
                        :ripple="{ class: 'white--text' }"
                        class="ma-4"
                        max-width="300"
                        :data-v-step="`Enviroment-dashboard-card-${index}`"
                    >
                        <v-img :src="item.background_src" height="180px"></v-img>
                        <v-card-title>
                            {{ item.name }}
                            <v-spacer></v-spacer>
                            <v-chip class="ma-0" color="orange" outlined small>
                                <v-icon left>mdi-format-list-bulleted-type</v-icon>
                                {{ item.category }}
                            </v-chip>
                        </v-card-title>
                        <v-card-subtitle class="pb-1">{{ item.created_time }}</v-card-subtitle>
                        <v-card-actions>
                            <v-btn @click.prevent="goToEditPage(item.id)" color="blue" text>
                                <v-icon left>mdi-image-edit</v-icon>編輯
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="enviro_cards.delete_dialog = true" color="red" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-list-item-content>
        </v-list-item>

        <!--情境教材刪除提示框 -->
        <v-dialog v-model="enviro_cards.delete_dialog" max-width="400">
            <v-card>
                <v-card-title class="headline">你確定要刪除此教材?</v-card-title>
                <v-card-text>如果確認刪除後，將無法在復原。</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="enviro_cards.delete_dialog = false" color="blue darken-1" text>否</v-btn>
                    <v-btn @click="enviro_cards.delete_dialog = false" color="red darken-1" text>是</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-tour :name="this.$route.name" :steps="steps"></v-tour>
    </v-container>
</template>

<script>
import { apiManageEnviroment } from "@/js/api";

export default {
    data() {
        return {
            enviro: [],
            enviro_cards: {
                search: "",
                loading: true,
                page: 1,
                delete_dialog: false,
            },
            steps: [
                {
                    target: '[data-v-step="Enviroment-dashboard-card-0"]',
                    header: {
                        title: "情境教材卡片",
                    },
                    content: `顯示該情境教材相關資訊，<br>另外可使用編輯和刪除按鈕對該情境教材進行操作`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Enviroment-dashboard-pagination"]',
                    header: {
                        title: "情境教材分頁欄",
                    },
                    content: ``,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Enviroment-dashboard-search"]',
                    header: {
                        title: "情境教材搜尋欄",
                    },
                    content: ``,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Enviroment-dashboard-2"]',
                    header: {
                        title: "幫助選單按鈕",
                    },
                    content:
                        "內有說明手冊、操作導覽、客服詢問功能，可幫助了解管理平台以及解決疑難雜症",
                    params: {
                        enableScrolling: false,
                    },
                },
            ],
        };
    },
    async mounted() {
        console.log(this.$route.name);
        await this.getEnviroData();

        /**模擬情境數量 */
        // for (let index = 0; index < 10; index++) {
        //     this.enviro.push(this.enviro[0])
        // }

        /**模擬載入狀態 */
        setTimeout(() => {
            this.enviro_cards.loading = false;
        }, 1500);
    },
    computed: {
        /**取得符合條件(搜尋條件 & 當前分頁)的情境教材物件 */
        getEnviroCards() {
            var app = this;
            var tmp = this.enviro.filter((item) => {
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
            var tmp = this.enviro.filter((item) => {
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
        test() {
            let data = [];
            for (let index = 0; index < 1; index++) {
                let obj = {
                    environ_id: 1,
                    questions: [
                        {
                            audio_id: 1,
                            your_answer: 1,
                            time: 300,
                        },
                        {
                            audio_id: 2,
                            your_answer: 5,
                            time: 300,
                        },
                        {
                            audio_id: 4,
                            your_answer: 3,
                            time: 300,
                        },
                        {
                            audio_id: 7,
                            your_answer: 2,
                            time: 300,
                        },
                        {
                            audio_id: 1,
                            your_answer: 1,
                            time: 300,
                        },
                    ],
                    accuracy: 50,
                    completion: 50,
                    reaction_rate: 50,
                    high_frequency_accuracy: 60,
                    low_frequency_accuracy: 60,
                };
                data.push(obj);
            }
            apiManageEnviroment({ type: "none", data: data }).then((res) => {
                console.log(res.data);
            });
        },
        /**前往該情境教材的編輯頁面 */
        goToEditPage(id) {
            var obj = { enviro: { id: id } };
            this.$emit("passdata", obj);
            this.$router.push("/enviroment-edit");
        },
        /**請求後端並取得情境教材
         * @async
         */
        getEnviroData() {
            return apiManageEnviroment({ type: "get", amount: "all" })
                .then((res) => {
                    console.log("enviro data", res.data);
                    this.enviro = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
