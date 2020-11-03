<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >練習模式紀錄</v-list-item-title
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
                    :headers="practice_header"
                    :items="practice"
                    :search="search"
                    multi-sort
                    class="elevation-1"
                >
                    <!-- <template v-slot:item.firstCorrect="{ item }">
                        <v-card-text >
                            {{ getFirstCount(item.questions) }}</v-card-text
                        >
                    </template> -->
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
            ans: 0,
            practice_header: [
                {
                    text: "情境",
                    align: "start",
                    value: "enviro",
                },
                { text: "音頻練習題數", value: "questions_num" },
                { text: "答對題數", value: "Correct" },
                { text: "第一次就答對的題數", value: "firstCorrect" },
                { text: "練習日期", value: "time" },
            ],
            practice: [],
        };
    },
    computed: {
        getFirstCount(questions) {
            // return this.practice.filter((item) => {});
            return 1;
        },
    },
    mounted() {
        console.log("practice Page run");
        apiManageLearning({ type: "get" }).then((res) => {
            res.data.practice = JSON.parse(res.data.practice);
            console.log(res.data.practice.practice);

            this.practice = res.data.practice.practice;
        });
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>

