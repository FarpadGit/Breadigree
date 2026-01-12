<template>
    <div 
        v-if="type === 'product'" 
        class="grid grid-rows-[auto_auto_1fr] animate-fade-in"
    >
        <div class="w-full max-w-[300px] xl:max-w-[400px] h-[200px] sm:h-[300px] md:h-[400px] justify-self-center bg-foreground-accent rounded-lg animate-pulse"></div>
        <div class="w-4/5 mx-auto h-0.5 sm:h-1 my-4 bg-foreground-accent animate-pulse"></div>
        <div class="w-4/5 mx-auto">
            <div class="h-4 bg-foreground-accent rounded-full animate-pulse"></div>
        </div>
    </div>

    <div v-else-if="type === 'gallery'" class="h-60 bg-foreground-accent rounded-lg animate-pulse"></div>

    <div 
        v-else-if="type === 'article'" 
        class="relative flex flex-col gap-4 justify-between rounded-lg h-full overflow-hidden"
    >
            <div class="w-full h-full bg-foreground-accent rounded-lg animate-pulse"></div>
            <div class="flex flex-col gap-4">
                <div class="bg-foreground-accent h-2 w-1/2 rounded-full animate-pulse"></div>
                <div class="bg-foreground-accent h-2 w-3/4 rounded-full animate-pulse"></div>
            </div>
        </div>
</template>

<script setup lang="ts">
    const { type } = defineProps<{type: "product" | "gallery" | "article"}>();
</script>

<style scoped>
    .animate-pulse {
        animation-delay: 1s;
    }
</style>