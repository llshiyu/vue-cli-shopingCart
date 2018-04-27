import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'vuex variable 全局变量'
  }
})
export default store
