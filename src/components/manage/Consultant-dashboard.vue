<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2">客服諮詢列表</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
    </v-container>
</template>

<script>
/*
 * 客服諮詢資料表
 * ID|account|諮詢內容(Json格式)|時間
 * "諮詢內容" -> {}
 *  "account"
 *  "title""
 *  "description"
 *  "files" -> []
 *  "ask_time"
 *  "check_time"
 * "訊息回復" -> [{}]
 *  "account"
 *  "content"
 *  "files" -> []
 *  "time"
 */
export default {}
</script>
 
<style scoped>
.jf-title {
    font-size: 32px;
}
</style>

