import Vue from 'vue'
import Router from 'vue-router'

// 解决element-ui导航栏中的vue-router在3.0版本以上重复点击的报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'home-page',
    redirect: '/media',
    component: require('@/pages/Home/index').default,
    meta: {
      requireAuth: true,
      title: '首页'
    },
    children: [{
      path: '/media',
      name: 'media-view',
      component: require('@/views/Media/index').default,
      meta: {
        requireAuth: true,
        title: '影像管理'
      }
    }, {
      path: '/check',
      name: 'check-view',
      component: require('@/views/Check/index').default,
      meta: {
        requireAuth: true,
        title: '检查记录'
      }
    }, {
      path: '/record',
      name: 'record-view',
      component: require('@/views/Record/index').default,
      meta: {
        requireAuth: true,
        title: '受检者管理'
      }
    }, {
      path: '/message',
      name: 'message-view',
      component: require('@/views/Message/index').default,
      meta: {
        requireAuth: true,
        title: '消息中心'
      },

      children: [{
        path: '/message/sendMetting',
        name: 'send-metting-view',
        component: require('@/views/SendMetting/index').default,
        meta: {
          requireAuth: true,
          title: '我发起的会诊'
        }
      }, {
        path: '/message/joinMetting',
        name: 'join-metting-view',
        component: require('@/views/JoinMetting/index').default,
        meta: {
          requireAuth: true,
          title: '我参与的会诊'
        }
      }]
    }, {
      path: '/dataStatic',
      name: 'dataStatic-view',
      component: require('@/views/DataStatic/index').default,
      meta: {
        requireAuth: true,
        title: '数据统计'
      },
      children: [{
        path: '/dataStatic/mediaMaterial',
        name: 'media-material-view',
        component: require('@/views/MediaMaterial/index').default,
        meta: {
          requireAuth: true,
          title: '影像资料'
        }
      }, {
        path: '/dataStatic/analysisRecord',
        name: 'analysis-record-view',
        component: require('@/views/AnalysisRecord/index').default,
        meta: {
          requireAuth: true,
          title: '分析记录'
        }
      }, {
        path: '/dataStatic/dataCount',
        name: 'data-count-view',
        component: require('@/views/DataCount/index').default,
        meta: {
          requireAuth: true,
          title: '数据统计'
        }
      }, {
        path: '/dataStatic/systemLog',
        name: 'system-log-view',
        component: require('@/views/SystemLog/index').default,
        meta: {
          requireAuth: true,
          title: '系统日志'
        }
      }]
    }, {
      path: '/setting',
      name: 'setting-view',
      component: require('@/views/Setting/index').default,
      meta: {
        requireAuth: true,
        title: '设置管理'
      },
      children: [{
        path: '/setting/baseInfo',
        name: 'base-info-view',
        component: require('@/views/BaseInfo/index').default,
        meta: {
          requireAuth: true,
          title: '基本信息'
        }
      }, {
        path: '/setting/professionAbout',
        name: 'profession-about-view',
        component: require('@/views/ProfessionAbout/index').default,
        meta: {
          requireAuth: true,
          title: '专业相关'
        }
      }, {
        path: '/setting/accountPermission',
        name: 'account-permission-view',
        component: require('@/views/AccountPermission/index').default,
        meta: {
          requireAuth: true,
          title: '账号与权限'
        }
      }, {
        path: '/setting/systemSetting',
        name: 'system-setting-view',
        component: require('@/views/SystemSetting/index').default,
        meta: {
          requireAuth: true,
          title: '系统设置'
        }
      }]
    }, {
      path: '/test',
      name: 'test-view',
      component: require('@/views/Test/index').default,
      meta: {
        requireAuth: true,
        title: '测试用例'
      }
    }]
  },
  {
    path: '/login',
    name: 'login-page',
    component: require('@/pages/Login/index').default,
    meta: {
      requireAuth: false,
      title: '登录'
    }
  },
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
  {
    path: '*',
    redirect: '/'
  }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token') || ''
  console.log(to, 'to')
  if (to.meta.requireAuth && !token) {
    next({
      path: 'login'
    })
  } else {
    next()
  }
})

export default router
