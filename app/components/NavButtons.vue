<template>
    <nav 
        class="absolute top-0 left-0 w-full flex items-center justify-center p-6 text-foreground-light font-bakerhouse text-base lg:text-lg xl:text-[30px]"
        :class="{'bg-primary': fillBackground === true, 'bg-transparent': fillBackground === false, 'h-full gap-14': layout === 'mobile'}" 
    >
    <div class="w-1/6 flex transition-[margin-right] duration-500" :class="{'mr-[calc(-100%/6)]': layout === 'center'}">
        <NuxtLink to="/" class="transition-transform duration-500 z-10" :class="`${layout === 'center' ? 'translate-x-[calc(50vw-1.5rem-50%)]' : 'lg:translate-x-1/2'}`">
            <nuxt-img src="/logo.png" width="175" class="transition-[width] duration-500" :class="{'w-24': layout === 'left'}" />
        </NuxtLink>
    </div>
    <ul class="relative w-full flex flex-col md:flex-row items-center justify-around lg:justify-center gap-14 md:gap-16 lg:gap-28 lg:px-16 tracking-tighter">
        <li><StyledNav href="/products">Termékeink</StyledNav></li>
        <li><StyledNav href="/about">Történetünk</StyledNav></li>
        <div v-if="layout !== 'mobile'" class="w-1/6 transition-[margin-left,margin-right] duration-500" :class="{'mx-[calc(-100%/12-3.5rem)]': layout === 'left'}"></div>
        <li><StyledNav href="/articles">Hírek & Akciók</StyledNav></li>
        <li><StyledNav href="/contact">Kapcsolat</StyledNav></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    const { fillBackground = false, layout = "center" } = defineProps<{fillBackground?: boolean, layout?: "center" | "left" | "mobile"}>();
</script>