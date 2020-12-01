<template>
  <v-container fluid>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="jf-title pa-2">
          任務系統編輯
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="ml-4 mb-0">
        <v-btn
          text
          @click="openNewMissionDialog"
        >
          <v-icon left>
            mdi-book-plus-multiple
          </v-icon>新增
        </v-btn>
      </v-list-item-action>
      <v-list-item-action class="ml-4 mb-0">
        <v-btn
          :loading="save_loading"
          color="red"
          text
          @click="saveMission"
        >
          <v-icon left>
            mdi-content-save
          </v-icon>儲存
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider />

    <v-data-table
      :headers="mission_headers"
      :items="missions"
      item-key="title"
    >
      <template #[`item.action`]="{ item }">
        <v-btn
          icon
          @click="openEditMissionDialog(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="deleteMission(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="missionEditArea.dialog"
      width="800"
    >
      <v-card>
        <v-tabs
          v-model="missionEditArea.tab"
          grow
        >
          <v-tab>基本設定</v-tab>
          <v-tab>任務需求</v-tab>
          <v-tab>任務獎勵</v-tab>
        </v-tabs>
        <v-tabs-items v-model="missionEditArea.tab">
          <v-tab-item>
            <v-list-item>
              <v-list-item-content>
                <v-select
                  v-model="mission.type"
                  :items="missionEditArea.missionType"
                  label="任務類型"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="mission.title"
                  label="任務標題"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-textarea
                  v-model="mission.description"
                  label="任務敘述"
                />
              </v-list-item-content>
            </v-list-item>
          </v-tab-item>
          <v-tab-item>
            <v-list-item>
              <v-list-item-content>
                <v-select
                  v-model="mission.required.mode"
                  :items="missionRule.type"
                  item-text="name"
                  return-object
                  label="模式類型"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-select
                  v-model="mission.required.counter"
                  :items="missionRule.counter"
                  item-text="name"
                  return-object
                  label="計算類型"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="mission.required.mode != null">
              <v-list-item-content>
                <v-select
                  v-model="mission.required.action"
                  :items="
                    missionRule[mission.required.mode.id]
                      .action
                  "
                  item-text="name"
                  label="動作類型"
                />
              </v-list-item-content>
              <v-list-item-content>
                <v-text-field
                  v-model="mission.required.times"
                  label="次數 | 百分比(0-100)"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col cols="3">
                    <v-switch
                      v-model="
                        missionEditArea.enviro.switch
                      "
                      label="特定情境"
                      class="pt-0 mt-2"
                      color="red"
                      @change="toogleEnviroRequest"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      :disabled="
                        !missionEditArea.enviro.switch
                      "
                      @click="
                        missionEditArea.enviro.dialog = true
                      "
                    >
                      選擇情境
                    </v-btn>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      :value="
                        mission.required.enviro != null
                          ? `名稱:${mission.required.enviro.name} | ID:${mission.required.enviro.id}`
                          : '尚未選擇'
                      "
                      label="選擇情境"
                      class="pt-0 mt-0"
                      readonly
                    />
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col cols="3">
                    <v-switch
                      v-model="
                        missionEditArea.object.switch
                      "
                      :disabled="
                        !missionEditArea.enviro
                          .switch ||
                          mission.required.enviro == null
                      "
                      label="特定物件"
                      class="pt-0 mt-2"
                      color="info"
                      @change="toogleEnviroRequest"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      :disabled="
                        !missionEditArea.object.switch
                      "
                      @click="
                        missionEditArea.object.dialog = true
                      "
                    >
                      選擇物件
                    </v-btn>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      :value="
                        mission.required.object != null
                          ? `名稱:${mission.required.object.name} | ID:${mission.required.object.id}`
                          : '尚未選擇'
                      "
                      label="選擇物件"
                      class="pt-0 mt-0"
                      readonly
                    />
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-tab-item>
          <v-tab-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn
                  color="orange"
                  outlined
                  @click="addMoneyReward"
                >
                  新增金幣獎勵
                </v-btn>
              </v-list-item-content>
              <v-list-item-content>
                <v-btn
                  color="purple"
                  outlined
                  @click="openChoseEntityDialog"
                >
                  新增物品獎勵
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="pt-0">
                <v-row>
                  <v-col class="pt-0">
                    <v-btn
                      color="blue"
                      block
                      text
                    >
                      男生
                    </v-btn>
                  </v-col>
                  <v-col
                    class="pt-0"
                  >
                    <v-btn
                      color="pink"
                      block
                      text
                    >
                      女生
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(reward, index) in mission.rewards"
              :key="index"
            >
              <v-list-item-content v-if="reward.type == 'money'">
                <v-hover>
                  <template #default="{ hover }">
                    <v-card
                      class="mx-auto"
                      max-width="150"
                    >
                      <v-img
                        class="mx-auto"
                        :src="
                          require('@/assets/images/money-bag.png')
                        "
                        width="100"
                      />

                      <v-fade-transition>
                        <v-overlay
                          v-if="hover"
                          absolute
                          color="#036358"
                        >
                          <v-text-field
                            v-model="reward.value"
                            label="金額"
                          />
                          <v-btn
                            block
                            @click="
                              deleteReward(reward)
                            "
                          >
                            刪除
                          </v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
              </v-list-item-content>
              <v-list-item-content v-if="reward.type == 'entity'">
                <v-hover>
                  <template #default="{ hover }">
                    <v-card
                      class="mx-auto"
                      max-width="150"
                    >
                      <v-img
                        class="mx-auto"
                        :src="reward.gg.imgsrc"
                        width="100"
                      />

                      <v-fade-transition>
                        <v-overlay
                          v-if="hover"
                          absolute
                          color="#036358"
                        >
                          <v-btn
                            block
                            @click="
                              openEditRewardDialog(
                                reward
                              )
                            "
                          >
                            編輯
                          </v-btn>
                          <v-btn
                            block
                            @click="
                              deleteReward(reward)
                            "
                          >
                            刪除
                          </v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
                <v-hover>
                  <template #default="{ hover }">
                    <v-card
                      class="mx-auto"
                      max-width="150"
                    >
                      <v-img
                        class="mx-auto"
                        :src="reward.mm.imgsrc"
                        width="100"
                      />

                      <v-fade-transition>
                        <v-overlay
                          v-if="hover"
                          absolute
                          color="#036358"
                        >
                          <v-btn
                            block
                            @click="
                              openEditRewardDialog(
                                reward
                              )
                            "
                          >
                            編輯
                          </v-btn>
                          <v-btn
                            block
                            @click="
                              deleteReward(reward)
                            "
                          >
                            刪除
                          </v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
              </v-list-item-content>
            </v-list-item>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            outlined
            @click="missionEditArea.dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            v-if="missionEditArea.type == 'new'"
            outlined
            @click="newMission"
          >
            確定新增
          </v-btn>
          <v-btn
            v-if="missionEditArea.type == 'edit'"
            outlined
            @click="editMission"
          >
            確定儲存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="missionEditArea.enviro.dialog">
      <v-card>
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
            append-icon="mdi-magnify"
            label="情境教材搜尋"
            single-line
            hide-details
          />
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <!--情境教材列表分頁欄-->
            <v-pagination
              v-model="enviro_cards.page"
              :length="getPaginationPages"
              data-v-step="Enviroment-dashboard-pagination"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            />
            <v-card
              v-for="(enviro, index) in getEnviroCards"
              :key="enviro.name + index"
              class="ma-4"
              max-width="250"
            >
              <v-img
                :src="enviro.background_src"
                height="150"
              />
              <v-card-title>
                {{ enviro.name }}
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
                  {{ enviro.category }}
                </v-chip>
              </v-card-title>
              <v-card-subtitle class="pb-1">
                {{
                  enviro.created_time
                }}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn
                  color="blue"
                  outlined
                  rounded
                  block
                  @click="selectEnviro(index)"
                >
                  選擇
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>

    <v-dialog v-model="missionEditArea.object.dialog">
      <v-card>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="jf-title pa-2">
              {{
                `情境物件`
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-card
              v-for="(object, index) in objects"
              :key="object.name + index"
              class="ma-4"
              max-width="120"
            >
              <v-img
                :src="object.pic_src"
                height="120"
                contain
              />
              <v-card-title>
                {{ object.name }}
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="blue"
                  outlined
                  rounded
                  block
                  @click="selectObject(index)"
                >
                  選擇
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>

    <v-dialog v-model="missionEditArea.reward.dialog">
      <v-card>
        <v-card-title>
          <span class="jf-title">物品獎勵選擇</span>
          <v-spacer />
          <v-btn
            v-if="missionEditArea.reward.type == 'add'"
            icon
            @click="addReward('entity')"
          >
            <v-icon color="grey lighten-1">
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn
            v-if="missionEditArea.reward.type == 'edit'"
            icon
            @click="editReward('entity')"
          >
            <v-icon color="grey lighten-1">
              mdi-check
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-tabs
          v-model="missionEditArea.reward.tab"
          grow
        >
          <v-tab>男生</v-tab>
          <v-tab>女生</v-tab>
        </v-tabs>
        <v-tabs-items v-model="missionEditArea.reward.tab">
          <v-tab-item>
            <v-container fluid>
              <v-item-group
                v-model="missionEditArea.reward.item.gg"
                mandatory
              >
                <v-row>
                  <v-col
                    v-for="(item, i) in getMaleCloth"
                    :key="i"
                    md="auto"
                  >
                    <v-item
                      v-slot="{
                        active,
                        toggle,
                      }"
                      :value="item"
                    >
                      <v-card
                        :ripple="{
                          class: 'white--text',
                        }"
                        min-width="100"
                        min-height="150"
                        max-width="200"
                        max-height="150"
                      >
                        <v-img
                          :src="item.imgsrc"
                          :class="
                            active
                              ? 'border text-right pa-2'
                              : ' text-right pa-2'
                          "
                          max-height="150"
                          min-height="150"
                          min-width="100"
                          class
                          contain
                          @click="toggle"
                        >
                          <v-overlay
                            v-if="active"
                            transition="fade-transition"
                            color="rgba(100, 100, 255, 0.5)"
                            absolute
                          />
                        </v-img>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <v-item-group
                v-model="missionEditArea.reward.item.mm"
                mandatory
              >
                <v-row>
                  <v-col
                    v-for="(item, i) in getFeMaleCloth"
                    :key="i"
                    md="auto"
                  >
                    <v-item
                      v-slot="{
                        active,
                        toggle,
                      }"
                      :value="item"
                    >
                      <v-card
                        :ripple="{
                          class: 'white--text',
                        }"
                        min-width="100"
                        min-height="150"
                        max-width="200"
                        max-height="150"
                      >
                        <v-img
                          :src="item.imgsrc"
                          :class="
                            active
                              ? 'border text-right pa-2'
                              : ' text-right pa-2'
                          "
                          max-height="150"
                          min-height="150"
                          min-width="100"
                          class
                          contain
                          @click="toggle"
                        >
                          <v-overlay
                            v-if="active"
                            transition="fade-transition"
                            color="rgba(100, 100, 255, 0.5)"
                            absolute
                          />
                        </v-img>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
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
  </v-container>
