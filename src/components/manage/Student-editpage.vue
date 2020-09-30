<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="jf-title pa-2"
                    >學生帳戶</v-list-item-title
                >
            </v-list-item-content>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="addOneUser" text>
                    <v-icon left>mdi-playlist-plus</v-icon>新增一筆
                </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-menu rounded="lg" offset-y>
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn color="green" text v-bind="attrs" v-on="on">
                            <v-icon>mdi-microsoft-excel</v-icon>Excel匯入
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item link @click="uploadFileClick">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-cloud-upload</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>檔案上傳</v-list-item-title>
                            <input
                                ref="uploader"
                                @change="onFileChanged"
                                type="file"
                                hidden
                            />
                        </v-list-item>
                        <v-list-item link @click="setting.dialog = true">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-cog</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>上傳設定</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item
                            :href="require('@/assets/xlsx/帳戶名單範例.xlsx')"
                            link
                            download
                        >
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-download</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>下載範例</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item-action>
            <v-list-item-action class="ml-0 mb-0">
                <v-btn @click="saveAccount" color="red" text>
                    <v-icon left>mdi-content-save</v-icon>儲存帳戶
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item two-line class="mt-4">
            <v-list-item-content>
                <v-data-table
                    :headers="user_header"
                    :items="users"
                    multi-sort
                    class="elevation-1"
                >
                    <template v-slot:item.name="{ item }">
                        <v-text-field
                            v-model="item.name"
                            :rules="rules.counter12"
                            clearable
                        ></v-text-field>
                    </template>
                    <template v-slot:item.account="{ item }">
                        <v-text-field
                            v-model="item.account"
                            :rules="rules.counter12"
                            clearable
                        ></v-text-field>
                    </template>
                    <template v-slot:item.password="{ item }">
                        <v-text-field
                            v-model="item.password"
                            :rules="rules.counter16"
                            :append-icon="
                                item.pwshow ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="item.pwshow = !item.pwshow"
                            :type="item.pwshow ? 'text' : 'password'"
                        ></v-text-field>
                    </template>
                    <template v-slot:item.email="{ item }">
                        <v-text-field
                            v-model="item.email"
                            :rules="rules.email"
                            clearable
                        ></v-text-field>
                    </template>
                    <template v-slot:item.tags="{ item }">
                        <v-combobox
                            v-model="item.tags"
                            label="輸入完按Enter鍵插入"
                            multiple
                            small-chips
                        ></v-combobox>
                    </template>
                    <template v-slot:item.delete="{ item }">
                        <v-btn @click="deleteOneUser(item)" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-list-item-content>
        </v-list-item>

        <v-dialog v-model="setting.dialog" max-width="800">
            <v-card>
                <v-card-title>上傳設定</v-card-title>
                <v-card-text>
                    <v-switch
                        v-model="setting.firstline"
                        label="Excel第一列選取"
                    ></v-switch>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="progress.dialog" max-width="600" persistent>
            <v-card>
                <v-card-title>執行進度</v-card-title>
                <v-progress-linear
                    :value="progress.value"
                    :buffer-value="progress.value"
                    color="deep-purple accent-4"
                    stream
                    rounded
                    height="6"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { apiManageExcel, apiManageUser } from "@/js/api";

export default {
    data() {
        return {
            progress: {
                dialog: false,
                value: 0,
            },
            search: null,
            file: null,
            setting: {
                dialog: false,
                firstline: true,
            },
            users: [],
            user_header: [
                {
                    text: "名稱",
                    align: "start",
                    value: "name",
                },
                { text: "帳號", value: "account" },
                { text: "密碼", value: "password", sortable: false },
                { text: "信箱", value: "email" },
                { text: "標籤", value: "tags" },
                { text: "刪除", value: "delete", sortable: false },
            ],
            rules: {
                must: [(v) => !!v || "必填!"],
                email: [
                    (v) => !!v || "必填!",
                    (v) => /.+@.+\..+/.test(v) || "不符合E-mail格式",
                    (v) => (v && v.length <= 30) || "最大30個字",
                ],
                counter12: [
                    (v) => !!v || "必填!",
                    (v) => (v && v.length <= 12) || "最大12個字",
                ],
                counter16: [
                    (v) => !!v || "必填!",
                    (v) => (v && v.length <= 16) || "最大16個字",
                ],
            },
        };
    },
    mounted() {
        console.log("Student editpage Page run");
    },
    methods: {
        uploadFileClick() {
            this.$refs.uploader.click();
        },
        onFileChanged(event) {
            this.file = event.target.files[0];
            if (this.file != undefined && this.file != null)
                this.getExcelFileData();
        },
        getExcelFileData: async function (params) {
            var formData = new FormData();
            formData.append("file", this.file);
            console.log(formData);

            let config = {
                onUploadProgress: (ProgressEvent) => {
                    console.log(
                        (((ProgressEvent.loaded / ProgressEvent.total) * 100) |
                            0) +
                            "%"
                    );
                },
            };

            apiManageExcel(
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        type: "upload_and_get_excel_data",
                    },
                },
                config.onUploadProgress
            ).then((res) => {
                console.log(res.data);
                var app = this;
                res.data.forEach((item, index) => {
                    var user = {};
                    user.name = item.A;
                    user.account = item.B;
                    user.password = item.C;
                    user.email = item.D;
                    user.tags = item.E.split(";");
                    user.pwshow = false;
                    if (app.setting.firstline && index == 0) {
                        app.users.push(user);
                    } else if (index != 0) {
                        app.users.push(user);
                    }
                });
            });
            console.log(123);
        },
        addOneUser() {
            var user = {
                name: null,
                account: null,
                password: null,
                email: null,
                tags: [],
                pwshow: false,
            };
            this.users.push(user);
        },
        deleteOneUser(item) {
            this.users.splice(this.users.indexOf(item), 1);
        },
        saveAccount() {
            apiManageUser({
                type: "insert",
                items: this.users,
            }).then((res) => {
                console.log(res.data);
            });
        },
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
