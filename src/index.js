import 'babel-polyfill'
import Vue from 'vue'
import vuetify from '@/js/plugins/vuetify'
import App from '@/components/homepage/App.vue'

new Vue({
    vuetify,
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
