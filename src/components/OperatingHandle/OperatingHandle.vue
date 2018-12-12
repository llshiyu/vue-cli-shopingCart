<template>
    <div class="operating-handle" v-if="operatingHandle">
        <div class="left btn" @click="click('left')">&larr;</div>
        <div class="top btn" @click="click('top')">&uarr;</div>
        <div class="right btn" @click="click('right')">&rarr;</div>
        <div class="bottom btn" @click="click('bottom')">&darr;</div>
        <div class="enter btn" @click="click('enter')">&crarr;</div>
        <div class="stop btn" @click="click('stop')">&#x26D4;</div>
        <div class="reset btn" @click="click('reset')">&#x21BB;</div>
    </div>
</template>

<script>
    export default {
        name: "OperatingHandle",
        props:{
            operatingHandle:{
                type: Boolean,
                default:false,
                required: false
            }
        },
        methods:{
            click(t){
                this.$emit(t)
            }
        }
    }
</script>

<style lang="less" scoped>
    .operating-handle{
        position: fixed;
        bottom: 10px;
        width: 100%;
        height: 200px;
        .btn{
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            text-align: center;
            background-color: #e2e5ee;
            border-radius: 100%;
            box-shadow: 0 2px 6px 0 rgba(0,0,0,0.12);
            position: absolute;
        }
        .top{
            left: 60px;
            bottom: 100px;
        }
        .left{
            left: 10px;
            bottom: 50px;
        }
        .right{
            left: 110px;
            bottom: 50px;
        }
        .bottom{
            left: 60px;
            bottom: 0;
        }
        .enter{
            left: 170px;
            bottom: 50px;
            width: 80px;
            font-size: 20px;
        }
        .stop{
            right: 70px;
            bottom: 50px;
        }
        .reset{
            right: 10px;
            bottom: 50px;
        }
    }
</style>