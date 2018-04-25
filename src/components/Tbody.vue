<template>
  <tbody>
  <tr>
    <td class="text-left"><input type="checkbox"></td>
    <td>{{content.title}}</td>
    <td>{{content.num}}</td>
    <td @click="handleDelete"><a href="javascript:;">删除</a></td>
  </tr>
  </tbody>
</template>

<script>
export default {
  props: ['content', 'index'],
  name: 'Tbody',
  data () {
    return {}
  },
  // 在 `methods` 对象中定义方法
  methods: {
    handleDelete () {
      this.$emit('deleteShop', this.index)
    }
  }
}
</script>

<style scoped>

</style>
