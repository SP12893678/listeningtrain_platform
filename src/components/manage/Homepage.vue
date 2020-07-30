<template>
    <v-container fluid fill-height>
        <v-row justify="center" align-self="center">
            <v-col md="auto">
                <v-row justify="center" align-self="center">
                    <v-img max-width="360" :src="require('@/assets/images/headphones.png')"></v-img>
                </v-row>
                <v-row justify="center" align-self="center">
                    <v-card-title class="jf-title">情境式環境音管理平台首頁</v-card-title>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        console.log('Home Page run')
    },
}
</script>

<style scoped>
.jf-title {
    font-size: 36px;
}
</style>
