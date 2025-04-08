<script setup>
    import { onMounted, ref } from 'vue';
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import FormCreate from '@/components/form/FormCreate.vue';
    import FormUpdate from '@/components/form/FormUpdate.vue';

    const menus = ref([]);
    const selectedMenu = ref(null);
    const isActive = ref(false);
    const isActiveUpdate = ref(false);

    const fetchAllMenu = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_PUBLIC_API_KEY + '/menus');
            menus.value = response.data.data;
        } catch (error) {
            // console.error("Error fetching menus:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hemm.. , terjadi kesalahan saat mengambil data menu! Hubungi Programmer',
            });
        }
    }

    onMounted(() => {
        fetchAllMenu();
    });

    function handleDetele(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded",
                cancelButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
            },
            buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
            title: "Anda Yakin Menghapus Menu Ini?",
            text: "Anda Bisa Mengembalikan Di Panel Sampah",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
            }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                    if (!token) {
                        // console.warn("Token tidak ditemukan!");
                        return;
                    }

                    await axios.delete(import.meta.env.VITE_PUBLIC_API_KEY + '/menus/' + id, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    swalWithBootstrapButtons.fire({
                    title: "Terhapus!",
                    text: "Menu Anda Telah Terhapus.",
                    icon: "success"
                });
                fetchAllMenu();
                } catch (error) {
                    // console.error('Delete gagal:', error);
                    Swal.fire({
                        title: "Gagal Menghapus",
                        text: "Terjadi kesalahan saat Menghapus. Coba lagi!",
                        icon: "error"
                    });
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                title: "Dibatalkan",
                text: "Menu Anda Tidak Jadi Dihapus :)",
                icon: "error"
                });
            }
        });
    }

    const handleUpdate = (menu) => {
        selectedMenu.value = menu;
        isActiveUpdate.value = true;
    }

    function handleImage(image) {
        if (!image) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gambar Tidak Ditemukan!"
            });
        }
        Swal.fire({
            imageUrl: image,
            imageHeight: 400,
            imageAlt: "Menu Image"
        });
    }

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
    }).format(angka);
};
</script>

<template>
    <div class="ml-14 p-10">
        <div class="mb-5 text-center">
            <h1>ADMIN PANEL</h1>
            <h1>PETUGAS : ADMIN</h1>
        </div>
        <button @click="isActive = !isActive" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 my-3 py-2.5 text-center" type="button">
            Create Menu
        </button>
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
                            {{ formatRupiah(Number(menu.price)) }}
                        </td>
                        <td class="px-6 py-4 text-blue-600 hover:underline">
                            <button class="underline" @click="handleImage(menu.image)">Lihat Gambar</button>
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            {{ menu.updated_at }}
                        </td>
                        <td class="px-6 py-4 text-right space-x-3">
                            <a href="#" class="font-medium text-blue-600 hover:underline">Lihat</a>
                            <button href="#" class="font-medium text-blue-600 hover:underline" @click="handleUpdate(menu)" >Edit</button>
                            <button href="#" class="font-medium text-blue-600 hover:underline" @click="handleDetele(menu.id)">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <FormCreate 
        :isActive="isActive" 
        @closeModal="isActive = false"
        @menuAdded="fetchAllMenu"
        />
    <FormUpdate
        :isActiveUpdate="isActiveUpdate" 
        :menu="selectedMenu"
        @close-modal="isActiveUpdate = false"
        @menuAdded="fetchAllMenu"
    />

</template>