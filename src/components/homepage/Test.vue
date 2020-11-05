<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >測驗模式紀錄</v-list-item-title
                >
            </v-list-item-content>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-data-table
                    :headers="test_header"
                    :items="test"
                    :search="search"
                    multi-sort
                    class="elevation-1"
                >
                </v-data-table>
            </v-list-item-content>
        </v-list-item>
    </v-container>
</template>

<script>
import { apiManageLearning } from "@/js/api";
export default {
    data() {
        return {
            search: null,
            test_header: [
                {
                    text: "情境",
                    align: "start",
                    value: "enviro_name",
                },
                { text: "作答時間(秒)", value: "usetime" },
                { text: "答對題數(共10題)", value: "accuracy.your" },
                { text: "測驗日期", value: "time" },
            ],
            test: [],
        };
    },
    mounted() {
        console.log("test Page run");
        apiManageLearning({ type: "get" }).then((res) => {
            res.data.test = JSON.parse(res.data.test);
            console.log(res.data.test.test);
            // res.data.test.test.forEach(
            //     (tests) => (tests.enviro_id = tests.enviro_id.split(","))
            // );
            this.test = res.data.test.test;
        });
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
