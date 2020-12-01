<template>
  <v-container fluid>
    <!--情境教材標題 & 搜尋欄 & 新增情境教材按鈕 -->
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title
          class="jf-title pa-2"
        >
          情境教材
        </v-list-item-title>
      </v-list-item-content>
      <v-text-field
        v-model="enviro_cards.search"
        data-v-step="Enviroment-dashboard-search"
        append-icon="mdi-magnify"
        label="情境教材搜尋"
        single-line
        hide-details
      />
    </v-list-item>

    <v-divider />

    <!--情境教材列表-->
    <v-list-item
      two-line
      class="mt-4"
    >
      <v-list-item-content>
        <!--情境教材列表分頁欄-->
        <v-pagination
          v-model="enviro_cards.page"
          :length="getPaginationPages"
          data-v-step="Enviroment-dashboard-pagination"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        />

        <!--情境教材卡片骨架裝載器(模擬情境教材載入狀態)-->
        <template v-if="enviro_cards.loading">
          <v-card
            v-for="(item, index) in 3"
            :key="index"
            class="ma-4"
            height="300"
            width="300"
            max-width="300"
          >
            <v-skeleton-loader
              class="mx-auto"
              type="card"
            />
          </v-card>
        </template>

        <v-hover
          v-if="!enviro_cards.loading"
          v-slot="{ hover }"
        >
          <v-card
            :elevation="hover ? 10 : 2"
            :ripple="{ class: 'white--text' }"
            class="ma-4"
            max-width="300"
            height="308"
            data-v-step="Enviroment-dashboard-new-empty"
            @click="goToNewEditPage(-1, -1)"
          >
            <v-row
              justify="center"
              align-self="center"
            >
              <v-col md="auto">
                <v-row
                  justify="center"
                  align-self="center"
                >
                  <v-img
                    :src="
                      require('@/assets/images/add.png')
                    "
                    height="230"
                    contain
                  />
                </v-row>
                <v-row
                  justify="center"
                  align-self="center"
                >
                  <v-card-title>
                    使用空白範本新增
                  </v-card-title>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>

        <!--情境教材卡片-->
        <v-hover
          v-for="(item, index) in getEnviroCards"
          v-show="!enviro_cards.loading"
          :key="item.id + item.name"
          v-slot="{ hover }"
        >
          <v-card
            :elevation="hover ? 10 : 2"
            :ripple="{ class: 'white--text' }"
            class="ma-4"
            max-width="300"
            :data-v-step="`Enviroment-dashboard-card-${index}`"
          >
            <v-img
              :src="item.background_src"
              height="180px"
            />
            <v-card-title>
              {{ item.name }}
              <v-spacer />
              <v-chip
                class="ma-0"
                color="orange"
                outlined
                small
              >
                <v-icon
                  left
                >
                  mdi-format-list-bulleted-type
                </v-icon>
                {{ item.category }}
              </v-chip>
            </v-card-title>
            <v-card-subtitle class="pb-1">
              {{
                item.created_time
              }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                color="blue"
                text
                @click.prevent="goToEditPage(item.id)"
              >
                <v-icon left>
                  mdi-image-edit
                </v-icon>編輯
              </v-btn>
              <v-btn
                color="green"
                text
                @click.prevent="goToNewEditPage(-1, item.id)"
              >
                <v-icon left>
                  mdi-newspaper-plus
                </v-icon>使用此範本新增
              </v-btn>
              <v-spacer />
              <v-btn
                color="red"
                icon
                @click="askDeleteDialog(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-list-item-content>
    </v-list-item>

    <!--情境教材刪除提示框 -->
    <v-dialog
      v-model="enviro_cards.delete_dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          你確定要刪除此教材?
        </v-card-title>
        <v-card-text>如果確認刪除後，將無法在復原。</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="enviro_cards.delete_dialog = false"
          >
            否
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteEnviro()"
          >
            是
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.body"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="blue"
          text
          @click="snackbar.body = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!--情境教材刪除提示框 -->

    <v-tour
      :name="this.$route.name"
      :steps="steps"
    />
  </v-container>
</template>

<script>
import { apiManageEnviroment, apiManageObject } from '@/js/api'

export default {
    data () {
        return {
            enviro: [],
            enviro_cards: {
                search: '',
                loading: true,
                page: 1,
                delete_dialog: false,
                delete_id: null
            },
            snackbar: { body: false, text: null, timeout: 2000 },
            steps: [
                {
                    target: '[data-v-step="Enviroment-dashboard-new-empty"]',
                    header: {
                        title: '以空白情境範本新增教材'
                    },
                    content: '點選後將進入教材編輯頁面，其中情境教材為空白範本形式。',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Enviroment-dashboard-card-0"]',
                    header: {
                        title: '情境教材卡片'
                    },
                    content: '顯示該情境教材相關資訊，<br>另外可使用編輯、使用該範本新增和刪除按鈕對該情境教材進行操作',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Enviroment-dashboard-pagination"]',
                    header: {
                        title: '情境教材分頁欄'
                    },
                    content: '透過分頁欄可切換查看情境教材',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Enviroment-dashboard-search"]',
                    header: {
                        title: '情境教材搜尋欄'
                    },
                    content: '透過輸入關鍵字將顯示與關鍵字相關的情境教材',
                    params: {
                        enableScrolling: false
                    }
                }
            ]
        }
    },
    computed: {
        /** 取得符合條件(搜尋條件 & 當前分頁)的情境教材物件 */
        getEnviroCards () {
            const app = this
            const tmp = this.enviro.filter((item) => {
                return (
                    item.name.indexOf(app.enviro_cards.search) >= 0 ||
                    item.category.indexOf(app.enviro_cards.search) >= 0 ||
                    item.created_time.indexOf(app.enviro_cards.search) >= 0
                )
            })
            return tmp.filter((item, index) => {
                return (
                    index < 10 * app.enviro_cards.page &&
                    index >= 10 * (app.enviro_cards.page - 1)
                )
            })
        },
        /** 取得分頁數量(每頁情境數量以10為限) */
        getPaginationPages () {
            const app = this
            const tmp = this.enviro.filter((item) => {
                return (
                    item.name.indexOf(app.enviro_cards.search) >= 0 ||
                    item.category.indexOf(app.enviro_cards.search) >= 0 ||
                    item.created_time.indexOf(app.enviro_cards.search) >= 0
                )
            })
            return Math.ceil(tmp.length / 10)
        }
    },
    async mounted () {
        await this.getEnviroData()
        this.enviro_cards.loading = false
    },
    methods: {
        /** 前往該情境教材的編輯頁面 */
        goToEditPage (id) {
            const obj = { enviro: { id: id } }
            this.$emit('passdata', obj)
            this.$router.push('/enviroment-edit').catch((err) => { console.log(err) })
        },
        goToNewEditPage (id, simple_id = this.enviro[0].id) {
            const obj = { enviro: { id: id, simple_id: simple_id } }
            this.$emit('passdata', obj)
            this.$router.push('/enviroment-edit').catch((err) => { console.log(err) })
        },
        /** 請求後端並取得情境教材
         * @async
         */
        getEnviroData () {
            return apiManageEnviroment({ type: 'get', amount: 'all' })
                .then((res) => {
                    this.enviro = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        askDeleteDialog (delete_id) {
            this.enviro_cards.delete_id = delete_id
            this.enviro_cards.delete_dialog = true
        },
        async deleteEnviro () {
            const id = this.enviro_cards.delete_id

            const obj_str = this.enviro.filter((enviro) => enviro.id == id)[0]
                .object
            const obj_arr = obj_str.split(',')
            await apiManageObject({ type: 'delete', items: obj_arr })

            await apiManageEnviroment({ type: 'delete', id: id })
                .then((res) => {
                    this.enviro_cards.delete_dialog = false
                    this.snackbar.text = res.data.result
                        ? '刪除成功'
                        : '刪除失敗'
                    this.snackbar.body = true
                })
                .catch((error) => {
                    console.error(error)
                })

            await this.getEnviroData()
        }
    }
}
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
