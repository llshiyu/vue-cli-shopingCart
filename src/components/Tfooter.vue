<template>
  <tr class="table-footer">
    <td class="text-left" :bind="{'checked':checkAllFlag}">
      <label for="selectAll" class="select-all"><input :checked="checkAllFlag" type="checkbox" id="selectAll" @click="selectAll"> 全选</label>
    </td>
    <td colspan="5">
      <span>总价：{{totalMoney | money}}</span>
      <button>立即购买</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['checkAllFlag', 'totalMoney'],
  name: 'Tfooter',
  data () {
    return {}
  },
  filters: {
    money (value, type) {
      value = value * 1
      return type ? (value.toFixed(2) + type) : ('￥' + value.toFixed(2))
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    selectAll () {
      let newCheckAllFlag = !this.checkAllFlag
      this.$emit('checkedAll', newCheckAllFlag)
    }
  }
}
</script>

<style scoped>
.select-all,button{
  cursor: pointer;
}
.select-all:hover{
  color: #ff0000;
}
  button{
    margin-left: 10px;
  }
</style>
