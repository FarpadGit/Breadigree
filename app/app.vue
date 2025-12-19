<template>
  <div>
    <NuxtRouteAnnouncer />
    <div v-if="loading" class="fixed left-0 top-0 w-full h-full flex justify-center items-center z-50 bg-black/50 animate-fade-in">
      <nuxt-img 
        id="loading-img" 
        src="/logo.png" 
        width="661" 
        height="596" 
        fit="contain" 
        class="w-1/2 h-1/2 object-contain opacity-0 transition-opacity duration-500 animate-pulse" 
        :class="{'opacity-100': loading}"
       />
    </div>
     <NuxtLayout>
      <NuxtPage />
     </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  const nuxtApp = useNuxtApp();
  const loading = ref(false);
  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    loading.value = false;
  });
</script>

<style scoped>
  .animate-fade-in {
    animation: fade-in 1s ease forwards;
  }
  
  #loading-img {
    animation-duration: 1s;
    animation-delay: 1s;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>