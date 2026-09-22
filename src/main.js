import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import de Bootstrap 5 (CSS et JS)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Création et montage de l'application Vue 3
const app = createApp(App)

app.use(router)
app.mount('#app')

