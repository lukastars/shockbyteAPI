import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: false,
    loading: true,
    currentPage: 1,
    totalPages: 10,
    perPage: 8,
    nodesData: {},
    currentNodeData: {},
    displayedNodesData: {},
  },
  mutations: {
    setNodesData(state, data) {
      state.nodesData = data;
    },
    setDisplayedNodesData(state, data) {
      state.displayedNodesData = data;
    },
    changeLoading(state, x) {
      state.loading = x;
    },
    changeErrors(state, x) {
      state.errors = x;
    },
    changeCurrentPage(state, selectedPage) {
      state.currentPage = selectedPage;
    },
    setCurrentNodeID(state, id) {
      state.currentNodeID = id;
    },
    setCurrentNodeData(state, data) {
      state.currentNodeData = data;
    },
    setTotalPages(state, total) {
      state.totalPages = total;
    },
  },
  actions: {},
  modules: {},
});
