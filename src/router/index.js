import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/users/LogIn.vue'
import SignUp from '../views/users/SignUp.vue'
import MyPage from '../views/users/MyPage.vue'
import UserLog from '../views/users/UserLog.vue'
import UserTop from '../views/users/UserTop.vue'
import UserSet from '../views/users/UserSet.vue'
import AdLogIn from '../views/admins/AdLogIn.vue'
import AdminPage from '../views/admins/AdminPage.vue'
import UserPage from '../views/admins/UserPage.vue'
import FoodPage from '../views/admins/FoodPage.vue'

Vue.use(VueRouter)

var Auth = {
  loggedIn: false,
  login: function() { this.loggedIn = true },
  logout: function() { this.loggedIn = false }
};

// var Login = {
//   template: '<input type="submit" value="Login" v-on:click="login">',
//   methods: {
//     login: function() {
//       Auth.login();
//       router.push(this.$route.query.redirect);
//     }
//   }
// };

// var Logout = {
//   template: '<input type="submit" value="Logout" v-on:click="logout">',
//   methods: {
//     logout: function() {
//       Auth.logout();
//       router.push('/');
//     }
//   }
// };

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
    component: MyPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/usertop',
    name: 'usertop',
    component: UserTop,
    meta: { requiresAuth: true }
  },
  {
    path: '/userlog',
    name: 'userlog',
    component: UserLog,
    meta: { requiresAuth: true }
  },
  {
    path: '/userset',
    name: 'userset',
    component: UserSet,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdLogIn
  },
  {
    path: '/admin/adminpage',
    name: 'adminPage',
    component: AdminPage,
  },
  {
    path: '/admin/userpage',
    name: 'adminUserPage',
    component: UserPage,
  },
  {
    path: '/admin/foodpage',
    name: 'adminFoodPage',
    component: FoodPage,
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

export default router
