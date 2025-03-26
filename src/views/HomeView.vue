<script setup>
import BannerHome from '@/components/banner/BannerHome.vue';
import MediumCard from '@/components/cardbox/MediumCard.vue';
import SmallCard from '@/components/cardbox/SmallCard.vue';
import NavbarSelect from '@/components/navbar/NavbarSelect.vue';


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
        <MediumCard/>
        <MediumCard/>
        <MediumCard/>
        <MediumCard/> 
        <MediumCard/>
        <MediumCard/>
        <MediumCard/>
        <MediumCard/> 
      </div>
    </div>
    <div class="bg-white h-screen fixed w-[25%] max-w-[350px] min-w-[300px] p-6 right-0 top-0 shadow-lg">
      <div class="flex justify-between pb-6">
        <h1 class="w-[50%]">
          <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 448 512"><path fill="#f59e9e" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
          I Kadek Wira Atmaja Kadek Wayan
        </h1>
        <h1 class="w-[48%]">
          <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 384 512"><path fill="#ec9c9c" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
          Jl. Raya Gunung Mas Gg. Kidul No 1b Denpasar Utara
        </h1>
      </div>
      <hr>
      <div class="py-2">
        <div class="overflow-y-auto h-[450px] max-h-[450px]">
          <h1 class="font-semibold text-xl">Pesanan Anda</h1>
          <SmallCard/>
          <SmallCard/>
          <SmallCard/>
          <SmallCard/>
        </div>
        <div class="py-4">
            <h1 class="font-bold text-xl">Total : Rp. 100.000</h1>
            <button class="border w-full py-3 rounded-lg bg-red-400 text-white font-semibold mt-3 hover:bg-red-200 hover:text-red-400">Pesan Sekarang</button>
        </div>
      </div>
    </div>
  </div>
</template>
