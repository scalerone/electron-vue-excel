import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      mode: 'hash',
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      mode: 'hash',
      path: '*',
      redirect: '/'
    }
  ]
})
