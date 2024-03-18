import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// svg 打包
import 'virtual:svg-icons-register'

// 代码高亮，代码提示
import {} from 'vant'
// 全局导入样式
import 'vant/lib/index.css'

import '@/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
