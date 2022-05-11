const { default: axios } = require("axios");

const PROTOCOLE = 'http://'
const DOMAINE = 'localhost';
const PORT = ':8000/'
const CONTEXT_PATH = "calocalo/";
const BASE_URL = PROTOCOLE + DOMAINE + PORT + CONTEXT_PATH;

const LOGIN_URL= `login/`;
const SIGNUP_URL= `signup/`;
const EMP_GOAL_URL = `employee/info/`;
const EMP_INTAKE_CALO_URL_URL = `employee/take_calorie/`;
const SETTING_URL= `mypage/setting/`;
const FOODS_URL= `food_list/`;
// temporary 
const ADMIN_DEL_EMP_URL = 'admin/delete/emp/';
const ADMIN_ADD_FOOD_URL = 'admin/add/food/';

const ADMIN_CODE = 100;

// {/* <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> */}


async function getGoalCalore(){
   await axios.get(BASE_URL + EMP_GOAL_URL)
    .then((res) => {
        res.data.goal_calorie;
    })
}

async function getGoalCalore(emp_id){
   await axios.get(BASE_URL + EMP_INTAKE_CALO_URL_URL + emp_id)
    .then((res) => {
        res.data.total_calories;
    })
}

async function updateGoalCalorie(emp_id){
   await axios.put(BASE_URL + SETTING_URL + emp_id)
    .then((res) => {
        
    })
}



// check response when create is done => Object is returned
async function createEmp(newEmpInfo){
    await axios.post(BASE_URL + SIGNUP_URL, newEmpInfo)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

async function getFoodList(){
   await axios.get(BASE_URL + FOODS_URL)
    .then((res) => {
        // food_list :[]
        res.data.food_list;
    })
}

// newEmpInfo = {
//      goal_calorie:, 
//      emp_id:, 
//      password:
// }

    // loginInfo {password:''}
function loginAuth(loginInfo, emp_id) {
    axios.post(BASE_URL + LOGIN_URL + emp_id, loginInfo)
    .then( res => {
        isLoginSucceed(res.data);
    })
    .catch((err) => {
        // set err
        // err = err
    })
}

function isLoginSucceed(loginAuth) {
    if (loginAuth.login){
        // login 成功処理 page 遷移
        if (loginAuth.admin === ADMIN_CODE){
            //  admin transition
        }else{
            // my page transition
        }
    }else{
        //　ログイン失敗処理　ログインページにエラーメッセージとリダイレクト
    }
}

async function deleteEmp(emp_id){
   await axios.delete(BASE_URL + ADMIN_DEL_EMP_URL + emp_id)
    .then((res) => {
    })
}

// foodInfo = {foodName:"", calories:}
async function addFood(foodInfo){
   await axios.post(BASE_URL + ADMIN_ADD_FOOD_URL, foodInfo)
    .then((res) => {
    })
}