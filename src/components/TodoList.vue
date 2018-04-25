<template>
  <div>
    <div class="list-box">
      <label for="shopTitle">商品名：<input type="text" v-model="shopTitle" id="shopTitle" /></label>
      <label for="shopNum">数量：<input type="number" v-model="shopNum" class="shop-num" id="shopNum"></label>
      <button @click="addShop">添加商品</button>
    </div>
    <table cellspacing="0">
      <thead v-if="shopList.length">
      <tr>
        <th class="text-left" width="100">选择</th>
        <th width="700">标题</th>
        <th width="200">数量</th>
        <th width="100">操作</th>
      </tr>
      </thead>
      <Tbody
      v-for="(item, index) of shopList"
      :content="item"
      :index="index"
      :key="index"
      @deleteShop="handleDetele"
      ></Tbody>
      <Tfooter v-show="shopList.length"></Tfooter>
    </table>
  </div>
</template>

<script>
import Tbody from './Tbody'
import Tfooter from './Tfooter'
export default {
  props: [],
  name: 'TodoList',
  components: {
    Tbody, Tfooter
  },
  data () {
    return {
      shopTitle: '',
      shopNum: '',
      shopList: []
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    addShop () {
      let list = {
        title: this.shopTitle,
        num: this.shopNum
      }
      this.shopList.push(list)
      this.shopTitle = ''
      this.shopNum = ''
    },
    handleDetele (index) {
      this.shopList.splice(index, 1)
    }
  },
  mounted () {
    console.log(this.shopList)
  }
}
</script>

<style scoped>
.list-box{
  margin: 60px 0;
}
.list-box label{
  margin: 0 10px;
}
  .shop-num{
    width: 60px;
  }
</style>
