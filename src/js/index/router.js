import Vue from 'vue'
import Router from 'vue-router'
import Introduction from '@/components/homepage/Introduction.vue'
import Test from '@/components/homepage/Test.vue'
import Practice from '@/components/homepage/Practice.vue'
import Explore from '@/components/homepage/Explore.vue'
import Learnstate from '@/components/homepage/Learnstate.vue'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        { path: '/', name: 'introduction', component: Introduction, props: true },
        { path: '/test', name: 'test', component: Test, props: true },
        { path: '/practice', name: 'practice', component: Practice, props: true },
        { path: '/explore', name: 'explore', component: Explore, props: true },
        { path: '/learnstate', name: 'learnstate', component: Learnstate, props: true },
    ],
})
