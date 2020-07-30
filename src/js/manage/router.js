import Vue from 'vue'
import Router from 'vue-router'
import Manage_homepage from 'Manage/Homepage.vue'
import Enviroment_dashboard from 'Manage/Enviroment-dashboard.vue'
import Enviroment_editpage from 'Manage/Enviroment-editpage.vue'
import Audio_dashboard from 'Manage/Audio-dashboard.vue'
import Audio_editpage from 'Manage/Audio-editpage.vue'
import Student_dashboard from 'Manage/Student-dashboard.vue'
import Student_editpage from 'Manage/Student-editpage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'homepage', component: Manage_homepage },
        { path: '/enviroment-dashboard', name: 'enviroment-dashboard', component: Enviroment_dashboard },
        { path: '/enviroment-edit', name: 'enviroment-edit', component: Enviroment_editpage, props: true },
        { path: '/audio-dashboard', name: 'audio-dashboard', component: Audio_dashboard },
        { path: '/audio-edit', name: 'audio-edit', component: Audio_editpage, props: true },
        { path: '/student-dashboard', name: 'student-dashboard', component: Student_dashboard },
        { path: '/student-edit', name: 'student-edit', component: Student_editpage },
    ],
})
