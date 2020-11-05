<template>
    <v-container fluid fill-height>
        <v-row justify="center" align-self="center">
            <v-col md="auto">
                <v-row justify="center" align-self="center">
                    <v-img
                        max-width="360"
                        :src="require('@/assets/images/404-error.png')"
                    ></v-img>
                </v-row>
                <v-row justify="center" align-self="center">
                    <v-card-title class="jf-title">404 Error</v-card-title>
                </v-row>
                <v-row justify="center" align-self="center">
                    <v-btn to="./" outlined>返回首頁</v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.jf-title {
    font-size: 36px;
}
</style>