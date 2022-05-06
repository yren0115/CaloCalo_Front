import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empId: '0',
    password:'qazplm',
    goalCalorie: 500,
    intakeCalorie: 0,
  },
  mutations: {
    updateUser(state, user) {
      state.empId = user.empId;
      state.password = user.password;
    },
    setCalorie(state, user) {
      state.intakeCalorie = user.intakeCalorie;
    },
    setGoalCalo(state, user) {
      state.goalCalorie = user.goalCalorie;
    },
  },
  actions: {
    auth(context, user) {
      context.commit('updateUser', user);
    },
    setcalo(context, user) {
      context.commit('setCalorie', user)
    },
    setGoalCalo(context, user) {
      context.commit('setGoalCalo', user)
    },
  },
  getters: {
    userInfo: state => state.empId? state.empId: '',
    calcCal (state) {
      return (state.goalCalorie - state.intakeCalorie)
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  modules: {
  },
})
