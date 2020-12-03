import Vue from 'vue'
import Vuex from 'vuex'
import { apiManageLogin } from '@/js/api'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        dialogBox: {
            dialog: false,
            option: {}
        },
        user: {
            name: 'User Name',
            identity: 'Identity'
        }
    },
    actions: {
        getUserData ({ dispatch, commit, state }) {
            return new Promise((resolve, reject) => {
                apiManageLogin({ type: 'checklogin' })
                    .then((res) => {
                        const { name, identity } = res.data.user
                        commit('setUserData', { name, identity })
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                resolve(true)
            })
        }
    },
    mutations: {
        dialogBox (state, value) {
            state.dialogBox.dialog = value.dialog
            state.dialogBox.option = value.option ? value.option : {}
        },
        setUserData (state, data) {
            state.user.name = data.name
            state.user.identity = data.identity
        }
    }
})
