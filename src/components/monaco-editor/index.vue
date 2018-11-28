<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane :lazy="true">
        <span slot="label"><i class="el-icon-document"></i> HTML</span>
        <MyEditor
          :language="'html'"
          :codes="htmlCodes"
          @onMounted="htmlOnMounted"
          @onCodeChange="htmlOnCodeChange" />
      <el-button type="success" @click="RunResult" style="margin-top: 10px">查看结果</el-button>
        <Result :htmlCode="showCode"></Result>
      </el-tab-pane>
      <el-tab-pane label="Javascript" :lazy="true">
        <MyEditor
          :language="'javascript'"
          :codes="javascriptCodes"
          @onMounted="javascriptOnMounted"
          @onCodeChange="javascriptOnCodeChange" />
      </el-tab-pane>
      <el-tab-pane label="CSS" :lazy="true">
        <MyEditor
          :language="'css'"
          :codes="cssCodes"
          @onMounted="cssOnMounted"
          @onCodeChange="cssOnCodeChange" />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import MyEditor from './editor'
  import Result from './result';

  export default {
    components:{
      MyEditor,Result
    },
    data () {
      return {
        htmlCodes:'<div>This is html</div>',
        javascriptCodes:'console.log("This is javascript")',
        cssCodes:'body{}',
        htmlEditor:null,
        jsEditor:null,
        cssEditor:null,
        showCode:null,
      }
    },
    methods:{
      htmlOnMounted(edit){
        this.htmlEditor = edit;
      },
      javascriptOnMounted(edit){
        this.jsEditor = edit;
      },
      cssOnMounted(edit){
        this.cssEditor = edit;
      },
      htmlOnCodeChange(value,event){
        // console.log(value,event,999)
        this.htmlCodes = value;
      },
      javascriptOnCodeChange(value,event){
        this.javascriptCodes = value;
      },
      cssOnCodeChange(value,event){
        this.cssCode = value;
      },
      RunResult(){
        this.showCode = this.htmlCodes
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
