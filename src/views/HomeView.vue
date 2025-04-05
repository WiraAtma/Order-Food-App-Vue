<script setup>
import BannerHome from '@/components/banner/BannerHome.vue';
import IdentityLoginBox from '@/components/cardbox/IdentityLoginBox.vue';
import MediumCard from '@/components/cardbox/MediumCard.vue';
import SmallCard from '@/components/cardbox/SmallCard.vue';
import NavbarSelect from '@/components/navbar/NavbarSelect.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const menus = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/menus');
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

onMounted(() => {
  fetchData();
});
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
      <div class="grid grid-cols-4 gap-4 my-4">
      <MediumCard v-for="item in menus" :key="item.id" 
        :image="item.image"
        :title="item.name"
        :price="item.price"
      />
</div>
    </div>
    <div class="bg-white h-screen fixed w-[25%] max-w-[350px] min-w-[300px] p-6 right-0 top-0 shadow-lg">
      <IdentityLoginBox/>
      <hr>
      <div class="py-2">
        <div class="overflow-y-auto h-[450px] max-h-[450px]">
          <h1 class="font-semibold text-xl">Pesanan Anda</h1>
          <div class="flex items-center justify-center h-[70%]">
            <p>Pesanan Anda Masih Kosong</p>
          </div>
        </div>
        <div class="py-4">
            <h1 class="font-bold text-xl">Total : Rp. 100.000</h1>
            <button class="border w-full py-3 rounded-lg bg-red-400 text-white font-semibold mt-3 hover:bg-red-200 hover:text-red-400">Pesan Sekarang</button>
        </div>
      </div>
    </div>
  </div>
</template>
