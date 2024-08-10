import { createApp } from 'vue'

import 'the-new-css-reset/css/reset.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';


import App from '@/App.vue'
import router from '@/router/index'

const app = createApp(App)

app.use(router)

app.mount('#app')
