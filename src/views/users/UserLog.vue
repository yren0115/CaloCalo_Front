<template>
   <v-container>
     <h1>UserLogページ{{menuflag}}</h1>
      <v-row lg="12">
          <v-col cols="6" class="left-col">
            <div class="upper-container">
              <v-sheet elevation="50" class="mx-auto" height="50" width="500" rounded shaped>
                <p class="date-disp"><v-icon>mdi-step-backward</v-icon>  過去ログ参照(Date): <input type="date" v-bind:value="logDate" v-on:change="logDate = $event.target.value; requestLog();">
                <v-icon>mdi-step-forward</v-icon></p>
              </v-sheet>
              <v-label><h2 class="upper-left-title">目標摂取カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 class="goal-cal-disp">{{ getgoalCalorie }}kcal</h1>
              </v-sheet>
            </div>
          </v-col>
          <v-col cols="6" class="right-col">
            <div class="upper-container">
              <v-label><h2 class="left-title">摂取したカロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 v-if="recordExistence" class="goal-cal-disp">{{ getintakeCalorie }}kcal</h1>
                <h1 v-else class="goal-cal-disp">{{ getintakeCalorie }}</h1>

              </v-sheet>
            </div>
          </v-col>
      </v-row>
      <v-row lg="12">
        <v-col cols="12">
            <div class="lower-container">
              <v-label><h2 class="lower-title">過不足カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="200" width="1330" rounded shaped>
                <h1 v-if="recordExistence" class="goal-cal-disp">{{ calculateCalorie + 'kcal'}}</h1>
                <h1 v-else class="goal-cal-disp">{{ calculateCalorie }}</h1>
              </v-sheet>
            </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default ({
  name: 'UserLog',
  components: {
  },
  created:function() {
    // 今日の記録のfetch
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
    totalCalorie:null,
    goalCalorie:1000,
    logDate:new Date().toISOString().substring(0,10),
    recordExistence:false

  }),
   computed: {
    getintakeCalorie: function() {
      if (this.totalCalorie == null){
        return 'No Record'
      }
      return this.totalCalorie;
    },
    getgoalCalorie: function() {
      return this.goalCalorie;
    },
    calculateCalorie: function() {
      if (this.totalCalorie == null){
        return 'No Record'
      }
      return this.goalCalorie - this.totalCalorie;
    },
    recordDisplay:function() {
      return this.recordExistence;
    }
  },
  methods: {
    requestLog(){

    },
    fetchTotalCalorie(){
    var vm = this;
    var url = 'http://localhost:50001/sites/';// emp_id at the end of the url 
    axios.get(url) // dateObj {"date":logDate}第2引数
    .then((res) => {
    if (res.data.existence){
    vm.totalCalorie = res.data.total_calories; // remporaly variable vm.user.total;
    } else {
    vm.totalCalorie = null;
    return ;
    }
    })

     /* honban 
      var vm = this;
      var totalCaloUrl;
      */

      // axios.get(BASE_URL + EMP_INTAKE_CALO_URL + sessionStorage.getItem('emp_id'))

      /* ############## honban #############
    var dateRecord = {"date": new Date().toISOString().substring(0,10)}
    axios.get(totalCaloUrl, dateRecord)
      .then((res) => {
        vm.calorieToday = res.data.total_calories; // remporaly variable vm.user.total;
      })
      ############## honban ############# */
      },
      
      fetchGoalCalories(emp_id)  {
      const url = 'http://localhost:3000/sites/'
      var vm = this
      // axios.get(BASE_URL +EMP_GOAL_URL+sessionStorage.getItem('emp_id'))
      axios.get(url)
      .then(function (response) {
        emp_id;
    // not change reactively 
        // var calorieObj = response.data;// {goal_calorie:100}
        // vm.$store.dispatch("setGoalCalo", {
        // goalCalorie: calorieObj
        // })
        vm.goalCalorie = response.data.goal_calorie;
        console.log(response.data.goal_calorie); // tadasii
      }).catch(function () {

      })
   }, 
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