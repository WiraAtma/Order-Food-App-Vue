<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        image: String,
        title: String,
        price: Number,
        quantity: Number,
    });

    const emit = defineEmits(['updateItem']);

    const count = ref(props.quantity);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(angka);
    };

    watch(() => props.quantity, (newVal) => {
        count.value = newVal;
    });
</script>

<template>
    <div class="py-5">
        <div class="flex items-center">
                <img class="object-cover w-14 h-14 rounded-lg" :src="image"  alt="">
                <div class="flex ml-4 justify-between w-full">
                    <p class="w-1/2">{{ title }} ({{ quantity }}x)</p>
                    <p class="text-right">{{ formatRupiah(Number(price * quantity)) }}</p>
                </div>
        </div>
        <!-- <div class="flex mt-1 space-x-4">
            <button @click="increment" :disabled="count >= 100">+</button>
            <p>{{ quantity }}</p>
            <button @click="decrement" :disabled="count <= 0">-</button>
            <button>Hapus</button>
        </div> -->
    </div>
</template>