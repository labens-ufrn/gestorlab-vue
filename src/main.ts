import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueTheMask from 'vue-the-mask';

const pinia = createPinia();

const app = createApp(App);
(app as any).use(VueTheMask);
app.use(pinia);
app.use(router);
app.mount('#app');
