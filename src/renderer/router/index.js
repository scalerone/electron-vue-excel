import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      mode: 'hash',
      path: '/home',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      mode: 'hash',
      path: '/excel',
      name: 'excel',
      component: require('@/components/ExcelPage').default
    },
    {
      mode: 'hash',
      path: '/sql',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      mode: 'hash',
      path: '*',
      redirect: '/home'
    }
  ]
})
