<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const props = defineProps({
    image: String,
    title: String,
    price: Number,
    id: Number,
});

const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka);
};

const isBookmarked = ref(false);

onMounted(() => {
    checkBookmarkStatus();
});

const checkBookmarkStatus = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_KEY}/bookmarks`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
            }
        });
        isBookmarked.value = response.data.data.some(item => item.menu_id === props.id);
    } catch (error) {
        console.error('Gagal mengambil status bookmark:', error);
    }
};

const toggleBookmark = async (id) => {
    try {
        if (isBookmarked.value) {
            await axios.delete(`${import.meta.env.VITE_PUBLIC_API_KEY}/bookmarks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                }
            });
            isBookmarked.value = false;
            Swal.fire({
                icon: 'success',
                title: 'Dihapus',
                text: 'Menu berhasil dihapus dari bookmark!',
            });
        } else {
            await axios.post(`${import.meta.env.VITE_PUBLIC_API_KEY}/bookmarks/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                }
            });
            isBookmarked.value = true;
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Menu berhasil ditambahkan ke bookmark!',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat mengubah status bookmark!',
        });
        console.error("Error saat toggle bookmark:", error);
    }
};
</script>


<template>
    <router-link to="/">
        <div class="bg-white rounded-lg shadow-lg relative hover:transform transition-transform duration-300 hover:scale-105">
            <div class="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                <img :src="image" alt="Card Image" class="w-full h-full object-cover rounded-lg">
            </div>
            <RouterLink to="/makanan" class="absolute left-1/2 -translate-x-1/2 top-36 bg-white text-red-400 px-6 py-2 rounded-lg shadow-md hover:bg-red-400 hover:text-white transition">
                Pesan
            </RouterLink>
            <button @click="toggleBookmark(props.id)" 
                class="absolute -right-3 -translate-x-1/2 top-0 bg-white text-red-400 px-1 py-1 rounded-lg shadow-md hover:bg-red-400 hover:text-white transition">
                <svg v-if="!isBookmarked" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512">
                    <path fill="#e38282" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="#f38cb5" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </button>
            <div class="mt-8 pb-2 text-center">
                <p class="text-gray-700 font-semibold">{{ title }}</p>
                <p class="text-gray-500 text-sm">{{ formatRupiah(Number(price)) }}</p>
            </div>
        </div>
    </router-link>
</template>