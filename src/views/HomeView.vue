<script setup>
  import BannerHome from '@/components/banner/BannerHome.vue';
  import MediumCard from '@/components/cardbox/MediumCard.vue';
  import NavbarSelect from '@/components/navbar/NavbarSelect.vue';
  import OrderMenu from '@/components/Order/OrderMenu.vue';
  import axios from 'axios';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const menus = ref(null);
  const orderItems = ref([]);
  const route = useRoute();

  const fetchData = async () => {
    const category = route.query.category;
    try {
      menus.value = null; // Set menus to null before fetching
      const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/menus', {
        params: {
          category: category,
        },
      });
      menus.value = response.data.data;
    } catch (error) {
      console.error("Error fetching menus:", error);
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hemm.. , terjadi kesalahan saat mengambil data menu! Hubungi Programmer',
      });
    }
  }

  const handleAddToCart = (item) => {
    const existingItem = orderItems.value.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      orderItems.value.push({
        ...item,
        quantity: 1
      });
    }
  }

  onMounted(() => {
    fetchData();
  });

  watch(() => route.query.category, fetchData);
</script>

<template>
  <div class="w-full flex mx-7">
    <div class="w-[70%] mx-12">
      <div class="py-10">
        <input type="text" placeholder="Search" name="search" id="search" class="rounded-2xl pl-12 pr-3 h-10 w-1/2">
        <button class="absolute left-32 -translate-x-1/2 top-12 ">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </button>
      </div>
      <BannerHome
        image="/public/image/cake-photo.png"
        title="Dapatkan Dessert Gratis!"
        short-description="Jadikan orderan peratama mu hanya dengan Rp. 100.000 dan dapatkan dessert gratis!"
      />
      <NavbarSelect/>
      <div v-if="menus === null" class="grid grid-cols-4 gap-4 my-4">
        <div v-for="n in 8" :key="n" class="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      <!-- Real Cards -->
      <div v-else class="grid grid-cols-4 gap-4 my-4">
        <MediumCard v-for="item in menus" :key="item.id" 
          :image="item.image"
          :title="item.name"
          :price="item.price"
          :id="item.id"
          @handleAddToCart="handleAddToCart"
        />
      </div>
    </div>
    <OrderMenu :orderItems="orderItems" @orderSubmitted="orderItems = []"/>
  </div>
</template>
