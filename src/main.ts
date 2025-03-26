/* eslint-disable */
import { createApp } from 'vue';
import App from './App.vue';
import pinia from '../stores/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App);
app.use(pinia);

app.use(ElementPlus);
app.mount('#app');
