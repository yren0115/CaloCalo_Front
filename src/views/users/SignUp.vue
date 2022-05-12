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
                      <v-text-field prepend-icon="mdi-flag-checkered" v-model.number="select" label="Outlined" placeholder="例:300   目標カロリーを入力欄" outlined dense></v-text-field>
                      <v-card-actions>
                        <v-btn color="light-green" @click="submitSignup">新規登録</v-btn>
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

const PROTOCOLE = 'http://'
const DOMAINE = 'localhost';
const PORT = ':8000/'
const CONTEXT_PATH = "calocalo/";
const BASE_URL = PROTOCOLE + DOMAINE + PORT + CONTEXT_PATH;

const EMP_EXISTENCE_URL = `employee/check/`;
const SIGNUP_URL= `signup/`;

export default {
  name: 'SignUp',
  data: ()=> ({
      showPassword: false,
      empId:'',
      password:'',
      select: null,
      existence: false,
      existenceErr:false,
      createSuccess:null

  }),
  methods: {
        submitSignup: async function() {
        await this.createEmp()
        if (this.createSuccess){
          this.$router.push('/login')
        }
      },
      createEmp: async function() {
        var vm = this;
        await axios.get(BASE_URL + EMP_EXISTENCE_URL + vm.empId)
        .then(function(res){
          vm.existence = res.data.existence;
        })
        if (!vm.existence){
          var EmpInfo = {emp_id:vm.empId , password:vm.password, goal_calories:vm.select}
          // create new Emp: should separate above axios excution;
          await axios.post(BASE_URL + SIGNUP_URL, EmpInfo)
          .then(function(res){
            vm.createSuccess = res.data.success;
          }
        )}else{
          vm.existenceErr = true;
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