<template>
  <div>
    <div class="list-box">
      <label for="shopTitle">商品名：<input type="text" v-model="shopTitle" id="shopTitle" /></label>
      <label for="shopNum">数量：<input type="number" v-model="shopNum" class="shop-num" id="shopNum"></label>
      <label for="shopPrice">单价：<input type="number" v-model="shopPrice" class="shop-price" id="shopPrice"></label>
      <button @click="addShop">添加商品</button>
    </div>
    <table cellspacing="0">
      <thead v-if="shopList.length">
      <tr>
        <th class="text-left" width="100">选择</th>
        <th width="500">商品</th>
        <th width="200">单价</th>
        <th width="200">数量</th>
        <th width="200">总价</th>
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
      <Tfooter v-show="shopList.length" :checkAllFlag="checkAllFlag" @checkedAll="selectAll"></Tfooter>
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
      shopPrice: '',
      checkAllFlag: false,
      shopList: [
        {
          title: '商品名',
          num: 20,
          price: 11
        }
      ]
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    addShop () {
      let list = {
        title: this.shopTitle,
        num: this.shopNum,
        price: this.shopPrice
      }
      this.shopList.push(list)
      this.shopTitle = ''
      this.shopNum = ''
      this.shopPrice = ''
    },
    handleDetele (index) {
      this.shopList.splice(index, 1)
    },
    init () {
      console.log('一进页面就加载的函数，输出shopList', this.shopList)
    },
    selectAll (isCheck) {
      this.checkAllFlag = isCheck
      let _this = this
      this.shopList.forEach(function (item, index) {
        if (typeof item.checked === 'undefined') {
          _this.$set(item, 'checked', _this.checkAllFlag)
        } else {
          item.checked = _this.checkAllFlag
        }
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.init()
    })
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
  .shop-price{
    width: 60px;
  }
</style>
