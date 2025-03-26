<script setup>
    import { ref } from 'vue';

    const count = ref(0);

    const increment = () => {
        count.value++;
    }

    const decrement = () => {
        count.value--;
    }
</script>

<template>
    <div class="py-5">
        <div class="flex items-center">
                <img class="object-cover w-14 h-14 rounded-lg" src="/public/image/dummy-image.jpg"  alt="">
                <div class="flex ml-4">
                    <p>Nasi Goreng</p>
                    <p class="ml-10">Rp. 100.000</p>
                </div>
        </div>
        <div class="flex mt-1 space-x-4">
            <button @click="increment" :disabled="count >= 100">+</button>
            <p>{{ count }}</p>
            <button @click="decrement" :disabled="count <= 0">-</button>
            <button>Hapus</button>
        </div>
    </div>
</template>