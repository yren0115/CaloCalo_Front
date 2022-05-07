import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/users/LogIn.vue'
import SignUp from '../views/users/SignUp.vue'
import MyPage from '../views/users/MyPage.vue'
import UserLog from '../views/users/UserLog.vue'
import UserTop from '../views/users/UserTop.vue'
import UserSet from '../views/users/UserSet.vue'
import AdLogIn from '../views/admins/AdLogIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage
  },
  {
    path: '/usertop',
    name: 'usertop',
    component: UserTop
  },
  {
    path: '/userlog',
    name: 'userlog',
    component: UserLog
  },
  {
    path: '/userset',
    name: 'userset',
    component: UserSet
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdLogIn
  }
]

const router = new VueRouter({
  routes
})

export default router
