<template>
  <div class="paging-container clearfix">
    <div class="fl">共10条</div>
    <div class="fl">共1页</div>
    <div class="select-box fl">
      <span class="select-text">每页显示</span>
      <select name="select">
        <option value="1">10</option>
        <option value="2">20</option>
      </select>
      <span class="select-text">条</span>
    </div>
    <ul class="fl">
      <li>首页</li>
      <li>上一页</li>
      <li>1</li>
      <li>下一页</li>
      <li>尾页</li>
    </ul>
    <div class="fl input-box">
      <input type="number" />
      <div class="btn">GO</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPaging'
}
</script>

<style scoped>
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
</style>
