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
      <tbody>

      </tbody>
      <Tbody
      v-for="(item, index) of shopList"
      :content="item"
      :index="index"
      :key="index"
      @deleteShop="handleDetele"
      @calcTotalMoney="calcTotalPrice"
      @isSelectAll="isSelectAll"
      ></Tbody>
      <Tfooter v-show="shopList.length" :totalMoney="totalMoney" :checkAllFlag="checkAllFlag" @checkedAll="selectAll"></Tfooter>
    </table>
    <!--<Paging :maxPage="9" :initDisplay="3" :currentDisplay="1" :selectIndex="1" @clickChangePage="clickChangePage"></Paging>-->
    <MyPaging :totalNumber="maxTotalNumber" :selectShowNumber="pageShowTotal" :showMaxPages="4" :selectShowNumberList="[pageShowTotal, pageShowTotal+3, pageShowTotal+6]" @callBack="showPage"></MyPaging>
  </div>
</template>

<script>
import Tbody from './Tbody'
import Tfooter from './Tfooter'
// import Paging from './Paging'
import MyPaging from './MyPaging'
import cartData from '../data/cartData.json'
export default {
  props: [],
  name: 'TodoList',
  components: {
    Tbody, Tfooter, MyPaging
  },
  data () {
    return {
      shopTitle: '',
      shopNum: '',
      shopPrice: '',
      checkAllFlag: false,
      totalMoney: 0,
      shopList: [],
      maxTotalNumber: 100,
      pageShowTotal: 3 // 每页展示多少数据
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
      this.calcTotalPrice()
      this.isSelectAll()
    },
    handleDetele (index) {
      this.shopList.splice(index, 1)
    },
    init () {
      // console.log('一进页面就加载的函数，输出shopList', this.shopList)
      this.maxTotalNumber = cartData.result.list.length
      this.totalMoney = cartData.result.totalMoney
      this.showPage(1, this.pageShowTotal)
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
      this.calcTotalPrice()
    },
    calcTotalPrice () {
      let _this = this
      this.totalMoney = 0
      this.shopList.forEach(function (item, index) {
        if (item.checked) {
          _this.totalMoney += item.price * item.num
        }
      })
    },
    isSelectAll () {
      let listLength = this.shopList.length
      let checkNumber = 0
      this.shopList.forEach(function (item, index) {
        if (item.checked) {
          checkNumber++
        }
      })
      if (checkNumber === listLength) {
        this.checkAllFlag = true
      } else {
        this.checkAllFlag = false
      }
    },
    showPage (thisPage, thisPageNumber) {
      // console.log('thisPage: ', thisPage) // 当前第几页
      // console.log('thisPageNumber: ', thisPageNumber) // 每页展示几条数据
      let startIndex = this.checkPageNumber(1 + thisPageNumber * (thisPage - 1) ) - 1
      let endIndex = this.checkPageNumber(thisPageNumber * thisPage)
      // console.log('startIndex', startIndex)
      // console.log('endIndex', endIndex)
      this.shopList = []
      this.shopList = cartData.result.list.slice(startIndex, endIndex)
    },
    checkPageNumber (index) {
      // console.log('index', index)
      // console.log('this.maxTotalNumber ', this.maxTotalNumber)
      if (index < 1) {
        index = 1
      }
      if (index > this.maxTotalNumber) {
        index = this.maxTotalNumber
      }
      return index
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.init()
    })
  },
  created () { // 创建完毕状态
    this.init()
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
