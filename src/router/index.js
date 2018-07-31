import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Order from '@/components/Order'
import UsePullRefresh from '@/components/UsePullRefresh'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 访问路径不带井号,没有后台加这句会出问题，空白页面。
  // 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path:'/Video',
      name:'Video',
      component: resolve => require(['@/components/Video'], resolve)
    },
    {
      path:'/Soduku',
      name:'Soduku',
      component: resolve => require(['@/components/Soduku'], resolve)
    } // 数独
  ]
})
