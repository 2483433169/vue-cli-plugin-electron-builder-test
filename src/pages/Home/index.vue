<template>
  <div class="home-page-container">
    <Header :iframeSrc="iframeSrc" @menuChange="menuChange"></Header>
    <div class="home-page-content-container">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
      <iframe :src="iframeSrc" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Heder";
export default {
  name: "home-page",
  components: { Header },
  data() {
    return {
      iframeSrc: "http://192.168.1.99:17541/",
    };
  },
  created() {
    this.$electron.ipcRenderer.on("openZhihu", () => {
      this.iframeSrc = "https://www.zhihu.com/question/569569027/answer/2780162842";
    });
  },
  methods: {
    menuChange(src) {
      this.iframeSrc = src;
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page-container {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .home-page-content-container {
    display: flex;
    flex-direction: row;
    flex: 1;
    overflow: auto;
  }
}
</style>
