<template>
    <div class="h-80 overflow-hidden">
        <nuxt-img :src="imageURL" width="1200" class="w-screen h-full object-center object-cover brightness-50" />
    </div>
    <div v-if="categories != undefined" class="grid grid-cols-2 md:grid-cols-3 lg:flex gap-5 text-foreground-light bg-primary p-4 lg:pl-20">
        <NuxtLink
            v-for="category in categories" :key="category.id"
            :href="`/collections/${category.slug}`" 
            class="hover:text-secondary text-center focus-visible:text-secondary transition-colors duration-500 outline-none"
        >
            {{ category.name }}
        </NuxtLink>
    </div>
    <slot />
</template>

<script setup lang="ts">
    const { image: imageProp } = defineProps<{image?: string}>();
    const imageURL = useState("categoryImage", () => imageProp);
    
    const { status, data } = await useLazyFetch<categoryType[]>("/api/categories");
    const categories = useState<categoryType[] | undefined>("categories", () => undefined);

    watchEffect(() => {
        if(imageProp !== undefined) imageURL.value = imageProp;
        if(status.value === 'success' && categories.value == undefined) categories.value = data.value;
    });
</script>