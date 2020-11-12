<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >學習狀況總覽</v-list-item-title
                >
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-------------------------------------探索模式---------------------------------------------->
        <v-list-item> 探索模式 </v-list-item>
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-data-table
                    :headers="explore_header"
                    :items="explore"
                    multi-sort
                    class="elevation-1"
                    dense
                >
                    <template v-slot:item.envirotime="{ item }">
                        {{ envirotime(item) }}
                    </template>
                    <template v-slot:item.objecttime="{ item }">
                        {{ objecttime(item) }}
                    </template>
                </v-data-table>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-------------------------------------練習模式---------------------------------------------->
        <v-list-item> 練習模式 </v-list-item>
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-data-table
                    :headers="practice_header"
                    :items="practice"
                    item-key="name"
                    multi-sort
                    class="elevation-1"
                    dense
                >
                    <template v-slot:item.time="{ item }">
                        {{ practicetime(item) }}
                    </template>
                    <template v-slot:item.que="{ item }">
                        {{ practiceque(item) }}
                    </template>
                    <template v-slot:item.firstans="{ item }">
                        {{ practicefirstans(item) }}
                    </template>
                </v-data-table>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-------------------------------------測驗模式---------------------------------------------->
        <v-list-item> 測驗模式 </v-list-item>
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-data-table
                    :headers="test_header"
                    :items="test"
                    item-key="name"
                    multi-sort
                    class="elevation-1"
                    dense
                >
                    <template v-slot:item.time="{ item }">
                        {{ testtime(item) }}
                    </template>
                    <template v-slot:item.que="{ item }">
                        {{ testtime(item) * 10 }}
                    </template>
                    <template v-slot:item.ans="{ item }">
                        {{ testans(item) }}
                    </template>
                </v-data-table>
            </v-list-item-content>
        </v-list-item>
    </v-container>
</template>

<script>
import {
    apiManageLearning,
    apiManageEnviroment,
    apiManageObject,
} from "@/js/api";
export default {
    data() {
        return {
            explore_header: [
                {
                    text: "探索情境",
                    align: "start",
                    value: "name",
                },
                { text: "情境探索次數", value: "envirotime" },
                { text: "聆聽情境音次數", value: "objecttime" },
            ],
            explore: [],

            practice_header: [
                {
                    text: "練習情境",
                    align: "start",
                    value: "name",
                },
                { text: "情境練習次數", value: "time" },
                { text: "情境音練習題數", value: "que" },
                { text: "第一次就答對的題數", value: "firstans" },
            ],
            practice: [],

            test_header: [
                {
                    text: "測驗情境",
                    align: "start",
                    value: "name",
                },
                { text: "情境測驗次數", value: "time" },
                { text: "情境測驗總題數", value: "que" },
                { text: "情境總答對題數", value: "ans" },
            ],
            test: [],
            objects: [],
            explore_record: [],
            practice_record: [],
            test_record: [],
        };
    },
    computed: {
        //explore function
        envirotime: function () {
            return function (item) {
                var record = this.explore_record;
                var count = 0;
                record.forEach((record) => {
                    if (record.enviro == item.id) {
                        count++;
                    }
                });

                return count;
            };
        },
        objecttime: function () {
            return function (item) {
                var record = this.explore_record;
                var count = 0;
                record.forEach((record) => {
                    record.items.forEach((record2) => {
                        if (item.object.indexOf(record2.id) != -1) {
                            count++;
                        }
                    });
                });
                return count;
            };
        },
        //practice function
        practicetime: function () {
            return function (item) {
                var record = this.practice_record;
                var count = 0;
                record.forEach((record) => {
                    if (record.enviro == item.name) {
                        count++;
                    }
                });
                return count;
            };
        },
        practiceque: function () {
            return function (item) {
                var record = this.practice_record;
                var count = 0;
                record.forEach((record) => {
                    if (record.enviro == item.name) {
                        count += record.questions_num;
                    }
                });
                return count;
            };
        },
        practicefirstans: function () {
            return function (item) {
                var record = this.practice_record;
                var count = 0;
                record.forEach((record) => {
                    if (record.enviro == item.name) {
                        count += record.firstCorrect;
                    }
                });
                return count;
            };
        },
        //test function
        testtime: function () {
            return function (item) {
                var record = this.test_record;
                var count = 0;
                record.forEach((record) => {
                    if (record.enviro_id == item.id) {
                        count++;
                    }
                });

                return count;
            };
        },
        testans: function () {
            return function (item) {
                var record = this.test_record;
                var count = 0;
                record.forEach((record) => {
                    if (record.enviro_id == item.id) {
                        count += record.accuracy.your;
                    }
                });
                return count;
            };
        },
    },
    mounted() {
        console.log("learning Page run");
        apiManageLearning({ type: "get" }).then((res) => {
            res.data.train = JSON.parse(res.data.train);
            res.data.practice = JSON.parse(res.data.practice);
            res.data.test = JSON.parse(res.data.test);
            this.explore_record = res.data.train.train;
            this.practice_record = res.data.practice.practice;
            this.test_record = res.data.test.test;
        });

        apiManageEnviroment({ type: "get", amount: "all" })
            .then((res) => {
                console.log("enviro data", res.data);
                this.explore = res.data;
                this.practice = res.data;
                this.test = res.data;
            })
            .catch((error) => {
                console.error(error);
            });

        apiManageObject({ type: "get", amount: "all" })
            .then((res) => {
                this.objects = res.data;
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>

