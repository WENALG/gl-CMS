import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import registerIcon from './global/register-icons'
import useLoginStore from './store/login/login'

const app = createApp(App)
app.use(ElementPlus)
app.use(registerIcon)
app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
