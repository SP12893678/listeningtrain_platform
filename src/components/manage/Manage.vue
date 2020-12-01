<template>
  <v-app id="inspire">
    <div>
      <v-app-bar
        color="deep-purple"
        dark
      >
        <v-app-bar-nav-icon
          data-v-step="0"
          @click="nav_drawer = true"
        />
        <v-toolbar-title>情境式環境音管理平台</v-toolbar-title>
        <v-spacer />
        <v-menu
          v-model="notify"
          :close-on-content-click="false"
          nudge-width="300"
          max-height="400"
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              v-on="on"
            >
              <v-badge
                color="pink"
                dot
              >
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>通知</v-card-title>
            <v-divider />
            <v-list>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      問題標題
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      提問者
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>
                      2020/07/24
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Question title
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Name
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>
                      2020/07/24
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu
          rounded="lg"
          offset-y
        >
          <template #activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              data-v-step="1"
              icon
              v-on="on"
            >
              <v-icon>mdi-help-network</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              @click="test"
            >
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-book-open-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>說明手冊</v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              @click="callGuideTour"
            >
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-teach</v-icon>
              </v-list-item-icon>
              <v-list-item-title>操作導覽</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item link>
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-card-account-mail</v-icon>
              </v-list-item-icon>
              <v-list-item-title>客服訊問</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-model="nav_drawer"
        absolute
        temporary
        width="280"
      >
        <v-list
          nav
          class="py-0"
        >
          <v-list-item
            class="mb-0"
            two-line
          >
            <v-list-item-avatar>
              <v-img
                :src="
                  require('@/assets/images/avatar-default.png')
                "
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{
                  user.name
                }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                  user.identity
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
        </v-list>
        <v-list nav>
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>首頁</v-list-item-title>
            </v-list-item>

            <v-list-item to="/enviroment-dashboard">
              <v-list-item-icon>
                <v-icon>mdi-monitor-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-title>情境教材管理</v-list-item-title>
            </v-list-item>

            <v-list-item to="/audio-dashboard">
              <v-list-item-icon>
                <v-icon>mdi-music-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>聲音資源管理</v-list-item-title>
            </v-list-item>

            <v-list-item to="/student-dashboard">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>學生帳戶管理</v-list-item-title>
            </v-list-item>

            <v-list-item to="/consultant-dashboard">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>客服諮詢管理</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mission-dashboard">
              <v-list-item-icon>
                <v-icon>mdi-clipboard-list</v-icon>
              </v-list-item-icon>
              <v-list-item-title>任務系統管理</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <router-view
      :passdata="passdata"
      @passdata="passdata = $event"
    />
    <v-description-manual
      :dialog.sync="dialog"
      @getDialog="changeDialog"
    />
    <v-tour
      name="homepage"
      :steps="steps"
    />
    <v-dialog
      v-model="alert_dialog.dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title>{{ alert_dialog.title }}</v-card-title>
        <v-card-text>{{ alert_dialog.text }}</v-card-text>
        <v-card-actions>
          <v-btn
            text
            block
            @click="goToIndexPage"
          >
            <v-icon left>
              mdi-checkbox-marked-circle-outline
            </v-icon>確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <vDialogBox />
  </v-app>
</template>

<script>
import { apiManageLogin } from '@/js/api'
import vDescriptionManual from './Description-manual.vue'
import vDialogBox from './utils/DialogBox.vue'

export default {
    components: {
        vDescriptionManual,
        vDialogBox
    },
    data () {
        return {
            user: {
                name: 'User Name',
                identity: 'Identity'
            },
            alert_dialog: {
                dialog: false,
                title: 'Title',
                text: 'text'
            },
            nav_drawer: false,
            passdata: {},
            dialog: false,
            notify: false,
            steps: [
                {
                    target: '[data-v-step="0"]',
                    header: {
                        title: '導航欄選單按鈕'
                    },
                    content: '點擊後顯示導航欄抽屜，可點選進入各個頁面'
                },
                {
                    target: '[data-v-step="1"]',
                    header: {
                        title: '幫助選單按鈕'
                    },
                    content:
                        '內有說明手冊、操作導覽、客服詢問功能，可幫助了解管理平台以及解決疑難雜症'
                }
            ]
        }
    },
    async mounted () {
        console.log(
            '%c住手! %c༼ つ ◕_◕ ༽つ',
            'color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold',
            'font-family:system-ui;font-size:16px;-webkit-text-stroke: 1px black;font-weight:bold'
        )
        apiManageLogin({ type: 'checklogin' })
            .then((res) => {
                const { name, identity } = res.data.user
                this.user.name = name
                this.user.identity = identity
            })
            .catch((error) => {
                console.error(error)
            })
        /** Todo
         * requset personal data and update name and identity
         * else router push to Website Index
         */
    },
    methods: {
        test () {
            this.dialog = true
        },
        changeDialog (val) {
            this.dialog = val
        },
        callGuideTour () {
            if (this.$tours[this.$route.name]) { this.$tours[this.$route.name].start() }
        },
        showDialog (data) {
            this.alert_dialog.title = data.title
            this.alert_dialog.text = data.text
            this.alert_dialog.dialog = true
        },
        goToIndexPage () {
            window.location.href = './index.html'
        }
    }
}
</script>

<style scoped></style>
