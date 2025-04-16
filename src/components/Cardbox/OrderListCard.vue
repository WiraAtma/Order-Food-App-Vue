<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';

    const props = defineProps({
        order_id: Number,
        status: String,
        items: Array,
        created_at: String,
        updated_at: String,
    })

    const emit = defineEmits(['menuAdded'])

    const deliveryOrder = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded",
            cancelButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
        },
        buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
        title: "Apakah Anda Yakin Ingin Mengirim Pesanan?",
        text: "Anda Tidak Dapat Mengubah Status Kembali!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya, Kirim Makanan!",
        cancelButtonText: "Tidak, Batalkan",
        reverseButtons: true
        }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                if (!token) {
                return Swal.fire("Gagal", "Token tidak ditemukan. Silakan login kembali.", "error");
                }

                const formData = new FormData();
                formData.append('status', 'delivery');

                formData.append('_method', 'PATCH');

                await axios.post(
                import.meta.env.VITE_PUBLIC_API_KEY + '/orders/' + props.order_id + '/status',
                formData,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                    },
                }); 

                Swal.fire("Berhasil", "Makanan Dikirim Ke Lokasi Kostumer", "success");
                emit('menuAdded')
            } catch (err) {
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi Kesalahan Saat Mengirim Pesanan, Coba Lagi",
                });
            console.error('Gagal mengirim pesanan:', err);
            }
            swalWithBootstrapButtons.fire({
            title: "Pesanan Anda Telah Dikirim",
            text: "Kurir Akan Mengantarkan Makanan Anda Ke Lokasi",
            icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
        }
        });
        
    };

</script>

<template>
    <div class="flex justify-between border border-red-300 rounded-lg my-3 p-2">
        <div>
            <h1 class="mb-2">No Pesanan : <span class="font-bold">#{{ order_id }}</span></h1>
            <h1 class="mb-2">Tanggal Pesan: {{ created_at }}</h1>
            <h1 class="mb-2" v-show="status == 'done'">Tanggal Selesai: {{ updated_at }}</h1>
            <div class="w-full p-2 border border-red-300 rounded-lg">
                <p v-for="(item, index) in items" :key="index">
                    ({{ item.quantity }}x) {{ item.menu_name }}
                </p>
            </div>
            <button v-show="status != 'done' && status != 'delivery'" @click="deliveryOrder" class='text-wrap mt-2 w-48 bg-red-400 text-white px-3 rounded mr-3'>Kirim Makanan</button>
        </div>
    </div>
</template>