<template>
  <v-container>
      <v-row lg="12">
        <v-col cols="5" class="left-col">
          <div class="form-container">
            <v-form ref="form">
            <v-label><h2 class="left-title">本日の摂取カロリー入力欄</h2></v-label>
              <v-select :items="foodList" label="摂取した食品を選択してください" dense outlined v-on:change="setIntakeFood($event.target.value)">
              </v-select>
              <!-- <select id="food-list">
              <option v-for="food in foodList" v-bind:key="food.id" v-on:change="selectedFoodId = $event.target.food.id" v-bind="food.name"></option><br>
              </select> -->
              <!-- <v-textarea solo name="input-7-4" label="摂取カロリーを入力" v-model="user.intakeCalorie">
              </v-textarea> -->
                <div class="btn-container">
                  <v-btn class="mr-4" v-on:click="submitCalorie" >submit</v-btn>
                </div>
              </v-form>
              <!--  -->
              <!--  -->
              <v-label><h2 class="left-title-sub">本日の摂取カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 class="goal-cal-disp">{{ calorieToday}}kcal</h1>
              </v-sheet>
              <div class="result"><h2></h2></div>
            </div>
          </v-col>
          <v-col cols="7" class="">
            <div class="output-container">
              <v-label><h2 class="right-title">現在の目標カロリー</h2></v-label>
              <div class="goal-cal">
                <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                  <!-- <h1 class="goal-cal-disp">{{ getgoalCalorie }}kcal</h1> -->
                  <h1 class="goal-cal-disp">{{ goalCalorie }}kcal</h1>
                </v-sheet>
              </div>
              <div class="poss-cal">
                <v-label><h2 class="right-title-sub">摂取可能なカロリー</h2></v-label>
                <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                  <h1 class="goal-cal-disp">{{ calorieAbailable }}kcal</h1>
                </v-sheet>
              </div>
            </div>
          </v-col>
        </v-row>
  </v-container>
</template>
<!-- user.intakeCalorie -->

<!-- <script src="../calocalo.js"></script> -->

<script>
const DOMAINE = 'http://localhost:80/';
const CONTEXT_PATH = "calocalo/";

const BASE_URL = DOMAINE + CONTEXT_PATH;
// const EMP_GOAL_URL = `employee/info/`;
const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;
// const EMP_SUBMIT_RECORD_URL = 'submit/food/'
import axios from "axios";

const url = 'http://localhost:3000/sites/'

export default {
  name: 'UserTop',
  created:function() {
    var vm = this;
    // vm.fetchFoodList();
    vm.fetchGoalCalories(sessionStorage.getItem('emp_id'));
  },
  components: {
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
    foodList:[],
    foodListObject:{},
    selectedFoodId:null,
    foodName:null,
    food:{name:null, id:null, calorie:null},
    goalCalorie:0,
    calorieToday:20,

  }),
   computed: {
    getintakeCalorie: function() {
      return this.$store.state.intakeCalorie;
    },
    getgoalCalorie: function() {
      return this.$store.state.goalCalorie.goal_calorie;
    },
    calorieAbailable: function() {
      return this.goalCalorie - this.calorieToday;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth", {
        empId: '0',
        password: 'qazplm'
      });
      this.$router.push('/login')
    },
    toUserLog() {
      this.$router.push('/userlog')
    },
    submit() {
      this.$store.dispatch("setcalo", {
        intakeCalorie: this.user.intakeCalorie,
      });
    },
    clear() {
      this.$refs.form.reset();
    },

    fetchFoodList() {
      var vm = this
      axios
      .get(url)
      .then(function (response) {
        vm.foodListObject = response.data.food_list
        console.log(vm.foodListObject.length)
        for (var i = 0; i < vm.foodListObject.length; i++) {
        vm.foodList.push(vm.foodListObject[i].name)
        }

      }).catch(function () {
      })
    },
    setIntakeFood(foodName){
      var vm = this
      for (var i = 0; i < vm.foodListObject.length; i++) {
        if (vm.foodListObject[i].name === foodName){
          vm.food.id = vm.foodListObject[i].id;
          vm.food.calorie = vm.foodListObject[i].calorie;
          vm.food.name = vm.foodListObject[i].name;
          break;
        }
      }
    },

   fetchGoalCalories(emp_id)  {
      var vm = this
      // axios.get(BASE_URL +EMP_GOAL_URL+sessionStorage.getItem('emp_id'))
      axios.get(url )
      .then(function (response) {
        emp_id;
        // not change reactively 
        var calorieObj = response.data;// {goal_calorie:100}
        vm.$store.dispatch("setGoalCalo", {
        goalCalorie: calorieObj
        })
        vm.goalCalorie = response.data.goal_calorie;
        console.log(response.data.goal_calorie); // tadasii
      }).catch(function () {

      })

   }, 

   foodCalories()  {

   }, 

   submitCalorie(){
    var vm = this;
    var calorieObj = {calorie: null, date: new Date().toISOString().substring(0,10)}
    if (this.food.id === false) {
      return 
    }else{
      calorieObj.calorie =  this.food.calorie;
    axios.put('submit/food/{emp_id')
      // axios.put(BASE_URL + EMP_SUBMIT_RECORD_URL + sessionStorage.getItem('emp_id'), calorieObj)
      .then(() => {
        vm.fetchTotalCalorie();        
      })


    }

   },
   fetchTotalCalorie(){
      var vm = this;
    //axios.put(submit/food/{emp_id})
      axios.get(BASE_URL + EMP_INTAKE_CALO_URL + sessionStorage.getItem('emp_id'))
      .then((res) => {
        vm.user.total = res.data.total_calorie; // remporaly variable vm.user.total;
      })

   },

  // watch: {
  //   // userId: function() {
  //   //   this.getUserName()
  //   // },
  //   // info: function() {
  //   //   this.getCoinInfo()
  //   // }
  // }
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