<script setup>
    const props = defineProps(['data'])
</script>

<template>
    <div class="w-full info rounded-lg px-5 text-sm md:text-md" style="background-color: var(--vp-custom-block-info-bg);">
        <div class="flex">
            <p class="w-1/4 font-bold">Table</p>
            <p class="w-1/4 font-bold">Column</p>
            <p class="w-1/4 font-bold">Type</p>
            <p class="w-1/4 font-bold">Description</p>
        </div>
        <div class="flex" v-for="(value, key) in props.data" :key="key">
            <p class="w-1/4 font-mono">{{key}}</p>
            <div class="w-3/4">
                <div class="flex w-full" v-for="col in value" :key="col.name">
                    <p class="w-1/3 pl-1 font-mono">{{col.name}}</p>
                    <p class="w-1/3 pl-1 font-mono">{{col.type}}</p>
                    <p class="w-1/3 pl-1">{{col.description}}</p>
                </div>
            </div>
        </div>  
    </div>
</template>