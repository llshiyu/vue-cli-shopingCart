const root = {}
root.name = 'BasePageBar'

/*--------------------- props ----------------------*/
root.props = {}
// 页面总数
root.props.maxPage = {
  type: Number,
  default: 1,
  required: true,
}
// 开始和最后显示的页签数量
root.props.initDisplay = {
  type: Number,
  default: 3,
}
// 当前页前后显示的页签数量
root.props.currentDisplay = {
  type: Number,
  default: 1
}
// 当前显示的页签
root.props.selectIndex = {
  type: Number,
  default: 1,
  required: true,
}
// 点击选择的函数
root.props.clickChangePage = {
  type: Function,
  require: true,
}


/*--------------------- data ----------------------*/
root.data = function () {
  return {
    tabArr: [], // 页签显示数组
    selected: this.selectIndex, // 当前选择页签
    inputTag: 1, //输入的tag
  }
}


/*--------------------- 生命周期 ----------------------*/
root.created = function () {
}
/*--------------------- 计算 ----------------------*/
root.computed = {}
// 分页显示
root.computed.computedTabArr = function () {
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

/*--------------------- 方法 ----------------------*/
root.methods = {}

// 点击分页
root.methods.clickTag = function (item) {
  if (item === this.selectIndex) return
  this.goTag(item)
}

// 去某一页
root.methods.goTag = function (item) {
  if (item === this.selectIndex) return
  this.clickChangePage(item)
  this.inputTag = item
}
// 点击Go
root.methods.clickGo = function () {
  let tag = parseInt(this.inputTag)
  if (!tag) return
  if (tag <= 0) tag = 1
  if (tag > this.maxPage) tag = this.maxPage
  if (tag === this.selectIndex) return
  this.goTag(tag)
}

// 点击下一页
root.methods.clickToGoBefore = function () {
  let index = this.selectIndex - 1
  if (index <= 0) return
  this.goTag(index)
}

// 点击上一页
root.methods.clickToGoAfter = function () {
  let index = this.selectIndex + 1
  if (index > this.maxPage) return
  this.goTag(index)
}

export default root
