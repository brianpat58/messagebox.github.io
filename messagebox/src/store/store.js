import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
    state: {
        messages: []
    },
    getters: {
        // vuexMessages: state => state.messages
    },
    actions: {
        // initMessages: function ({ commit }, messages) {
        //     console.log(messages)
        //     commit('init', messages)
        // },
        // checkItem: function ({ commit }, id) {
        //     console.log('id', id)
        //     commit('checkItem', id)
        // },
        loadMessages ({ commit }) {
            axios
                .get(
                    "https://benqyannick.github.io/F2E_candidate_code_challenge-master/data.json"
                )
                .then(r => r.data)
                .then(messages => {
                    commit('SET_MESSAGES', messages)
                });
        }
    },
    mutations: {
        // init: function (state, payload) {
        //     state.messages = payload
        // },
        // checkItem: function (state, payload) {
        //     state.messages.forEach(item => {
        //         if (item.msg_id === payload) {
        //             item.completed = !item.completed
        //         }
        //     })
        // },
        SET_MESSAGES (state, messages) {
            state.messages = messages
        }
    }
})