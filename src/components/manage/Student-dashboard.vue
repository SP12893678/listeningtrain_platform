<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >學生帳戶</v-list-item-title
                >
            </v-list-item-content>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="學生帳戶搜尋欄"
                data-v-step="Student-dashboard-search"
                single-line
                hide-details
            ></v-text-field>
            <v-list-item-action class="ml-4 mb-0">
                <v-btn
                    to="/student-edit"
                    data-v-step="Student-dashboard-add"
                    text
                >
                    <v-icon left>mdi-account-plus</v-icon>新增
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-data-table
                    :headers="user_header"
                    :items="users"
                    :search="search"
                    multi-sort
                    data-v-step="Student-dashboard-student-table"
                    class="elevation-1"
                >
                    <template v-slot:item.tags="{ item }">
                        <v-chip
                            v-for="i in item.tags"
                            :key="i"
                            class="mr-2"
                            outlined
                            >{{ i }}</v-chip
                        >
                    </template>
                </v-data-table>
            </v-list-item-content>
        </v-list-item>

        <v-tour :name="this.$route.name" :steps="steps"></v-tour>
    </v-container>
</template>

<script>
import { apiManageUser } from "@/js/api";

export default {
    data() {
        return {
            search: null,
            users: [],
            user_header: [
                {
                    text: "名稱",
                    align: "start",
                    value: "name",
                },
                { text: "帳號", value: "account" },
                { text: "信箱", value: "mail" },
                { text: "標籤", value: "tags" },
                { text: "創建者", value: "creator" },
            ],
            steps: [
                {
                    target: '[data-v-step="Student-dashboard-student-table"]',
                    header: {
                        title: "學生帳戶資料表",
                    },
                    content: `將列出所擁有的學生帳戶資料表，可於表中查看各項內容和屬性，另外可於資料表標題欄點選該類別進行排序以便查看`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Student-dashboard-search"]',
                    header: {
                        title: "學生帳戶搜尋欄",
                    },
                    content: `透過輸入關鍵字將顯示與關鍵字相關的學生帳戶`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '[data-v-step="Student-dashboard-add"]',
                    header: {
                        title: "新增學生帳戶按鈕",
                    },
                    content: `點選此按鈕將進入學生帳戶編輯頁面。`,
                    params: {
                        enableScrolling: false,
                    },
                },
            ],
        };
    },
    async mounted() {
        await this.getStudentData();
    },
    methods: {
        getStudentData() {
            return apiManageUser({ type: "get" }).then((res) => {
                res.data.forEach((user) => (user.tags = user.tags.split(",")));
                this.users = res.data;
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
