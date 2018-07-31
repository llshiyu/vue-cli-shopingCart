<template>
  <div>
    <div v-for="(infoObj,index) of videoArr" :key="index">
      <div class="videotag" :id="'videotag'+index">
      <div class="video">
      <video :id="'video'+index" width="100%" height="100%"  preload="none" :poster="infoObj.coverPhoto" controlslist='nodownload'
      webkit-playsinline='true'
      playsinline="true" x5-playsinline="true"
      x-webkit-airplay="allow"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portraint"
      x5-video-ignore-metadata='true'
      style="object-fit:fill"  controls='controls'>
      你的浏览器不支持H5播放器
      <source :src="infoObj.zxVideoUrl" type="video/mp4" />
      </video>
      <div  class="clickMask" :id="'clickMask'+index" v-show="isShowMask">
      <img :src="infoObj.coverPhoto" alt="" />
      <div class="pay-wrapper">
      <img src="./img/play.png" />
      </div>
      </div>
      <div class="videoMask" :id="'videoMask'+index" :style="{display:display}">
      <div class="goonPlay" :id="'goonPlay'+index">
      <img src="./img/play.png" />
      <span>继续播放</span>
      </div>
      <p>播放将消耗<span :id="'videobytes'+index">{{infoObj.videoSize}}M</span>流量，是否继续？</p>
      </div>
      </div>
      <div class="video_title">
      <h1>{{infoObj.zxVideoTitle}}</h1><p class="watch">{{infoObj.playNum}}人观看</p>
      </div>
      </div>
    </div>
  </div>


</template>

