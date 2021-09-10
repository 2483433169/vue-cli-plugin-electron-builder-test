import Vue from 'vue'
import Electron from 'electron';
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhTwLocale from 'element-ui/lib/locale/lang/zh-TW'

import {
  enLang
} from './lang/language-en'

import {
  zhLang
} from './lang/language-zh'
import {
  twLang
} from './lang/language-tw'

import * as echarts from 'echarts'
import 'echarts-gl'

import App from './App.vue'
import router from './router'
import store from './store'


Vue.use(VueI18n)
const messages = {
  'en': {
    lang: enLang,
    ...enLocale
  },
  'zh-CN': {
    lang: zhLang,
    ...zhLocale
  },
  'zh-TW': {
    lang: twLang,
    ...zhTwLocale
  }
}

const i18n = new VueI18n({
  locale: 'en', // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages
})

Vue.use(ElementUI, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.echarts = Vue.prototype.$echarts = echarts
Vue.prototype.$electron = Electron
console.log(echarts, 'echarts')

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')