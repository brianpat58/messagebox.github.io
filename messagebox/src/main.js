// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Vuetify from 'vuetify'
import { store } from './store/store'
// index.js or main.js
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


// Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})