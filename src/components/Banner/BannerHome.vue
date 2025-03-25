<script setup>
    const props = defineProps({
        image: String,
        title: String,
        shortDescription: String
    });
</script>

<template>
    <div class="bg-white rounded-3xl px-14 py-3 flex">
        <div>
            <img class="w-40" :src="image" alt="image1">
        </div>
        <div class="flex ml-14 justify-center flex-col">
            <h1 class="text-4xl font-bold text-red-400 mb-1">{{ title }}</h1>
            <p class="text-lg opacity-50">{{ shortDescription }}</p>
        </div>
    </div>
</template>