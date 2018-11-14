<style scoped>
  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
</style>
<template>
  <div>
    <div id="container-map" style="width:500px; height:500px"></div>
    <button @click="toonDingwei">定位</button>
    <input type="text" id="input_id">
    <span>{{chosePosition}}</span>
  </div>
</template>

<script>

  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  // import toon from '../assets/js/toon'
  export default {
    name: 'map',
    data () {
      return {
        map: null,
        /* 当前位置 */
        thisPosition: {
          location: '',
          lng: '',
          lat: ''
        },
        /* 选取的位置 */
        chosePosition: {
          location: '',
          lng: '',
          lat: ''
        },
        /* 范围圆的数据 */
        myCircle: {},
        /* 签到圆对象 */
        circle: {},
        /* 编辑器对象 */
        circleEditor: null,
        /* 拖拽对象 */
        positionPickerObj: {},
        /* 当前城市编码 */
        citycode: '020'
      }
    },
    methods: {
      /* 添加工具条 */
      addTool () {
        AMap.plugin(['AMap.ToolBar', 'AMap.Driving'], () => {
          let toolbar = new AMap.ToolBar()
          this.map.addControl(toolbar)
        })
      },
      /* 定位具体位置 */
      thisLocation () {
        this.map.plugin('AMap.Geolocation', () => {
          let geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: false,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
          })
          // this.map.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (data) => {
            console.log('具体的定位信息 ',data)
            this.citycode = data.addressComponent.cityCode
            this.thisPosition = data.position
            this.thisPosition.message = data.formattedAddress
            this.chosePosition = this.thisPosition
            /* 拖拽选址 */
            this.positionPicker()
          })
          AMap.event.addListener(geolocation, 'error', function (data) {

            alert('定位失败')
          })
        })
      },
      toonDingwei(){
        console.log(toongine)
        toongine.location.getLocation({
          callback: res => {
            alert("res: " + res.data);
          }
        })
      },
      /* 拖拽选址 */
      positionPicker () {
        AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
          this.positionPickerObj = new PositionPicker({
            mode: 'dragMarker', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: this.map // 依赖地图对象
          })
          this.positionPickerObj.on('success', (positionResult) => {
            this.chosePosition = positionResult.position
          })
          this.positionPickerObj.start([this.chosePosition.lng, this.chosePosition.lat])
        })
      },
    },
    activated () {
    },
    mounted () {
      this.map = new AMap.Map('container-map', {
        resizeEnable: true,
      })
    }
  }
</script>
