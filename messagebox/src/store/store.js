import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        messages: []
    },
    getters: {
        vuexMessages: state => state.messages
    },
    actions: {
        initMessages: function ({ commit }, messages) {
            console.log(messages)
            commit('init', messages)
        },
        checkItem: function ({ commit }, id) {
            console.log('id', id)
            commit('checkItem', id)
        }
    },
    mutations: {
        init: function (state, payload) {
            state.messages = payload
        },
        checkItem: function (state, payload) {
            state.messages.forEach(item => {
                if (item.msg_id === payload) {
                    item.completed = !item.completed
                }
            })
        },
    }
})