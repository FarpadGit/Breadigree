<template>
    <div class="max-w-[1400px] mx-auto p-10">
        <div class="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
            <div class="flex flex-col gap-6">
                <template v-if="status === 'pending'">
                    <nuxt-img 
                        src="/logo.png"
                        width="661" 
                        class="object-cover object-center self-center animate-pulse" 
                    />
                    <div class="flex flex-col gap-4">
                        <div v-for="i in 6" :key="i" class="bg-foreground-accent h-4 w-full rounded-full animate-pulse"></div>
                        <div class="bg-foreground-accent h-4 w-1/2 rounded-full animate-pulse"></div>
                    </div>
                </template>
                <template v-else>
                    <div class="relative flex items-center overflow-hidden max-h-96 hover:max-h-screen transition-[max-height] duration-500 ease-out rounded-2xl group">
                        <nuxt-img 
                            :src="currentArticle?.featureImage" 
                            width="2500" 
                            class="bg-[color-mix(in_srgb,var(--color-background),var(--color-secondary)_40%)] brightness-50 group-hover:brightness-100 transition-[filter] duration-500" 
                        />
                        <h1 
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-8 text-center text-heading text-foreground-light underline underline-offset-[16px] group-hover:-top-1/4 transition-[top] duration-1000"
                            v-html="currentArticle?.title"
                        ></h1>
                    </div>
                    <div class="max-w-[1350px] mx-auto pb-10 text-justify article-body" v-html="currentArticle?.body"></div>
                </template>
            </div>
            <div v-if="status === 'success'" class="flex flex-col">
                <p class="border-b border-foreground-accent text-foreground-accent text-xl mb-4">Korábbi bejegyzések</p>
                <ul class="list-disc list-inside">
                    <li v-for="article in articles">
                        <NuxtLink :href="`/articles/${article.slug}`" class="hover:text-secondary transition-colors duration-500">{{ article.title }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const articleSlug = useRoute().params["slug"];
    
    const { status, data: articles, error } = await useLazyFetch<articleType[]>("/api/articles");
    const currentArticle = computed(() => articles.value?.find(post => post.slug === articleSlug));
    if(status.value === 'success' && currentArticle.value == undefined) await navigateTo("/");

    if(error.value?.statusCode === 500) throw error;
</script>

<style scoped>
    .article-body {
        :deep(p) {
            padding-bottom: 1rem;
        }
        :deep(a) {
            text-decoration: underline;
            color: var(--color-foreground-accent);
            transition: color 0.5s ease;

            &:hover {
                color: var(--color-primary)
            }
        }
    }
</style>