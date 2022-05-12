<template>
   <v-container>
     <h1>UserLogページ{{menuflag}}</h1>
      <v-row lg="12">
          <v-col cols="6" class="left-col">
            <div class="upper-container">
              <v-sheet elevation="50" class="mx-auto" height="50" width="500" rounded shaped>
                <p class="date-disp"><v-icon>mdi-step-backward</v-icon>  過去ログ参照(Date): <input type="date" v-bind:value="logDate" 
                        v-on:change="logDate = $event.target.value; requestLog();">
                <v-icon>mdi-step-forward</v-icon></p>
              </v-sheet>
              <v-label><h2 class="upper-left-title">目標カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 class="goal-cal-disp">{{ getgoalCalorie }}kcal</h1>
              </v-sheet>
            </div>
          </v-col>
          <v-col cols="6" class="right-col">
            <div class="upper-container">
              <v-label><h2 class="left-title">摂取したカロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 class="goal-cal-disp">{{ getintakeCalorie}}</h1>
              </v-sheet>
            </div>
          </v-col>
      </v-row>
      <v-row lg="12">
        <v-col cols="12">
            <div class="lower-container">
              <v-label><h2 class="lower-title">過不足カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="200" width="1330" rounded shaped>
                <h1 class="goal-cal-disp">{{ calculateCalorie }}</h1>
              </v-sheet>
            </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
const PROTOCOLE = 'http://'
const DOMAINE = 'localhost';
const PORT = ':8000/'
const CONTEXT_PATH = "calocalo/";
const BASE_URL = PROTOCOLE + DOMAINE + PORT + CONTEXT_PATH;

const EMP_GOAL_URL = `employee/info/`;
const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;

export default ({
  name: 'UserLog',
  components: {
  },
  created:function() {
    this.fetchGoalCalories();
    this.fetchTotalCalorie();
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
    totalCalorie:0,
    goalCalorie:0,
    logDate:new Date().toISOString().substring(0,10),
    recordExistence:false

  }),
   computed: {
    getintakeCalorie: function() {
      if (!this.recordExistence){
        return 'No Record';
      }
      return this.totalCalorie + 'kcal';
    },
    getgoalCalorie: function() {
      return this.goalCalorie;
    },
    calculateCalorie: function() {
      if (!this.recordExistence){
        return 'No Record';
      }
      return (this.goalCalorie - this.totalCalorie) + 'kcal';
    },
    recordDisplay:function() {
      return this.recordExistence;
    }
  },
  methods: {
    requestLog(){
      this.fetchTotalCalorie();
    },

       fetchTotalCalorie(){
        var vm = this;
        axios.post(BASE_URL + EMP_INTAKE_CALO_URL + localStorage.emp_id, 
        {"date": this.logDate})
        .then((res) => {
        vm.recordExistence = res.data.existence;
        console.log(vm.recordExistence);
        if (vm.recordExistence){
        vm.totalCalorie = res.data.total_calories; 
        } else {
          vm.totalCalorie = null;
          return ;
        }
      })
   },
      
      fetchGoalCalories()  {
      var vm = this
      axios.get(BASE_URL + EMP_GOAL_URL + localStorage.emp_id)
      .then(function (response) {
        vm.goalCalorie = response.data.goal_calorie;
      })}, 
    },
});
</script>

<style scoped>
.upper-container {
  margin-top: 50px;
}
.lower-container {
  color: black;
  text-align: center;
  margin: 50px 0 50px;
}
.lower-title {
  color: black;
  margin-bottom: 50px;
}
.date-disp {
  line-height: 50px;
  text-align: center;
}
.upper-left-title {
  color: black;
  text-align: center;
  padding: 50px 0;
}



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