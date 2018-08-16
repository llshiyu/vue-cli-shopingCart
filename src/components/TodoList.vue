<template>
  <div>
    <div class="list-box">
      <label for="shopTitle">商品名：<input type="text" v-model="shopTitle" id="shopTitle" /></label>
      <label for="shopNum">数量：<input type="number" v-model="shopNum" class="shop-num" id="shopNum"></label>
      <label for="shopPrice">单价：<input type="number" v-model="shopPrice" class="shop-price" id="shopPrice"></label>
      <button @click="addShop()">添加商品</button>
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
      @calcTotalMoney="calcTotalPrice"
      @isSelectAll="isSelectAll"
      ></Tbody>
      <Tfooter v-show="shopList.length" :totalMoney="totalMoney" :checkAllFlag="checkAllFlag" @checkedAll="selectAll"></Tfooter>
    </table>
    <PopUps @delShop="clickDelShop"></PopUps>
    <!--<Paging :maxPage="9" :initDisplay="3" :currentDisplay="1" :selectIndex="1" @clickChangePage="clickChangePage"></Paging>-->
    <MyPaging :totalNumber="maxTotalNumber" :pageShowTotal="pageShowTotal" :showMaxPages="4" :selectShowNumberList="[pageShowTotal, pageShowTotal+3, pageShowTotal+6]" @callBack="showPage"></MyPaging>
  </div>
</template>

<script>
import Tbody from './Tbody'
import Tfooter from './Tfooter'
import PopUps from './PopUps'
// import Paging from './Paging'
import MyPaging from './MyPaging'
import cartData from '../data/cartData.json'
export default {
  props: [],
  name: 'TodoList',
  components: {
    Tbody, Tfooter, MyPaging, PopUps
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
      thisPage: 1, // 当前第几页
      pageShowTotal: 3 // 每页展示多少数据
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    addShop () {
      let list = {
        title: this.shopTitle,
        num: this.shopNum,
        price: this.shopPrice,
        id: '2991919191'
      }
      // this.shopList.push(list)
      this.cartData.result.list.push(list)
      this.shopTitle = ''
      this.shopNum = ''
      this.shopPrice = ''
      this.calcTotalPrice()
      this.isSelectAll()
      this.showPage(this.thisPage, this.pageShowTotal)
    },
    init () {
      // console.log('一进页面就加载的函数，输出shopList', this.shopList)
      this.cartData = cartData
      this.$http.get('static/cartData.json').then((res)=>{
        console.log(res,999)
      })
      this.maxTotalNumber = this.cartData.result.list.length
      this.totalMoney = this.cartData.result.totalMoney
      this.showPage(this.thisPage, this.pageShowTotal)
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
      this.thisPage = thisPage
      this.maxTotalNumber = this.cartData.result.list.length
      let startIndex = this.checkPageNumber(1 + thisPageNumber * (thisPage - 1)) - 1
      let endIndex = this.checkPageNumber(thisPageNumber * thisPage)
      this.shopList = []
      this.shopList = this.cartData.result.list.slice(startIndex, endIndex)
      this.calcTotalPrice()
      this.isSelectAll()
    },
    checkPageNumber (index) {
      if (index < 1) {
        index = 1
      }
      if (index > this.maxTotalNumber) {
        index = this.maxTotalNumber
      }
      return index
    },
    clickDelShop () {
      let delId = this.$store.state.deleteId
      for (let i = 0; i < this.cartData.result.list.length; i++) {
        if (this.cartData.result.list[i].id === delId) {
          this.cartData.result.list.splice(i, 1)
          this.$store.state.showDeleteFlag = false
          this.showPage(this.thisPage, this.pageShowTotal)
        }
      }
    }
    // clickChangePage () {
    // }
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
