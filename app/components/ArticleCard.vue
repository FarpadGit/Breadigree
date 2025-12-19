<template>
    <NuxtLink :href="`/articles/${article.slug}`">
        <div class="relative flex items-end rounded-lg h-full overflow-hidden text-foreground-light group">
            <div class="flex flex-col gap-4 h-fit bg-gradient-to-b from-transparent to-20% to-[#0008] px-12 py-4">
                <p class="text-xl capitalize" v-html="article.title"></p>
                <span class="text-sm text-justify line-clamp-2" v-html="article.excerpt"></span>
                <span class="text-sm rounded-full bg-white/25 w-fit px-4">{{ article.uploadDate.toLocaleDateString("hu-HU", {dateStyle: "long"}) }}</span>
            </div>
            <nuxt-img 
                :src="article.featureImage"
                width="2500"
                height="2500"
                class="absolute top-0 w-full h-full object-center object-cover -z-10 scale-100 group-hover:scale-105 transition-transform duration-500"
            />
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
    const { article } = defineProps<{article: articleType}>();
</script>

<style scoped>

</style>