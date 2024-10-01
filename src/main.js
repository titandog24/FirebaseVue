import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import router from './router/router'
import {createPinia} from  'pinia'
import antd from 'ant-design-vue'

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(antd).mount('#app')
