import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from "vue3-google-login";
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router)


const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})


app.use(vue3GoogleLogin, {
    clientId: `81786443504-d82hl2bjhr75ekol12gdfhl4glp8aqnm.apps.googleusercontent.com`,
});
app.use(pinia)

app.mount('#app')
