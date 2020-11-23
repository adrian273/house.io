/***
 * Adrian Verdugo ( アドリアン　)
 * @github adrian273
 * @since 11/18/2020
 * 
 */

import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes';

import App from './App.vue'
//socket io
import * as io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";
import PrettyCheckbox from 'pretty-checkbox-vue';
import VueFlashMessage from 'vue-flash-message';

// Client connect to server (host from IO server/index.js)
const socket = io('http://localhost:4000')

// Start plugins
Vue.use(VueSocketIOExt, socket);
Vue.use(PrettyCheckbox);
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueFlashMessage)


require('vue-flash-message/dist/vue-flash-message.min.css');

// Routes Config
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

// the vue instance
new Vue({
  render: h => h(App),
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  router
}).$mount('#app')