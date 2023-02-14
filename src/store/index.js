import {createStore} from 'vuex';
import toyModule from './modules/shopping-list.module.js';

const store = createStore({
  strict: true,
  state: {
    count: 10,
  },
  getters: {
    count(state) {
      return state.count;
    },
  },
  mutations: {
    setCount(state, {count}) {
      state.count = count;
    },
  },
  actions: {},
  modules: {
    toyModule,
  },
});

export default store;
