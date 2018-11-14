import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Order from '@/components/Order'
import UsePullRefresh from '@/components/UsePullRefresh'

Vue.use(Router)

export default new Router({
  mode: 'history', // 访问路径不带井号
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/map',
      name: 'map',
      component: resolve => require(['@/components/map'], resolve)
    },
    {
      path: '/mapDingwei',
      name: 'mapDingwei',
      component: resolve => require(['@/components/mapDingwei'], resolve)
    },
    {
      path: '/Order/:id',
      name: 'Order',
      component: resolve => require(['@/components/Order'], resolve)
    },
    {
      path: '/UsePullRefresh',
      name: 'UsePullRefresh',
      component: UsePullRefresh
    }
  ]
})
