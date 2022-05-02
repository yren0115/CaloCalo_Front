<template>
  <v-app class="main-bg">
    <v-card width="400px" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1" style="text-align: center;">新規登録</h1>
      </v-card-title>
       <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="社員番号" v-model="empId"/>
          <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  label="パスワード" @click:append="showPassword = !showPassword" v-model="password"/>
          <v-select prepend-icon="mdi-flag-checkered" v-model="select" :items="items" label="目標カロリー" data-vv-name="select" required> </v-select>
          <v-card-actions>
            <v-btn color="light-green" @click="signup">新規登録</v-btn>
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
      select: null,
      items: [
        '200kcal',
        '400kcal',
        '600kcal',
        '800kcal',
        '1000kcal',
      ],
  }),
  methods: {
      submit() {
        console.log(this.name,this.password)
      },
      signup: function() {
        this.$router.push('/mypage')
      }
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