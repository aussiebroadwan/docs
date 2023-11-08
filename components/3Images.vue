<script setup>
const props = defineProps(['img1', 'img2', 'img3'])
</script>

<template>
    <div class="flex mb-5">
        <div class="w-1/3"><img class="rounded-lg" :src="img1" alt="img1"></div>
        <div class="w-1/3 mx-2"><img class="rounded-lg" :src="img2" alt="img2"></div>
        <div class="w-1/3"><img class="rounded-lg" :src="img3" alt="img3"></div>
    </div>
</template>