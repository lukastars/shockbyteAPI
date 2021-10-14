<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style>
@import '~vue-sliding-pagination/dist/style/vue-sliding-pagination.css';

.c-sliding-pagination__page {
  padding: 0.6em;
}
.c-sliding-pagination__list-element {
  padding: 0;
  background: #9b76f1;
}
.c-sliding-pagination__list-element--active:hover {
  color: #fff;
  background: #3922af;
  cursor: default;
}
.c-sliding-pagination__list-element--active {
  background: #3922af;
}
body {
  background-color: #fff;
}
</style>
