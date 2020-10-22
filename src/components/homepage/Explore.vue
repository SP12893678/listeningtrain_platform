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
                    :single-expand="singleExpand"
                    :expanded.sync="expanded"
                    show-expand
                    multi-sort
                >
                    <template v-slot:expanded-item="{ headers }">
                        <td :colspan="headers.length">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>環境音</th>
                                            <th>聆聽次數</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="explore in explore"
                                            :key="explore.name"
                                        >
                                            <td>{{ explore.name }}</td>
                                            <td>{{ explore.account }}</td>
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
export default {
    data() {
        return {
            expanded: [],
            singleExpand: false,
            search: null,
            explore_header: [
                {
                    text: "情境",
                    align: "start",
                    value: "name",
                },
                { text: "探索情境音總次數", value: "account" },
                { text: "探索情境次數", value: "mail" },
            ],
            explore: [
                {
                    name: "動物",
                    account: 59,
                    mail: 6.0,
                },
                {
                    name: "廚房",
                    account: 14,
                    mail: 4,
                },
                {
                    name: "廁所",
                    account: 79,
                    mail: 2,
                },
            ],
        };
    },
    mounted() {
        console.log("explore Page run");
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
