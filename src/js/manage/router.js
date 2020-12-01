import Vue from 'vue'
import Router from 'vue-router'
// import Manage_homepage from 'Manage/Homepage.vue'
// import Enviroment_dashboard from 'Manage/Enviroment-dashboard.vue'
// import Enviroment_editpage from 'Manage/Enviroment-editpage.vue'
// import Audio_dashboard from 'Manage/Audio-dashboard.vue'
// import Audio_editpage from 'Manage/Audio-editpage.vue'
// import Student_dashboard from 'Manage/Student-dashboard.vue'
// import Student_editpage from 'Manage/Student-editpage.vue'
// import Consultant_dashboard from 'Manage/Consultant-dashboard.vue'
// import Mission_dashboard from 'Manage/Mission-dashboard.vue'
// import Mission_editpage from 'Manage/Mission-editpage.vue'
import Error from 'Manage/Error.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: () => import(/* webpackChunkName: "Manage_homepage" */ 'Manage/Homepage.vue'),
            props: true,
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/enviroment-dashboard',
            name: 'enviroment-dashboard',
            component: () => import(/* webpackChunkName: "Enviroment_dashboard" */ 'Manage/Enviroment-dashboard.vue'),
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/enviroment-edit',
            name: 'enviroment-edit',
            component: () => import(/* webpackChunkName: "Enviroment_editpage" */ 'Manage/Enviroment-editpage.vue'),

            props: true,
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/audio-dashboard',
            name: 'audio-dashboard',
            component: () => import(/* webpackChunkName: "Audio_dashboard" */ 'Manage/Audio-dashboard.vue'),
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/audio-edit',
            name: 'audio-edit',
            component: () => import(/* webpackChunkName: "Audio_editpage" */ 'Manage/Audio-editpage.vue'),
            props: true,
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/student-dashboard',
            name: 'student-dashboard',
            component: () => import(/* webpackChunkName: "Student_dashboard" */ 'Manage/Student-dashboard.vue'),
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/student-edit',
            name: 'student-edit',
            component: () => import(/* webpackChunkName: "Student_editpage" */ 'Manage/Student-editpage.vue'),
            meta: { permissions: ['admin', 'teacher'] }
        },
        {
            path: '/consultant-dashboard',
            name: 'consultant-dashboard',
            component: () => import(/* webpackChunkName: "Consultant_dashboard" */ 'Manage/Consultant-dashboard.vue')
        },
        {
            path: '/mission-dashboard',
            name: 'mission-dashboard',
            component: () => import(/* webpackChunkName: "Mission_dashboard" */ 'Manage/Mission-dashboard.vue'),
            meta: { permissions: ['admin'] }
        },
        {
            path: '/mission-edit',
            name: 'mission-edit',
            component: () => import(/* webpackChunkName: "Mission_editpage" */ 'Manage/Mission-editpage.vue'),
            props: true,
            meta: { permissions: ['admin'] }
        },
        {
            path: '/404',
            name: 'error',
            component: Error
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
