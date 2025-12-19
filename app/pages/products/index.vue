<template>
    <NuxtLayout name="products-layout" image="/category_products.jpg">
        <div v-for="productGroup in Object.keys(groupedProducts)" :key="productGroup">
            <h2 class="text-center text-heading-sm py-20 font-bakerhouse underline">{{ productGroup }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 justify-between max-w-[450px] sm:max-w-[1350px] mx-auto pb-10">
                <template v-for="product in groupedProducts[productGroup]" :key="product.slug">
                    <ProductModal :product="product" />
                </template>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    useSeoMeta({ title: "Breadigree | Termékeink" });
    const productsResponse = (await useFetch<groupedProductsType>("/api/products"));
    const groupedProducts = productsResponse.data.value || ({} as groupedProductsType);

    const error = productsResponse.error.value;
    if(error?.statusCode === 500) throw error;
</script>

<style scoped>

</style>