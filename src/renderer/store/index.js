import Vue from 'vue';
import Vuex from 'vuex';

// import modules from './modules';

Vue.use(Vuex);
const state = {
  count: 1,
  arr: []
};
const mutations = {
  add (state, n) {
    state.arr = n;
  },
  reduce (state) {
  }
};
export default new Vuex.Store({
  state,
  mutations
  // modules,
  // strict: process.env.NODE_ENV !== 'production'
});
