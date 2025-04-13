<script setup>
    import IdentityLoginBox from '../cardbox/IdentityLoginBox.vue';
import SmallCard from '../cardbox/SmallCard.vue';
</script>

<template>
    <div class="bg-white h-screen fixed w-[25%] max-w-[350px] min-w-[300px] p-6 right-0 top-0 shadow-lg">
      <IdentityLoginBox/>
      <hr>
      <div class="py-2">
        <div class="overflow-y-auto h-[450px] max-h-[450px]">
          <h1 class="font-semibold text-xl">Pesanan Anda</h1>
          <!-- <div class="flex items-center justify-center h-[70%]">
            <p>Pesanan Anda Masih Kosong</p>
          </div> -->
          <SmallCard/>
        </div>
        <div class="py-4">
            <h1 class="font-bold text-xl">Total : Rp. 100.000</h1>
            <button class="border w-full py-3 rounded-lg bg-red-400 text-white font-semibold mt-3 hover:bg-red-200 hover:text-red-400">Pesan Sekarang</button>
        </div>
      </div>
    </div>
</template>