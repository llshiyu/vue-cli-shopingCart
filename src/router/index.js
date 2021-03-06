import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Order from '@/components/Order'
import UsePullRefresh from '@/components/RefreshPage/UsePullRefresh'

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
      path: '/monacoIndex',
      name: 'monacoIndex',
      component: resolve => require(['@/components/MonacoEditor/index'], resolve)
    }, // MonacoEditor 代码编辑器
    {
      path: '/sudoku',
      name: 'sudoku',
      component: resolve => require(['@/components/Sudoku/index'], resolve)
    }, // 数独
    {
      path: '/poker',
      name: 'poker',
      component: resolve => require(['@/components/Poker/test'], resolve)
    }, // 翻盘找相同
    {
      path: '/2048',
      name: '2048',
      component: resolve => require(['@/components/2048/index'], resolve)
    }, // 2048
    {
      path: '/snake',
      name: 'snake',
      component: resolve => require(['@/components/Snake/index'], resolve)
    }, // 贪吃蛇
    {
      path: '/tetris',
      name: 'tetris',
      component: resolve => require(['@/components/Tetris/index'], resolve)
    }, // 俄罗斯方块

    {
        path: '/airplain',
        name: 'airplain',
        component: resolve => require(['@/components/Airplain/index'], resolve)
    }, // 飞机大战
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
      component: resolve => require(['@/components/ShopList/Order'], resolve)
    },
    {
      path: '/usePullRefresh',
      name: 'usePullRefresh',
      component: UsePullRefresh
    }
  ]
})
