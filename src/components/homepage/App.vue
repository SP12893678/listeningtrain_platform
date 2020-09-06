<template>
    <v-app>
        <v-app-bar dark app>
            <v-col md="1">
                <v-avatar tile @click="value=0">
                    <v-img :src="require('@/assets/images/headphones.png')"></v-img>
                </v-avatar>
            </v-col>
            <v-toolbar-title>情境式環境音訓練平台</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text large color="blue" @click="value=0">首頁</v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text large color="amber" v-bind="attrs" v-on="on">導覽</v-btn>
                </template>
                <v-list dark>
                    <v-list-item>
                        <v-btn color="green" text @click="value=1">平台簡介</v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn color="error" text @click="value=2">遊戲系統</v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn color="amber" text @click="value=3">模式介紹</v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn color="blue" text @click="value=4">幫助我們</v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn text large color="error" @click="gotoManage">幫助我們</v-btn>
            <v-btn text large color="green" @click="gotoGame">遊戲</v-btn>

            <v-menu v-if="islogin===1" offset-y>
                <template v-slot:activator="{ on, attr }">
                    <v-btn icon v-bind="attr" v-on="on">
                        <v-icon large>mdi-format-list-bulleted-square</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-model="showUsername">{{showUsername}}</v-list-item-title>
                                <v-list-item-subtitle v-model="showId">{{showId}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-item>
                            <v-btn
                                color="#9C0ACFFF"
                                text
                                @click="
                                dialog3 = true                             
                            "
                            >個人資訊</v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn color="#EEA510FF" text>學習狀況</v-btn>
                        </v-list-item>

                        <v-list-item>
                            <v-btn color="primary" text @click="logout">登出系統</v-btn>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>

            <!-- spacer  -->
            <!-- <v-btn text disabled></v-btn> -->
            <!-- spacer  -->

            <v-dialog v-if="islogin===0" v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon large>mdi-login-variant</v-icon>
                    </v-btn>
                </template>
                <v-card color="	#8E8E8E">
                    <v-form v-model="valid" lazy-validation ref="form">
                        <v-card-title>
                            <span style="color: #007979;">登入系統</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="ac"
                                            label="帳號"
                                            required
                                            :rules="required"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="pw"
                                            label="密碼"
                                            type="password"
                                            required
                                            :rules="required"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="#EA0000"
                                text
                                @click="
                                dialog2 = true
                                dialog = false
                            "
                            >去註冊</v-btn>
                            <v-btn
                                color="success"
                                v-on:click="                                
                               invalidate();
                            "
                            >登入</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" max-width="600px">
                <v-card color="	#8E8E8E" dark>
                    <v-card-title>
                        <span style="color: #21BFEDFF;">註冊系統</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" lazy-validation ref="form2">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="name"
                                            label="姓名"
                                            :rules="counter12"
                                            counter
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="mail"
                                            label="Email"
                                            :rules="email"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                            v-model="acr"
                                            label="帳號"
                                            :rules="counter12"
                                            counter
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                            v-model="pwr"
                                            label="密碼"
                                            :rules="counter16"
                                            counter
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                            v-model="pwr2"
                                            label="再次輸入密碼"
                                            :rules="counter16"
                                            counter
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="identity"
                                            :items="['學生', '教師']"
                                            :rules="[v => !!v || 'Item is required']"
                                            label="身分"
                                            required
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" v-on:click="revalidate()">註冊</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- information -->
            <v-dialog v-model="dialog3" dark max-width="300px">
                <v-card>
                    <v-card-title>
                        <span style="color: #21BFEDFF;">你的資料</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form lazy-validation>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-text-field
                                            label="姓名"
                                            v-model="showUsername"
                                            color="blue"
                                            readonly
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <v-text-field
                                            v-model="showMail"
                                            label="Email"
                                            color="pink"
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                        <v-text-field
                                            v-model="showId"
                                            label="身分"
                                            color="orange"
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="success"
                            @click="
                                dialog3 = false                          
                            "
                        >返回</v-btn>
                        <v-btn text color="orange" @click="dialog4 = !dialog4">更改資料</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- information end-->
            <v-dialog v-model="dialog4" max-width="250px">
                <v-card>
                    <v-form v-model="valid" lazy-validation ref="form3">
                        <v-card-title>
                            <span style="color: #007979">身分檢驗</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="accheck"
                                            label="帳號"
                                            required
                                            :rules="required"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="pwcheck"
                                            label="密碼"
                                            type="password"
                                            required
                                            :rules="required"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="success"
                                v-on:click="                                
                               checkvalidate();
                            "
                            >檢驗</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog5" persistent dark max-width="500px">
                <v-card>
                    <v-card-title>
                        <span style="color: #21BFEDFF">更改資料</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" lazy-validation ref="form4">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            label="姓名變更為"
                                            v-model="showUsername"
                                            color="blue"
                                            :rules="counter12"
                                            counter
                                            required
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="showMail"
                                            label="Email變更為"
                                            color="pink"
                                            :rules="email"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="pwr"
                                            label="密碼變更為"
                                            :rules="counter16"
                                            counter
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="pwr2"
                                            label="再次輸入變更後的密碼"
                                            :rules="counter16"
                                            counter
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <small>*密碼若不更改請填原本的密碼</small>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="success"
                            @click="
                                dialog5 = false                          
                            "
                        >取消</v-btn>
                        <v-btn
                            text
                            color="red"
                            v-on:click="                                
                               changevalidate();
                            "
                        >確定更改</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app-bar>

        <v-main>
            <v-container class="ma-0 pa-0" fluid fill-height>
                <!-- <router-view></router-view> -->
                <v-carousel
                    ref="carousel"
                    id="carousel"
                    v-model="value"
                    class="ma-0 pa-0"
                    height="100%"
                    vertical
                    vertical-delimiters
                    hide-delimiter-background
                >
                    <v-carousel-item
                        v-for="(slide, i) in slides"
                        :key="i"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    >
                        <v-sheet :color="colors[i]" height="100%">
                            <v-row class="fill-height" align="center" justify="center">
                                <v-card
                                    class="text-center"
                                    v-if="value===0"
                                    light
                                    color="#FF000000"
                                    width="800"
                                >
                                    <v-card-text class="text-h2">情境式環境音訓練平台首頁</v-card-text>
                                </v-card>
                                <v-card
                                    class="text-center"
                                    v-if="value===1"
                                    light
                                    color="#FF000000"
                                    width="800"
                                >
                                    <v-card-text class="text-h2">平台簡介</v-card-text>
                                </v-card>
                                <v-card
                                    class="text-center"
                                    v-if="value===2"
                                    light
                                    color="#FF000000"
                                    width="800"
                                >
                                    <v-card-text class="text-h2">遊戲系統</v-card-text>
                                </v-card>
                                <v-card
                                    class="text-center"
                                    v-if="value===3"
                                    light
                                    color="#FF000000"
                                    width="800"
                                >
                                    <v-card-text class="text-h2">模式介紹</v-card-text>
                                </v-card>
                                <v-card
                                    class="text-center"
                                    v-if="value===4"
                                    light
                                    color="#FF000000"
                                    width="800"
                                >
                                    <v-card-text class="text-h2">幫助我們</v-card-text>
                                </v-card>

                                <!-- <div class="display-3">{{ slide }}</div> -->
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </v-main>

        <v-dialog v-model="msg" width="300">
            <v-card center>
                <v-card-title v-model="card">{{card}}</v-card-title>
            </v-card>
        </v-dialog>

        <!-- <v-footer app></v-footer> -->
    </v-app>
</template>

<script>
import { apiManageLogin } from "@/js/api";
import { apiManageRegister } from "@/js/api";
export default {
    data() {
        return {
            msg: false,
            card: null,
            islogin: 0,
            valid: true,
            account: null,
            password: null,
            logindata: null,
            // --------
            dialog: false,
            ac: null,
            pw: null,
            // --------
            dialog2: false,
            name: null,
            mail: null,
            acr: null,
            pwr: null,
            pwr2: null,
            identity: null,

            // --------
            dialog3: false,
            // --------
            dialog4: false,
            accheck: null,
            pwcheck: null,
            // --------
            dialog5: false,
            showUsername: null,
            showId: null,
            showMail: null,

            colors: [
                "indigo",
                "warning",
                "pink darken-2",
                "red lighten-1",
                "deep-purple accent-4",
            ],

            slides: [
                "index1",
                "Introduction1",
                "Introduction2",
                "Introduction3",
                "help",
            ],
            value: 0,
            scrollable: true,
            //rule start
            counter16: [
                (v) => !!v || "必填!",
                (v) => (v && v.length <= 16) || "Max 16 characters",
            ],
            counter12: [
                (v) => !!v || "必填!",
                (v) => (v && v.length <= 12) || "Max 12 characters",
            ],
            email: [
                (v) => !!v || "必填!",
                (v) => /.+@.+\..+/.test(v) || "不符合E-mail格式",
            ],
            required: [(v) => !!v || "必填!"],
            //rule end
        };
    },
    mounted() {
        document.querySelector(".v-carousel__controls").style.right = 0;
        this.setCarouselEvent();
        this.checklogin();
    },
    methods: {
        login() {
            return apiManageLogin({
                type: "login",
                account: this.ac,
                password: this.pw,
            })
                .then((res) => {
                    console.log(res.data);
                    this.logindata = res.data;
                    if (this.logindata.islogin == 1) {
                        this.dialog = false;
                        this.islogin = 1;
                        this.msg = true;
                        this.card = this.logindata.user.name + " 歡迎回來!";
                        this.showUsername = this.logindata.user.name;
                        this.showId = this.logindata.user.identity;
                        this.showMail = this.logindata.user.mail;
                        this.ac = null;
                        this.pw = null;
                    } else {
                        this.ac = null;
                        this.pw = null;
                        this.msg = true;
                        this.card = "查無此人";
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        checklogin() {
            return apiManageLogin({
                type: "checklogin",
            })
                .then((res) => {
                    console.log(res.data);
                    this.logindata = res.data;

                    if (this.logindata.islogin == 1) {
                        this.card = this.logindata.user.name + " 歡迎回來!";
                        this.islogin = 1;
                        this.showUsername = this.logindata.user.name;
                        this.showId = this.logindata.user.identity;
                        this.showMail = this.logindata.user.mail;
                        this.ac = null;
                        this.pw = null;
                        this.msg = true;
                    } else {
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        logout() {
            return apiManageLogin({
                type: "logout",
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data == 1) {
                        this.msg = true;
                        this.card = "登出成功!";
                        this.islogin = 0;
                        this.showUsername = null;
                        this.showId = null;
                        this.showMail = null;
                        this.ac = null;
                        this.pw = null;
                    } else {
                        this.msg = true;
                        this.card = "登出失敗";
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        register() {
            if (this.pwr === this.pwr2) {
                return apiManageRegister({
                    type: "register",
                    name: this.name,
                    mail: this.mail,
                    acr: this.acr,
                    pwr: this.pwr,
                    identity: this.identity,
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data == 1) {
                            this.pwr = null;
                            this.pwr2 = null;
                            this.msg = true;
                            this.card = "註冊成功";
                            this.dialog2 = false;
                        } else if (res.data == 2) {
                            this.msg = true;
                            this.card = "使用者名稱已被使用！";
                        } else {
                            this.msg = true;
                            this.card = "帳號已被使用！";
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.msg = true;
                this.card = "密碼不一!";
            }
        },

        checkinfor() {
            return apiManageLogin({
                type: "inforcheck",
                account: this.accheck,
                password: this.pwcheck,
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data == 1) {
                        this.dialog3 = false;
                        this.dialog4 = false;
                        this.accheck = null;
                        this.pwcheck = null;
                        this.dialog5 = true;
                    } else {
                        this.accheck = null;
                        this.pwcheck = null;
                        this.msg = true;
                        this.card = "驗證失敗";
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        inforchange() {
            if (this.pwr === this.pwr2) {
                return apiManageLogin({
                    type: "inforchange",
                    name: this.showUsername,
                    mail: this.showMail,
                    pwr: this.pwr,
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data == 1) {
                            this.msg = true;
                            this.pwr = null;
                            this.pwr2 = null;
                            this.card = "更改成功!";
                            this.dialog5 = false;
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.msg = true;
                this.card = "密碼不一!";
            }
        },

        setCarouselEvent() {
            var app = this;
            window.addEventListener("wheel", function (event) {
                if (!app.scrollable) return;
                let offset = event.deltaY < 0 ? -1 : 1;
                let slides_length = app.$refs["carousel"].$slots.default.length;
                app.scrollable = false;
                app.value =
                    app.value + offset < slides_length &&
                    app.value + offset >= 0
                        ? app.value + offset
                        : app.value;
                if (
                    !(
                        app.value + offset < slides_length &&
                        app.value + offset >= 0
                    )
                )
                    app.scrollable = true;
            });
            const transition = document.querySelector("#carousel");
            transition.addEventListener("transitionend", (e) => {
                if (e.propertyName.indexOf("transform") != -1)
                    this.scrollable = true;
            });
        },

        revalidate() {
            if (this.$refs.form2.validate()) {
                this.register();
            }
        },
        invalidate() {
            if (this.$refs.form.validate()) {
                this.login();
            }
        },
        checkvalidate() {
            if (this.$refs.form3.validate()) {
                this.checkinfor();
            }
        },
        changevalidate() {
            if (this.$refs.form4.validate()) {
                this.inforchange();
            }
        },
        gotoGame() {
            window.location.href = "./game.html";
        },
        gotoManage() {
            window.location.href = "./manage.html";
        },
    },
};
</script>

<style scoped>
.v-window-x-transition-enter-active,
.v-window-x-transition-leave-active,
.v-window-x-reverse-transition-enter-active,
.v-window-x-reverse-transition-leave-active,
.v-window-y-transition-enter-active,
.v-window-y-transition-leave-active,
.v-window-y-reverse-transition-enter-active,
.v-window-y-reverse-transition-leave-active {
    transition: all 100ms ease 0s;
}
</style>
