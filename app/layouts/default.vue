<template>
  <div class="max-md:hidden">
    <NavButtons class="flex z-50 max-md:hidden max-md:text-xs" :fill-background="!transparentNav()" :layout="navLayout()" />
    <nuxt-img v-if="!transparentNav()" src="/separator-bottom.png" width="2500" height="150" class="md:mt-32" />
  </div>
  <div class="md:hidden">
    <button 
      @click="showMobileNav = !showMobileNav" 
      :class="`right-0 top-5 h-[50px] text-end pr-6 bg-transparent text-black transition-all duration-300 ${showMobileNav ? 'fixed' : 'absolute delay-200'} z-50`"
    >
      <Icon v-if="!showMobileNav" name="menu" :size="32" :class="transparentNav() ? 'text-foreground-light' : 'text-black'" />
      <Icon v-else name="close" :size="32" class="text-foreground-light" />
    </button>
    <div :class="`fixed right-0 w-full sm:w-[30%] h-full ${showMobileNav ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500 z-40`">
      <NavButtons
        class="flex flex-col"
        fill-background
        layout="mobile"
      />
    </div>
  </div>
  <main>
    <slot />
  </main>
  <footer class="w-full bg-primary tracking-tighter text-center text-foreground-light text-sm md:text-base">
    <div class="flex flex-col md:flex-row justify-between border-b border-foreground-accent">
      <ul class="flex flex-col md:flex-row gap-4 p-4 tracking-tighter">
        <li><NuxtLink to="https://www.fabokarpad.hu" external>Megközelítés</NuxtLink></li>
        <li><NuxtLink to="https://www.fabokarpad.hu" external>Impresszum</NuxtLink></li>
        <li><NuxtLink to="/products">Termékek</NuxtLink></li>
        <li><NuxtLink to="/contact">Elérhetőség</NuxtLink></li>
        <li><NuxtLink to="/about">Rólunk</NuxtLink></li>
        <li><NuxtLink to="https://www.fabokarpad.hu" external>Hírlevél</NuxtLink></li>
        <li><NuxtLink to="/articles">Cikkek</NuxtLink></li>
        <li><NuxtLink to="https://www.fabokarpad.hu" external>Adatvédelmi nyilatkozat</NuxtLink></li>
      </ul>
      <div class="flex justify-center items-center gap-2 sm:pr-4">
        <NuxtLink to="https://www.fabokarpad.hu" external>
          <Icon name="facebook" class="w-8 text-foreground-light" />
        </NuxtLink>
        <NuxtLink to="https://www.fabokarpad.hu" external>
          <Icon name="instagram" class="w-8 text-foreground-light" />
        </NuxtLink>
        <NuxtLink to="https://www.fabokarpad.hu" external>
          <Icon name="bsky" class="w-8 text-foreground-light" />
        </NuxtLink>
        <NuxtLink to="https://www.fabokarpad.hu" external>
          <Icon name="tiktok" class="w-8 text-foreground-light" />
        </NuxtLink>
      </div>
    </div>
    <div class="p-6 text-center">©{{ currentYear }} Fabók Árpád, Breadigree. Minden jog fenntarva.</div>
  </footer>
</template>

<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  const routesWithTransparentHeader = [RegExp("^/$"), RegExp("/products"), RegExp("/collections/*"), RegExp("/about")];
  const transparentNav = () => routesWithTransparentHeader.some(page => route.path.match(page));
  const navLayout = () => route.path === "/" ? "center" : "left";
  router.afterEach(() => showMobileNav.value = false);

  const showMobileNav = ref(false);
  const currentYear = new Date().getFullYear();
</script>

<style scoped>
  ul a {
    color: var(--color-foreground-light) !important;
  }
</style>