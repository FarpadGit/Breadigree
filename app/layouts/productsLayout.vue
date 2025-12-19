<template>
    <div class="h-80 overflow-hidden">
        <nuxt-img :src="image" width="1200" class="w-screen h-full object-center object-cover brightness-50" />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:flex gap-5 text-foreground-light bg-primary p-4 lg:pl-20">
        <NuxtLink v-for="category in categories" 
            :href="`/collections/${category.slug}`" 
            class="hover:text-secondary text-center focus-visible:text-secondary transition-colors duration-500 outline-none"
        >
            {{category.name}}
        </NuxtLink>
    </div>
    <slot />
</template>

<script setup lang="ts">
    const categories = (await useFetch<categoryType[]>("/api/categories")).data.value;
    const { image } = defineProps<{image?: string}>()
</script>