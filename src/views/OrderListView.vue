<script setup>
    import OrderListCard from '@/components/cardbox/OrderListCard.vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';

    const orders = ref([]);
    const isLoading = ref(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            orders.value = response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hemm.. , terjadi kesalahan saat mengambil data pesanan! Hubungi Programmer',
            });
        } finally {
            isLoading.value = false;
        }
    }
    
    onMounted(() => {
        fetchOrders();
    });
</script>

<template>
    <div class="ml-5 p-10 w-full flex border h-screen">
        <div class="w-[33%] mx-5 overflow-y-auto h-full max-h-full">
            <h1 class="font-semibold text-2xl">Orderan Kostumer</h1>
            <div v-if="isLoading" class="flex flex-col">
                <div v-for="n in 8" :key="n" class="w-full h-20 my-3 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>

            <OrderListCard v-else v-for="(item, index) in orders.filter(o => o.status === 'order')" :key="index"
                :order_id="item.order_id"
                :status="item.status"
                :items="item.items"
                :created_at="item.created_at"
                :updated_at="item.updated_at"
                @menuAdded="fetchOrders"
            />
        </div>
        <div class="w-[33%] mx-5 overflow-y-auto h-full max-h-full">
            <h1 class="font-semibold text-2xl">Orderan Dikirim</h1>
            <div v-if="isLoading" class="flex flex-col">
                <div v-for="n in 8" :key="n" class="w-full h-20 my-3 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>

            <OrderListCard v-else v-for="(item, index) in orders.filter(o => o.status === 'delivery')" :key="index"
                :order_id="item.order_id"
                :status="item.status"
                :items="item.items"
                :created_at="item.created_at"
                :updated_at="item.updated_at"
                @menuAdded="fetchOrders"
            />
        </div>
        <div class="w-[33%] mx-5 overflow-y-auto h-full max-h-full">
            <h1 class="font-semibold text-2xl">Orderan Selesai</h1>
            <div v-if="isLoading" class="flex flex-col">
                <div v-for="n in 8" :key="n" class="w-full h-20 my-3 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>

            <OrderListCard v-else v-for="(item, index) in orders.filter(o => o.status === 'done')" :key="index"
                :order_id="item.order_id"
                :status="item.status"
                :items="item.items"
                :created_at="item.created_at"
                :updated_at="item.updated_at"
                @menuAdded="fetchOrders"
            />
        </div>
    </div>
</template>