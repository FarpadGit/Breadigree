<template>
  <NuxtLayout v-if="error?.statusCode === 404">
    <div class="w-full min-h-[60vh] flex flex-col justify-center items-center">
      <h1 class="max-sm:text-4xl md:text-[100px] leading-none py-4 text-foreground-accent text-center">404</h1>
      <p class="text-center text-[34px]">Sajnos ez az oldal nem található</p>
    </div>
  </NuxtLayout>
  <div v-else-if="error?.statusCode == 500" class="w-full h-screen grid grid-rows-[auto_1fr_auto]">
    <div>
      <div class="bg-primary h-[clamp(0vh,calc(100vh-100vw),10vh)]"></div>
      <nuxt-img src="/separator-bottom.png" width="2500" height="150" fit="contain" />
    </div>
    <div class="w-full h-full flex flex-col justify-center items-center drop-shadow-[2px_2px_black] font-bakerhouse-full px-8">
      <h1 class="max-sm:text-4xl text-[48px] md:text-heading pb-10 text-foreground-accent text-center">
        Sajnos a weboldalunk jelenleg nem elérhető <span class="whitespace-nowrap">:(</span>
      </h1>
      <p class="max-sm:text-xl text-[34px] md:text-heading-sm leading-none text-secondary text-center">Probálj meg egy kicsit később visszanézni</p>
    </div>
    <div>
      <nuxt-img src="/separator-bottom.png" width="2500" height="150" fit="contain" class="-scale-y-100" />
      <div class="bg-primary h-[clamp(0vh,calc(100vh-100vw),10vh)]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
    const error = useError();
</script>