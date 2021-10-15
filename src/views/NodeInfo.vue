<template>
  <div>
    <div class="flex justify-center" v-if="loading">
      <img :src="spinner" class="mt-20" />
    </div>
    <div
      v-if="errors"
      class="text-center text-xl font-bold text-gray-600  mb-10 p-5 rounded-xl w-full bg-red-400 h-50"
    >
      Something went wrong!
    </div>
    <div v-if="!loading">
      <div
        class="flex flex-row justify-center items-center	 text-xl mb-1 mt-1  "
      >
        <img class="mr-2 node_img" :src="node" />
        <span class="data_title text-xl font-bold text-gray-600"
          >Node ID:&#160;
        </span>
        <span class=" text-xl font-bold text-gray-600">{{
          getCurrentNodeID
        }}</span>
      </div>
      <div
        class="flex flex-row justify-center items-center	 text-xl mb-1 mt-1  "
      >
        <img class="mr-2 node_img" :src="time" />
        <span class=" data_title text-xl font-bold ">Up Time:&#160;</span>
        <span class=" text-xl font-bold text-gray-600">{{ upTime }}</span>
      </div>
      <div class="grid md:grid-cols-2 gap-4 mb-20">
        <ChartData :chartType="'Ram'" />
        <ChartData :chartType="'Disk'" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index.js';
import axios from 'axios';
import { DateTime } from 'luxon';

import ChartData from '@/components/ChartData.vue';

export default {
  name: 'NodeInfo',
  components: {
    ChartData,
  },
  data() {
    return {
      spinner: require('@/assets/spinner.svg'),
      node: require('@/assets/node.png'),
      time: require('../assets/time.png'),
    };
  },

  computed: {
    loading() {
      return store.state.loading;
    },
    errors() {
      return store.state.errors;
    },
    getCurrentNodeID() {
      return this.$route.params.id;
    },
    currentNodeData() {
      return store.state.currentNodeData;
    },
    upTime() {
      const end = DateTime.now();
      const start = DateTime.fromISO(store.state.currentNodeData.up_since);
      const diff = end.diff(start, ['days', 'hours', 'minutes', 'seconds']);
      diff.toObject();
      return `${Math.floor(diff.days)} Days, ${Math.floor(
        diff.hours
      )} Hours, ${Math.floor(diff.minutes)} Minutes, ${Math.floor(
        diff.seconds
      )} Seconds`;
    },
  },
  methods: {
    async getNodeData(id) {
      store.commit('changeLoading', true);

      try {
        const response = await axios.get(
          `https://600f10ec6c21e1001704e67a.mockapi.io/api/v1/stats/${id}`
        );
        const data = response.data;
        store.commit('changeLoading', false);
        return data;
      } catch (error) {
        store.commit('changeErrors', true);
        console.error(error);
      }
    },
  },

  async created() {
    const nodeId = this.getCurrentNodeID;
    const data = await this.getNodeData(nodeId);
    store.commit('setCurrentNodeData', data);
  },
};
</script>
