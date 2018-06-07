<template>
  <div class="search-container content-wrap">
    <div class="search-input-box">
      <input class="keyword-input" v-model="searchOptions.keyword" placeholder="在结果中查询">
      <span class="search-btn" @click="searchAjax()">搜索</span>
    </div>
    <div class="search-up">
      <div class="search-upOut" v-for="(search,searchIndex) of searchList" :key="searchIndex">
        <div class="search-upOut-title">{{search.label}}：</div>
        <div class="search-upOut-wrap">
          <span class="search-upOut-item"
                :class="searchOptions.filter[search.fieldName] && searchOptions.filter[search.fieldName].length ? '':'search-upOut-itemInChose'"
                @click="chooseAll(search.fieldName)">不限</span>
          <div class="search-upOut-item"
               v-for="(list,listIndex) of search.list"
               :key="listIndex"
               :class="searchOptions.filter[search.fieldName] && searchOptions.filter[search.fieldName].indexOf(list.deptId) > -1 ? 'search-upOut-itemInChose':''"
               @click="addSearchFilter(search.fieldName, list.deptId)">
            {{list.deptName}}
            <i
              :class="searchOptions.filter[search.fieldName] && searchOptions.filter[search.fieldName].indexOf(list.deptId) > -1 ? 'search-upOut-itemInChoseX' : 'search-upOut-itemInX'"
              >×</i>
          </div>
        </div>
        <div class="search-upOut-addMore unvisible">
          <span class="search-upOut-addMore">更多<i class="arrow-up"></i></span>
          <span class="search-upOut-addMore">收起<i class="arrow-down"></i></span>
        </div>
      </div>
    </div>

    <div class="search-down">
      <div class="search-down-left">
        <div class="search-down-title">排序方式：</div>
        <div class="search-down-left-wrap">
          <span class="search-down-left-item"
                :class="searchOptions.order.label ? '' : 'search-upOut-itemInChose'"
                @click="removeSearchOrder()">默认</span>
          <div class="search-down-left-item"
               v-for="(order,index) of orderList" :key="index"
               :class="searchOptions.order.fieldName === order.fieldName ? 'search-upOut-itemInChose' : ''"
               @click="addSearchOrder(order)">
            <span>{{order.label}}</span>
            <i :class="order.rank === 1 ? 'arrow-desc' : 'arrow-asc'"></i>
          </div>
        </div>
      </div>
      <div class="search-down-right">
        <div class="search-down-right-btn">
          <span class="search-down-right-btn-in" @click="searchAjax()">查询</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchData from '../data/searchData.json';
import {deepCopy} from "../assets/js/util";

export default {
  name: 'search',
  computed: {},
  props: {},
  data () {
    return {
      searchList: [],
      orderList: [],
      searchOptions: {
        keyword: '', // 搜索字段
        filter: {}, // 分类
        order: {} // 排序
      }
    }
  },
  mounted () {
    this.searchList = searchData.data
    this.orderList = deepCopy(searchData.order) // 深拷贝  浅拷贝 B变A也变  深拷贝 B变A不变
    // order.rank  1降序desc 2升序asc
    console.log('mounted searchList', this.searchList, this.orderList)
  },
  methods: {
    addSearchFilter (filterName, value) {
      if (!this.searchOptions.filter[filterName]) {
        this.searchOptions.filter[filterName] = []
      }
      if (this.searchOptions.filter[filterName].indexOf(value) < 0) {
        this.searchOptions.filter[filterName].push(value)
        this.searchAjax()
      } else {
        this.removeSearchFilter(filterName, value)
      }
    }, // 添加搜索项
    removeSearchFilter (filterName, value) {
      let index = this.searchOptions.filter[filterName].indexOf(value)
      this.searchOptions.filter[filterName].splice(index, 1)
      this.searchAjax()
    }, // 移除搜索项
    chooseAll (filterName) {
      this.searchOptions.filter[filterName] = []
      this.searchAjax()
    }, // 选择无限
    addSearchOrder (order) {
      order.rank = order.rank === 1 ? 2 : 1
      this.searchOptions.order = {
        label: order.label,
        fieldName: order.fieldName,
        rank: order.rank
      }
      this.searchAjax()
    }, // 添加排序项
    removeSearchOrder () {
      this.searchOptions.order = {}
      this.searchAjax()
    }, // 去掉排序项
    searchAjax () {
      this.$forceUpdate()
      console.log('searchAjax searchOptions', this.searchOptions)
    } // 搜索发Ajax
  }
}
</script>

