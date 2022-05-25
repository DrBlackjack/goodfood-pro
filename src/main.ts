import { VuesticPlugin } from 'vuestic-ui';
import { createApp } from 'vue'
import { createGtm } from 'vue-gtm'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'


const i18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('@/i18n/en.json'),
    cn: require('@/i18n/cn.json'),
    es: require('@/i18n/es.json'),
    ir: require('@/i18n/ir.json'),
    br: require('@/i18n/br.json')
  }
}

const app = createApp(App)
app.use(store)
app.use(router)
app.use(createI18n(i18nConfig))
app.use(VuesticPlugin, vuesticGlobalConfig)
app.mount('#app')
