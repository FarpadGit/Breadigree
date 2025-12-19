<template>
    <div class="grid grid-rows-[auto_auto_1fr] font-bakerhouse cursor-pointer group" @click="showModal = true">
        <nuxt-img :src="product.image" class="select-none w-[600px] h-[200px] sm:h-[300px] md:h-[400px] object-contain justify-self-center group-hover:-translate-y-4 transition-transform duration-500" draggable="false" width="600" height="400" fit="contain" background="transparent" />
        <div :class="`w-4/5 mx-auto h-0.5 sm:h-1 my-4 ${textColor === 'light' ? 'bg-foreground-light' : 'bg-secondary'} group-hover:w-3/5 transition-[width] duration-500`"></div>
        <div class="w-4/5 mx-auto">
            <div class="h-full flex flex-col justify-between">
                <p class="max-sm:text-lg text-[1.6rem] italic" :class="{'text-center': textAlign === 'center', 'text-foreground-light': textColor === 'light'}">
                    {{ product.name }}
                </p>
                <div class="flex justify-between">
                    <p class="max-sm:text-base text-[1.6rem] italic" :class="{'text-center': textAlign === 'center', 'text-foreground-light': textColor === 'light'}">
                        {{ product.price }} Ft
                    </p>
                    <button :class="`text-sm sm:text-lg ${textColor === 'light' ? 'text-foreground-light' : 'text-foreground-accent'} border border-current rounded-lg p-0.5 sm:p-1`">Részletek</button>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <div v-if="showModal" class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50" @click="showModal = false">
            <div class="fixed w-screen h-screen sm:w-[75vw] sm:h-[75vh] bg-background flex flex-col md:flex-row rounded-md overflow-hidden animate-zoom-in" @click.stop>
                <button class="absolute top-5 right-5 flex justify-center items-center w-10 h-10 rounded-full" @click="showModal = false" autofocus>
                    <Icon name="close" :size="40" class="text-foreground-accent" />
                </button>
                <div class="max-md:h-2/3 md:w-2/3 bg-foreground-accent bg-[url(/product_wallpaper.jpg)] bg-center bg-cover md:bg-contain bg-blend-overlay">
                    <nuxt-img :src="product.image" class="h-full w-full object-contain p-4" fit="contain" background="transparent" />
                </div>
                <div class="max-md:h-1/3 md:w-1/3 flex flex-col gap-4 justify-around items-center p-4">
                    <p class="text-2xl font-bold text-center">{{ product.name }}</p>
                    <p v-html="product.description" class="md:max-lg:text-center"></p>
                    <p>Ára: {{ product.price }} Ft</p>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
    const { product, textAlign = "center", textColor = "dark" } = defineProps<{product: productType, textAlign?: "center" | "left", textColor?: "light" | "dark"}>();
    const showModal = ref(false);
</script>