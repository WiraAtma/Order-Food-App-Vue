<script setup>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { ref, watch } from 'vue';

    const props = defineProps({
        isActiveUpdate: Boolean,
        menu: Object
    });

    const emit = defineEmits(['closeModal']);

    const form = ref({
        name: '',
        price: null,
        category: '',
        description: '',
        image: null,
    });

    const closeModal = () => {
        emit('closeModal');
    };

    watch(() => props.menu, (menu) => {
      if (menu) {
        form.value.name = menu.name;
        form.value.price = menu.price;
        form.value.description = menu.description;
        form.value.category = menu.category;
        form.value.image = null;
      }
    }, { immediate: true });

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            form.value.image = file;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            if (!token) {
            return Swal.fire("Gagal", "Token tidak ditemukan. Silakan login kembali.", "error");
            }

            const formData = new FormData();
            formData.append('name', form.value.name);
            formData.append('price', form.value.price);
            formData.append('category', form.value.category);
            formData.append('description', form.value.description);
            if (form.value.image) {
              formData.append('image', form.value.image);
            }

            // for (let [key, val] of formData.entries()) {
            //   console.log(key, val);
            //   console.log("Menu ID yang dikirim:", props.menu.id);
            // }

            formData.append('_method', 'PATCH');

            const response = await axios.post(
            import.meta.env.VITE_PUBLIC_API_KEY + '/menus/' + props.menu.id,
            formData,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                },
            }
            );

            Swal.fire("Berhasil", "Menu berhasil ditambahkan!", "success");
            emit('menuAdded');
            emit('closeModal'); 
        } catch (error) {
            console.error("Error saat submit:", error);
            Swal.fire("Gagal", "Terjadi kesalahan saat menambahkan menu", "error");
        }
    };

</script>

<template>
    <div 
      v-show="isActiveUpdate" 
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="crud-modal" class="relative p-4 w-full max-w-md max-h-full ">
        <div class="relative bg-white rounded-lg shadow-sm">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              Update Menu Saat Ini
            </h3>
            <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <form @submit="handleSubmit" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nama Menu</label>
                <input v-model="form.name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ketik Nama Menu Baru" required="">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Harga (RP)</label>
                <input v-model="form.price" type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Rp. 0" required="">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <select v-model="form.category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                  <option selected="">Pilih Kategori</option>
                  <option value="food">Makanan</option>
                  <option value="drink">Minuman</option>
                  <option value="desert">Desert</option>
                  <option value="other">Lain-Lain</option>
                </select>
              </div>
              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Deskripsi Menu</label>
                <textarea v-model="form.description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Ketik Deskripsi Secara Detail"></textarea>                    
              </div>
              <div class="col-span-2">
                <label for="image" class="block mb-2 text-sm font-medium text-gray-900">Gambar</label>
                <input @change="handleImage" type="file" name="image" id="image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              </div>
            </div>
            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Update Menu
            </button>
          </form>
        </div>
      </div>
    </div>
</template>