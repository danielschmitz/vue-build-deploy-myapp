import Vue from 'vue';
import Vuex from 'vuex';

import login from '@/services/login';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '' || localStorage.getItem('token')
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    }
  },
  actions: {
    tryLogin({ commit }, payload) {
      console.log('tryLogin with ', payload.email, 'and', payload.password);
      login.tryLogin(payload.email, payload.password).then(
        result => {
          commit('setToken', result.data.token);
        },
        error => {
          console.log('error', error);
        }
      );
    },
    logout({ commit }) {
      commit('setToken', '');
    }
  },
  getters: {
    isLogged: state => {
      return state.token != '';
    },
    getToken: state => {
      return state.token;
    }
  }
});
