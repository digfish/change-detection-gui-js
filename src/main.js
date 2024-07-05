import './assets/main.css'
//import './processPolyfill'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { IonicVue } from '@ionic/vue'

import { addIcons } from 'ionicons'
import { home as homeIcon,arrowForward as arrowForwardIcon, arrowBack as arrowBackIcon, arrowBack,
  stopwatchOutline as stopwatchOutlineIcon,
  stopwatch as stopwatchIcon,
 } from 'ionicons/icons'


import App from './App.vue'


import Home from './Home.vue'
import Watchingpage from './Watchingpage.vue'


import Watchingtabs from './Watchingtabs.vue'
import Watchingmain from './Watchingmain.vue'
import Watchingdetail from './Watchingdetail.vue'

import '@ionic/vue/css/core.css' // Core CSS required for Ionic components to work properly
import './global.css'
//Vue.config.productionTip = false;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, name:'home' },
    {
      path: '/watch/:uuid',
      name: 'watch',
      component: Watchingtabs,
      redirect: {name:'watchingmain'},
      children: [
        {
          path: '',
          name: 'watchingparent',
          component: Watchingmain 
        },
        {
          path: 'main',
          name: 'watchingmain',
          component: Watchingmain
        },
        {
          path: 'detail',
          name: 'watchingdetail',
          component: Watchingdetail
        }
      ]
    }
  ]
})

addIcons({
  home: homeIcon,
  arrowForward: arrowForwardIcon,
  arrowBack: arrowBackIcon,
  stopwatchOutline: stopwatchOutlineIcon,
  stopwatch: stopwatchIcon,
})

router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path} `)
  console.log(`Matched route:`, to.matched)
  next()
})

let app = createApp(App).use(IonicVue).use(router).mount('#app')
//app.component('ion-icon',IonIcon)
