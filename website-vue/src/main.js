import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

// creates an instance of axios
export const api = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 10000,
  headers: {
    accept: 'application/json',
  }
})

const app = createApp(App)
app.provide('axios', api)
app.mount('#app')
