<template>
  <div class="pop-box" v-if="ifShow">
    <div class="pop">
      <div class="pop-content">{{popCont}}</div>
      <div class="pop-btn-box clearfix">
        <div class="btn-define fl btn">确定</div>
        <div class="btn-close fl btn">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['ifShow'],
    name: 'PopUps',
    data () {
      return {
        popCont: '确定要删除弹窗吗？'
      }
    }
  }
</script>

<style scoped>
.pop-box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
}
  .pop{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    height: 400px;
    background: #fff;
    text-align: center;
  }
  .btn{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #2c3e50;
    color: #fff;
  }
  .btn-define{
    margin-right: 10px;
  }
</style>
