<template>
    <NuxtLayout name="products-layout" :image="category?.image">
        <div class="bg-background">
            <h1 class="text-center text-heading py-20 underline underline-offset-[16px]">{{ category?.name }}</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 justify-between max-w-[450px] sm:max-w-[1350px] mx-auto pb-10">
                <template v-for="product in products" :key="product.slug">
                    <ProductModal :product="product" />
                </template>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const categorySlug = useRoute().params["slug"];
    const { category, products } = (await useFetch<{category: categoryType, products: productType[]}>(`/api/collections/${categorySlug}`)).data.value || {};
    if (category == undefined) await navigateTo("/products");
    useSeoMeta({ title: `Breadigree | ${category?.name || "termékeink"}` });
</script>

<style scoped>

</style>