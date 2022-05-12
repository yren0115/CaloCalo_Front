<template>
  <v-container>
      <v-row lg="12">
        <v-col cols="5" class="left-col">
          <div class="form-container">
            <v-form ref="form">
            <v-label><h2 class="left-title">本日の摂取カロリー入力欄</h2></v-label>
              <v-select :items="foodList" label="摂取した食品を選択してください" dense outlined v-model="selectedFood">
              </v-select>
                <div class="btn-container">
                  <!-- <v-btn class="mr-4" :disabled="processing" v-on:click.prevent="submitUpdateCalorie" >submit</v-btn> -->
                  <v-btn class="mr-4" v-on:click.prevent="submitUpdateCalorie" >submit</v-btn>
                </div>
              </v-form>
              <v-label><h2 class="left-title-sub">本日の摂取カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 class="goal-cal-disp">{{ intakeCalorieToday }}kcal</h1>
              </v-sheet>
              <div class="result"><h2></h2></div>
            </div>
          </v-col>
      
          <v-col cols="7" class="">
            <div class="output-container">
              <v-label><h2 class="right-title">現在の目標カロリー</h2></v-label>
              <div class="goal-cal">
                <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
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

<script>
const PROTOCOLE = 'http://'
const DOMAINE = 'localhost';
const PORT = ':8000/'
const CONTEXT_PATH = "calocalo/";
const BASE_URL = PROTOCOLE + DOMAINE + PORT + CONTEXT_PATH;

const BASE_URL = DOMAINE + CONTEXT_PATH;
// const EMP_GOAL_URL = `employee/info/`;
// const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;
const EMP_SUBMIT_RECORD_URL = 'submit/food/'
const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;
// const EMP_SUBMIT_RECORD_URL = 'submit/food/'

const FOODS_URL= `food_list/`;
const EMP_GOAL_URL = `employee/info/`;
const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;
const EMP_SUBMIT_RECORD_URL = 'submit/food/'
import axios from "axios";

export default {
  name: 'UserTop',

  created:function() {
    var vm = this;
    vm.fetchFoodList();
    vm.fetchGoalCalories();
    vm.fetchTotalCalorie();
  },

  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
    foodList:[],
    foodObjectList:{},
    selectedFoodId:null,
    foodName:null,
    food:{name:null, id:null, calorie:null},
    goalCalorie:0,
    calorieToday:0,
    selectedFood:null,
    disabledButton:true
    // processing:false 

  }),

   computed: {
    calorieAbailable: function() {
      return this.goalCalorie - this.calorieToday;
    },
    intakeCalorieToday: function() {
      return this.calorieToday;
    }
  },

  methods: {

    fetchFoodList() {
      var vm = this
      axios.get(BASE_URL + FOODS_URL)
      .then(function (response) {
        vm.foodObjectList = response.data.food_list;
        for (var i = 0; i < vm.foodObjectList.length; i++) {
          vm.foodList.push(vm.foodObjectList[i].food_name);
        }
      })
    },

    setIntakeFood(foodName){
      var vm = this
      for (var i = 0; i < vm.foodObjectList.length; i++) {
        if (vm.foodObjectList[i].food_name === foodName){
          vm.food.id = vm.foodObjectList[i].food_id;
          vm.food.calorie = vm.foodObjectList[i].calories;
          vm.food.name = vm.foodObjectList[i].food_name;
          break;
        }
      }
    },

   fetchGoalCalories()  {
      var vm = this
      // axios.get(BASE_URL +EMP_GOAL_URL+ localStorage.emp_id)
      axios.get(url)
      // axios.get(BASE_URL +EMP_GOAL_URL+sessionStorage.getItem('emp_id'))
      axios.get(url )
      axios.get(BASE_URL + EMP_GOAL_URL + localStorage.emp_id)
      .then(function (response) {
        vm.goalCalorie = response.data.goal_calorie;
      })
   }, 

   async submitUpdateCalorie(){
     if (this.selectedFood === null) {
       return ;
     }
    var vm = this;
    var calorieObj = {calorie: null, date: new Date().toISOString().substring(0,10)}
    if (this.food.id === false) {
      return 
    }else{
      calorieObj.calorie =  this.food.calorie;
      axios.put(BASE_URL + EMP_SUBMIT_RECORD_URL + localStorage.emp_id, calorieObj)
    axios.put('submit/food/{emp_id')
      // axios.put(BASE_URL + EMP_SUBMIT_RECORD_URL + sessionStorage.getItem('emp_id'), calorieObj)
      .then(() => {
        vm.fetchTotalCalorie();        
      })


    }
    vm.setIntakeFood(vm.selectedFood)
    var calorieObj = {take_calorie: null, date: new Date().toISOString().substring(0,10)}
    calorieObj.take_calorie = this.food.calorie;
    await axios.put(BASE_URL + EMP_SUBMIT_RECORD_URL + localStorage.emp_id, calorieObj)
    await vm.fetchTotalCalorie();
    },

   fetchTotalCalorie(){
     var vm = this;
      var dateToday = {"date": new Date().toISOString().substring(0,10)}
      axios.post(BASE_URL + EMP_INTAKE_CALO_URL + localStorage.emp_id, dateToday)
      .then((res) => {
        var existence = res.data.existence;
        if (existence){
        vm.calorieToday = res.data.total_calories; 
        } else {
          return ;
        }
      })
   },
  }
}
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