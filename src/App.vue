<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "vue-markdown",
  mounted() {
    this.init();
  },
  created() {},
  methods: {
    init() {
      this.checkIsLogin();
      this.listenIsMaximize();
      this.setLanguage();
    },
    checkIsLogin() {
      const token = localStorage.getItem("access_token") || "";
      if (token) {
        this.$electron.ipcRenderer.send("hasLogin", "hasLogin");
      } else {
        this.$electron.ipcRenderer.send("backLogin", "backLogin");
      }
      // const alert = token ? "已登录" : "未登录";
      // this.$message.info(alert);
    },
    listenIsMaximize() {
      let _this = this;
      this.$electron.ipcRenderer.on("isMaximize", (e, arg) => {
        _this.$store.dispatch("DISPATCH_TO_SET_WIN_isMaximized", arg);
      });
    },
    setLanguage() {
      let _this = this;
      this.$electron.ipcRenderer.on("setSysLanguage", (e, arg) => {
        console.log(111, "arg");
        _this.$i18n.locale = arg;
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
}
#app {
  width: 100%;
  height: 100%;
}
@import url("./app.scss");
</style>
