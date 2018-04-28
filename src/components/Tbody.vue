<template>
  <tbody>
  <tr>
    <td class="text-left" :class="{'checked':content.checked}">
      <input type="checkbox" :checked="content.checked" @click="selectProduct(content)">
    </td>
    <td>{{content.title}}</td>
    <td>{{content.price | money}}</td>
    <td>
      <span class="input-a" @click="changeMoney(content, -1)">-</span>
      <input type="number" v-model="content.num" class="number-input"/>
      <span class="input-a" @click="changeMoney(content, 1)">+</span>
    </td>
    <td>{{content.price * content.num | money('元')}}</td>
    <td @click="showPop"><a href="javascript:;">删除</a></td>
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
  components: {

  },
  filters: {
    money (value, type) {
      value = value * 1
      return type ? (value.toFixed(2) + type) : ('￥' + value.toFixed(2))
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    handleDelete () {
      this.$emit('deleteShop', this.index)
    },
    changeMoney (product, way) {
      if (way > 0) {
        product.num++
      } else {
        product.num--
        if (product.num < 1) {
          product.num = 1
        }
      }
      this.$emit('calcTotalMoney')
    },
    selectProduct (item) {
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      this.$emit('calcTotalMoney')
      this.$emit('isSelectAll')
    },
    showPop () {
      this.$store.state.showDeleteFlag = true
      this.$store.state.deleteId = this.index
    }
  },
  computed: {
    showDeleteFlag () {
      return this.$store.state.showDeleteFlag
    },
    deleteId () {
      return this.$store.state.deleteId
    }
  }
}
</script>

<style scoped>
  .number-input {
    width: 40px;
    text-align: center;
    margin: 0 10px;
  }

  .input-a {
    text-decoration: none;
    color: #666;
    cursor: pointer;
  }

  .input-a:hover {
    color: #ff0000;
  }
</style>
