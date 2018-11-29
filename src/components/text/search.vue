<style scoped>
  .search-container {
    /*margin-top: 25px;*/
  }

  .search-container .search-up {
    padding: 20px 30px 0 18px;
    background: #F8F9FC;
    border: 1px solid #E2E5EE;
    border-radius: 1px;
  }

  /*上*/
  .search-container .search-upOut {
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
  }

  .search-container .search-upOut-title {
    display: inline-block;
    vertical-align: top;
    font-family: PingFangSC-Medium, '微软雅黑';
    font-size: 16px;
    color: #3A4E64;
    line-height: 16px;
    width: 80px;
    text-align: right;
    margin-right: 11px;
    margin-top: 3px;
  }

  .search-container .search-upOut-wrap {
    width: 700px;
    display: inline-block;
    margin-right: 10px;
  }

  .search-container .search-upOut-item {
    display: inline-block;
    font-size: 14px;
    color: #2B3642;
    line-height: 14px;
    position: relative;
    margin-right: 24px;
    padding: 3px 17px 3px 6px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .search-container .search-upOut-item:first-child {
    padding-right: 6px !important;
  }

  .search-container .search-upOut-addMore {
    float: right;
    font-size: 14px;
    color: #2B3642;
    letter-spacing: 0;
    line-height: 14px;
    margin-top: 2px;
    cursor: pointer;
  }

  .search-container .arrow-up {
    display: inline-block;
    vertical-align: top;
    border-top: 5px solid #3F94FC;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: '';
    margin-top: 4px;
    margin-left: 9px;
  }

  .search-container .arrow-down {
    display: inline-block;
    vertical-align: top;
    border-bottom: 5px solid #3F94FC;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: '';
    margin-top: 4px;
    margin-left: 9px;
  }

  /*切换样式*/
  .search-container .search-upOut-itemInChose {
    background-color: #3F94FC;
    color: #fff !important;
  }

  .search-container .search-upOut-itemInX {
    opacity: 0;
    position: absolute;
    top: 9px;
    right: 8px;
  }

  .search-container .search-upOut-itemInChoseX {
    color: white;
    opacity: 1;
    position: absolute;
    top: 3px;
    right: 5px;
  }

  /*下*/
  .search-container .search-down {
    /*padding: 21px 22px 23px 17px;*/
    padding-left: 18px;
    background: #F8F9FC;
    border: 1px solid #E2E5EE;
    border-radius: 1px;
    margin-top: 20px;
  }

  .search-container .search-down-left {
    display: inline-block;
  }

  /*下左*/
  .search-container .search-down-title {
    margin-top: 23px;
  }

  .search-container .search-down-left-wrap {
    display: inline-block;
    font-size: 14px;
    color: #3A4E64;
    line-height: 14px;
  }

  .search-container .search-down-left-item {
    display: inline-block;
    font-size: 14px;
    color: #2B3642;
    line-height: 14px;
    position: relative;
    padding: 3px 6px;
    cursor: pointer;
    margin: 20px 16px 20px 0;
  }

  .search-container .search-down-left-itemChose {
    margin-left: 20px;
    background-color: #3F94FC;
    padding: 5px 10px;
    color: white;
  }

  /*下右*/
  .search-container .search-down-right {
    float: right;
    padding-top: 15px;
  }

  .search-container .search-down-right-time {
    display: inline-block;
    margin-left: 15px;
    position: relative;
  }

  .search-container .search-down-right-time-title {
    display: inline-block;
    margin-right: 5px;
    font-size: 14px;
    color: #3A4E64;
    line-height: 14px;
  }

  .search-container .search-down-right-btn {
    display: inline-block;
    margin-left: 19px;
    margin-right: 22px;
    cursor: pointer;
  }

  .search-container .search-down-right-btn-in {
    background-color: #3F94FC;
    padding: 5px 17px;
    border-radius: 2px;
    color: #ffffff;
  }

  .search-container .over-height-hidden {
    height: 30px;
  }

  .search-container .arrow-desc {
    background-image: url('../../module/static/img/arrow-desc.png');
    background-size: 100%;
    width: 5px;
    height: 14px;
    display: inline-block;
  }

  .search-container .arrow-asc {
    background-image: url('../../module/static/img/arrow-asc.png');
    background-size: 100%;
    width: 5px;
    height: 14px;
    background-size: 100%;
    display: inline-block;
  }

  .search-container .search-upOut-itemInChose .arrow-asc {
    background-image: url('../../module/static/img/arrow-asc-white.png');
  }

  .search-container .search-upOut-itemInChose .arrow-desc {
    background-image: url('../../module/static/img/arrow-desc-white.png');
  }

  .search-container .date-picker-wrap {
    display: inline-block;
    background: #FFFFFF;
    border: 1px solid #E2E5EE;
    border-radius: 2px;
    width: 226px;
    height: 30px;
  }

  .search-container .date-picker {
    display: inline-block;
    padding: 7px 12px 7px;
    opacity: 0.5;
    width: 94px;
    font-size: 14px;
    color: #3A4E64;
    line-height: 14px;
  }

  .search-container .mid {
    display: inline-block;
    font-size: 14px;
    color: #3A4E64;
    line-height: 14px;
    margin: 0 5px;
  }

  .search-container .date-picker-wrap-1 {
    display: inline-block;
  }

  /*搜索框*/
  .search-container .search-down-right-interface-name {
    padding: 10px 0 26px;
    text-align: center;
  }

  .search-container .keyword-input {
    width: 500px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #E2E5EE;
    border-radius: 2px;
    padding-left: 6px;
    font-size: 14px;
    /*color: #2B3642;*/
    letter-spacing: 0;
  }

  .search-container .keyword-input::placeholder {
    opacity: 0.5;
    font-size: 14px;
    color: #3A4E64;
  }

  .search-container .search-btn {
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
</style>
<template>
  <div class="search-container content-wrap">
    <div class="search-down-right-interface-name">
      <!--<span class="search-down-right-search-title">{{titleColumn.label}}</span>-->
      <input class="keyword-input" v-model="searchOptions.keyword" placeholder="在结果中查询">
      <span class="search-btn" @click="searchFunc">搜索</span>
    </div>
    <div class="search-up">
      <div class="search-upOut unvisible" v-for="(filter, index) of filters">
        <div class="search-upOut-title">{{filter.label}}：</div>
        <div class="search-upOut-wrap" :id="filter.fieldName">
          <span class="search-upOut-item"
                :class="[searchOptions.filter[filter.fieldName] && searchOptions.filter[filter.fieldName].length ? '' : 'search-upOut-itemInChose']"
                @click="choseAll(filter.fieldName)">不限</span>
          <div class="search-upOut-item"
               :class="[searchOptions.filter[filter.fieldName] && searchOptions.filter[filter.fieldName].indexOf(data.value) > -1 ? 'search-upOut-itemInChose' : '']"
               v-for="(data, index) of filterData[filter.fieldName]"
               @click="selectFilter($event, filter.fieldName, data.value)">
            {{data.label}}
            <i
              :class="searchOptions.filter[filter.fieldName] && searchOptions.filter[filter.fieldName].indexOf(data.value) > -1 ? 'search-upOut-itemInChoseX' : 'search-upOut-itemInX'">×</i>
          </div>
        </div>
        <div class="search-upOut-addMore" v-if="showAll[filter.fieldName] && showAll[filter.fieldName].needShow">
          <span v-if="!showAll[filter.fieldName].isShowAll" class="search-upOut-addMore"
                @click="popUp(filter.fieldName)">更多<i class="arrow-up"></i></span>
          <span v-if="showAll[filter.fieldName].isShowAll" class="search-upOut-addMore"
                @click="popUp(filter.fieldName)">收起<i class="arrow-down"></i></span>
        </div>
      </div>
    </div>

    <div class="search-down">
      <div class="search-down-left">
        <div class="search-upOut-title search-down-title">排序方式：</div>
        <div class="search-down-left-wrap">
          <span class="search-down-left-item" :class="[!searchOptions.order.label ? 'search-upOut-itemInChose' : '']"
                @click="chooseDefaultOrder">默认</span>
          <div class="search-down-left-item"
               :class="[searchOptions.order.label && searchOptions.order.label === item.label ? 'search-upOut-itemInChose' : '']"
               v-for="(item, index) of orderData" @click="selectOrder(item)">
            <span>{{item.label}}</span>
            <i :class="[item.rank === 1 ? 'arrow-desc' : 'arrow-asc']"></i>
          </div>
        </div>
      </div>
      <div class="search-down-right">
        <div class="search-down-right-time" v-if="true">
          <span class="search-down-right-time-title">更新时间</span>
          <div class="date-picker-wrap-1">
            <DatePicker type="date" v-model="searchOptions.beginTime" placeholder="开始时间"
                        style="width: 105px; display: inline-block;"></DatePicker>
            <span class="mid">至</span>
            <DatePicker type="date" v-model="searchOptions.endTimeTmp" placeholder="结束时间"
                        style="width: 105px; display: inline-block;"></DatePicker>
          </div>
          <!--<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
          <!--<div class="date-picker-wrap">-->
          <!--<div class="date-picker">{{searchOptions.beginTime}}</div>-->
          <!--<span class="mid">至</span>-->
          <!--<div class="date-picker" @click="showDatePicker('endTimeTmp')">{{searchOptions.endTimeTmp}}</div>-->
          <!--</div>-->
        </div>
        <div class="search-down-right-btn" @click="searchFunc">
          <span class="search-down-right-btn-in">查询</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {axiosPost} from '../../assets/ajax/model'
  import {addClass, removeClass, deepCopy} from '../../assets/js/util'
  import {FILTER_REQUEST_METHOD, FILTER_ORDER} from '../../module/pc/common/dictionary'

  export default {
    props: {
      keyword: {
        type: String,
        default: ''
      },
      filters: {
        type: Array,
        default: []
      },
      orderColumn: {
        type: Boolean,
        default: false
      },
      titleColumn: {
        type: Object,
        default: {}
      },
      searchFun: {
        type: Function,
      }
    },
    data() {
      return {
        FILTER_WRAP_DEFAULT_HEIGHT: 35, // 筛选行默认高度(比正常行高多5px，防止出现偏差)
        filterData: {},
        orderData: [],
        searchOptions: {
          filter: {},
          order: {},
          keyword: this.keyword,
          beginTime: '',
          endTimeTmp: '',
          endTime: '',
        },
        showAll: {}  //展开全部
      }
    },
    created() {

      // 筛选选项
      for (let filter of this.filters) {
        if (filter.label === '请求方式') {
          this.filterData[filter.fieldName] = FILTER_REQUEST_METHOD;
          this.needShowAllBtn(filter.fieldName);
        } else if (filter.label === '组织') {
          this.getFilterData('/user/organunit/getOrganunit', filter.fieldName)
        } else {
          this.getFilterData(filter.interface, filter.fieldName)
        }
      }
      // 排序
      this.orderDeal()
    },
    methods: {
      orderDeal() {
        this.orderData = deepCopy(FILTER_ORDER);
      },

      needShowAllBtn(fieldName) {
        let filterWrap, filterWrapHeight;
        this.showAll[fieldName] = {};
        setTimeout(() => {
          filterWrap = document.getElementById(fieldName);
          filterWrapHeight = filterWrap.clientHeight;
          if (filterWrapHeight > this.FILTER_WRAP_DEFAULT_HEIGHT) {
            this.showAll[fieldName].needShow = true;
            this.showAll[fieldName].isShowAll = false;
            addClass(filterWrap, 'over-height-hidden');
          }
          removeClass(filterWrap.parentElement, 'unvisible');
          this.$forceUpdate();
        }, 10);
      },

      getFilterData(interfaceURL, fieldName) {

        let result = [],
          fieldMap = {};

        axiosPost(interfaceURL, {}, (res) => {
          res = res || [];

          if (interfaceURL === '/data/serviceType/list') {
            fieldMap = {label: 'name', value: 'importId'};
          } else if (interfaceURL === '/user/organunit/getOrganunit') {
            fieldMap = {label: 'deptName', value: 'deptId'};
          } else if (interfaceURL === '/interface/serviceType/getServiceTypeList') {
            fieldMap = {label: 'name', value: 'importId'};
          }

          for (let i = 0, len = res.length, item; i < len, item = res[i]; i++) {
            result.push({
              label: item[fieldMap.label],
              value: item[fieldMap.value]
            })
          }
          this.filterData[fieldName] = result;
          this.$forceUpdate();

          // 判断是否显示“更多”按钮
          this.needShowAllBtn(fieldName)
        })
      },

      // 添加
      selectFilter(e, fieldName, value) {
        if (!this.searchOptions.filter[fieldName]) {
          this.searchOptions.filter[fieldName] = [];
        }

        // 点击标签，若该元素未选中，则选中
        if (this.searchOptions.filter[fieldName].indexOf(value) < 0) {
          this.searchOptions.filter[fieldName].push(value);
          this.$forceUpdate();
          this.searchFunc();
          // 若该元素已被选中，且点击的是删除图标，则删除
        } else if (e.target.tagName === 'I') {
          this.cancelFilter(fieldName, value);
        }
      },

      // 删除
      cancelFilter(fieldName, value) {
        if (!this.searchOptions.filter[fieldName] || !this.searchOptions.filter[fieldName].length) {
          return false;
        }
        let index = this.searchOptions.filter[fieldName].indexOf(value);
        this.searchOptions.filter[fieldName].splice(index, 1)
        this.$forceUpdate();
        this.searchFunc();
      },

      selectOrder(item) {
        item.rank = item.rank === 1 ? 2 : 1;
        this.searchOptions.order = {
          label: item.label,
          fieldName: item.fieldName,
          rank: item.rank
        };
        this.$forceUpdate();
        this.searchFunc();
      },

      chooseDefaultOrder() {
        this.searchOptions.order = {};
        this.orderDeal();
        this.$forceUpdate();
        this.searchFunc();
      },

      // 搜索回调
      searchFunc() {
        if (this.searchOptions.endTimeTmp) {
          this.searchOptions.endTime = this.searchOptions.endTimeTmp.getTime() + 86399000
        }
        if (this.searchOptions.beginTime && this.searchOptions.endTime && this.searchOptions.endTime < this.searchOptions.beginTime) {
          this.$Message.error('结束时间不能早于开始时间')
          return;
        }
        if (this.searchFun && typeof this.searchFun === 'function') {
          this.searchFun(this.searchOptions);
        }
      },
      popUp(fieldName) {
        //展开更多
        let filterWrap = document.getElementById(fieldName);
        if (this.showAll[fieldName].isShowAll) {
          this.showAll[fieldName].isShowAll = false;
          addClass(filterWrap, 'over-height-hidden');
        } else {
          this.showAll[fieldName].isShowAll = true;
          removeClass(filterWrap, 'over-height-hidden');
        }
        this.$forceUpdate()
      },

      choseAll(fieldName) {
        this.searchOptions.filter[fieldName] = [];
        this.$forceUpdate();
        this.searchFunc();
      }
    },
    watch: {
      keyword(newValue, oldValue) {
        this.$set(this.searchOptions, 'keyword', newValue)
      }
    },
  }
</script>
