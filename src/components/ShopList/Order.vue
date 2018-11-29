<template>
  <div>
    提交订单页
  </div>
</template>

<script>
export default {
  props: [],
  name: 'Order',
  data () {
    return {}
  },
  // 在 `methods` 对象中定义方法
  methods: {},
  mounted () {
    this.$nextTick(function () {
      console.log(this.$route.params.id)
    })
  }
}
</script>

<style scoped>

</style>
