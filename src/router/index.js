import Vue from 'vue'
import Router from 'vue-router'

// 解决element-ui导航栏中的vue-router在3.0版本以上重复点击的报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
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