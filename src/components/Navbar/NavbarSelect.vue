<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>
<template>
    <div class="py-4">
        <div class="py-1 mb-3">
            <h1 class="text-2xl font-semibold">Restoran</h1>
            <h1>Pilih Kategori yang mau dipesan hari ini</h1>
        </div>
        <div class="flex space-x-4">
            <router-link
                class="px-10 rounded-lg py-1.5"
                :class="[
                    !route.query.category ? 'bg-red-400 text-white' : 'bg-white text-red-400 hover:bg-red-400 hover:text-white'
                ]"
                to="/"
                >
                Semua
            </router-link>

            <router-link
                class="px-10 rounded-lg py-1.5"
                :class="[
                    route.query.category === 'food' ? 'bg-red-400 text-white' : 'bg-white text-red-400 hover:bg-red-400 hover:text-white'
                ]"
                :to="{ name: 'home', query: { category: 'food' } }"
                >
                Makanan
            </router-link>

            <router-link
                class="px-10 rounded-lg py-1.5"
                :class="[
                    route.query.category === 'drink' ? 'bg-red-400 text-white' : 'bg-white text-red-400 hover:bg-red-400 hover:text-white'
                ]"
                :to="{ name: 'home', query: { category: 'drink' } }"
                >
                Minuman
            </router-link>
            <router-link
                class="px-10 rounded-lg py-1.5"
                :class="[
                    route.query.category === 'desert' ? 'bg-red-400 text-white' : 'bg-white text-red-400 hover:bg-red-400 hover:text-white'
                ]"
                :to="{ name: 'home', query: { category: 'desert' } }"
                >
                Desert
            </router-link>
            <router-link
                class="px-10 rounded-lg py-1.5"
                :class="[
                    route.query.category === 'other' ? 'bg-red-400 text-white' : 'bg-white text-red-400 hover:bg-red-400 hover:text-white'
                ]"
                :to="{ name: 'home', query: { category: 'other' } }"
                >
                Lainnya
            </router-link>
        </div>
    </div>
</template>