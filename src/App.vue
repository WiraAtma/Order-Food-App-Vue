<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
</script>

<template>
  <div class="w-full flex">
    <div class="w-[2%]">
      <Navbar/>
    </div>
    <div class="w-full">
      <RouterView />
    </div>
  </div>
</template>