<style scoped lang="less">
  .unvisible {
    visibility: hidden;
  }

  .content-wrap {
    width: 1000px;
    margin: 0 auto;
  }

  .search-container {
    .search-input-box {
      padding: 10px 0 26px;
      text-align: center;
      .keyword-input {
        width: 500px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #E2E5EE;
        border-radius: 2px;
        padding-left: 6px;
        font-size: 14px;
        /*color: #2B3642;*/
        letter-spacing: 0;
        &::placeholder {
          opacity: 0.5;
          font-size: 14px;
          color: #3A4E64;
        }
      }
      .search-btn {
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: #3F94FC;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        display: inline-block;
        cursor: pointer;
        margin-left: -4px;
      }
    }
    .search-up {
      padding: 20px 30px 0 18px;
      background: #F8F9FC;
      border: 1px solid #E2E5EE;
      border-radius: 1px;
      .search-upOut {
        overflow: hidden;
        position: relative;
        margin-bottom: 10px;
        text-align: left;
        .search-upOut-title {
          display: inline-block;
          vertical-align: top;
          font-size: 16px;
          color: #3A4E64;
          line-height: 16px;
          width: 80px;
          text-align: right;
          margin-right: 11px;
          margin-top: 3px;
        }
        .search-upOut-wrap {
          width: 700px;
          display: inline-block;
          margin-right: 10px;
          /*text-align: left;*/
        }
        .search-upOut-item {
          display: inline-block;
          font-size: 14px;
          color: #2B3642;
          line-height: 14px;
          position: relative;
          margin-right: 24px;
          padding: 3px 17px 3px 6px;
          cursor: pointer;
          margin-bottom: 10px;
          &:first-child {
            padding-right: 6px !important;
          }
        }
        .search-upOut-addMore {
          float: right;
          font-size: 14px;
          color: #2B3642;
          letter-spacing: 0;
          line-height: 14px;
          margin-top: 2px;
          cursor: pointer;
        }
      }
      .arrow-up {
        display: inline-block;
        vertical-align: top;
        border-top: 5px solid #3F94FC;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        content: '';
        margin-top: 4px;
        margin-left: 9px;
      }
      .arrow-down {
        display: inline-block;
        vertical-align: top;
        border-bottom: 5px solid #3F94FC;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        content: '';
        margin-top: 4px;
        margin-left: 9px;
      }

      .search-upOut-itemInX {
        opacity: 0;
        position: absolute;
        top: 3px;
        right: 5px;
      }
      .search-upOut-itemInChoseX {
        color: white;
        opacity: 1;
        position: absolute;
        top: 3px;
        right: 5px;
      }
    }
    .search-down {
      /*padding: 21px 22px 23px 17px;*/
      padding-left: 18px;
      background: #F8F9FC;
      border: 1px solid #E2E5EE;
      border-radius: 1px;
      margin-top: 20px;
      text-align: left;
      .search-down-left {
        display: inline-block;
        .search-down-title {
          margin-top: 23px;
          display: inline-block;
          vertical-align: top;
          font-size: 16px;
          color: #3A4E64;
          line-height: 16px;
          width: 80px;
          text-align: right;
          margin-right: 11px;
        }
        .search-down-left-wrap {
          display: inline-block;
          font-size: 14px;
          color: #3A4E64;
          line-height: 14px;
        }
        .search-down-left-item {
          display: inline-block;
          font-size: 14px;
          color: #2B3642;
          line-height: 14px;
          position: relative;
          padding: 3px 6px;
          cursor: pointer;
          margin: 20px 16px 20px 0;
        }
        .search-down-left-itemChose {
          margin-left: 20px;
          background-color: #3F94FC;
          padding: 5px 10px;
          color: white;
        }
      }
      .search-down-right {
        float: right;
        padding-top: 15px;
        .search-down-right-time {
          display: inline-block;
          margin-left: 15px;
          position: relative;
        }
        .search-down-right-time-title {
          display: inline-block;
          margin-right: 5px;
          font-size: 14px;
          color: #3A4E64;
          line-height: 14px;
        }
        .search-down-right-btn {
          display: inline-block;
          margin-left: 19px;
          margin-right: 22px;
          cursor: pointer;
        }
        .search-down-right-btn-in {
          background-color: #3F94FC;
          padding: 5px 17px;
          border-radius: 2px;
          color: #ffffff;
        }
      }
    }
    .over-height-hidden {
      height: 30px;
    }
    .arrow-desc {
      background-image: url('../assets/img/arrow-desc.png');
      background-size: 100%;
      width: 5px;
      height: 14px;
      display: inline-block;
    }
    .arrow-asc {
      background-image: url('../assets/img/arrow-asc.png');
      background-size: 100%;
      width: 5px;
      height: 14px;
      display: inline-block;
    }
    .search-upOut-itemInChose {
      background-color: #3F94FC;
      color: #fff !important;
      .arrow-asc {
        background-image: url('../assets/img/arrow-asc-white.png');
      }
      .arrow-desc {
        background-image: url('../assets/img/arrow-desc-white.png');
      }
    }
  }
</style>
