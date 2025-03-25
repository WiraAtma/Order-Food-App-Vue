<template>
    <div class="py-4">
        <div class="py-1 mb-3">
            <h1 class="text-2xl font-semibold">Restoran</h1>
            <h1>Pilih Kategori yang mau dipesan hari ini</h1>
        </div>
        <div class="flex space-x-4">
            <router-link class="px-10 rounded-lg bg-white py-1.5 text-red-400 hover:text-white hover:bg-red-400" to="/">Semua</router-link>
            <router-link class="px-10 rounded-lg bg-white py-1.5 text-red-400 hover:text-white hover:bg-red-400" to="/">Makanan</router-link>
            <router-link class="px-10 rounded-lg bg-white py-1.5 text-red-400 hover:text-white hover:bg-red-400" to="/">Minuman</router-link>
            <router-link class="px-10 rounded-lg bg-white py-1.5 text-red-400 hover:text-white hover:bg-red-400" to="/">Desert</router-link>
        </div>
    </div>
</template>