</template>

<script>
import {
    apiManageEnviroment,
    apiManageObject,
    apiManageMission
} from '@/js/api'
import LoadClothes from '@/js/manage/loadClothes'

export default {
    props: ['passdata'],
    data () {
        return {
            save_loading: false,
            enviro_cards: {
                search: '',
                loading: true,
                page: 1,
                delete_dialog: false,
                delete_id: null
            },
            enviros: [],
            objects: [],
            rewards: {},
            missionEditArea: {
                index: -1,
                type: 'new',
                dialog: false,
                tab: 0,
                missionType: ['每日任務', '成長任務'],
                enviro: {
                    switch: false,
                    dialog: false
                },
                object: {
                    switch: false,
                    dialog: false
                },
                reward_header: [
                    { text: '種類', align: 'start', value: 'type' },
                    { text: '物品', value: 'category' }
                ],
                reward: {
                    dialog: false,
                    item: { type: 'entity', gg: null, mm: null }
                }
            },
            missionRule: {
                type: [
                    { id: 'train', name: '訓練模式' },
                    { id: 'practice', name: '練習模式' },
                    { id: 'test', name: '測驗模式' }
                ],
                counter: [
                    { id: 'once', name: '單次' },
                    { id: 'total', name: '累計' }
                ],
                train: {
                    action: [{ id: 'listen', name: '聆聽次數' }]
                },
                practice: {
                    action: [{ id: 'correct-times', name: '正確次數' }]
                },
                test: {
                    action: [
                        { id: 'play', name: '遊玩次數' },
                        { id: 'correct-rate', name: '正確率' }
                    ]
                }
            },
            mission: {
                type: null,
                title: null,
                description: null,
                required: {
                    mode: null,
                    counter: null,
                    action: null,
                    times: null,
                    enviro: null,
                    object: null
                },
                rewards: []
                // rewards: { type: "money", value: "100" },
            },
            missions: [],
            mission_headers: [
                { text: '名稱', align: 'start', value: 'title' },
                { text: '敘述', value: 'description' },
                { text: '類型', value: 'type' },
                {
                    text: '動作',
                    value: 'action',
                    sortable: false,
                    align: 'right'
                }
            ],
            snackbar: { body: false, text: null, timeout: 2000 }

            // clothes: new LoadClothes(),
        }
    },
    computed: {
        /** 取得符合條件(搜尋條件 & 當前分頁)的情境教材物件 */
        getEnviroCards () {
            const app = this
            const tmp = this.enviros.filter((item) => {
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
            const tmp = this.enviros.filter((item) => {
                return (
                    item.name.indexOf(app.enviro_cards.search) >= 0 ||
                    item.category.indexOf(app.enviro_cards.search) >= 0 ||
                    item.created_time.indexOf(app.enviro_cards.search) >= 0
                )
            })
            return Math.ceil(tmp.length / 10)
        },
        getMaleCloth () {
            const data = []
            if (this.rewards == undefined || this.rewards == null) return data
            if (this.rewards.gg == undefined) return
            for (const part of Object.keys(this.rewards.gg)) {
                this.rewards.gg[part].forEach((item) => (item.type = part))
                data.push(...this.rewards.gg[part])
            }
            return data
        },
        getFeMaleCloth () {
            const data = []
            if (this.rewards == undefined || this.rewards == null) return data
            if (this.rewards.mm == undefined) return
            for (const part of Object.keys(this.rewards.mm)) {
                this.rewards.mm[part].forEach((item) => (item.type = part))
                data.push(...this.rewards.mm[part])
            }
            return data
        }
    },
    async mounted () {
        if (this.passdata.mission == null) this.$router.back()
        this.rewards = await new LoadClothes().pic
        if (this.passdata.mission.id.length > 0) await this.getMissionData()
        this.getEnviroData()
    },
    methods: {
        /** 請求後端並取得情境教材
         * @async
         */
        getEnviroData () {
            return apiManageEnviroment({ type: 'get', amount: 'all' })
                .then((res) => {
                    this.enviros = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /** 請求後端並取得情境物件
         * @async
         */
        getObjectData () {
            const object_arr = this.mission.required.enviro.object.split(',')
            return apiManageObject({
                type: 'get',
                amount: 'part',
                items: object_arr
            })
                .then((res) => {
                    this.objects = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        getMissionData () {
            return apiManageMission({
                type: 'get',
                amount: 'part',
                items: this.passdata.mission.id
            })
                .then((res) => {
                    this.missions = res.data
                    this.missions.forEach((mission) => {
                        mission.required = JSON.parse(mission.required)
                        mission.rewards = JSON.parse(mission.rewards)
                        mission.rewards.forEach((reward) => {
                            if (reward.type == 'entity') {
                                reward.gg = this.rewards.gg[
                                    reward.gg.type
                                ].filter((item) => item.no == reward.gg.no)[0]
                                reward.mm = this.rewards.mm[
                                    reward.mm.type
                                ].filter((item) => item.no == reward.mm.no)[0]
                            }
                        })

                        if (mission.required.enviro != null) {
                            apiManageEnviroment({
                                type: 'get',
                                amount: 'one',
                                item: mission.required.enviro
                            })
                                .then((res) => {
                                    mission.required.enviro = res.data
                                })
                                .catch((error) => {
                                    console.error(error)
                                })
                        }
                        if (mission.required.object != null) {
                            apiManageObject({
                                type: 'get',
                                amount: 'part',
                                items: [mission.required.object]
                            })
                                .then((res) => {
                                    mission.required.object = res.data[0]
                                })
                                .catch((error) => {
                                    console.error(error)
                                })
                        }
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        newMission () {
            this.mission.id = -1
            const item = {}
            Object.assign(item, this.mission)
            this.missions.push(item)
            this.missionEditArea.dialog = false
        },
        editMission () {
            Object.assign(
                this.missions[this.missionEditArea.index],
                this.mission
            )
            this.missionEditArea.dialog = false
        },
        deleteMission (mission) {
            this.missions.splice(this.missions.indexOf(mission), 1)
        },
        async selectEnviro (index) {
            this.mission.required.enviro = this.enviros[index]
            this.mission.required.object = null

            await this.getObjectData()

            this.missionEditArea.enviro.dialog = false
        },
        selectObject (index) {
            this.mission.required.object = this.objects[index]
            this.missionEditArea.object.dialog = false
        },
        toogleEnviroRequest () {
            this.mission.required.enviro = this.missionEditArea.enviro.switch
                ? this.mission.required.enviro
                : null
            if (!this.missionEditArea.enviro.switch) {
                this.missionEditArea.object.switch = false
                this.mission.required.object = null
            }
        },
        openNewMissionDialog () {
            this.missionEditArea.type = 'new'
            this.missionEditArea.dialog = true
        },
        openChoseEntityDialog () {
            this.missionEditArea.reward.type = 'add'
            this.missionEditArea.reward.dialog = true
        },
        openEditMissionDialog (mission) {
            const item = {}
            Object.assign(item, mission)
            this.mission = item
            this.missionEditArea.type = 'edit'
            this.missionEditArea.index = this.missions.indexOf(mission)
            this.missionEditArea.enviro.switch =
                this.mission.required.enviro != null
            this.missionEditArea.object.switch =
                this.mission.required.object != null
            this.missionEditArea.dialog = true
        },
        saveMission () {
            this.save_loading = true
            const missions = []
            missions.push(...this.missions)

            const saveMission = new Promise((resolve, reject) => {
                let count = 0
                missions.forEach((mission, index) => {
                    if (mission.required.enviro != null) { mission.required.enviro = mission.required.enviro.id }
                    if (mission.required.object != null) { mission.required.object = mission.required.object.id }
                    mission.rewards.forEach((reward) => {
                        if (reward.type == 'entity') {
                            delete reward.gg.imgsrc
                            delete reward.mm.imgsrc
                        }
                    })

                    console.log(mission)

                    apiManageMission({ type: 'update', item: mission }).then(
                        (res) => {
                            if (res.data.result) { this.missions[index].id = res.data.id }
                            if (++count >= missions.length) resolve()
                        }
                    )
                })
            })

            saveMission.then(() => {
                this.save_loading = false
                this.snackbar.text = '儲存成功'
                this.snackbar.body = true
            })
        },
        addMoneyReward () {
            this.missionEditArea.reward.item = { type: 'money', value: 100 }
            this.addReward('money')
        },
        addReward (type) {
            const item = {}
            Object.assign(item, this.missionEditArea.reward.item)
            item.type = type
            this.mission.rewards.push(item)
            this.missionEditArea.reward.dialog = false
            this.missionEditArea.reward.item = {}
        },
        editReward (type) {
            Object.assign(
                this.mission.rewards[this.missionEditArea.reward.index],
                this.missionEditArea.reward.item
            )
            this.missionEditArea.reward.dialog = false
        },
        openEditRewardDialog (reward) {
            this.missionEditArea.reward.type = 'edit'
            this.missionEditArea.reward.index = this.mission.rewards.indexOf(
                reward
            )
            const item = {}
            Object.assign(item, reward)
            this.mission.reward = item
            this.missionEditArea.reward.dialog = true
        },
        deleteReward (reward) {
            this.mission.rewards.splice(
                this.mission.rewards.indexOf(reward),
                1
            )
        }
    }
}
</script>

<style>
</style>
