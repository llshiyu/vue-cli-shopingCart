<template>
  <div class="login-background-box">
    <div class="login-popups-box">
      <h2>登录</h2>
      <div class="input-box">
        <label for="username">用户名</label><input type="text" v-model="username" id="username"/>
      </div>
      <div class="input-box">
        <label for="password">密码</label><input type="password" v-model="password" id="password"/>
      </div>
      <div class="input-tips" v-show="showTips">{{tips}}</div>
      <div class="input-box">
        <input type="button" value="登录" class="input-btn" @click="loginClick()">
        <input type="button" value="注册" class="register-btn" @click="showRegister()">
        <a href="javascript:;" @click="showUpdate()">忘记密码</a>
      </div>
    </div>
    <div class="login-popups-box" v-show="registerShow">
      <h2>注册</h2>
      <div class="input-box">
        <label for="username1">用户名</label><input type="text" v-model="username" id="username1"/>
      </div>
      <div class="input-box">
        <label for="password1">密码</label><input type="password" v-model="password" id="password1"/>
      </div>
      <div class="input-tips" v-show="showTips">{{tips}}</div>
      <div class="input-box">
        <input type="button" value="提交" class="input-btn" @click="registerClick()">
        <input type="button" value="取消" class="register-btn" @click="showLogin()">
      </div>
    </div>

    <div class="login-popups-box" v-show="updateShow">
      <div><h2>忘记密码</h2>--
        <small>用户名和id输入正确方可改密码</small>
      </div>
      <div class="input-box">
        <label for="id">ID</label><input type="text" v-model="id" id="id"/>
      </div>
      <div class="input-box">
        <label for="username2">用户名</label><input type="text" v-model="username" id="username2"/>
      </div>
      <div class="input-box">
        <label for="password2">密码</label><input type="password" v-model="password" id="password2"/>
      </div>
      <div class="input-tips" v-show="showTips">{{tips}}</div>
      <div class="input-box">
        <input type="button" value="提交" class="input-btn" @click="updateClick()">
        <input type="button" value="取消" class="register-btn" @click="showLogin()">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        id: '',
        showTips: false,
        tips: '请输入用户名',
        registerShow: false, // 注册box
        updateShow: false // 修改密码box
      }
    },
    methods: {
      loginClick() {
        if (!this.username) {
          this.tips = '请输入用户名'
          this.showTips = true
        } else if (!this.password) {
          this.tips = '请输入密码'
          this.showTips = true
        } else {
          this.showTips = false
          let params = {
            username: this.username,
            password: this.password
          }
          this.$http.post('http://172.31.75.30:8080/login/selectLogin', params).then((res) => {
            console.log(res)
            if (res.data.meta && res.data.meta.code === 0) {
              this.$router.push({path: '/Home'})
            } else {
              this.tips = res.data.meta.message
              this.showTips = true
            }
          })
        }
      }, // 登录
      registerClick() {
        if (!this.username) {
          this.tips = '请输入用户名'
          this.showTips = true
        } else if (!this.password) {
          this.tips = '请输入密码'
          this.showTips = true
        } else {
          this.showTips = false
          let params = {
            username: this.username,
            password: this.password
          }
          this.$http.post('http://172.31.75.30:8080/login/addLogin', params).then((res) => {
            console.log(res)
            if (res.data.meta && res.data.meta.code === 0) {
              this.registerShow = false
              this.password = ''
            } else {
              this.tips = res.data.meta.message
              this.showTips = true
            }
          })
        }
      }, // 注册
      updateClick() {
        if (!this.id) {
          this.tips = '请输入id'
          this.showTips = true
        } else if (!this.username) {
          this.tips = '请输入用户名'
          this.showTips = true
        } else if (!this.password) {
          this.tips = '请输入密码'
          this.showTips = true
        } else {
          this.showTips = false
          let params = {
            id: this.id,
            username: this.username,
            password: this.password
          }
          this.$http.post('http://172.31.75.30:8080/login/updateLogin', params).then((res) => {
            if (res.data.meta && res.data.meta.code === 0) {
              this.showTips = false
              this.registerShow = false
              this.updateShow = false
              this.password = ''
            } else {
              this.tips = res.data.meta.message
              this.showTips = true
            }
          })
        }
      }, // 修改密码
      showLogin() {
        this.showTips = false
        this.registerShow = false
        this.updateShow = false
      },
      showRegister() {
        this.showTips = false
        this.registerShow = true
        this.updateShow = false
      },
      showUpdate() {
        this.showTips = false
        this.registerShow = false
        this.updateShow = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-background-box {
    height: 100%;
    .login-popups-box {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      background: #e2e5ee;
      width: 300px;
      margin: auto;
      padding: 60px 50px;
      h2 {
        display: inline-block;
      }
      .input-box {
        height: 50px;
        label {
          width: 100px;
          display: inline-block;
          margin-right: 20px;
          text-align: right;
        }
        input {
          border: 1px solid #cccccc;
          height: 10px;
          background: #ffffff;
          padding: 5px 10px;
          width: 150px;
        }
        .input-btn {
          width: 100px;
          height: 30px;
          line-height: 30px;
          background: #2e82bb;
          color: #ffffff;
          border: 0;
          border-radius: 4px;
          padding: 0;
          cursor: pointer;
        }
        .register-btn {
          width: 100px;
          height: 30px;
          line-height: 30px;
          background: #ffffff;
          border: 0;
          border-radius: 4px;
          padding: 0;
          cursor: pointer;
        }
      }
      .input-tips {
        color: #ff0000;
        margin-bottom: 20px;
      }
    }
  }
</style>
