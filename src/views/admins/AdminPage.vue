<template>
   <v-app>
    <v-app-bar app color="blue darken-4" class="white--text" clipped-left>
      <v-app-bar-nav-icon app color="white" v-on:click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="header-bar">CaloCalo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-on:click="logout" color="#B71C1C" class="white--text" >ログアウト</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="black" clipped>
      <div class="top-title">Menu</div>
      <v-list>
        <v-row class="vertical-spacer" justify="center">
          <v-btn large class="menu-btn" v-on:click="subst0"><v-icon>mdi-account</v-icon>UserPage</v-btn>
        </v-row>
        <v-row class="vertical-spacer" justify="center">
          <v-btn large class="menu-btn" v-on:click="subst1"><v-icon>mdi-hamburger</v-icon>FoodPage</v-btn>
        </v-row>
      </v-list>
    </v-navigation-drawer>

    <!-- v-mainはデフォルトで余白やその他スタイルが自動指定されてる -->
    <v-main class="pt-0 blue-grey lighten-4">

      <router-view>
        <div v-if="menuflag == 0" class="menu-bif">
          <UserPage />
        </div>
        <div v-else-if="menuflag == 1" class="menu-bif">
          <FoodPage />
        </div>
      </router-view>

    </v-main>

    <v-footer class="blue darken-4" dark app>
      <p class="reset-css footer-layout">Copyright © 2022 SBチームA. All Rights</p>
    </v-footer>
  </v-app>
</template>

<script>
import UserPage from '@/views/admins/UserPage.vue'
import FoodPage from '@/views/admins/FoodPage.vue'

export default {
  name: 'UserPage',
  components: {
    UserPage,
    FoodPage,
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
  }),
   computed: {
    getintakeCalorie: function() {
      return this.$store.state.intakeCalorie;
    },
    getgoalCalorie: function() {
      return this.$store.state.goalCalorie;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth", {
        empId: '0',
        password: 'qazplm',
      });
      this.$router.push('/login')
    },
    toUserLog() {
      this.$router.push('/userlog')
    },
    subst0: function() {
      this.menuflag = 0;
      this.$router.push('/admin/userpage')
    },
    subst1: function() {
      this.menuflag = 1;
      this.$router.push('/admin/foodpage')
    },
    submit() {
      this.$store.dispatch("setcalo", {
        intakeCalorie: this.user.intakeCalorie,
      });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
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
.left-title {
  color: black;
  text-align: center;
  padding: 100px 0 50px;
}
.left-title-sub {
  color: black;
  text-align: center;
  padding: 50px 0;
}
.form-container {
  height: 90vh;
  width: 100%;
}
.btn-container {
  margin: 0 auto;
}
.output-container {
  height: 90vh;
  width: 100%;
}
.right-title {
  color: black;
  text-align: center;
  padding: 100px 0 50px;
}
.right-title-sub {
  color: black;
  text-align: center;
  padding: 115px 0 50px;
}
.goal-cal-disp {
  text-align: center;
  line-height: 150px;
}
.footer-layout {
  width: 100%;
  text-align: center;
}
</style>