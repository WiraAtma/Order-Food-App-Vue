<script setup>
    const props = defineProps({
        order_id: Number,
        status: String,
        created_at: String,
        updated_at: String,
    })

    const statusPesanan = (order_id) => {
        if (props.status == 'order') {
            return 'Pesanan Sedang Disiapkan'
        } else if (props.status == 'delivery') {
            return 'Pesanan Sedang Dikirim'
        } else if (props.status == 'done') {
            return 'Pesanan Selesai'
        } else {
            return 'Pesanan Dibatalkan'
        }
    }

</script>

<template>
    <div class="flex justify-between border border-red-300 rounded-lg my-3 p-2">
        <div>
            <h1 class="mb-2">No Pesanan : <span class="font-bold">#{{ order_id }}</span></h1>
            <h1 class="mb-2">Tanggal Pesan: {{ created_at }}</h1>
            <h1 class="mb-2" v-show="status == 'done'">Tanggal Selesai: {{ updated_at }}</h1>
            <router-link to="/" class="border bg-red-400 text-white py-1 px-3 rounded">Lihat Pesanan</router-link>
        </div>
        <div class="flex flex-col justify-between">
            <button class="cursor-not-allowed text-wrap w-48 rounded mr-3">{{ statusPesanan(status) }}</button>
            <button v-show="status != 'done'" :class="['text-wrap w-48 bg-red-400 text-white px-3 rounded mr-3', status == 'order' ? 'cursor-not-allowed opacity-50' : '' ]">Pesanan Selesai</button>
        </div>
    </div>
</template>