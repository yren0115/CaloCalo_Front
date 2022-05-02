import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/users/LogIn.vue'
import SignUp from '../views/users/SignUp.vue'
import MyPage from '../views/users/MyPage.vue'

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
  }

]

const router = new VueRouter({
  routes
})

export default router
