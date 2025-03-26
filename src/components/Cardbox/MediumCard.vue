<template>
    <router-link to="/">
        <div class="bg-white rounded-lg shadow-lg relative hover:transform transition-transform duration-300 hover:scale-105">
            <div class="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                <span class="text-gray-500">Image</span>
            </div>
            <RouterLink to="/makanan" class="absolute left-1/2 -translate-x-1/2 top-36 bg-white text-red-400 px-6 py-2 rounded-lg shadow-md hover:bg-red-400 hover:text-white transition">
                Pesan
            </RouterLink>
            <button class="absolute -right-3 -translate-x-1/2 top-0 bg-white text-red-400 px-1 py-1 rounded-lg shadow-md hover:bg-red-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512"><path fill="#e38282" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
            </button>
            <div class="mt-8 pb-2 text-center">
                <p class="text-gray-700 font-semibold">Nasi Goreng</p>
                <p class="text-gray-500 text-sm">Rp. 100.000</p>
            </div>
        </div>
    </router-link>
</template>