<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
    email: '',
    password: '',
    remember: false,
});

const router = useRouter();

onMounted(async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
        // Cek apakah token masih valid
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + "/me");

            if (response.status === 200) {
                router.push("/");
            }
        } catch (error) {
            console.log("Token tidak valid, menghapus token...");
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        }
    }
});

const login = async () => {
    console.log('Aku Di Klik MASUK');

    try {
        const response = await axios.post(import.meta.env.VITE_PUBLIC_API_KEY + '/login', form.value);
        const token = response.data.token;

        if (form.value.remember) {
            localStorage.setItem("token", token); // Jika remember diaktifkan, simpan ke localStorage
        } else {
            sessionStorage.setItem("token", token); // Jika tidak, simpan hanya di sessionStorage
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Tambahkan token ke header
        Swal.fire({
            title: "Login Berhasil",
            text: "Selamat datang kembali!",
            icon: "success"
        });

        router.push('/'); // Redirect ke halaman utama setelah login
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Login Gagal",
            text: "Email atau password salah!",
            icon: "error"
        });
    }
};
</script>
  

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-14 w-auto" src="/public/image/logo.png" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Masuk Dengan Akun Anda</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent="login" class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input v-model="form.email" type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input v-model="form.password" type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

        <div class="mt-2 flex space-x-2">
            <input v-model="form.remember" type="checkbox" name="remember" id="remember" class="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <label for="remember" class="block text-sm/6 font-medium text-gray-900">Remember Me</label>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Masuk</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Belum Pernah Mendaftar?
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
    </p>
  </div>
</div>
</template>