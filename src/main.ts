import '@/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button';
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiHeartFill, RiHeartAddLine, HiMenu } from "oh-vue-icons/icons";
import { setComponent } from './modules/component.module';

addIcons(RiHeartFill, RiHeartAddLine, HiMenu);

const app = createApp(App);
setComponent(app);
app.use(PrimeVue, {
    unstyled: true
})
app.use(router);
app.component("v-icon", OhVueIcon);
app.component("Button", Button);
app.mount('#app');
