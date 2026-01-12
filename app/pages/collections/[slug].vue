<template>
    <NuxtLayout name="products-layout" :image="collection?.category.image">
        <div class="bg-background">
            <h1 class="text-center text-heading py-20 underline underline-offset-[16px]">{{ status === 'pending' ? 'Termékek betöltése...' : collection?.category.name }}</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 justify-between max-w-[450px] sm:max-w-[1350px] mx-auto pb-10">
                <SkeletonCard
                    v-if="status === 'pending'"
                    v-for="i in 6" :key="i" 
                    type="product" 
                />
                <ProductModal 
                    v-else
                    v-for="product in collection?.products" :key="product.slug" 
                    :product="product"
                />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const categorySlug = useRoute().params["slug"];
    const { status, data: collection, error } = await useLazyFetch<{category: categoryType, products: productType[]}>(`/api/collections/${categorySlug}`);
    useSeoMeta({ title: "Breadigree | Termékeink" });
    
    if(error.value?.statusCode === 500) throw error;
    
    watchEffect(async () => {
        if(status.value === 'success') {
            if(collection.value == undefined) await navigateTo("/products");
            useSeoMeta({ title: `Breadigree | ${collection.value?.category.name || "Termékeink"}` });
        }
    });
</script>

<style scoped>

</style>