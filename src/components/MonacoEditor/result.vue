<template>
  <div v-html="htmlCode">

    <el-select v-model="value" placeholder="请选择" @change="selChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "result",
    props: {
      htmlCode: {
        type: String,
        default: function () {
          return '<div>请编辑html内容</div>'
        }
      }
    },
    data(){
      return{
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods:{
      selChange(){
        console.log(999)
      }
    }
  }
</script>

<style scoped>

</style>
