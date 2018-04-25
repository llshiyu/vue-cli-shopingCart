<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoList from './TodoList'
export default {
  name: 'Home',
  components: {
    TodoList
  },
  data () {
    return {
      msg: 'Welcome to shoping cart'
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
