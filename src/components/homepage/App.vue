<template>
  <v-app>
    <v-app-bar
      dark
      app
    >
      <v-col md="1">
        <v-avatar
          tile
          @click="value = 0"
        >
          <v-img
            :src="require('@/assets/images/headphones.png')"
          />
        </v-avatar>
      </v-col>
      <v-toolbar-title>情境式環境音訓練平台</v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        large
        color="blue"
        @click="
          goToIntroducePage(0);
          learningstatus = false;
        "
      >
        首頁
      </v-btn>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            text
            large
            color="amber"
            v-bind="attrs"
            v-on="on"
          >
            導覽
          </v-btn>
        </template>
        <v-list dark>
          <v-list-item>
            <v-btn
              color="green"
              text
              @click="
                goToIntroducePage(1);
                learningstatus = false;
              "
            >
              模式介紹
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              color="error"
              text
              @click="
                goToIntroducePage(4);
                learningstatus = false;
              "
            >
              角色系統
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              color="amber"
              text
              @click="
                goToIntroducePage(5);
                learningstatus = false;
              "
            >
              身分功能
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              color="blue"
              text
              @click="
                goToIntroducePage(6);
                learningstatus = false;
              "
            >
              幫助我們
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        text
        large
        color="error"
        @click="gotoManage()"
      >
        幫助我們
      </v-btn>
      <v-btn
        text
        large
        color="green"
        @click="gotoGame()"
      >
        遊戲
      </v-btn>

      <v-menu
        v-if="islogin === 1"
        offset-y
      >
        <template #activator="{ on, attr }">
          <v-btn
            icon
            v-bind="attr"
            v-on="on"
          >
            <v-icon large>
              mdi-format-list-bulleted-square
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item
              class="mb-0"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title v-model="showUsername">
                  {{
                    showUsername
                  }}
                </v-list-item-title>
                <v-list-item-subtitle v-model="showId">
                  {{
                    showId
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-img
                  :src="
                    require('@/assets/images/avatar-default.png')
                  "
                />
              </v-list-item-avatar>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list>
            <v-list-item>
              <v-btn
                color="#9C0ACFFF"
                text
                @click="dialog3 = true"
              >
                個人資訊
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                color="#EEA510FF"
                text
                @click="
                  goToLearningstatus();
                  learningstatus = true;
                "
              >
                學習狀況
              </v-btn>
            </v-list-item>

            <v-list-item>
              <v-btn
                color="primary"
                text
                @click="logout"
              >
                登出系統
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- spacer  -->
      <!-- <v-btn text disabled></v-btn> -->
      <!-- spacer  -->

      <v-dialog
        v-if="islogin === 0"
        v-model="dialog"
        max-width="600px"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon large>
              mdi-login-variant
            </v-icon>
          </v-btn>
        </template>
        <v-card color="	#8E8E8E">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card-title>
              <span style="color: #007979">登入系統</span>
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
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="pw"
                      label="密碼"
                      type="password"
                      required
                      :rules="required"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="#EA0000"
                text
                @click="
                  dialog2 = true;
                  dialog = false;
                "
              >
                去註冊
              </v-btn>
              <v-btn
                color="success"
                @click="invalidate()"
              >
                登入
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog2"
        max-width="600px"
      >
        <v-card
          color="	#8E8E8E"
          dark
        >
          <v-card-title>
            <span style="color: #21bfedff">註冊系統</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form
                ref="form2"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="name"
                      label="姓名"
                      :rules="counter12"
                      counter
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="mail"
                      label="Email"
                      :rules="email"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="acr"
                      label="帳號"
                      :rules="counter12"
                      counter
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="pwr"
                      label="密碼"
                      :rules="counter16"
                      counter
                      type="password"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="pwr2"
                      label="再次輸入密碼"
                      :rules="counter16"
                      counter
                      type="password"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      v-model="identity"
                      :items="['學生', '教師']"
                      :rules="[
                        (v) =>
                          !!v || 'Item is required',
                      ]"
                      label="身分"
                      required
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"
              @click="revalidate()"
            >
              註冊
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog4"
        max-width="250px"
      >
        <v-card>
          <v-form
            ref="form3"
            v-model="valid"
            lazy-validation
          >
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
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="pwcheck"
                      label="密碼"
                      type="password"
                      required
                      :rules="required"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="success"
                @click="checkvalidate()"
              >
                檢驗
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- information -->
      <v-dialog
        v-model="dialog3"
        dark
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <v-list-item class="grow">
              <span style="color: #21bfedff">你的資料</span>
              <v-spacer />
              <v-list-item-avatar>
                <v-img
                  :src="
                    require('@/assets/images/avatar-default.png')
                  "
                />
              </v-list-item-avatar>
            </v-list-item>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form lazy-validation>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="showUsername"
                      label="姓名"
                      color="blue"
                      readonly
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="showMail"
                      label="Email"
                      color="pink"
                      readonly
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="showId"
                      label="身分"
                      color="orange"
                      readonly
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="creatday"
                      label="創建日期"
                      color="yellow"
                      readonly
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="success"
              @click="dialog3 = false"
            >
              返回
            </v-btn>
            <v-btn
              text
              color="orange"
              @click="dialog4 = !dialog4"
            >
              更改資料
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- information end-->
      <v-dialog
        v-model="dialog4"
        max-width="250px"
      >
        <v-card>
          <v-form
            ref="form3"
            v-model="valid"
            lazy-validation
          >
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
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="pwcheck"
                      label="密碼"
                      type="password"
                      required
                      :rules="required"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="success"
                @click="checkvalidate()"
              >
                檢驗
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog5"
        persistent
        dark
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span style="color: #21bfedff">更改資料</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form
                ref="form4"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="showUsername"
                      label="姓名變更為"
                      color="blue"
                      :rules="counter12"
                      counter
                      required
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="showMail"
                      label="Email變更為"
                      color="pink"
                      :rules="email"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="pwr"
                      label="密碼變更為"
                      :rules="counter16"
                      counter
                      type="password"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="pwr2"
                      label="再次輸入變更後的密碼"
                      :rules="counter16"
                      counter
                      type="password"
                      required
                    />
                  </v-col>
                  <small>*密碼若不更改請填原本的密碼</small>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="success"
              @click="dialog5 = false"
            >
              取消
            </v-btn>
            <v-btn
              text
              color="red"
              @click="changevalidate()"
            >
              確定更改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <!-- 側邊攔 -->
    <v-navigation-drawer
      v-model="learningstatus"
      color="blue"
      expand-on-hover
      app
      stateless
    >
      <v-divider />
      <v-list nav>
        <v-list-item inactive>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            class="title"
          >
            各模式學習狀況
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item-group active-class="white--text text--accent-4">
          <v-list-item to="/learnstate">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>學習狀況總覽</v-list-item-title>
          </v-list-item>
          <v-list-item to="/explore">
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-title>探索模式</v-list-item-title>
          </v-list-item>

          <v-list-item to="/practice">
            <v-list-item-icon>
              <v-icon>mdi-crosshairs-gps</v-icon>
            </v-list-item-icon>
            <v-list-item-title>練習模式</v-list-item-title>
          </v-list-item>

          <v-list-item to="/test">
            <v-list-item-icon>
              <v-icon>mdi-border-color</v-icon>
            </v-list-item-icon>
            <v-list-item-title>測驗模式</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- 側邊攔end -->
    <v-main>
      <router-view
        :value.sync="value"
        :passdata="passdata"
        @getValue="changeValue"
        @passdata="passdata = $event"
      />
    </v-main>

    <v-dialog
      v-model="msg"
      width="300"
    >
      <v-card center>
        <v-card-title v-model="card">
          {{ card }}
        </v-card-title>
      </v-card>
    </v-dialog>

    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
import { apiManageLogin, apiManageRegister } from '@/js/api'

import Sound from 'pixi-sound'
export default {
    data () {
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
            creatday: '2020/02/30',
            showId: null,
            showMail: null,
            // --------
            learningstatus: false,
            value: 0,
            // rule start
            counter16: [
                (v) => !!v || '必填!',
                (v) => (v && v.length <= 16) || 'Max 16 characters'
            ],
            counter12: [
                (v) => !!v || '必填!',
                (v) => (v && v.length <= 12) || 'Max 12 characters'
            ],
            email: [
                (v) => !!v || '必填!',
                (v) => /.+@.+\..+/.test(v) || '不符合E-mail格式'
            ],
            required: [(v) => !!v || '必填!'],
            // rule end
            passdata: {}
        }
    },
    mounted () {
        // document.querySelector(".v-carousel__controls").style.right = 0;
        // this.setCarouselEvent();
        this.checklogin()
    },
    methods: {
        goToIntroducePage (val) {
            Sound.stopAll()
            if (this.$route.path != '/') { this.$router.push({ name: 'introduction' }) }
            this.value = val
        },
        goToLearningstatus () {
            this.$router.push({
                name: 'learnstate'
                // params: { passdata: obj },
            })
        },
        changeValue (val) {
            this.value = val
        },
        login () {
            return apiManageLogin({
                type: 'login',
                account: this.ac,
                password: this.pw
            })
                .then((res) => {
                    console.log(res.data)
                    this.logindata = res.data
                    if (this.logindata.islogin == 1) {
                        this.dialog = false
                        this.islogin = 1
                        this.msg = true
                        this.card = this.logindata.user.name + ' 歡迎回來!'
                        this.showUsername = this.logindata.user.name
                        this.showId = this.logindata.user.identity
                        this.showMail = this.logindata.user.mail
                        this.ac = null
                        this.pw = null
                    } else {
                        this.ac = null
                        this.pw = null
                        this.msg = true
                        this.card = '查無此人'
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        checklogin () {
            this.$router.push({
                name: 'introduction'
                // params: { passdata: obj },
            })
            return apiManageLogin({
                type: 'checklogin', check: 'main'
            })
                .then((res) => {
                    console.log(res.data)
                    this.logindata = res.data
                    this.learningstatus = false
                    if (this.logindata.islogin == 1) {
                        this.card = this.logindata.user.name + ' 歡迎回來!'
                        this.islogin = 1
                        this.showUsername = this.logindata.user.name
                        this.showId = this.logindata.user.identity
                        this.showMail = this.logindata.user.mail
                        this.ac = null
                        this.pw = null
                        this.msg = true
                    } else {
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        logout () {
            return apiManageLogin({
                type: 'logout'
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data == 1) {
                        this.msg = true
                        this.card = '登出成功!'
                        this.islogin = 0
                        this.showUsername = null
                        this.showId = null
                        this.showMail = null
                        this.ac = null
                        this.pw = null
                        this.learningstatus = false
                        this.goToIntroducePage(0)
                    } else {
                        this.msg = true
                        this.card = '登出失敗'
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        register () {
            if (this.pwr === this.pwr2) {
                return apiManageRegister({
                    type: 'register',
                    name: this.name,
                    mail: this.mail,
                    acr: this.acr,
                    pwr: this.pwr,
                    identity: this.identity
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data == 1) {
                            this.pwr = null
                            this.pwr2 = null
                            this.name = null
                            this.mail = null
                            this.identity = null
                            this.msg = true
                            this.card = '註冊成功'
                            this.dialog2 = false
                        } else if (res.data == 2) {
                            this.msg = true
                            this.card = '使用者名稱已被使用！'
                        } else {
                            this.msg = true
                            this.card = '帳號已被使用！'
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } else {
                this.msg = true
                this.card = '密碼不一!'
            }
        },

        checkinfor () {
            return apiManageLogin({
                type: 'inforcheck',
                account: this.accheck,
                password: this.pwcheck
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data == 1) {
                        this.dialog3 = false
                        this.dialog4 = false
                        this.accheck = null
                        this.pwcheck = null
                        this.dialog5 = true
                    } else {
                        this.accheck = null
                        this.pwcheck = null
                        this.msg = true
                        this.card = '驗證失敗'
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        inforchange () {
            if (this.pwr === this.pwr2) {
                return apiManageLogin({
                    type: 'inforchange',
                    name: this.showUsername,
                    mail: this.showMail,
                    pwr: this.pwr
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data == 1) {
                            this.msg = true
                            this.pwr = null
                            this.pwr2 = null
                            this.card = '更改成功!'
                            this.dialog5 = false
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } else {
                this.msg = true
                this.card = '密碼不一!'
            }
        },

        revalidate () {
            if (this.$refs.form2.validate()) {
                this.register()
            }
        },
        invalidate () {
            if (this.$refs.form.validate()) {
                this.login()
            }
        },
        checkvalidate () {
            if (this.$refs.form3.validate()) {
                this.checkinfor()
            }
        },
        changevalidate () {
            if (this.$refs.form4.validate()) {
                this.inforchange()
            }
        },
        gotoGame () {
            window.location.href = './game.html'
        },
        gotoManage () {
            window.location.href = './manage.html'
        }
    }
}
</script>
