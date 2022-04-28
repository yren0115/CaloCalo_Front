<template>
   <v-app>
    <v-app-bar app color="blue darken-4" class="white--text" clipped-left>
      <v-app-bar-nav-icon app color="white" v-on:click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="header-bar">CaloCalo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://feeps.co.jp" color="red" class="white--text" >ログアウト</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="black" clipped>
        <div class="top-title">Menu</div>        
        <v-list>
          <v-row class="vertical-spacer" justify="center">
            <v-btn large class="menu-btn"><v-icon>mdi-human-handsdown</v-icon>MyPage</v-btn>
          </v-row>
           <v-row class="vertical-spacer" justify="center">
            <v-btn large class="menu-btn"><v-icon>mdi-file </v-icon>Log</v-btn>
          </v-row>
          <v-row class="vertical-spacer" justify="center">
            <v-btn large class="menu-btn"><v-icon>mdi-cog</v-icon>Setting</v-btn>
          </v-row>
        </v-list>
      </v-navigation-drawer>
        
    <v-main>
      <HelloWorld/>
    </v-main>

    <v-footer class="blue darken-4" dark app>
      <p class="reset-css footer-layout">Copyright © 2022 SBチームA. All Rights</p>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    drawer: null,
    items: [
      {title: 'ホーム', value: 'home'},
      {title: '会社概要', value: 'company'},
      {title: 'サービス概要', value: 'inquiry'},
    ],
    //
  }),
};
</script>

<style scoped>
.reset-css {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.top-title {
  color: white;
  text-align: center;
  font-size: 30px;
  padding: 10px 0 60px 0;
}
.logout-btn {
  color: white;
  font-size: 20px;
}
.vertical-spacer {
  padding-bottom: 60px;
}
.menu-btn {
  margin: 0 auto;
}
.footer-layout {
  width: 100%;
  text-align: center;
}
</style>