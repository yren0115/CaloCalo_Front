<template>
  <v-container>
      <v-row lg="12" justify="center">
        <v-col cols="7" class="left-col">
          <div class="form-container">
            <v-form ref="form">
            <v-label><h1 class="left-title">削除するユーザーのIDを入力してください</h1></v-label>

              <v-text-field label="ユーザーID" placeholder="ユーザーIDを入力してください" outlined dense v-model.number="empId">
              </v-text-field>
                <div class="btn-container">
                  <v-btn class="mr-4" v-on:click="deleteEmp(); clear()">DELETE</v-btn>
                </div>
              </v-form>
          </div>
          </v-col>
        </v-row>
  </v-container>
</template>
<!-- user.intakeCalorie -->
<script>
const PROTOCOLE = 'http://'
const DOMAINE = 'localhost';
const PORT = ':8000/'
const CONTEXT_PATH = "calocalo/";
const BASE_URL = PROTOCOLE + DOMAINE + PORT + CONTEXT_PATH;
// const FOODS_URL= `food_list/`;
// const EMP_GOAL_URL = `employee/info/`;
// const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;
// const EMP_SUBMIT_RECORD_URL = 'submit/food/'
//管理者側パス
const ADM_EMP_DEL_URL = `admin/delete/employee/`;
// const ADM_POSTFOOD_URL = `admin/add/foodlist`;
import axios from "axios";
const param = {key: [1,2,3]}
export default {
  name: 'UserPage',
  components: {
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
    empId: '',
    userId: '',
    userName: '',
  }),
   computed: {
     getempId: function() {
       return this.$store.state.empId;
     },
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
    submit() {
      this.$store.dispatch("setcalo", {
        intakeCalorie: this.user.intakeCalorie,
      });
    },
    clear() {
      this.$refs.form.reset();
    },
    deleteEmp() {
      if (this.empId === '') {
       return ;
     }
      axios
      .delete(BASE_URL+ADM_EMP_DEL_URL+this.empId, {data: param})
      .then(function (response){
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      });
    },
  },
  watch: {
    userId: function() {
      this.getUserName()
    },
    info: function() {
      this.getCoinInfo()
    }
  }
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
  padding: 180px 0 100px;
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
  text-align: center;
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