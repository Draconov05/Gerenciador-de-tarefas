import { createApp } from 'vue'
import App from './App.vue'
import moment from 'moment'

// Load Locales ('en' comes loaded by default)
require('moment/locale/pt-br');

moment.locale('pt-br');

// Components
import IndexTasks from './pages/Tasks/index.vue'
import TaskNews from './pages/Tasks/noticias.vue'
import DashboardIndex from './pages/Dashboard/index.vue'

import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/', name: 'home', redirect: '/dashboard' },
    { path: '/dashboard', component: DashboardIndex, name: 'dashboard' },
    { path: '/tarefas', component: IndexTasks, name: 'listagem' },
    { path: '/noticias', component: TaskNews, name: 'noticias' }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

const app = createApp(App).use(router)

app.config.globalProperties.$moment = moment

app.use(moment);
app.mount('#app')