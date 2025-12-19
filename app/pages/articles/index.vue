<template>
    <h2 class="text-center text-heading font-bakerhouse py-20 underline underline-offset-[16px]">Korábbi Cikkek</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 min-h-60">
        <ArticleCard v-for="article in articles" :article="article" class="h-52" />
        <span v-if="articles.length === 0" class="col-span-full text-center">Jelenleg nincsenek publikált cikkek</span>
    </div>
</template>

<script setup lang="ts">
    const articlesResponse = await useFetch<serverArticleType[]>("/api/articles");
    const articles = toArticles(articlesResponse.data.value || []);
</script>

<style scoped>

</style>