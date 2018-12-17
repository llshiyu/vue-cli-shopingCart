<!--<SearchCity @callback="searchCityCallback" :data="cityList"></SearchCity>-->
<template>
    <div class="search-city">
        <div class="search-title-box hairline-bottom">
            <div class="city-box" v-for="(item,index) in data" :key="index" @click="showBox(index)">
                <span class="title"></span>{{item.showTitle}}
                <img src="./img/triangle.png" class="icon-up" v-if="showBoxI===index">
                <img src="./img/triangle.png" class="icon" v-else>
            </div>
        </div>
        <ul class="box" v-if="showBoxI!==-1">
            <li class="hairline-bottom" v-for="(item,index) in data[showBoxI].child" :key="index" @click="showChild(item,showBoxI)">
                {{item.name}}
                <img src="./img/check.png" class="icon" v-if="data[showBoxI].showId===item.id">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
          data:{
              type: Object,
              default: true
          }
        },
        data(){
            return{
                showBoxI: -1,
            }
        },
        mounted(){
          console.log(this.data,999)
        },
        methods:{
            showBox(t){
                if(this.showBoxI===t){
                    this.showBoxI = -1;
                    return
                }
                this.showBoxI = t;
            },
            showChild(item,i){
                this.data[i].showId = item.id;
                if(item.name==='全部'){
                    this.data[i].showTitle = this.data[i].title;
                }else{
                    this.data[i].showTitle = item.name;
                }
                this.showBoxI = -1;
                this.$emit('callback',this.data);
            }
        }
    }
</script>

<style lang="less" scoped>
.search-city{
    .search-title-box{
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        text-align: center;
        .city-box{
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            -o-flex: 1;
            -khtml-flex: 1;
            flex: 1;
            background: #fff;
            height: 50px;
            line-height: 50px;
            .title{
            }
            .icon{
                width: 10px;
            }
            .icon-up{
                width: 10px;
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg);
            }
        }
    }
    .box{
        background: #fff;
        text-align: left;
        padding-left: 10px;
        max-height: 400px;
        overflow: auto;
        li{
            display: block;
            height: 50px;
            line-height: 50px;
            .icon{
                width: 20px;
            }
        }
    }
}
</style>