<script>
    export default {
        name: "Video",
      data(){
          return {
            showStatus: 'video',
            isShowMask: true,
            display: "none",
            videoArr:[
              {
                coverPhoto: 'http://scloud.beijingtoon.com/f/h7Ua6vgrcXMt8BqP9w9ws2LusVDotUp6q5AlZDHeHv4vh.png',
                videoSize: '12.03',
                zxVideoTitle:'标题',
                playNum: 12,
                zxVideoUrl: 'http://t200staaaatic.zhengtoo1232312n.com/bjt-guide-test/static/video/guide.mp4'
              },
              {
                coverPhoto: 'http://scloud.beijingtoon.com/f/h7Ua6vgrcXMt8BqP9w9ws2LusVDotUp6q5AlZDHeHv4vh.png',
                videoSize: '22.03',
                zxVideoTitle:'标题2',
                playNum: 2,
                zxVideoUrl: 'http://t200static.zhengtoon.com/bjt-guide-test/static/video/guide.mp4'
              }
            ],
            videoMask: '',
            playBtn: '',
            video: '',
            index:0
          }
      },
      mounted() {
        if (this.showStatus == 'video') {   //视频
          // // 变量赋值
          this.videoMask = document.getElementById('videoMask'+this.index);
          // console.log(this.videoMask)
          this.playBtn = document.getElementById('goonPlay'+this.index);
          this.video = document.getElementById('video'+this.index);
          this.u = navigator.userAgent;
          this.isAndroid = this.u.indexOf('Android') > -1 || this.u.indexOf('Linux') > -1; //g
          this.isIOS = !!this.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          this.clickMask = document.getElementById('clickMask'+this.index);
          let _this = this;
          //监听点击播放视频按钮
          // play事件：即将开始播放
          this.video.addEventListener('play', () => {
            console.log('play')
            //loadstart事件：浏览器开始请求媒介；
            this.video.addEventListener('loadstart',()=>{
              console.log('loadstart 浏览器开始请求媒介')
            })
            // progress事件：浏览器正在获取媒介；
            this.video.addEventListener('progress',()=>{
              console.log('progress 浏览器正在获取媒介')
            })
            // suspend事件：浏览器非主动获取媒介数据，但没有加载完整个媒介资源；
            this.video.addEventListener('suspend',()=>{
              console.log('suspend 浏览器非主动获取媒介数据，但没有加载完整个媒介资源')
            })
            // abort事件：浏览器在完全加载前中止获取媒介数据；
            this.video.addEventListener('abort',()=>{
              console.log('abort 浏览器在完全加载前中止获取媒介数据')
            })
            // error事件：获取媒介数据出错；
            this.video.addEventListener('error',()=>{
              console.log('error 获取媒介数据出错')
            })
            // emptied事件：媒介元素的网络状态突然变为未初始化；
            this.video.addEventListener('emptied',()=>{
              console.log('emptied 媒介元素的网络状态突然变为未初始化')
            })
            // stalled事件：浏览器获取媒介数据异常；
            this.video.addEventListener('stalled',()=>{
              console.log('stalled 浏览器获取媒介数据异常')
            })
            // pause事件：暂停播放
            this.video.addEventListener('pause',()=>{
              console.log('pause 暂停播放')
            })
            // loadedmetadata事件：浏览器获取完媒介资源的时长和尺寸
            this.video.addEventListener('loadedmetadata',()=>{
              console.log('loadedmetadata 浏览器获取完媒介资源的时长和尺寸')
            })
            // loadeddata事件：已加载当前播放位置的媒介数据；
            this.video.addEventListener('loadeddata',()=>{
              console.log('loadeddata 已加载当前播放位置的媒介数据')
            })
            // waiting事件：播放由于下一帧无效（例如未加载）而已停止（但浏览器确认下一帧会马上有效）；
            this.video.addEventListener('waiting',()=>{
              console.log('waiting 播放由于下一帧无效（例如未加载）而已停止（但浏览器确认下一帧会马上有效）')
            })
            // playing事件：已经开始播放
            this.video.addEventListener('playing',()=>{
              console.log('playing 已经开始播放')
            })
            // canplay事件：浏览器能够开始媒介播放，但估计以当前速率播放不能直接将媒介播放完（播放期间需要缓冲）；
            this.video.addEventListener('canplay',()=>{
              console.log('canplay 浏览器能够开始媒介播放，但估计以当前速率播放不能直接将媒介播放完（播放期间需要缓冲）')
            })
            // canplaythrough事件：浏览器估计以当前速率直接播放可以直接播放完整个媒介资源（期间不需要缓冲）；
            this.video.addEventListener('canplaythrough',()=>{
              console.log('canplaythrough 浏览器估计以当前速率直接播放可以直接播放完整个媒介资源（期间不需要缓冲）')
            })
            // seeking事件：浏览器正在请求数据（seeking属性值为true）；
            this.video.addEventListener('seeking',()=>{
              console.log('seeking 浏览器正在请求数据（seeking属性值为true）')
            })
            // seeked事件：浏览器停止请求数据（seeking属性值为false）；
            this.video.addEventListener('seeked',()=>{
              console.log('seeked 浏览器停止请求数据（seeking属性值为false）')
            })
            // timeupdate事件：当前播放位置（currentTime属性）改变；
            this.video.addEventListener('timeupdate',()=>{
              console.log('timeupdate 当前播放位置（currentTime属性）改变')
            })
            // ended事件：播放由于媒介结束而停止；
            this.video.addEventListener('ended',()=>{
              console.log('ended 播放由于媒介结束而停止')
            })
            // ratechange事件：默认播放速率（defaultPlaybackRate属性）改变或播放速率（playbackRate属性）改变；
            this.video.addEventListener('ratechange',()=>{
              console.log('ratechange 默认播放速率（defaultPlaybackRate属性）改变或播放速率（playbackRate属性）改变')
            })
            // durationchange事件：媒介时长（duration属性）改变；
            this.video.addEventListener('durationchange',()=>{
              console.log('durationchange 媒介时长（duration属性）改变')
            })
            // volumechange事件：音量（volume属性）改变或静音（muted属性）。
            this.video.addEventListener('volumechange',()=>{
              console.log('volumechange事件：音量（volume属性）改变或静音（muted属性）')
            })



            this.video.addEventListener('timeupdate',()=>{
              console.log(this.video.readyState,'timeupdate')
              console.log(this.video.currentSrc,777,this.video.networkState)

              if(this.video.networkState==3){
                Toast({
                  message: '服务器忙，请稍后尝试',
                  duration: 1000
                });
                this.video.pause()
              }else if(this.video.networkState==2){
                Toast({
                  message:'视频加载中...',
                  duration: 500
                })
              }
            })
            // setTimeout(()=>{
            //   console.log(this.video.currentSrc,777,this.video.networkState)
            //   if(this.video.networkState==3){
            //     Toast({
            //       message: '服务器忙，请稍后尝试',
            //       duration: 1000
            //     });
            //     this.video.pause()
            //   }else if(this.video.networkState==2){
            //     // Toast({
            //     //   message:'视频加载中...',
            //     //   duration: 500
            //     // })
            //     setTimeout(()=>{
            //       if(this.video.networkState==3){
            //         Toast({
            //           message: '服务器忙，请稍后尝试11',
            //           duration: 1000
            //         });
            //         this.video.pause()
            //       }
            //     },10)
            //   }
            // },10)
            let videoArr = document.getElementsByTagName('video');
            for (let i = 0; i < videoArr.length; i++) {
              if(i!=this.index){
                videoArr[i].pause();
              }
            }
            // this.video.play()
            // alert("play")
            // console.log("this.netConnect:" + _this.netConnect)
            // console.log("this.netType:" + _this.netType)
            // if (_this.netConnect && _this.netType == 'WIFI') {
            //   //_this.videoMask.display = "block";
            //   _this.display = "block";
            //   //this.video.webkitExitFullScreen();
            //   _this.video.pause();
            //   alert(1)
            // }
          });

          this.video.addEventListener('touchstart', () => {
            _this.isAuto = true
            // console.log(2264)
          });
          this.video.addEventListener('ended', (e) => {
            _this.isAuto = false
          })
          //document.addEventListener("WeixinJSBridgeReady", function () {
          //  document.getElementById('video').play();
          //}, false);
          if (this.isAuto) {
            //this.video.load()
            //this.video.play()

          } else {
            //this.video.pause()
          }
          // console.log(toongine)

          // 事件监听
          //this.addLinstener();
          this.clickMask.addEventListener('click', function () {
            // console.log(123,this.video)
            // _this.getNetWork(function(){
            //   _this.netWorkDeal()
            // });
            _this.isShowMask = false
            // this.playBtn.click();
            _this.display = "none"
            _this.video.play();
          })
          // 确认播放
          this.playBtn.addEventListener('click', function () {
            //_this.videoMask.hide();
            _this.display = "none"
            _this.video.play();
            // _this.addVideoPlayNums();
          });
          this.video.addEventListener('ended', function () {
            _this.isShowMask=true;
            _this.video.currentTime=0
          }, false);
          this.video.addEventListener('loadedmetadata', function () {
            //   console.log("视频时长为：" + _this.video.duration + "秒");
            //   // let time = parseInt(_this.video.duration);
            //   // let minutes = parseInt(time / 60);
            //   // let seconds = time - minutes * 60;
            //   // // console.log("视频时长为：" + minutes + ":" + seconds);
            //   // let videoSize = minutes + ":" + seconds;
            //   // _this.infoObj.videoTime = videoSize;
            //   // _this.$forceUpdate()
            //   // this.getVidDur()
          })
        }

      },
    }
