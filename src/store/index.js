import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empId: '1',
    password:'qazplm',
    adminId: '1',
    adminPass: 'abc',
    goalCalorie: 0,
    intakeCalorie: 0,
    selectFood: null,
  },
  mutations: {
    updateUser(state, user) {
      state.empId = user.empId;
      state.password = user.password;
      state.goalCalorie = user.goalCalorie
    },
    updateAdmin(state, admin) {
      state.adminId = admin.adminId
      state.adminPass = admin.adminPass
    },
    destroyUser(state, user) {
      state.empId = user.empId
      state.password = user.password
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
    outh(context, user) {
      context.commit('destroyUser', user);
    },
    adauth(context, admin) {
      context.commit('updateAdmin', admin)
    },
    setcalo(context, user) {
      context.commit('setCalorie', user);
    },
    setgoalcalo(context, user) {
      context.commit('setGoalCalo', user);
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
