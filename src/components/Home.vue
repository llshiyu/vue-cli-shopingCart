<template>
  <div class="hello" id="printContent">
    <router-link to="/sudoku">Sudoku</router-link>
    <router-link to="/2048">2048</router-link>
    <router-link to="/snake">贪吃蛇</router-link>
    <router-link to="/tetris">俄罗斯方块</router-link>
    <router-link to="/airplain">飞机大战</router-link>
    <router-link to="/poker">Poker</router-link>
    <router-link to="/map">Map</router-link>
    <router-link to="/mapDingwei">MapDingwei</router-link>
    <router-link to="/monacoIndex">MonacoEditor</router-link>
    <router-link to="/usePullRefresh">UsePullRefresh</router-link>

    <h1>{{ msg }}</h1>
    <h2>{{author}}</h2>
    <Search></Search>
    <TodoList></TodoList>
    <button @click="printHtml()" class="no-print">打印</button>
  </div>
</template>

<script>
import TodoList from './ShopList/TodoList'
import Search from './ShopList/Search'
import '../assets/js/Print'
export default {
  name: 'Home',
  components: {
    TodoList, Search
  },
  data () {
    return {
      msg: 'Welcome to shoping cart'
    }
  },
  computed: {
    author () {
      return this.$store.state.author
    }
  },
  methods:{
    printHtml(){
      Print('#printContent', {
        loadCSS:['/static/a.css'],
        pageTitle:'',
        onStart: function () {
          console.log('onStart', new Date())
        },
        onEnd: function () {
          console.log('onEnd', new Date())
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
