<template>
  <div class="home-page-container">
    <Header></Header>
    <div class="home-page-content-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Heder'
export default {
  name: 'home-page',
  components: { Header },
  methods: {}
}
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
