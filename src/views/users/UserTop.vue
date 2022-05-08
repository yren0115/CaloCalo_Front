<template>
  <v-container>
      <v-row lg="12">
        <v-col cols="5" class="left-col">
          <div class="form-container">
            <v-form ref="form">
            <v-label><h2 class="left-title">本日の摂取カロリー入力欄</h2></v-label>
              <v-select :items="foodList" label="摂取した食品を選択してください" dense outlined v-on:input="">
              </v-select>
              <!-- <select id="food-list">
              <option v-for="food in foodList" v-bind:key="food.id" v-on:change="selectedFoodId = $event.target.food.id" v-bind="food.name"></option><br>
              </select> -->
              <!-- <v-textarea solo name="input-7-4" label="摂取カロリーを入力" v-model="user.intakeCalorie">
              </v-textarea> -->
                <div class="btn-container">
                  <v-btn class="mr-4" v-on:click="submitCalorie" >記録する</v-btn>
                </div>
              </v-form>
              <!--  -->
              <!--  -->
              <v-label><h2 class="left-title-sub">本日の摂取カロリー</h2></v-label>
              <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                <h1 class="goal-cal-disp">{{ getintakeCalorie }}kcal</h1>
              </v-sheet>
              <div class="result"><h2></h2></div>
            </div>
          </v-col>
          <v-col cols="7" class="">
            <div class="output-container">
              <v-label><h2 class="right-title">現在の目標カロリー</h2></v-label>
              <div class="goal-cal">
                <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                  <h1 class="goal-cal-disp">{{ getgoalCalorie }}kcal</h1>
                </v-sheet>
              </div>
              <div class="poss-cal">
                <v-label><h2 class="right-title-sub">摂取可能なカロリー</h2></v-label>
                <v-sheet elevation="50" class="mx-auto" height="150" width="500" rounded shaped>
                  <h1 class="goal-cal-disp">{{ $store.getters.calcCal }}kcal</h1>
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
const EMP_GOAL_URL = `employee/info/`;
const EMP_INTAKE_CALO_URL = `employee/take_calorie/`;
const EMP_SUBMIT_RECORD_URL = 'submit/food/'
import axios from "axios";

const url = 'http://localhost:3000/sites'

export default {
  name: 'UserTop',
  created:function() {
    var vm = this;
    vm.fetchFoodList();
    vm.fetchGoalCalories();
  },
  components: {
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
    // info: null,
    foodList:[],
    foodListObject:[],
    selectedFoodId:null,
    foodName,
    food:{name:null, id:null, calorie:null}
  }),
   computed: {
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

    // getCoinInfo() {
    //   axios
    //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //     .then( response => this.info = response.data)
    //     .catch(function () {
    //       this.info = "不正なコイン情報です"
    //     })
    },

    fetchFoodList() {
      var vm = this
      axios
      .get(url)
      .then(function (response) {
        vm.foodListObject = response.data.food_list
        for (var i = 0; i < foodListObject.length; i++) {
        vm.foodList.push(vm.foodListObject[i].name)
        }

      }).catch(function () {

      })

    },
    // addIntakeCalorieById(){
    //   for (var i = 0; i < this.foodListObject.length; i++) {
    //     if (this.foodListObject[i].id === this.selectedFoodId){
    //       this.getintakeCalorie += this.foodListObject[i].calorie;
    //       break;
    //     }
    //   }
    // },
    setIntakeFood(){
      for (var i = 0; i < this.foodListObject.length; i++) {
        if (this.foodListObject[i].name === this.foodName){
          this.food.id = this.foodListObject[i].id;
          this.food.calorie = this.foodListObject[i].calorie;
          this.food.name = this.foodListObject[i].name;
          break;
        }
      }

    },

    displayCalories() {
      this.()
      this.()

      

    },


    // setFoodId() {
    //   var vm = this
    //   // this.selectedFoodId = 
    // },

   fetchGoalCalories()  {
      var vm = this
      axios.get(BASE_URL +EMP_GOAL_URL+sessionStorage.getItem('emp_id'))
      .then(function (response) {
        vm.getgoalCalorie = response.data.goal_calorie
      }).catch(function () {

      })

   }, 

   foodCalories()  {

   }, 

   submitCalorie(){
    var calorieObj = {calorie: null, date: new Date().toISOString().substring(0,10)}
    if (this.food.id === fasle) {
      return 
    }else{
      calorieObj.calorie =  this.food.calorie;
      axios.put(BASE_URL + EMP_SUBMIT_RECORD_URL + sessionStorage.getItem('emp_id'), calorieObj)
      .then(() => {
        // calorie displayed get Intakecalo called 
        
      })

    //axios.put(submit/food/{emp_id})
    }

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