<script setup>
    import MediumCard from '@/components/cardbox/MediumCard.vue';
    import OrderMenu from '@/components/Order/OrderMenu.vue';
    import axios from 'axios';
import Swal from 'sweetalert2';
    import { onMounted, ref } from 'vue';

    const menus = ref([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/bookmarks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            menus.value = response.data.data;
        } catch (error) {
            console.error("Error fetching Bookmark:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hemm.. , terjadi kesalahan saat mengambil data bookmark! Hubungi Programmer',
            });
        }
    }   

    onMounted(() => {
        fetchData();
    });

</script>

<template>
    <div class="ml-14 p-10">
        <div class="w-[70%] mx-12">
            <h1 class="text-3xl font-bold">Bookmark</h1>
            <p class="text-gray-500">Daftar Bookmark Anda</p>
            <div v-if="menus.length > 0" class="grid grid-cols-4 gap-4 my-4">
                <MediumCard v-for="item in menus" :key="item.id" 
                    :image="item.menu.image" 
                    :title="item.menu.name" 
                    :price="item.menu.price"
                    :id="item.menu_id"
                />
            </div>
            <div v-else class="flex items-center justify-center h-[70%]">
                <p>Bookmark Anda Masih Kosong</p>
            </div>
        </div>
        <OrderMenu/>
    </div>
</template>