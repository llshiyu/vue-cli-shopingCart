<template>
  <div class="myEditor">
    <p>
      <span class="theme" style="text-align:right">
                <el-select v-model="theme" size="mini" @change="themeChange" placeholder="请选择主题">
                    <el-option
                      v-for="item in themeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </span>
    </p>
    <div id="container" ref="container" style="height:200px"></div>
    <!--<el-button type="success" @click="RunResult" style="margin-top: 10px">查看结果</el-button>-->
    <!--<Result :htmlCode="showCode"></Result>-->
  </div>
</template>
<script>
  import * as monaco from 'monaco-editor';
  // import Result from './result';
  export default {
    components:{
      // Result
    },
    props:{
      codes:{
        type:String,
        default:function(){
          return '<div>请编辑html内容</div>'
        }
      },
      language:{
        type:String,
        default:function(){
          return 'html'
        }
      },
      editorOptions:{
        type:Object,
        default:function(){
          return {
            selectOnLineNumbers: false, // 在点击行号时是否应该选择相应的行。默认为true
            roundedSelection: false, // 用圆边框渲染编辑器。默认为true
            readOnly: false,        // 只读
            cursorStyle: 'line',        //光标样式
            automaticLayout: false, //自动布局
            glyphMargin: true,  //字形边缘
            useTabStops: false,
            fontSize: 28,       //字体大小
            autoIndent:true,//自动布局
            //quickSuggestionsDelay: 500,   //代码提示延时
          }
        }
      }
    },
    data(){
      return{
        themeOption:[
          {
            value:'vs',
            label:'默认'
          },
          {
            value:'hc-black',
            label:'高亮'
          },
          {
            value:'vs-dark',
            label:'深色'
          },
        ],
        theme:'hc-black',
        codesCopy:null,//内容备份
        showCode:null,
      }
    },
    mounted(){
      this.initEditor();
    },
    methods:{
      initEditor(){
        let self = this;
        self.$refs.container.innerHTML = '';
        self.monacoEditor = monaco.editor.create(self.$refs.container, {
          value:self.codesCopy || self.codes,// 编辑器的初始内容
          language: self.language, // 代码的编程语言
          theme: self.theme,//vs默认, hc-black高亮, or vs-dark深色
          editorOptions:self.editorOptions,
        });
        self.$emit('onMounted',self.monacoEditor);//编辑器创建完成回调
        self.monacoEditor.onDidChangeModelContent(function(event){//编辑器内容change事件
          self.codesCopy = self.monacoEditor.getValue();
          self.$emit('onCodeChange',self.monacoEditor.getValue(),event);
        });
        //编辑器随窗口自适应
        window.addEventListener('resize',function(){
          initEditor();
        })
      },
      RunResult(){
        // this.showCode = this.monacoEditor.getValue()
        // this.$alert(this.monacoEditor.getValue(),'结果',  {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: `action: ${ action }`
        //     });
        //   }
        // });
      },
      themeChange(val){
        console.log('change',val);
        this.initEditor();
      }
    }
  }
</script>
<style scoped>
  #container{
    height:100%;
    text-align: left;
  }
</style>
