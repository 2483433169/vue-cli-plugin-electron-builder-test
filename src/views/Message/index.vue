<template>
  <div class="message-view-container">
    <div class="message-view-flex-box">
      <div class="left-menu-container">
        <LeftMenu
          @activeMenu="setActiveMenu"
          :activeItem="currentActiveMenuItem"
          :menuList="menuList"
        ></LeftMenu>
      </div>
      <div class="right-content-container">
        <keep-alive><router-view></router-view></keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu'
export default {
  name: 'message-view',
  data () {
    return {
      currentActiveMenuItem: '',
      menuList: [
        {
          name: '我发起的会诊',
          path: '/message/sendMetting',
          icon: 'el-icon-s-promotion'
        },
        {
          name: '我参与的会诊',
          path: '/message/joinMetting',
          icon: 'el-icon-video-camera-solid'
        }
      ]
    }
  },
  created () {
    this.init()
  },
  activated () {
    const { currentActiveMenuItem } = this
    this.setActiveMenu(currentActiveMenuItem)
  },
  mounted () {},
  beforeDestroy () {},
  components: { LeftMenu },
  methods: {
    init () {
      const { menuList } = this
      this.setActiveMenu(menuList[0])
      console.log(this.$route, 'this.$route')
    },
    setActiveMenu (item) {
      const { path } = this.$route
      this.currentActiveMenuItem = item
      if (path === item.path) return
      this.$router.replace({
        path: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
