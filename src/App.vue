<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
import { computed } from 'vue';

const route = useRoute();
const showNavbar = computed(() => {
  return route.path !== '/login' && route.path !== '/register';
});

</script>

<template>
  <div class="w-full flex">
    <div v-show="showNavbar" class="w-[2%]">
      <Navbar/>
    </div>
    <div class="w-full">
      <RouterView />
    </div>
  </div>
</template>

