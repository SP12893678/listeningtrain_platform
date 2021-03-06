import Vue from 'vue'
import Router from 'vue-router'
import Manage_homepage from 'Manage/Homepage.vue'
import Enviroment_dashboard from 'Manage/Enviroment-dashboard.vue'
import Enviroment_editpage from 'Manage/Enviroment-editpage.vue'
import Audio_dashboard from 'Manage/Audio-dashboard.vue'
import Audio_editpage from 'Manage/Audio-editpage.vue'
import Student_dashboard from 'Manage/Student-dashboard.vue'
import Student_editpage from 'Manage/Student-editpage.vue'
import Consultant_dashboard from 'Manage/Consultant-dashboard.vue'
import Mission_dashboard from 'Manage/Mission-dashboard.vue'
import Mission_editpage from 'Manage/Mission-editpage.vue'
import Error from 'Manage/Error.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'homepage', component: Manage_homepage, props: true, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/enviroment-dashboard', name: 'enviroment-dashboard', component: Enviroment_dashboard, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/enviroment-edit', name: 'enviroment-edit', component: Enviroment_editpage, props: true, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/audio-dashboard', name: 'audio-dashboard', component: Audio_dashboard, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/audio-edit', name: 'audio-edit', component: Audio_editpage, props: true, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/student-dashboard', name: 'student-dashboard', component: Student_dashboard, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/student-edit', name: 'student-edit', component: Student_editpage, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/consultant-dashboard', name: 'consultant-dashboard', component: Consultant_dashboard },
        { path: '/mission-dashboard', name: 'mission-dashboard', component: Mission_dashboard, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/mission-edit', name: 'mission-edit', component: Mission_editpage, props: true, meta: { permissions: ['admin', 'teacher'] } },
        { path: '/404', name: 'error', component: Error },
        { path: '*', redirect: '/404' }
    ]
})
