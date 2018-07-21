import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: window.sessionStorage.getItem('token'),
  username: ''
};

const mutation = {
  LOGIN: (state, data) => {
    //更改token的值
    state.token = data;
    window.sessionStorage.setItem('token', data);
  },
  LOGOUT: (state) => {
    //登出清除token
    state.token = null;
    window.sessionStorage.removeItem('token');
  },
  USERNAME: (state, data) => {
    state.username = data;
    window.sessionStorage.setItem('username', data);
  }
};

const actions = {
  UserLogin({ commit }, data) {
    commit('LOGIN', data);
  },
  UserLogout({ commit }, data) {
    commit('LOGOUT');
  },
  UserName({ commit }, data) {
    commit('USERNAME', data);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});