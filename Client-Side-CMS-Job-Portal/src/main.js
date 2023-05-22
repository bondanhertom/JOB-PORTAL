import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(vue3GoogleLogin, {
    clientId:
        '81786443504-d82hl2bjhr75ekol12gdfhl4glp8aqnm.apps.googleusercontent.com',
});

app.mount('#app');