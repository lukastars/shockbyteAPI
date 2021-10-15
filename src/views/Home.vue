<template>
  <div>
    <div class="flex justify-center">
      <img v-if="loading" :src="spinner" class="mt-20" />
    </div>
    <div
      v-if="errors"
      class="text-center text-xl font-bold text-gray-600  mb-10 p-5 rounded-xl w-full bg-red-400 h-50"
    >
      Something went wrong!
    </div>
    <div v-if="!loading" class="home">
      <NodesList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store/index.js';
import axios from 'axios';

import NodesList from '@/components/NodesList.vue';

export default {
  name: 'Home',
  components: {
    NodesList,
  },
  data() {
    return {
      spinner: require('@/assets/spinner.svg'),
    };
  },
  computed: {
    loading() {
      return store.state.loading;
    },
    errors() {
      return store.state.errors;
    },
    perPage() {
      return store.state.perPage;
    },
    currentPage() {
      return store.state.currentPage;
    },
  },
  watch: {
    currentPage: function() {
      this.getDisplayedNodesData();
    },
  },
  methods: {
    async getNodesData() {
      store.commit('changeLoading', true);

      try {
        const response = await axios.get(
          `https://600f10ec6c21e1001704e67a.mockapi.io/api/v1/stats`
        );
        const data = response.data;
        const perPage = store.state.perPage;
        const totalPages = Math.ceil(data.length / perPage);

        store.commit('setTotalPages', totalPages);
        store.commit('changeLoading', false);
        return data;
      } catch (error) {
        store.commit('changeErrors', true);
        console.error(error);
      }
    },
    async getDisplayedNodesData() {
      try {
        store.commit('changeLoading', true);

        const response = await axios.get(
          `https://600f10ec6c21e1001704e67a.mockapi.io/api/v1/stats?page=${this.currentPage}&limit=${this.perPage}`
        );
        const data = response.data;
        store.commit('setDisplayedNodesData', data);
        store.commit('changeLoading', false);
        store.commit('changeErrors', false);
        return data;
      } catch (error) {
        store.commit('changeErrors', true);
        console.error(error);
      }
    },
    async updateData() {
      await setInterval(() => {
        this.getNodesData();
      }, 300000);
    },
  },

  async mounted() {
    const data = await this.getNodesData();
    const displayedData = await this.getDisplayedNodesData();

    store.commit('setNodesData', data || {});
    store.commit('setDisplayedNodesData', displayedData || {});

    this.updateData();
  },
};
</script>
