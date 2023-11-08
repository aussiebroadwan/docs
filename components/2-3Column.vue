<script setup>
</script>

<template>
    <div class="flex mb-5">
        <div class="w-2/5">
            <span class="m-0 font-semibold text-lg">
                <slot name="left"></slot>
            </span>
        </div>
        <div class="w-3/4">
            <slot name="right"></slot>
        </div>
    </div>
</template>