<!--<Search @callback="searchCallback"></Search>-->
<template>
    <div class="search-box">
        <div class="search-div" @click="focusInput" v-show="!isFocus">
            <img src="./img/searchIcon.png" class="search-icon">
            <span>搜索</span>
        </div>
        <div class="search-input-box" v-show="isFocus">
            <img src="./img/searchIcon.png" class="input-icon">
            <!-- @blur="isFocus = false"-->
            <input type="text" class="search-input" placeholder="请输入" v-model="inputVal" v-focus="isFocus" @keyup.enter="submit" @blur="submit">
            <img src="./img/close.png" class="close-icon" @click="unFocus">
            <div class="close-btn" @click="unFocus">取消</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                isFocus: false,
                inputVal:''
            }
        },
        directives: {
            focus: {
                update: function (el, {value}) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        },
        methods:{
            focusInput(){
                this.isFocus = true;
            },
            unFocus(){
                this.isFocus = false;
            },
            submit(){
                this.$emit('callback',this.inputVal)
            }
        }
    }
</script>

<style lang="less" scoped>
.search-box{
    height: 50px;
    background: #ececec;
    position: relative;
    .search-div{
        position: absolute;
        top: 10px;
        left: 20px;
        right: 20px;
        bottom: 10px;
        background: #ffffff;
        border-radius: 6px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #cccccc;
        .search-icon{
            width: 12px;
        }
    }
    .search-input-box{
        position: absolute;
        top: 10px;
        left: 20px;
        right: 20px;
        bottom: 10px;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        .input-icon{
            position: absolute;
            left: 10px;
            top: 10px;
            width: 12px;
        }
        .close-icon{
            position: absolute;
            right: 54px;
            top: 3px;
            width: 25px;
        }
        .search-input{
            background: #ffffff;
            border-radius: 6px;
            height: 30px;
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            -o-flex: 1;
            -khtml-flex: 1;
            flex: 1;
            padding: 10px 10px 10px 30px;
        }
        .close-btn{
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
    }
}
</style>