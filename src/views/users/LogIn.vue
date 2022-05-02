<template>
  <v-app class="main-bg">
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
       <v-card-text>
        <v-form v-on:submit.prevent="submit()">
          <v-text-field prepend-icon="mdi-account-circle" label="社員番号" v-model="empId"/>
          <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  label="パスワード" @click:append="showPassword = !showPassword" v-model="password"/>
          <v-card-actions>
            <v-btn class="light-blue" @click ="login">ログイン</v-btn>
          </v-card-actions>
        </v-form>
    </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: ()=> ({
    showPassword: false,
    empId:'',
    password:'',
  }),
  computed: {
    getUserInfo() {
      return this.$store.getters['updateEmpId'];
    },
    setUserInfo(value) {
      return this.$store.commit('updateEmpId', value);
    },
  },
  methods: {
      submit() {
        this.$store.commit('updateEmpId')
      },
      login: function() {
        this.$router.push('/mypage')
      },
  },
};
</script>

<style scoped>
.main-bg {
  position: relative;
  height: 100vh;
  background-image: url("@/assets/calocalo-top.jpeg");
  background-size: cover;
}
.main-bg-blur {
  height: 100vh;
  background: rgba(255,255,255,0.5);
}
</style>