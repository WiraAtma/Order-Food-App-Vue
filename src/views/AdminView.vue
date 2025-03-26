<script setup>
import { onMounted, ref } from 'vue';

    const menus = ref([]);

    onMounted( async () => {
        const response = await fetch('http://localhost/order-food-app/public/api/menus');
        const data = await response.json();
        console.log(data);
        menus.value = data.data;
    })
</script>

<template>
    <div class="ml-14 p-10">
        <div class="mb-5 text-center">
            <h1>ADMIN PANEL</h1>
            <h1>PETUGAS : ADMIN</h1>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-center rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama Menu
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Kategori
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Deskripsi
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Gambar
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Dibuat
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Diedit
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b border-gray-200 hover:bg-gray-100" 
                        v-for="(menu, index) in menus" :key="menu.id"
                    >
                        <th scope="row" class="px-6 py-4">
                            {{ index+1 }}
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ menu.name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.category }}
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.price }}
                        </td>
                        <td class="px-6 py-4 text-blue-600 dark:text-blue-500 hover:underline">
                            <a href="">Lihat Gambar</a>
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.updated_at }}
                        </td>
                        <td class="px-6 py-4 text-right space-x-3">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Lihat</a>
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Hapus</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>