</script>

<style scoped>
  /* 视频开始 */
  .videotag {
    /* margin-top:25px; */
    /* width:343px;
    height:130px; */
    margin: 0 auto;
    background: #fff;
    padding-top: 17px;
    /*padding-bottom: 30px;*/
    position: relative;
  }
  .videotag .video{
    width:343px;
    height:197px;
    margin: auto;
    position:relative;
  }

  .video .video_title{
    /*height:40px;*/
    /*width: 100%;*/
    /*margin-bottom: 40px;*/
    /*background-color: #fff;*/
  }
  .video_title{
    width: 343px;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 3px;
    padding-top: 10px;
  }
  .video_title .watch{
    /*position: absolute;*/
    /*right:15px;*/
    /*top:15px;*/
    font-size: 12px;
    color: #FF9219;
    float: right;
    background: #FFF7ED;
    padding: 2px 5px;
  }
  .video_title h1{
    /*font-family: PingFangSC-Regular;*/
    font-size: 15px;
    color: #222222;
    width: 250px;
    float: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .videotag video {
    width:100%;
    height:100%;
  }
  /*屏蔽下载按钮*/
  video::-internal-media-controls-download-button {
    display:none;
  }
  video::-webkit-media-controls-enclosure{
    overflow: hidden;
  }
  video::-webkit-media-controls-panel{
    width: calc(100%);
  }
  /* video::-webkit-media-controls {
      display:none !important;
  } */
  .videoSize{
    position: absolute;
    bottom: 8px;
    left: 10px;
    background: #F76F03;
    border-radius: 4px;
    padding: 4px;
    font-size: 11px;
    color: #FFFFFF;
    z-index: 2;
    opacity: 0.8;
  }
  .clickMask {
    /*display: none;*/
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    border-radius: 4px;
    z-index: 2;
    background-color: #fff;
  }
  .clickMask .pay-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    background: rgba(0,0,0,0.40);
    border-radius: 50%;
    margin-top: -25px;
    margin-left: -25px;
  }
  .clickMask .pay-wrapper img{
    width: 16px;
    height: 18px;
    position: relative;
    top: 16px;
    /*left: 17px;*/
  }
  .clickMask img{
    width: 100%;
    height: 100%;
  }
  .videoMask {
    display:none;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    /*opacity: 0.8;*/
    /*background: #000000;*/
    background-image: radial-gradient(50% 165%, rgba(0,0,0,0.63) 53%, rgba(0,0,0,0.81) 100%);
    border-radius: 4px;
    z-index: 3;
    text-align:center;
  }
  .videoMask p{
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    margin-top:120px;
    /* margin-bottom:28px; */
    text-align: center;
  }
  .videoMask p span{
    font-size: 16px;
    color: #FFFFFF;
  }
  .goonPlay {
    width:126px;
    height:40px;
    background: rgba(0,0,0,0.40);
    border-radius: 32px;
    position:relative;
    left:50%;
    top:50%;
    margin-top:-40px;
    margin-left:-65px;
  }
  .goonPlay img {
    width:14px;
    height:16px;
    margin-left:20px;
    margin-top:10px;
    position: absolute;
    left: 0px;
    top: 1px;
  }
  .goonPlay span{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    position:absolute;
    left:43px;
    top:10px;
  }
</style>
