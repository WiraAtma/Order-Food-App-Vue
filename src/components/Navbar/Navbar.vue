<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(false);
const isAdmin = ref('user')

const checkLogin = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    isLogin.value = !!token;
};

const checkAdmin = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/me', {
          headers: {
              'Authorization': `Bearer ${token.trim()}` // Gunakan trim() untuk menghilangkan spasi tambahan
          }
      });
      isAdmin.value = response.data.role;
      // console.log("User Data:", isAdmin.value);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

const logout = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded",
            cancelButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Anda yakin ingin logout?",
        text: "Anda harus login kembali untuk mengakses akun.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, logout!",
        cancelButtonText: "Batal",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
              const token = localStorage.getItem("token") || sessionStorage.getItem("token");
              // console.log("Token yang digunakan:", token);
              if (!token) {
                  console.warn("Token tidak ditemukan!");
                  return;
              }

              await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/logout', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });

                // Hapus token dari penyimpanan
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');

                // Hapus header Authorization dari Axios
                delete axios.defaults.headers.common['Authorization'];

                // Tampilkan pesan sukses
                Swal.fire({
                    title: "Berhasil Logout!",
                    text: "Anda telah keluar dari akun.",
                    icon: "success"
                });

                // Redirect ke halaman login
                router.push('/login');
            } catch (error) {
                console.error('Logout gagal:', error);
                Swal.fire({
                    title: "Logout Gagal",
                    text: "Terjadi kesalahan saat logout. Coba lagi!",
                    icon: "error"
                });
            }
        }
    });
};

onMounted(() => {
    checkLogin();
    checkAdmin();
});

</script>

<template>
  <div class="fixed h-screen w-20 bg-red-400 rounded-r-3xl shadow-lg py-20 flex flex-col justify-between">
    <div class="space-y-10 flex flex-col items-center">
      <router-link to="/" class="text-white text-sm font-semibold hover:bg-red-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 576 512">
            <path fill="#ffffff" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
      </router-link>
      <router-link v-show="isAdmin === 'admin'" to="/admin" class="text-white text-sm font-semibold hover:bg-red-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#ffffff" d="M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z"/></svg>
      </router-link>
      <router-link to="/" class="text-white text-sm font-semibold hover:bg-red-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 576 512"><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
      </router-link>
      <router-link to="/bookmark" class="text-white text-sm font-semibold hover:bg-red-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512"><path fill="#ffffff" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
      </router-link>
    </div>
    <div v-show="isLogin" class="space-y-10 flex flex-col items-center">
      <button @click="logout" class="text-white text-sm font-semibold hover:bg-red-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
      </button>
    </div>
  </div>
</template>