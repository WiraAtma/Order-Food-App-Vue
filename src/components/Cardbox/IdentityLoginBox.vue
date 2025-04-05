<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';

    const user = ref({
        name: '',
        address: ''
    });
    const userLogin = ref(false);

    const fetchUser = async () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        console.log("Token sebelum fetchUser:", token);

        if (!token) {
            console.error("Token tidak ditemukan!");
            return;
        }

        userLogin.value = true; // Set userLogin menjadi true saat memulai fetchUser

        try {
            const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/me', {
                headers: {
                    'Authorization': `Bearer ${token.trim()}` // Gunakan trim() untuk menghilangkan spasi tambahan
                }
            });
            user.value = response.data;
            console.log("User Data:", user.value);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    onMounted(() => {
        fetchUser();
    });
</script>


<template>
    <div class="flex justify-between pb-6">
        <router-link to="/login" v-show="!userLogin">Login</router-link>
        <div v-show="userLogin" class="flex space-x-4">
            <h1>
              <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 448 512"><path fill="#f59e9e" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
              {{ user.name }}
            </h1>
            <h1>
              <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 384 512"><path fill="#ec9c9c" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              {{ user.address }}
            </h1>
        </div>
      </div>
</template>