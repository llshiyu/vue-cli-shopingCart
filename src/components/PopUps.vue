<template>
  <div class="pop-box" v-if="showDeleteFlag">
    <div class="pop">
      <div class="pop-content">{{popCont}}{{deleteId}}</div>
      <div class="pop-btn-box clearfix">
        <div class="btn-define fl btn" @click="delShop()">确定</div>
        <div class="btn-close fr btn" @click="closePup()">取消</div>
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
      popCont: '确定要删除该商品吗？'
    }
  },
  computed: {
    showDeleteFlag () {
      return this.$store.state.showDeleteFlag
    },
    deleteId () {
      return this.$store.state.deleteId
    }
  },
  methods: {
    closePup () {
      this.$store.state.showDeleteFlag = false
    },
    delShop () {
      this.$emit('delShop')
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
    width: 400px;
    height: 200px;
    margin: auto;
    background: #fff;
    text-align: center;
  }
  .pop-content{
    height: 140px;
    line-height: 140px;
  }
  .pop-btn-box{
    text-align: center;
    margin: 0 40px;
  }
  .btn{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #2c3e50;
    color: #fff;
    cursor: pointer;
  }
  .btn-define{
    margin-right: 10px;
  }
</style>
