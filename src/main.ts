// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA3l8wwTxa8SIoG2iHu_BtUNF4JeFCRs-8',
  authDomain: 'daily-sleep-tracker-f2100.firebaseapp.com',
  databaseURL:
    'https://daily-sleep-tracker-f2100-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'daily-sleep-tracker-f2100',
  storageBucket: 'daily-sleep-tracker-f2100.appspot.com',
  messagingSenderId: '49532524387',
  appId: '1:49532524387:web:96ea7e6d932d38892c2556',
  measurementId: 'G-DZXDX1TESG'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
