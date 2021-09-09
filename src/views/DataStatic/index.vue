<template>
  <div class="data-static-view-container">
    <div class="data-static-view-flex-box">
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
  name: 'data-static-view',
  data () {
    return {
      currentActiveMenuItem: '',
      menuList: [
        {
          name: '影像资料',
          path: '/dataStatic/mediaMaterial',
          icon: 'el-icon-video-play'
        },
        {
          name: '分析记录',
          path: '/dataStatic/analysisRecord',
          icon: 'el-icon-data-analysis'
        },
        {
          name: '数据统计',
          path: '/dataStatic/dataCount',
          icon: 'el-icon-pie-chart'
        },
        {
          name: '系统日志',
          path: '/dataStatic/systemLog',
          icon: 'el-icon-s-platform'
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
