<template>
    <h2 class="text-center text-heading font-bakerhouse py-20 underline underline-offset-[16px]">Korábbi Cikkek</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 min-h-60">
        <SkeletonCard v-if="status === 'pending'" v-for="i in 4" type="article" class="h-52" />
        <ArticleCard v-else v-for="article in articles" :key="article.id" :article="article" class="h-52" />
        <span v-if="status === 'success' && articles.length === 0" class="col-span-full text-center">Jelenleg nincsenek publikált cikkek</span>
    </div>
</template>

<script setup lang="ts">
    const { status, data, error } = await useLazyFetch<serverArticleType[]>("/api/articles");
    const articles = computed(() => toArticles(data.value || []));

    if(error.value?.statusCode === 500) throw error;
</script>

<style scoped>

</style>