<template>
  <div>
    123
    <input type="file" class="file" accept="image/*;capture=camera" name="img" @change="clipImg($event)">
    <!-- 为裁剪框 -->
    <div class="clip-wp" id="clip-wp" v-show="isClip">
      <div id="container"></div>
      <button id="save-img" @click="saveImg">保存</button>
    </div>
  </div>
</template>
<script>
  import clip from './clip';
  export default{
    data(){
      return{
        isClip:false,
        isUpload:false,
        clipUrl:'',
        noScoll:function(evt){
          this.isClip && evt.preventDefault();
        },
        clip:{}
      }
    },
    methods:{
      clipImg(event){
        this.clip = new clip('container',this);
        console.log(event.target.files[0],document.body.clientWidth,document.body.clientWidth)
        this.clip.init(event.target.files[0],document.body.clientWidth,document.body.clientWidth);
        this.isClip = true;
        document.body.addEventListener('touchmove',this.noScoll,false);

      },
      saveImg(){
        this.isClip = false;
        this.clip.save();
        document.body.removeEventListener('touchmove',this.noScoll,false);

      },
      uploadImg(){
        //上传到服务器或进行相关操作
        this.isUpload = true;
        console.log(this.clipUrl)
      }
    }
  }
</script>

<style>
  body{
    margin: 0;
  }
  .file{
    height: 40px;
    display: block;
    margin: 40px auto 0;
  }

  .upload-wp{
    text-align: center;
    width: 300px;
    margin: 20px auto 0;
  }
  .upload-wp button {
    padding: 5px 10px;
  }
  .upload-wp p{
    word-wrap: break-word;
    font-size: 12px;
  }
  .clip-wp{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 11;
    background-color: #000;
    text-align: center;
  }
  .clip-wp #container{
    background-color: #000;
    text-align: center;
    width: 100%;
    left: 0;
    right: 0;
    top: 20px;
    bottom: 80px;
    margin: 0 auto;
    position: absolute;
  }
  .clip-wp #save-img{
    position: absolute;
    bottom: 20px;
    width: 90%;
    left: 5%;
    height: 42px;
    line-height: 42px;
    color: #fff;
    background-color: #32c47c;
    border-radius: 20px;
  }
  .clip-wp #image-box {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    margin: auto;
  }
  .clip-wp #cover-box {
    position: absolute;
    z-index: 9999;
    display: none;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    margin: auto;
  }
</style>
