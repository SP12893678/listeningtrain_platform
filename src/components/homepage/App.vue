<template>
    <v-app>
        <v-navigation-drawer v-model="nav_drawer" absolute temporary width="280">
            <v-list nav class="py-0">
                <v-list-item class="mb-0" two-line>
                    <v-list-item-avatar>
                        <v-img :src="require('@/assets/images/avatar-default.png')"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>User Name</v-list-item-title>
                        <v-list-item-subtitle>Identity</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
            </v-list>
            <v-list nav>
                <v-list-item-group active-class="green--text text--accent-4">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>首頁</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-monitor-edit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>情境教材管理</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-music-box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>聲音資源管理</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account-cog</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>學生帳戶管理</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar dark app>
            <v-col md="1">
                <v-avatar tile @click="nav_drawer = true">
                    <v-img :src="require('@/assets/images/headphones.png')"></v-img>
                </v-avatar>
            </v-col>
            <v-toolbar-title>情境式環境音訓練平台</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon large>mdi-login-variant</v-icon>
                    </v-btn>
                </template>
                <v-card color="	#8E8E8E">
                    <v-card-title>
                        <span class="headline" style="color: #007979;">登入系統</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="ac" label="帳號" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="pw" label="密碼" type="password" required></v-text-field>
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
                            >去註冊</v-btn
                        >
                        <v-btn color="blue" text v-on:click="dialog = falselogin()">登入</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" persistent max-width="600px">
                <v-card color="	#8E8E8E" dark>
                    <v-card-title>
                        <span class="headline" style="color: #007979;">註冊系統</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="name" label="姓名" :rules="[rules.counter8]" counter required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="mail" label="Email" :rules="[rules.email]" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-text-field v-model="acr" label="帳號" :rules="[rules.counter12]" counter required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-text-field v-model="pwr" label="密碼" :rules="[rules.counter12]" counter type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-text-field
                                        v-model="pwr2"
                                        label="再次輸入密碼"
                                        :rules="[rules.counter12]"
                                        counter
                                        type="password"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="items" :items="['學生', '教師']" label="身分" required></v-select>
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
                                dialog2 = false
                                register()
                            "
                            >註冊</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app-bar>

        <v-main>
            <v-container class="ma-0 pa-0" fluid fill-height>
                <!-- <router-view></router-view> -->
                <v-carousel ref="carousel" id="carousel" v-model="value" class="ma-0 pa-0" height="100%" vertical vertical-delimiters hide-delimiter-background>
                    <v-carousel-item v-for="(slide, i) in slides" :key="i">
                        <v-sheet :color="colors[i]" height="100%">
                            <v-row class="fill-height" align="center" justify="center">
                                <div class="display-3">{{ slide }} Slide</div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </v-main>

        <!-- <v-footer app></v-footer> -->
    </v-app>
</template>

<script>
import { apiManageLogin } from '@/js/api'
import { apiManageRegister } from '@/js/api'
export default {
    data() {
        return {
            nav_drawer: false,
            dialog: false,
            dialog2: false,
            account: null,
            password: null,
            ac: null,
            pw: null,
            name: null,
            mail: null,
            acr: null,
            pwr: null,
            pwr2: null,
            items: null,
            colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
            slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
            value: 0,
            scrollable: true,
            rules: {
                counter8: (value) => value.length <= 8 || 'Max 8 characters',
                counter12: (value) => value.length <= 12 || 'Max 12 characters',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
        }
    },
    mounted() {
        document.querySelector('.v-carousel__controls').style.right = 0
        this.setCarouselEvent()
    },
    methods: {
        login() {
            return apiManageLogin({
                account: this.ac,
                password: this.pw,
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data == 1) {
                        alert('登入成功！')
                    } else {
                        alert('查無此人！')
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        register() {
            if (this.pwr === this.pwr2) {
                return apiManageRegister({
                    name: this.name,
                    mail: this.mail,
                    acr: this.acr,
                    pwr: this.pwr,
                    id: this.items,
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data == 1) {
                            alert('註冊成功！')
                        } else if (res.data == 2) {
                            alert('使用者名稱已被使用！')
                        } else {
                            alert('帳號已被使用！')
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } else {
                alert('密碼輸入失敗')
            }
        },

        setCarouselEvent() {
            var app = this
            window.addEventListener('wheel', function(event) {
                if (!app.scrollable) return
                let offset = event.deltaY < 0 ? -1 : 1
                let slides_length = app.$refs['carousel'].$slots.default.length
                app.scrollable = false
                app.value = app.value + offset < slides_length && app.value + offset >= 0 ? app.value + offset : app.value
                if (!(app.value + offset < slides_length && app.value + offset >= 0)) app.scrollable = true
            })
            const transition = document.querySelector('#carousel')
            transition.addEventListener('transitionend', (e) => {
                if (e.propertyName.indexOf('transform') != -1) this.scrollable = true
            })
        },
    },
}
</script>

<style scoped>
/* .fullpage-container {
    position: absolute;
    width: 50%;
    height: 50%;
} */

.v-window-x-transition-enter-active,
.v-window-x-transition-leave-active,
.v-window-x-reverse-transition-enter-active,
.v-window-x-reverse-transition-leave-active,
.v-window-y-transition-enter-active,
.v-window-y-transition-leave-active,
.v-window-y-reverse-transition-enter-active,
.v-window-y-reverse-transition-leave-active {
    transition: all 1000ms ease 0s;
}
</style>
