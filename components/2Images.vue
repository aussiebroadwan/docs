<script setup>
const props = defineProps(['img1', 'img2'])
</script>

<template>
    <div class="flex mb-5">
        <div class="w-1/2 mr-1"><img class="rounded-lg" :src="img1" alt="img1"></div>
        <div class="w-1/2 ml-1"><img class="rounded-lg" :src="img2" alt="img2"></div>
    </div>
</template>