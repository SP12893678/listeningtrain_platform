<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2">
                    任務系統
                </v-list-item-title>
            </v-list-item-content>
            <v-text-field
                append-icon="mdi-magnify"
                label="任務搜尋"
                single-line
                hide-details
            ></v-text-field>
            <v-list-item-action class="ml-4 mb-0">
                <v-btn @click="goToEditPage" text>
                    <v-icon left>mdi-book-plus-multiple</v-icon>新增
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="mb-0">
                <v-btn @click.prevent="goToEditPage" color="blue" text>
                    <v-icon left>mdi-pencil</v-icon>編輯
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn color="red" text>
                    <v-icon left>mdi-delete</v-icon>刪除
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>

        <!--數據表 -->
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-skeleton-loader
                    :loading="mission_data_table.loading"
                    type="table"
                >
                    <v-data-table
                        v-model="mission_data_table.selected"
                        :headers="mission_data_table.header"
                        :items="missions"
                        :loading="mission_data_table.loading"
                        :search="mission_data_table.search"
                        item-key="title"
                        class="elevation-1"
                        loading-text
                        show-select
                        multi-sort
                        single-expand
                        show-expand
                    >
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                                More info about {{ `${JSON.stringify(item)}` }}
                            </td>
                        </template>
                    </v-data-table>
                </v-skeleton-loader>
            </v-list-item-content>
        </v-list-item>
    </v-container>
</template>

<script>
import {
    apiManageEnviroment,
    apiManageObject,
    apiManageMission,
} from "@/js/api";

export default {
    data() {
        return {
            mission_data_table: {
                header: [
                    { text: "名稱", align: "start", value: "title" },
                    { text: "敘述", value: "description" },
                    { text: "類型", value: "type" },
                    { text: "", value: "data-table-expand" },
                ],
                selected: [],
                search: "",
                loading: true,
            },
            missions: [],
        };
    },
    async mounted() {
        await this.getMissionData();
        setTimeout(() => {
            this.mission_data_table.loading = false;
        }, 1000);
    },
    methods: {
        getMissionData() {
            return apiManageMission({ type: "get", amount: "all" })
                .then((res) => {
                    this.missions = res.data;
                    // this.missions.push(...res.data)
                    // this.missions.push(...res.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        goToEditPage() {
            let selected_id = this.mission_data_table.selected.map(
                (mission) => mission.id
            );
            let obj = { mission: { id: selected_id } };
            this.$router.push({
                name: "mission-edit",
                params: { passdata: obj },
            });
        },
    },
};
</script>

<style>
.jf-title {
    font-size: 32px;
}
</style>