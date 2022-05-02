<template>
  <v-app>
    <v-container>
      <v-app-bar app color="blue darken-4" class="white--text" clipped-left>
      <router-link to="/" class="white--text link-hover" style="text-decoration: none;">
        <v-toolbar-title>CaloCalo <v-icon x-large color="#E53935">mdi-fire</v-icon></v-toolbar-title>
      </router-link>
      </v-app-bar>
      <v-main class="main-bg">
        <v-row class="text-center main-bg-blur">
          <v-col>
            <h1 class="main-title">CaloCalo</h1>
            <div class="main-contents">
              <div class="signup-content">
                <h3>初めてご利用される方<br />
                  <router-link to="/signup">
                    <v-btn color="light-green" raised><v-icon>mdi-account-multiple-plus-outline</v-icon>新規登録</v-btn>
                  </router-link>
                </h3>
              </div>
              <div>
                <hr>
              </div>
              <div class="login-content">
                <h3>既に登録がお済みの方<br />
                  <router-link to="/login">
                    <v-btn class="light-blue"><v-icon>mdi-login-variant</v-icon>ログイン</v-btn>
                  </router-link>
                </h3>
              </div>
            </div>

            <div class="router-components">

              <router-view></router-view>

            </div>
            
          </v-col>
        </v-row>
      </v-main>

      <v-footer app class="blue darken-4" dark>
        <p class="reset-css footer-layout">Copyright © 2022 SBチームA. All Rights</p>
      </v-footer>
    </v-container>
    
  </v-app>
</template>

<script>
export default ({
  name: 'TopComp',
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