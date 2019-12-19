import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/excel',
      name: 'excel',
      component: require('@/components/ExcelPage').default
    },
    {
      path: '/sql',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/msg',
      name: 'msg',
      component: require('@/components/Msg').default
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
