<template>
    <div class="airplain-box">

    </div>
</template>

<script>
  import {isPc} from "../../assets/js/util";

  export default {
    name: "Airplain",
    data() {
      return {}
    },
    components: {},
    created() {
      if (isPc()) {
        this.$alert('请用手机打开', '暂不支持PC端', {
            confirmButtonText: '确定',
            callback: action => {
                this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                });
                this.$router.push({
                    name: "Home"
                });
            }
        });
      } else {

      }
    },
    computed() {

    },
    methods: {
      init() {

      }
    },
    destroyed() {
      this.timer = null;
    }
  }
</script>

<style lang="less" scoped>
    .airplain-box {
        margin-top: -60px;
    }
</style>