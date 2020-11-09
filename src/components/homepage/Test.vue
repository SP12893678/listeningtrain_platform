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
                    item-key="time"
                    multi-sort
                    class="elevation-1"
                    :expanded.sync="expanded"
                    show-expand
                >
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>題數</th>
                                            <th>正確答案</th>
                                            <th>你的答案</th>
                                            <th>單題作答時間</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(items,
                                            index) in item.questions"
                                            :key="index"
                                        >
                                            <td>{{ index + 1 }}</td>

                                            <td>
                                                {{ translate(items.object_id) }}
                                            </td>
                                            <td>
                                                {{
                                                    translate(
                                                        items.your_answer_id
                                                    )
                                                }}
                                            </td>
                                            <td>{{ items.times }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </td>
                    </template>
                </v-data-table>
            </v-list-item-content>
        </v-list-item>
    </v-container>
</template>

<script>
import { apiManageLearning, apiManageObject } from "@/js/api";
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
            objects: [],
            expanded: [],
        };
    },
    computed: {
        translate: function () {
            return function (item) {
                var object = this.objects;
                var ch = "放棄測驗";
                object.forEach((object) => {
                    if (object.id == item) {
                        ch = object.name;
                    }
                });
                return ch;
            };
        },
    },
    mounted() {
        console.log("test Page run");
        apiManageLearning({ type: "get" }).then((res) => {
            res.data.test = JSON.parse(res.data.test);
            console.log(res.data.test.test);
            this.test = res.data.test.test;
        });
        apiManageObject({ type: "get", amount: "all" })
            .then((res) => {
                this.objects = res.data;
                console.log("Object", this.objects);
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
