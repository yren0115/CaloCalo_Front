<template>
  <v-app>
    <v-app-bar app color="blue darken-4" class="white--text" clipped-left>
      <router-link to="/" class="white--text link-hover" style="text-decoration: none;">
        <v-toolbar-title>CaloCalo <v-icon x-large color="#E53935">mdi-fire</v-icon></v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-main class="main-bg">
      <v-container fluid>
        <v-row class="text-center main-bg-blur">
          <v-col cols="12">
            <h1 class="main-title">CaloCalo</h1>
            <div class="main-contents">
                <v-card width="400px" class="mx-auto mt-10">
                  <v-card-title>
                    <h1 class="display-1" style="text-align: center;">新規登録</h1>
                  </v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field prepend-icon="mdi-account-circle" label="社員番号"     v-model="empId" />
                      <v-text-field v-bind:type="showPassword ? 'text' :'password'"              prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye'    :         'mdi-eye-off'"  label="パスワード" @click:append="showPassword   =  !showPassword"      v-model="password"/>
                      <v-select prepend-icon="mdi-flag-checkered" v-model="select" :items="items"       label="    目標カロリー" data-vv-name="select" required></v-select>
                      <v-card-actions>
                        <v-btn color="light-green" @click="signup">新規登録</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

     <v-footer app class="blue darken-4" dark>
        <p class="reset-css footer-layout">Copyright © 2022 SBチームA. All Rights</p>
      </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'SignUp',
  data: ()=> ({
    showPassword: false,
      empId:'',
      password:'',
      select: null,
      existence: false,
      existenceErr:false,
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
      },
      createEmp: async function() {
        var vm = this;
        await axios.get()
        .then(function(res){
          vm.existence = res.data.existence;
        })
        if (vm.existence){
        await axios.post()
        .then(function(){

        }
        )}else{
          vm.existenceErr = true;
          return ;
        }
        
      },
  },
};
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