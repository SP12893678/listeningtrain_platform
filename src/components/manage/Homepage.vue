<template>
    <v-container fluid fill-height>
        <v-row justify="center" align-self="center">
            <v-col md="auto">
                <v-row justify="center" align-self="center">
                    <v-img
                        max-width="360"
                        :src="require('@/assets/images/headphones.png')"
                    ></v-img>
                </v-row>
                <v-row justify="center" align-self="center">
                    <v-card-title class="jf-title"
                        >情境式環境音管理平台首頁</v-card-title
                    >
                </v-row>
            </v-col>
        </v-row>
        <v-dialog v-model="alert_dialog.dialog" max-width="400" persistent>
            <v-card>
                <v-card-title>{{ alert_dialog.title }}</v-card-title>
                <v-card-text>{{ alert_dialog.text }}</v-card-text>
                <v-card-actions>
                    <v-btn
                        v-if="!alert_dialog.direct"
                        @click="alert_dialog.dialog = false"
                        text
                        block
                    >
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon
                        >確定
                    </v-btn>
                    <v-btn
                        v-if="alert_dialog.direct"
                        @click="goToIndexPage"
                        text
                        block
                    >
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon
                        >確定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { checkPermission, isLogin, identity } from "@/js/manage/permissions";

export default {
    props: ["passdata"],
    data() {
        return {
            alert_dialog: {
                dialog: false,
                title: "Title",
                text: "text",
                direct: false,
            },
        };
    },
    async mounted() {
        if (this.alert_dialog.dialog) return;
        await checkPermission();
        let permissions = this.$route.meta.permissions.indexOf(identity) != -1;
        if (!isLogin) this.showMsg("尚未登入", "如欲使用功能，請先登入", true);
        else if (!permissions)
            this.showMsg("無訪問權限", "很抱歉，你沒有訪問權限", false);
    },
    methods: {
        showMsg(title, text, direct) {
            this.alert_dialog.direct = direct;
            this.alert_dialog.title = title;
            this.alert_dialog.text = text;
            this.alert_dialog.dialog = true;
        },
        goToIndexPage() {
            window.location.href = "./index.html";
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (vm.passdata.title != null) {
                let { title, text } = vm.passdata;
                vm.showMsg(title, text);
            }
        });
    },
    beforeRouteUpdate(to, from, next) {
        if (this.passdata.title != null) {
            let { title, text } = this.passdata;
            this.showMsg(title, text);
        }
        next();
    },
    async beforeRouteLeave(to, from, next) {
        if (to.meta.permissions == null) {
            next();
            return;
        }
        await checkPermission();
        let permissions = to.meta.permissions.indexOf(identity) != -1;
        if (!isLogin) this.showMsg("尚未登入", "如欲使用功能，請先登入", true);
        else if (!permissions)
            this.showMsg("無訪問權限", "很抱歉，你沒有訪問權限", false);
        else next();
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 36px;
}
</style>
