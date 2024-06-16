import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import { useUserStore } from './stores/userStore.js' // Add this line

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");