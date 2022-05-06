<template>
  <v-app class="">
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">管理者ログイン</h1>
      </v-card-title>
       <v-card-text>
        <v-form v-on:submit.prevent="submit">
          <v-text-field prepend-icon="mdi-account-circle" label="社員番号" :value="empId" v-model="user.empId" />
          <h3>{{ empId }}</h3>
          <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  label="パスワード" @click:append="showPassword = !showPassword" v-model="user.password"/>
          <v-card-actions>
            <v-btn class="light-blue" type="submit">ログイン</v-btn>
          </v-card-actions>
        </v-form>
    </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'AdLogIn',
  data: ()=> ({
    showPassword: false,
    user: {},
  }),
  computed: {
    getempId() {
      return this.$store.state.empId;
    },
    getpassword() {
      return this.$store.state.password;
    },
  },
  methods: {
      submit() {
        this.$store.dispatch("auth", {
          empId: this.user.empId,
          password: this.user.password,
        });
        this.$router.push('/usertop');
      },

      login: function() {
        this.$router.push('/usertop')
      },
  },
};
</script>

<style scoped>
.main-bg {
  position: relative;
  height: 100vh;
  background-size: cover;
}
.main-bg-blur {
  height: 100vh;
  background: rgba(255,255,255,0.5);
}
</style>