<template>
  <div class="hello">
    <img src="../assets/img/logo.png">
    <router-link to="/Login">去登录</router-link>
    <br>
    <router-link to="/h5camera">调用移动端拍照以及打开相册裁剪功能</router-link>
    <router-link to="/Soduku">玩数独</router-link>
    <router-link to="/Video">go video</router-link>
    <h1>{{ msg }}</h1>
    <h2>{{author}}</h2>
    <Search></Search>
    <TodoList></TodoList>
    <router-link to="/UsePullRefresh">go11</router-link>
  </div>
</template>

<script>
import TodoList from './TodoList'
import Search from './Search'
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
