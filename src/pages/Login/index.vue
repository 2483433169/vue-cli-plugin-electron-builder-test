<template>
  <div class="login-page-container">
    <div class="login-box">
      <div class="top-esc-box">
        <div class="esc-btn-container">
          <div class="esc-btn" @click="closeApp">
            <img src="../../assets/images/login/del.png" class="esc-btn-icon" />
          </div>
        </div>
      </div>
      <div class="login-logo">
        <div class="login-logo-box">
          <img
            src="../../assets/images/login/logo.png"
            class="login-logo-image"
          />
        </div>
      </div>
      <div class="login-box-title">超声影像智能辅助诊断系统</div>
      <div class="login-form">
        <div class="login-form-box">
          <div class="login-form-item">
            <div class="login-form-item-box">
              <div class="login-form-icon-con">
                <img
                  src="../../assets/images/login/user.png"
                  class="form-icon-image"
                />
              </div>
              <div class="login-form-input-con">
                <input
                  type="text"
                  placeholder="请输入帐号"
                  class="login-form-input"
                />
              </div>
            </div>
          </div>
          <div class="login-form-item">
            <div class="login-form-item-box">
              <div class="login-form-icon-con">
                <img
                  src="../../assets/images/login/lock.png"
                  class="form-icon-image"
                />
              </div>
              <div class="login-form-input-con">
                <input
                  type="password"
                  placeholder="请输入密码"
                  class="login-form-input"
                />
              </div>
            </div>
          </div>
          <div class="password-setting-item">
            <div class="password-setting-item-con">
              <div class="rember-password">
                <div class="rember-password-check-box"></div>
                <div class="rember-password-check-box-text">记住密码</div>
              </div>
              <div class="forget-password">
                <div class="forget-password-btn">忘记密码</div>
              </div>
            </div>
          </div>
          <div class="login-btn" @click="login">登录</div>
        </div>
      </div>

      <div class="copy-right-con">
        <div class="app-version">版本1.0.0.1</div>
        <div class="company-name">什维新智医疗科技（上海）有限公司</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {
    return {}
  },
  created () {},
  mounted () {},
  beforeDestroy () {},
  components: {},
  methods: {
    login () {
      let _this = this
      let timer = null
      let loadingInstance = this.$loading({
        fullscreen: true,
        lock: true,
        text: '进入中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const access_token = '123456789'

      timer = setTimeout(() => {
        _this.$store.dispatch('LOGIN_IN', access_token)
        clearTimeout(timer)
        timer = null
        _this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
        _this.$message.success('登录成功!')
        localStorage.setItem('access_token', access_token)
        this.$electron.ipcRenderer.send('hasLogin', 'hasLogin')
        _this.$router.push({ path: '/' })
      }, 1000)
    },
    closeApp () {
      this.$electron.ipcRenderer.send('closeApp', 'close app')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
