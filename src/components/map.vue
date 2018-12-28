<style scoped>
  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
</style>
<template>
  <div>
    <div id="container-map" style="width:500px; height:500px"></div>
    <button @click="addTool">加载</button>
    <button @click="addCircle">画圆</button>
    <button @click="thisLocation">定位</button>
    <button @click="cancelLocation">取消圆</button>
    <button @click="getMaker">获取覆盖物信息</button>
    <input type="text" id="input_id">
    <span>{{chosePosition}}</span>
    <span>圆的长度{{myCircle.radius}}</span>
  </div>
</template>

<script>

  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
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
          this.map.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (data) => {
            console.log(data)
            this.citycode = data.addressComponent.cityCode
            this.thisPosition = data.position
            this.thisPosition.message = data.formattedAddress
            this.chosePosition = this.thisPosition
            /* 画圆 */
            this.cancelLocation()
            this.addCircle()
            /* 拖拽选址 */
            this.positionPicker()
          })
          AMap.event.addListener(geolocation, 'error', function (data) {
            alert('定位失败')
          })
        })
      },
      /* 画图 */
      addCircle () {
        this.myCircle = {
          center: [this.chosePosition.lng, this.chosePosition.lat], // 圆心位置
          radius: 300, // 半径
          strokeColor: '#FFFF00', // 线颜色
          strokeOpacity: 0.2, // 线透明度
          strokeWeight: 1, // 线粗细度
          fillColor: '#222222', // 填充颜色
          fillOpacity: 0.2// 填充透明度
        }
        this.circle = new AMap.Circle(this.myCircle)
        this.circle.setMap(this.map)
        // 引入多边形编辑器插件
        this.map.plugin(['AMap.CircleEditor'], () => {
          // 实例化多边形编辑器，传入地图实例和要进行编辑的多边形实例
          this.circleEditor = new AMap.CircleEditor(this.map, this.circle)
          // 开启编辑模式
          this.circleEditor.open()
          this.myCircle.radius = this.circle.Mg.radius
          this.circleEditor.on('adjust', (data) => {
            this.myCircle.radius = data.radius
          })
          this.circleEditor.on('move', (data) => {
            console.log('移动')
            this.chosePosition.lng = data.lnglat.lng
            this.chosePosition.lat = data.lnglat.lat
          })
        })
      },
      /* 取消圆 */
      cancelLocation () {
        this.map.remove(this.circle)
        if (this.circleEditor) {
          this.circleEditor.close()
        }
      },
      /* 搜索 */
      search () {
        let vm = this
        AMap.plugin(['AMap.PlaceSearch', 'AMap.Autocomplete'], () => {
          var autoOptions = {
            city: this.citycode,
            input: 'input_id'
          }
          // eslint-disable-next-line no-unused-vars
          let autoComplete = new AMap.Autocomplete(autoOptions)
          // eslint-disable-next-line no-unused-vars
          let placeSearch = new AMap.PlaceSearch({
            city: this.citycode,
            map: vm.map
          })
          AMap.event.addListener(autoComplete, 'select', e => {
            // TODO 针对选中的poi实现自己的功能
            placeSearch.setCity(e.poi.adcode)
            // placeSearch.search(e.poi.name)
            this.chosePosition = e.poi.location
            if (this.chosePosition) {
              /* 画圆 */
              this.cancelLocation()
              this.addCircle()
              /* 拖拽选址 */
              this.positionPickerObj.stop()
              this.positionPicker()
              this.createWindow()
            }
          })
        })
      },
      /* 获取覆盖物信息 */
      getMaker () {
        var overlaysList = this.map.getAllOverlays('circle')
        console.log(overlaysList)
        // 可选参数有:‘marker’、‘circle’、‘polyline’、‘polygon
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
            /* 画圆 */
            this.cancelLocation()
            this.addCircle()
          })
          this.positionPickerObj.start([this.chosePosition.lng, this.chosePosition.lat])
        })
      },
      /* 创建信息窗体 */
      createWindow () {
        // 信息窗体的内容
        var content = [
          '<div style="width: 100%;>',
          '<div class="fs-16">范围: 200米</div>',
          '<div class="fs-14">位置不准确？试试拖拽鼠标或者输入地点</div></div>'
        ]
        // 创建 infoWindow 实例
        var infoWindow = new AMap.InfoWindow({
          content: content.join('<br>'),  // 传入 dom 对象，或者 html 字符串
          offset: new AMap.Pixel(0, -50)
        })
        // 打开信息窗体
        infoWindow.open(this.map, this.chosePosition)
      }
    },
    activated () {
        // https://lbs.amap.com/api/lightmap/guide/line
        // 8ab5df1f0299eb133b692c86264fd883
        // window.location.href = '//m.amap.com/navi/?start=&dest=116.481488,39.990464&destName=阜通西&naviBy=car&key=8ab5df1f0299eb133b692c86264fd883'
        // https://lbs.amap.com/api/uri-api/guide/travel/route
        // window.location.href = '//uri.amap.com/navigation?from=&to=116.3246,39.966577,'+'泸州老窖旅游区'+'&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0'
    },
    mounted () {
      this.map = new AMap.Map('container-map', {
        resizeEnable: true,
        zoom: 15, // 级别
        viewMode: '2D', // 使用2D视图
        zooms: [4, 18]
      })
      /* 添加工具条 */
      this.addTool()
      /* 获取当前位置 */
      this.thisLocation()
      /* 添加搜索功能 */
      this.search()
    }
  }
</script>
