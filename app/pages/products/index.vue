<template>
    <NuxtLayout name="products-layout" image="/category_products.jpg">
        <div v-for="productGroup in Object.keys(groupedProducts)" :key="productGroup">
            <h2 class="text-center text-heading-sm py-20 font-bakerhouse underline">{{ productGroup }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 justify-between max-w-[450px] sm:max-w-[1350px] mx-auto pb-10">
                <SkeletonCard 
                    v-if="status === 'pending'"
                    v-for="i in 6" :key="i" 
                    type="product" 
                />
                <ProductModal 
                    v-else 
                    v-for="product in groupedProducts[productGroup]" :key="product.slug" 
                    :product="product" 
                />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    useSeoMeta({ title: "Breadigree | Termékeink" });
    const { status, data, error } = await useLazyFetch<groupedProductsType>("/api/products");
    const groupedProducts = computed(() => status.value === 'pending' ? ({"Termékek betöltése...": []} as groupedProductsType) : data.value || ({} as groupedProductsType));

    if(error.value?.statusCode === 500) throw error;
</script>

<style scoped>

</style>