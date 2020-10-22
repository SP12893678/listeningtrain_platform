import 'babel-polyfill'
import './style.css'
import Vue from 'vue'
import vuetify from '@/js/plugins/vuetify'
import router from '@/js/index/router'
import App from '@/components/homepage/App.vue'

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
    components: { App },
    template: '<App/>',
})
