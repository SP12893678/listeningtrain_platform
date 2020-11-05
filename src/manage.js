import './style.css'
import 'babel-polyfill'
import Vue from 'vue'
import vuetify from '@/js/plugins/vuetify'
import VueTour from 'vue-tour'
import router from '@/js/manage/router'
import Manage from 'Manage/Manage.vue'
import { apiManageLogin } from "@/js/api";
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
    if (to.path == '/' || to.meta.permissions == null) {
        next()
        return
    }
    await checkPermission();
    if (!isLogin) next({ name: 'homepage', params: { passdata: { title: '尚未登入', text: '如欲使用功能，請先登入' } } })
    else {
        let permissions = to.meta.permissions.indexOf(identity) != -1
        if (permissions) next()
        else next({ name: 'homepage', params: { passdata: { title: '無訪問權限', text: '很抱歉，你沒有訪問權限' } } })
    }
})

new Vue({
    vuetify,
    router,
    el: '#app',
    components: { Manage },
    template: '<manage/>',
})
