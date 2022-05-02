import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empId: '0',
    password:'qazplm',
  },
  mutations: {
    updateUser(state, user) {
      state.empId = user.empId;
      state.password = user.password;
    },
  },
  actions: {
    auth(context, user) {
      context.commit('updateUser', user);
    }
  },



  getters: {
    userInfo: state => state.empId? state.empId: '',
  },
  modules: {
  }
})
