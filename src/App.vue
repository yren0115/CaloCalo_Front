<template>
  <div id="app">
    <div v-if="loginEmpId === '0' && loginPassword === 'qazplm'">
      <div v-if="this.$route.path === '/'">
        <TopComp />
      </div>
      <div v-else-if="this.$route.path === '/signup'">
        <SignUp />
      </div>
      <div v-else-if="this.$route.path === '/login'">
        <LogIn />
      </div>
    </div>
    <div v-else>
      <MyPage />
    </div>
  </div>
</template>

<script>
import TopComp from '@/views/users/TopComp.vue'
import MyPage from '@/views/users/MyPage.vue'
import SignUp from '@/views/users/SignUp.vue'
import LogIn from '@/views/users/LogIn.vue'


export default ({
  name: 'App',
  data: ()=> ({
    adminId: -100,
    adminPass: "admin",
  }),
  components: {
    TopComp,
    MyPage,
    SignUp,
    LogIn,
  },
  computed: {
    loginEmpId() {
      return this.$store.state.empId;
    },
    loginPassword() {
      return this.$store.state.password;
    },
  },
  methods: {
    getTopUrl() {
     return location.pathname.match("/");
    },
    getSignupUrl() {
      return location.pathname.match("/signup");
    },
    getLoginUrl() {
      return location.pathname.match("/login");
    }
  },
})
</script>

<style lang="scss" scoped>
.reset-css {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
hr{
  height: 60px;
  width: .1vw;
  border-width: 0;
  color:#000;
  background-color:#000;
}
.link-hover:hover {
  color: darkgray !important;
}
.main-title {
}
.main-bg {
  position: relative;
  height: 90vh;
  background-image: url("@/assets/calocalo-top.jpeg");
  background-size: cover;
}
.main-bg-blur {
  height: 90vh;
  background: rgba(255,255,255,0.5);
}
.main-contents {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.signup-content {
  margin: 0 50px 10px 0;
}
.login-content {
  opacity: none;
  font-weight: bold;
  margin: 0 0 10px 50px
}
.footer-layout {
  width: 100%;
  text-align: center;
}
</style>

