import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    errorMsg: false,
    tab: "all",
    searchquery: false,
    isGrid: true,
    typequery: false,
    pageindex: 0,
    list: null,
    allLoaded: false,
  },
  mutations: {},
  actions: {},
});
