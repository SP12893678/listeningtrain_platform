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
export default {
    data() {
        return {
            search: null,
            test_header: [
                {
                    text: "情境",
                    align: "start",
                    value: "name",
                },
                { text: "作答時間", value: "account" },
                { text: "答對題數", value: "mail" },
                { text: "測驗日期", value: "tags" },
            ],
            test: [],
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
