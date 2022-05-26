import './index.html';
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import { store } from '@/store/store';

import App from './App.vue';
import { routes } from '@/routes/routes.js';
import components from '@/components/UI';

const app = createApp(App);
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

components.forEach(component => {
    app.component(component.name, component);
});


app.use(router);
app.use(store);
app.mount('#app');