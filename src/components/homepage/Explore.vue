<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >探索模式紀錄</v-list-item-title
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
                    :headers="explore_header"
                    :items="explore"
                    :search="search"
                    item-key="name"
                    :single-expand="false"
                    :expanded.sync="expanded"
                    show-expand
                    multi-sort
                >
                    <template v-slot:item.time="{ item }">
                        {{ envirotimes(item) }}
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-simple-table dark>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>情境音</th>
                                            <th>聆聽次數</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(items, index) in cutdate(
                                                item
                                            )"
                                            :key="index"
                                        >
                                            <td>
                                                {{ items.name }}
                                            </td>

                                            <td>{{ objecttimes(items) }}</td>
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
import {
    apiManageLearning,
    apiManageEnviroment,
    apiManageObject,
} from "@/js/api";

export default {
    data() {
        return {
            search: null,
            explore_header: [
                {
                    text: "探索情境",
                    align: "start",
                    value: "name",
                },
                { text: "探索情境次數", value: "time" },
            ],
            explore: [],
            objects: [],
            expanded: [],
            explore_record: [],
        };
    },
    computed: {
        cutdate: function () {
            return function (item) {
                return this.objects.filter(
                    (items) => item.object.indexOf(items.id) != -1
                );
            };
        },
        envirotimes: function () {
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
        objecttimes: function () {
            return function (items) {
                var record = this.explore_record;
                var count = 0;
                record.forEach((record) => {
                    record.items.forEach((record2) => {
                        if (record2.id == items.id) {
                            count++;
                        }
                    });
                });
                return count;
            };
        },
    },
    mounted() {
        console.log("explore Page run");
        apiManageLearning({ type: "get" }).then((res) => {
            res.data.train = JSON.parse(res.data.train);
            console.log(res.data.train.train);
            this.explore_record = res.data.train.train;
        });
        apiManageEnviroment({ type: "get", amount: "all" })
            .then((res) => {
                console.log("enviro data", res.data);
                this.explore = res.data;
                this.explore.forEach((explore) => {
                    explore.object = explore.object.split(",");
                });
            })
            .catch((error) => {
                console.error(error);
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
