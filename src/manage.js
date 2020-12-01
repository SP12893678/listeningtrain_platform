import './style.css'
import 'babel-polyfill'
import Vue from 'vue'
import store from '@/js/manage/store/index'
import vuetify from '@/js/plugins/vuetify'
import VueTour from 'vue-tour'
import router from '@/js/manage/router'
import Manage from 'Manage/Manage.vue'
import { checkPermission, isLogin, identity } from './js/manage/permissions'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

// let console = {
//     isDev: false,
//     log(...args) {
//         if (!this.isDev) return
//         window.console.log(...args)
//     },
// }

router.beforeEach(async (to, from, next) => {
    if (to.meta.permissions == null) {
        next()
        return
    }
    await checkPermission()
    if (!isLogin) {
        store.commit('dialogBox',
            {
                dialog: true,
                option: {
                    title: '尚未登入',
                    text: '必須先登入才可使用',
                    confirmBtn: {
                        text: '前去登入',
                        event: () => { window.location.href = './index.html' }
                    }
                }
            },
            { root: true }
        )
    } else {
        const permissions = to.meta.permissions.indexOf(identity) != -1
        if (permissions) next()
        else {
            store.commit('dialogBox',
                {
                    dialog: true,
                    option: {
                        title: '權限不足',
                        text: '很抱歉，你沒有訪問權限'
                    }
                },
                { root: true }
            )
        }
    }
})

const app = new Vue({
    store,
    vuetify,
    router,
    el: '#app',
    components: { Manage },
    template: '<manage/>'
})
