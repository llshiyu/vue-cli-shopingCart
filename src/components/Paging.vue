<template>
  <div class="page-bar-container flex-center">
    <ul class="page-bar-ul flex-center">
      <li class="page-bar-li home-page text_blue pointer" @click="goTag(1)">{{$t('basePageBar.index')}}</li>
      <li class="page-bar-li base-paging before-page base-next-page pointer" @click="clickToGoBefore"><<</li>
      <template v-for="(item,index) in computedTabArr">
        <li class="page-bar-li base-paging paging pointer"
            :class="{'select-page':item == selectIndex}"
            v-if="item!==-1"
            @click="clickTag(item)"
            :key="index"
        >
          {{item}}
        </li>
        <li v-if="item===-1" class="page-bar-li base-paging paging pointer" :key="index">
          ...
        </li>
      </template>
      <li class="page-bar-li base-paging after-page base-next-page pointer" @click="clickToGoAfter">>></li>

      <li class="page-bar-li jump">
        <input type="text" class="jump-input" v-model="inputTag">
        <span class="jump-button text_blue pointer" @click="clickGo">Go</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: {
    maxPage: {
      type: Number,
      default: 1,
      required: true,
    },// 页面总数
    initDisplay: {
      type: Number,
      default: 3,
    },// 开始和最后显示的页签数量
    currentDisplay: {
      type: Number,
      default: 1
    }, // 当前页前后显示的页签数量
    selectIndex: {
      type: Number,
      default: 1,
      required: true,
    },// 当前显示的页签
    clickChangePage: {
      type: Function,
      require: true,
    } // 点击选择的函数
  },
  data() {
    return {
      tabArr: [], // 页签显示数组
      selected: this.selectIndex, // 当前选择页签
      inputTag: 1, //输入的tag
    }
  },
  created() {

  },
  //计算
  computed: {
    computedTabArr() {
      let ans = []
      // 开始最大页签
      let beginPage = Math.min(this.initDisplay, this.maxPage)
      // 结束最大页签
      let endPage = Math.max(this.maxPage - this.initDisplay + 1, beginPage + 1)

      // 开始页签
      for (let i = 1; i <= beginPage; i++) {
        ans.push(i)
      }

      // 选择的页签前n个
      let beforeSelectIndex = this.selectIndex - this.currentDisplay
      // 选择的页签后n个
      let afterSelectIndex = this.selectIndex + this.currentDisplay

      // 如果中间前面有...
      if (beforeSelectIndex > beginPage + 1 && beforeSelectIndex < endPage) {
        ans.push(-1)
      }

      // 如果选择页签之前的页数
      if (this.selectIndex - 1 > beginPage && beforeSelectIndex < endPage) {
        for (let i = Math.max(beforeSelectIndex, beginPage + 1); i < Math.min(this.selectIndex, endPage); i++) {
          ans.push(i)
        }
      }
      // 如果选择的页签在中间
      if (this.selectIndex > beginPage && this.selectIndex < endPage) {
        ans.push(this.selectIndex)
      }

      // 如果选择页签之后的页数
      if (this.selectIndex + 1 < endPage && afterSelectIndex > beginPage) {
        for (let i = Math.max(this.selectIndex + 1, beginPage + 1); i <= Math.min(afterSelectIndex, endPage - 1); i++) {
          ans.push(i)
        }
      }

      // 如果中间后面有...
      if (afterSelectIndex < endPage - 1 && afterSelectIndex > beginPage) {
        ans.push(-1)
      }

      // 如果选择的页签在里面
      if ((afterSelectIndex <= beginPage || beforeSelectIndex >= endPage) && beginPage < endPage - 1) {
        ans.push(-1)
      }

      // 结束页签
      if (beginPage < this.maxPage) {
        for (let i = endPage; i <= this.maxPage; i++) {
          ans.push(i)
        }
      }

      // console.warn('this is all data', `beginPage:${beginPage}, endPage:${endPage}, beforeSelectIndex:${beforeSelectIndex}, afterSelectIndex:${afterSelectIndex}`)

      return ans
    }
  },
  methods: {
    // 点击分页
    clickTag(item) {
      if (item === this.selectIndex) return
      this.goTag(item)
    },
    // 去某一页
    goTag(item) {
      if (item === this.selectIndex) return
      this.clickChangePage(item)
      this.inputTag = item
    },
    // 点击Go
    clickGo() {
      let tag = parseInt(this.inputTag)
      if (!tag) return
      if (tag <= 0) tag = 1
      if (tag > this.maxPage) tag = this.maxPage
      if (tag === this.selectIndex) return
      this.goTag(tag)
    },
    // 点击下一页
    clickToGoBefore() {
      let index = this.selectIndex - 1
      if (index <= 0) return
      this.goTag(index)
    },
    // 点击上一页
    clickToGoAfter() {
      let index = this.selectIndex + 1
      if (index > this.maxPage) return
      this.goTag(index)
    }
  }
}
</script>

<style scoped>
  .page-bar-container {
    width: 100%;
    position: relative;
    padding: 10px 0;
    color: #7f7f7f;
  }

  .page-bar-ul {

  }

  .page-bar-li {
    margin: 0 3px;
  }

  .base-paging {
    text-align: center;
    border: 1px solid #e6e6e6;
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    border-radius: 4px;
    background-color: #fff;
  }

  .paging {

  }

  .select-page {
    background-color: #54ceed;
    color: #fff;
  }

  .base-next-page {

  }

  .before-page {

  }

  .jump-input {
    width: 30px;
    height: 26px;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    margin-right: 2px;
  }


</style>
