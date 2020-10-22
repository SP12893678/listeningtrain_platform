import Vue from 'vue'
import Router from 'vue-router'
import Introduction from '@/components/homepage/Introduction.vue'
import Test from '@/components/homepage/Test.vue'
import Practice from '@/components/homepage/Practice.vue'
import Explore from '@/components/homepage/Explore.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'introduction', component: Introduction, props: true },
        { path: '/test', name: 'test', component: Test, props: true },
        { path: '/practice', name: 'practice', component: Practice, props: true },
        { path: '/explore', name: 'explore', component: Explore, props: true },
    ],
})
