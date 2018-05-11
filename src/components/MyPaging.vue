<template>
  <div class="paging-container clearfix">
    <div class="cont-box">共{{totalNumber}}条</div>
    <div class="cont-box">共{{totalPages}}页</div>
    <div class="select-box cont-box">
      <span class="select-text">每页显示</span>
      <select name="select" v-model="selectShowNumber" @change="calculateTotalPage">
        <option :value="item" v-for="(item,index) of selectShowNumberList" :key="index">{{item}}</option>
      </select>
      <span class="select-text">条</span>
    </div>
    <div class="li-box cont-box">
      <div class="clearfix">
        <div class="fl li-div" @click="clickPage(1)">首页</div>
        <div class="fl li-div" @click="clickPage(checkPage(thisPage-1))">上一页</div>
        <div class="fl li-ul-box">
          <ul class="clearfix">
            <li class="fl" :class="{'active':showActiveIndex===item}" @click="clickPage(item)" v-for="item of totalPages>showMaxPages ? showMaxPages : totalPages" :key="item">{{item}}</li>
          </ul>
        </div>
        <div class="fl li-div" @click="clickPage(checkPage(thisPage+1))">下一页</div>
        <div class="fl li-div" @click="clickPage(totalPages)">尾页</div>
      </div>
    </div>
    <div class="input-box cont-box">
      <input type="number" class="" v-model="inputVal"/>
      <div class="btn" @click="clickPage(checkPage(inputVal))">GO</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPaging',
  props: {
    totalNumber: {
      type: Number,
      default: 1
    }, // 总条数
    totalPages: {
      type: Number,
      default: 1
    }, // 总页数
    showMaxPages: {
      type: Number,
      default: 1
    }, // 最多展示几个页数的按钮
    selectShowNumberList: {
      default: [10, 20, 30, 40]
    } // 选择一页展示多少条
  },
  data () {
    return {
      // selectShowNumberList: [10, 20, 30, 40], // 选择一页展示多少条
      selectShowNumber: 10, // 默认一页展示10条,select框的value值
      showActiveIndex: 1, // 页码样式index
      thisPage: 1, // 当前选中页数
      inputVal: 1 // 输入框指定去第几页
    }
  },
  computed: {

  },
  methods: {
    calculateTotalPage () { // 计算总页数
      this.totalPages = parseInt(this.totalNumber / this.selectShowNumber)
    },
    clickPage (index) {
      this.showActiveIndex = index * 1
      this.thisPage = index * 1
      this.inputVal = index * 1
    },
    checkPage (index) {
      if (index < 1) {
        index = 1
      }
      if (index > this.totalPages) {
        index = this.totalPages
      }
      return index
    }
  }
}
</script>

<style lang="less" scoped>
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .paging-container{
    font-size: 14px;
    color: #777E8C;
    letter-spacing: 0;
    line-height: 30px;
    text-align: right;
    width: 80%;
    margin: 10px auto;
    .cont-box{
      float: left;
      margin-right: 10px !important;
    }
    .select-box{
      select{
        background: #FFFFFF;
        border: 1px solid #EAEDF1;
        border-radius: 2px;
        margin: 0 6px;
        height: 30px;
        text-align: center;
        padding: 0 10px;
        outline: none;
      }
    }
    .li-box{
      .li-div,li{
        list-style: none;
        padding: 8px 10px;
        line-height: 10px;
        background: #FFFFFF;
        border: 1px solid #EAEDF1;
        border-radius: 2px 0 0 2px;
        cursor: pointer;
      }
      .li-ul-box{
        ul{
          padding: 0;
          margin: 0;
          li.active{
            color: #3F94FC;
            border-color: #3F94FC;
          }
        }
      }
    }
    .input-box{
      input{
        padding: 8px 10px;
        width: 48px;
        height: 10px;
        line-height: 10px;
        margin-right: 6px;
      }
      .btn{
        display: inline-block;
        background: #3F94FC;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }
</style>
