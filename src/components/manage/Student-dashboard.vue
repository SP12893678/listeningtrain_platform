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
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-list-item-action class="ml-4 mb-0">
                <v-btn to="/student-edit" text>
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
        };
    },
    mounted() {
        console.log("Student dashboard Page run");
        apiManageUser({ type: "get" }).then((res) => {
            console.log(res.data);
            res.data.forEach((user) => (user.tags = user.tags.split(",")));
            this.users = res.data;
        });
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
