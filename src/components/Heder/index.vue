<template>
  <div class="header-component-container">
    <div class="header-component-box">
      <div class="logo-and-app-name">
        <div @click="openTestExample" class="logo-con">
          <img src="../../assets/images/login/logo.png" class="logo-image" />
        </div>
        <div class="app-name">超声影像智能辅助诊断系统</div>
      </div>
      <div class="main-menu-btn-group">
        <div class="main-menu-ul">
          <div
            class="main-menu-li"
            v-for="(item, index) in menuList"
            :key="index"
            @click="changeView(item)"
          >
            <div class="main-menu-li-icon-box">
              <img
                :src="
                  $route.path == item.menuPath ? item.activeIcon : item.menuIcon
                "
                class="main-menu-li-icon"
              />
            </div>
            <div
              :class="[
                { 'main-menu-li-name-active': $route.path == item.menuPath },
                'main-menu-li-name',
              ]"
            >
              {{ item.menuName }}
            </div>
          </div>
        </div>
      </div>
      <div class="system-and-user-setting">
        <div
          :class="[
            { 'setting-btn-active': $route.path.indexOf(item.menuPath) > -1 },
            'setting-btn',
          ]"
          v-for="item in settingMenu"
          :key="item.path"
          @click="changeView(item)"
        >
          <i :class="item.menuIcon"></i>
        </div>
        <div class="user-head-con">
          <i class="el-icon-user-solid"></i>
        </div>
        <div class="user-setting-menu">
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="user-name">吴医生</span
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updatePassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="win-operation-btns">
          <i class="el-icon-minus" @click="changeWin('mini')"></i>
          <i
            :class="
              this.$store.state.Header.isMaximized
                ? 'el-icon-copy-document'
                : 'el-icon-full-screen'
            "
            @click="changeWin('fullScreen')"
          ></i>
          <i class="el-icon-close" @click="changeWin('close')"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-component',
  components: {},
  data () {
    return {
      menuList: [
        {
          menuName: '影像管理',
          menuIcon: require('@/assets/images/component/header/media.png'),
          activeIcon: require('@/assets/images/component/header/media-active.png'),
          menuPath: '/media'
        },
        {
          menuName: '检查记录',
          menuIcon: require('@/assets/images/component/header/check.png'),
          activeIcon: require('@/assets/images/component/header/check-active.png'),
          menuPath: '/check'
        },
        {
          menuName: '受检者管理',
          menuIcon: require('@/assets/images/component/header/record.png'),
          activeIcon: require('@/assets/images/component/header/record-active.png'),
          menuPath: '/record'
        }
      ],
      settingMenu: [
        {
          menuPath: '/message',
          menuIcon: 'el-icon-message-solid',
          menuName: '消息中心'
        },
        {
          menuPath: '/dataStatic',
          menuIcon: 'el-icon-s-data',
          menuName: '数据统计'
        },
        {
          menuPath: '/setting',
          menuIcon: 'el-icon-s-tools',
          menuName: '设置管理'
        }
      ]
    }
  },
  methods: {
    openTestExample () {
      const env = process.env.NODE_ENV
      console.log(env, 'env')
      // if (env !== "development") return;
      this.$router.push({
        path: '/test'
      })
    },
    changeView (item) {
      this.$router.push({
        path: item.menuPath
      })
    },
    handleCommand (command) {
      if (command === 'loginOut') {
        this.$store.dispatch('LOGIN_OUT')
        localStorage.removeItem('access_token')
        this.$router.replace({ path: '/login' })
        this.$electron.ipcRenderer.send('backLogin')
      }
    },
    changeWin (event) {
      if (event === 'mini') {
        this.$electron.ipcRenderer.send('windowMin')
      } else if (event === 'fullScreen') {
        this.$electron.ipcRenderer.send('windowMax')
      } else if (event === 'close') {
        this.$electron.ipcRenderer.send('closeApp')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
