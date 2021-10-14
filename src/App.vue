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
body {
  background-color: #fff;
}
</style>
