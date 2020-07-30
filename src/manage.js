import './style.css'
import 'babel-polyfill'
import Vue from 'vue'
import vuetify from '@/js/plugins/vuetify'
import VueTour from 'vue-tour'
import router from '@/js/manage/router'
import Manage from 'Manage/Manage.vue'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

// let console = {
//     isDev: false,
//     log(...args) {
//         if (!this.isDev) return
//         window.console.log(...args)
//     },
// }

new Vue({
    vuetify,
    router,
    el: '#app',
    data() {
        return {}
    },
    mounted() {
        console.log('Vue run')
    },
    components: { Manage },
    template: '<manage/>',
})
