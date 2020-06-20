import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    currentTab: "all",
    searchQuery: false,
    isGrid: true,
    typeQuery: false,
    pageindex: 0,
  },
  mutations: {},
  actions: {},
});
