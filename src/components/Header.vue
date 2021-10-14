<template>
  <header class=" text-gray-800 text-white p-4 mb-10 ">
    <router-link to="/">
      <div
        class="flex  justify-center  align-center  m-auto   font-extrabold mb-3"
      >
        <img :src="logo" class="w-2/5" />
      </div>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      logo: require('../assets/shockbyte_logo.png'),
    };
  },
};
</script>
