import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        dialogBox: {
            dialog: false,
            option: {}
        }
    },
    actions: {

    },
    mutations: {
        dialogBox (state, value) {
            state.dialogBox.dialog = value.dialog
            state.dialogBox.option = value.option ? value.option : {}
        }
    }
})
