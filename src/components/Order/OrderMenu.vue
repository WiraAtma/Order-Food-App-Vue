<script setup>
  import axios from 'axios';
  import IdentityLoginBox from '../cardbox/IdentityLoginBox.vue';
  import SmallCard from '../cardbox/SmallCard.vue';
  import Swal from 'sweetalert2';

  const props = defineProps({
    orderItems: Array
  })
  const emit = defineEmits(['orderSubmitted']);

  const updateItem = ({ id, quantity }) => {
    const item = props.orderItems.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
    }
  };

  const formatRupiah = (angka) => {
      return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
      }).format(angka);
  };

  const submitOrder = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded",
        cancelButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Apakah Anda Yakin Dengan Pesanan Anda?",
      text: "Anda Tidak Dapat Mengubah Pesanan Setelah Dikirim",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Iya, Pesan Sekarang!",
      cancelButtonText: "Tidak, Batalkan",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            items: props.orderItems.map(item => ({
              menu_id: item.id,          
              quantity: item.quantity,
              price: item.price       
            }))
          };

          await axios.post(import.meta.env.VITE_PUBLIC_API_KEY + '/orders', payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
          });

          emit('orderSubmitted');

          console.log('Pesanan berhasil dikirim!');
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
          text: "Restoran Sedang Memasak Makanan Anda",
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
    <div class="bg-white h-screen fixed w-[25%] max-w-[350px] min-w-[300px] p-6 right-0 top-0 shadow-lg">
      <IdentityLoginBox/>
      <hr>
      <div class="py-2">
        <div class="overflow-y-auto h-[450px] max-h-[450px]">
          <h1 class="font-semibold text-xl">Pesanan Anda</h1>
          <div v-if="orderItems.length === 0" class="flex items-center justify-center h-[70%]">
            <p>Pesanan Anda Masih Kosong</p>
          </div>
          <SmallCard v-else v-for="item in orderItems" :key="item.id" 
            :image="item.image" 
            :title="item.name" 
            :price="item.price" 
            :quantity="item.quantity"
            @updateItem="updateItem"
            />
        </div>
        <div class="py-4">
            <h1 class="font-bold text-xl">Total : {{ formatRupiah(Number(orderItems.reduce((total, item) => total + item.price * item.quantity, 0))) }}</h1>
            <button :disabled="orderItems.length === 0" @click="submitOrder" :class="['border w-full py-3 rounded-lg bg-red-400 text-white font-semibold mt-3', orderItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-200 hover:text-red-400']">Pesan Sekarang</button>
        </div>
      </div>
    </div>
</template>