<template>
  <div class="setting-view-container">
    <div class="setting-view-flex-box">
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
  name: 'setting-view',
  data () {
    return {
      currentActiveMenuItem: '',
      menuList: [
        {
          name: '基本信息',
          path: '/setting/baseInfo',
          icon: 'el-icon-postcard'
        },
        {
          name: '专业相关',
          path: '/setting/professionAbout',
          icon: 'el-icon-s-check'
        },
        {
          name: '账号与权限',
          path: '/setting/accountPermission',
          icon: 'el-icon-s-custom'
        },
        {
          name: '系统设置',
          path: '/setting/systemSetting',
          icon: 'el-icon-s-operation'
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
