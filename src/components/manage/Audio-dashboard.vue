<template>
  <v-container fluid>
    <!--聲音資源標題 & 搜尋欄 & 新增/編輯/刪除聲音資源按鈕 -->
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title
          class="jf-title pa-2"
        >
          聲音資源
        </v-list-item-title>
      </v-list-item-content>
      <v-text-field
        v-model="audio_data_table.search"
        append-icon="mdi-magnify"
        label="聲音資源搜尋"
        data-v-step="Audio-dashboard-search"
        single-line
        hide-details
      />
      <v-list-item-action class="ml-4 mb-0">
        <v-btn
          data-v-step="Audio-dashboard-add"
          text
          @click="addAudio"
        >
          <v-icon left>
            mdi-music-note-plus
          </v-icon>新增
        </v-btn>
      </v-list-item-action>
      <v-list-item-action class="mb-0">
        <v-btn
          color="blue"
          data-v-step="Audio-dashboard-edit"
          text
          @click.prevent="editAudio"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>編輯
        </v-btn>
      </v-list-item-action>
      <v-list-item-action class="ml-0 mb-0">
        <v-btn
          color="red"
          data-v-step="Audio-dashboard-delete"
          text
          @click="deleteAudioAsk"
        >
          <v-icon left>
            mdi-delete
          </v-icon>刪除
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-divider />

    <!--聲音資源數據表 -->
    <v-list-item
      two-line
      class="mt-4"
    >
      <v-list-item-content>
        <v-skeleton-loader
          :loading="audio_data_table.loading"
          type="table"
        >
          <v-data-table
            v-model="audio_data_table.selected"
            :headers="audio_data_table.header"
            :items="audio"
            :loading="audio_data_table.loading"
            :search="audio_data_table.search"
            item-key="name"
            class="elevation-1"
            data-v-step="Audio-dashboard-audio-table"
            loading-text
            show-select
            multi-sort
          >
            <template #item.category="{ item }">
              <v-chip
                v-for="i in item.category"
                :key="item.audio_id + i"
                :color="getCategoryColor(i)"
                class="mr-2"
                outlined
              >
                {{ i }}
              </v-chip>
            </template>
            <template #item.sound="{ item }">
              <v-btn
                icon
                @click="playAudio(item)"
              >
                <v-icon>mdi-volume-high</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-skeleton-loader>
      </v-list-item-content>
    </v-list-item>

    <!--聲音播放器表單 -->
    <v-bottom-sheet
      v-if="audio.length > 0"
      v-model="audio_player_sheet.bottom_sheet"
      inset
    >
      <v-card tile>
        <v-progress-linear
          :value="getPlayerProcess"
          class="my-0"
          height="3"
        />

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{
                  audio[audio_player_sheet.player.index].name
                }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                  audio[audio_player_sheet.player.index].audio_id
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>頻率</v-list-item-title>
              <v-list-item-subtitle>
                {{
                  audio[audio_player_sheet.player.index].frequency
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>波形</v-list-item-title>
              <v-list-item-subtitle>
                {{
                  audio[audio_player_sheet.player.index].waveform
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-chip
                  v-for="i in audio[
                    audio_player_sheet.player.index
                  ].category"
                  :key="i"
                  :color="getCategoryColor(i)"
                  class="mr-2"
                  outlined
                  small
                >
                  {{ i }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer />

            <v-list-item-icon class="mr-4">
              <v-btn
                icon
                @click="previousAudio"
              >
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon class="ml-2 mr-2">
              <v-btn
                v-if="!audio_player_sheet.player.pause"
                icon
                @click="pauseAudio"
              >
                <v-icon>mdi-pause</v-icon>
              </v-btn>
              <v-btn
                v-if="audio_player_sheet.player.pause"
                icon
                @click="resumeAudio"
              >
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon class="ml-4">
              <v-btn
                icon
                @click="nextAudio"
              >
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>

    <!--聲音資源刪除提示框 -->
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          你確定要刪除下列聲音資源?
        </v-card-title>
        <v-simple-table
          v-if="audio_data_table.selected.length > 0"
          :height="getTableheight()"
          fixed-header
        >
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  名稱
                </th>
                <th class="text-left">
                  代號
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in audio_data_table.selected"
                :key="item.audio_id"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.audio_id }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-text>※如果確認刪除後，將無法在復原。</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            否
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteAudio"
          >
            是
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--消息提醒條 -->
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

    <v-tour
      :name="this.$route.name"
      :steps="steps"
    />
  </v-container>
</template>

<script>
import { apiManageAudio } from '@/js/api'

export default {
    data () {
        return {
            dialog: false,
            audio: [],
            audio_categories: [],
            audio_data_table: {
                header: [
                    { text: '名稱', align: 'start', value: 'name' },
                    { text: '分類', value: 'category' },
                    { text: '頻率', value: 'frequency' },
                    { text: '波形', value: 'waveform' },
                    { text: '創建時間', value: 'created_time' },
                    { text: '聲音', value: 'sound', sortable: false }
                ],
                selected: [],
                search: '',
                loading: true
            },
            audio_player_sheet: {
                bottom_sheet: false,
                player: { index: 0, duration: 0, currentTime: 0, pause: false },
                audio: new Audio()
            },
            snackbar: { body: false, text: null, timeout: 2000 },
            steps: [
                {
                    target: '[data-v-step="Audio-dashboard-audio-table"]',
                    header: {
                        title: '聲音資源資料表'
                    },
                    content: '將列出所擁有的聲音資源資料表，可於表中查看各項內容和屬性，在最右側有聲音撥放按鈕可聆聽該聲音，另外可於資料表標題欄點選該類別進行排序以便查看',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Audio-dashboard-search"]',
                    header: {
                        title: '聲音資源搜尋欄'
                    },
                    content: '透過輸入關鍵字將顯示與關鍵字相關的聲音資源',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Audio-dashboard-add"]',
                    header: {
                        title: '新增聲音資源按鈕'
                    },
                    content: '點選此按鈕將進入聲音資源編輯頁面。',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Audio-dashboard-edit"]',
                    header: {
                        title: '編輯聲音資源按鈕'
                    },
                    content: '勾選聲音資源資料表中欲刪除的聲音後，點選此按鈕將進入聲音資源編輯頁面。',
                    params: {
                        enableScrolling: false
                    }
                },
                {
                    target: '[data-v-step="Audio-dashboard-delete"]',
                    header: {
                        title: '刪除聲音資源按鈕'
                    },
                    content: '勾選聲音資源資料表中欲刪除的聲音後，點選此按鈕即可刪除。',
                    params: {
                        enableScrolling: false
                    }
                }
            ]
        }
    },
    computed: {
        /** 取得播放器當前進度 */
        getPlayerProcess () {
            return (
                (this.audio_player_sheet.player.currentTime /
                    this.audio_player_sheet.player.duration) *
                100
            )
        }
    },
    async mounted () {
        await this.getAudioData()
        // this.loadAudioResources()
        this.audioPlayerEvent()

        /** 將聲音資源分類以陣列形式表示 */
        this.audio.forEach((item) => {
            item.category = item.category.split(';')
        })

        /** 過濾聲音資源分類並賦予顏色 */
        const app = this
        this.audio.forEach((item) => {
            item.category.forEach((category) => {
                if (app.audio_categories.find((item) => item.name == category) == undefined) {
                    const r = Math.round(Math.random() * 255)
                    const g = Math.round(Math.random() * 255)
                    const b = Math.round(Math.random() * 255)
                    const color = `rgba(${r}, ${g}, ${b}, 1)`
                    const item = { name: category, color: color }
                    app.audio_categories.push(item)
                }
            })
        })

        this.audio_data_table.loading = false
    },
    methods: {
        /** 請求後端並取得聲音資源
         * @async
         */
        getAudioData () {
            return apiManageAudio({ type: 'get', amount: 'all' })
                .then((res) => {
                    this.audio = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /**
         * 音訊播放器載入聲音後取得該音檔duration時間
         * 音訊播放器播放時update播放時間
         */
        audioPlayerEvent () {
            const app = this
            this.audio_player_sheet.audio.addEventListener('loadedmetadata', () => {
                app.audio_player_sheet.player.duration = app.audio_player_sheet.audio.duration
            })
            this.audio_player_sheet.audio.addEventListener('timeupdate', () => {
                app.audio_player_sheet.player.currentTime = app.audio_player_sheet.audio.currentTime
                if (app.audio_player_sheet.player.currentTime == app.audio_player_sheet.player.duration) {
                    this.audio_player_sheet.player.pause = true
                }
            }, false)
        },
        /** 將需加載的資源放入陣列並加載 */
        loadAudioResources () {
            // const load_resources = []
            // this.audio.forEach((object) => {
            //     if (!PIXI.loader.resources[object.sound_src]) { load_resources.push(object.sound_src) }
            // })

            // PIXI.loader.reset()
            // if (load_resources.length > 0) { PIXI.loader.add(load_resources).load() }
        },
        /** 取得該分類之顏色 */
        getCategoryColor (category) {
            return this.audio_categories.length != 0
                ? this.audio_categories.find((item) => item.name == category).color
                : 'black'
        },
        /** 播放該聲音資源並顯示播放器表單 */
        playAudio (item) {
            this.audio_player_sheet.player.index = this.audio.indexOf(item)
            this.audio_player_sheet.bottom_sheet = true
            this.audio_player_sheet.audio.src = item.sound_src
            this.audio_player_sheet.audio.currentTime = 0
            this.audio_player_sheet.player.currentTime = 0
            this.audio_player_sheet.audio.play()
            this.audio_player_sheet.player.pause = false
        },
        /** 暫停播放該聲音資源 */
        pauseAudio () {
            this.audio_player_sheet.audio.pause()
            this.audio_player_sheet.player.pause = true
        },
        /** 繼續播放該聲音資源 */
        resumeAudio () {
            this.audio_player_sheet.audio.play()
            this.audio_player_sheet.player.pause = false
        },
        /** 播放上一個聲音資源 */
        previousAudio () {
            this.pauseAudio()
            this.audio_player_sheet.player.index =
                this.audio_player_sheet.player.index - 1 >= 0
                    ? this.audio_player_sheet.player.index - 1
                    : this.audio.length - 1
            this.audio_player_sheet.audio.src = this.audio[this.audio_player_sheet.player.index].sound_src
            this.audio_player_sheet.audio.play()
            this.audio_player_sheet.player.pause = false
        },
        /** 播放下一個聲音資源 */
        nextAudio () {
            this.pauseAudio()
            this.audio_player_sheet.player.index =
                this.audio_player_sheet.player.index + 1 < this.audio.length
                    ? this.audio_player_sheet.player.index + 1
                    : 0
            this.audio_player_sheet.audio.src = this.audio[this.audio_player_sheet.player.index].sound_src
            this.audio_player_sheet.audio.play()
            this.audio_player_sheet.player.pause = false
        },
        /** 將選取的聲音資源送出並進入編輯頁面(先判斷有無選取聲音資源) */
        editAudio: function () {
            if (this.audio_data_table.selected.length > 0) {
                const obj = { audio: { id: [] } }
                this.audio_data_table.selected.forEach((item) => {
                    obj.audio.id.push(item.id)
                })
                this.$router.push({
                    name: 'audio-edit',
                    params: { passdata: obj }
                })
            } else {
                this.snackbar.text = '無選取任何聲音以編輯'
                this.snackbar.body = true
            }
        },
        /** 進入編輯頁面(含新增功能) */
        addAudio () {
            const obj = { audio: { id: [] } }
            this.$router.push({
                name: 'audio-edit',
                params: { passdata: obj }
            })
        },
        /** 彈出刪除提示框(先判斷有無選取聲音資源) */
        deleteAudioAsk () {
            if (this.audio_data_table.selected.length > 0) this.dialog = true
            else {
                this.snackbar.text = '無選取任何聲音以刪除'
                this.snackbar.body = true
            }
        },
        /** 取得刪除提示框中的資料表高度 */
        getTableheight () {
            if (this.audio_data_table.selected.length <= 5) return (this.audio_data_table.selected.length + 1) * 48
            else return 300
        },
        async deleteAudio () {
            const audio_id_arr = this.audio_data_table.selected.map((audio) => audio.id)
            await apiManageAudio({ type: 'delete', items: audio_id_arr })
                .then((res) => {
                    this.snackbar.text = res.data.result
                        ? '刪除成功'
                        : '刪除失敗'
                    this.snackbar.body = true

                    this.dialog = false
                })
                .catch((error) => {
                    console.error(error)
                })

            await this.getAudioData()

            this.audio.forEach((item) => {
                item.category = item.category.split(';')
            })

            this.audio.forEach((item) => {
                item.category.forEach((category) => {
                    if (this.audio_categories.find((item) => item.name == category) == undefined) {
                        const r = Math.round(Math.random() * 255)
                        const g = Math.round(Math.random() * 255)
                        const b = Math.round(Math.random() * 255)
                        const color = `rgba(${r}, ${g}, ${b}, 1)`
                        const item = { name: category, color: color }
                        this.audio_categories.push(item)
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
.jf-title {
    font-size: 32px;
}
</style>
