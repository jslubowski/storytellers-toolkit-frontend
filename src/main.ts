import {createApp} from 'vue'
import {createPinia} from 'pinia'

import PrimeVue from 'primevue/config';

import './assets/main.css'

import App from './App.vue'
import router from './router'

import {MyAppTheme} from "@/theme/app-theme.ts";

const app = createApp(App)

app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: MyAppTheme
  },
});
app.use(router);

app.mount('#app');
