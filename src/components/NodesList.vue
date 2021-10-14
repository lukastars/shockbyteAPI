<template>
  <div>
    <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
      <div v-for="nodeData in nodesData" :key="nodeData.id">
        <router-link :to="{ name: 'NodeInfo', params: { id: nodeData.id } }">
          <NodeCard :nodeData="nodeData" />
        </router-link>
      </div>
    </div>
    <div class="flex justify-center">
      <sliding-pagination
        :current="currentPage"
        :total="totalPages"
        @page-change="pageChangeHandler"
      ></sliding-pagination>
    </div>
  </div>
</template>

<script>
import store from '@/store/index.js';
import SlidingPagination from 'vue-sliding-pagination';

import NodeCard from '@/components/NodeCard.vue';
export default {
  name: 'NodesList',
  components: {
    NodeCard,
    SlidingPagination,
  },
  data() {
    return {};
  },
  computed: {
    nodesData() {
      return store.state.displayedNodesData;
    },
    currentPage() {
      return store.state.currentPage;
    },
    totalPages() {
      return store.state.totalPages;
    },
  },
  methods: {
    pageChangeHandler(selectedPage) {
      store.commit('changeCurrentPage', selectedPage);
    },
  },
};
</script>
