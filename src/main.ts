import '@/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import { setComponent } from './modules/component.module';
import { setComponentIcons } from './modules/component-icon.module'
import { setComponentPrime } from './modules/component-primevue.module'

const app = createApp(App);
setComponent(app);
setComponentIcons(app)
setComponentPrime(app)

app.use(PrimeVue, {
    unstyled: true
})
app.use(router);
app.mount('#app');
