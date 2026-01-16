<template>
    <nuxt-img 
        :src="image" 
        width="2500" 
        height="2500" 
        class="select-none cursor-pointer h-60 object-cover" 
        draggable="false" 
        fit="cover" 
        @click="showModal = true"
    />
    <Teleport to="body">
        <div v-if="showModal" id="gallery-modal" class="fixed top-0 left-0 w-screen h-screen bg-black/85 flex justify-center items-center z-50" @click="closeModal()">
            <div class="fixed w-[90vw] h-[90vh] bg-transparent flex flex-col rounded-md overflow-hidden animate-zoom-in" @click.stop>
                <button id="close-btn" class="absolute top-5 right-5 w-10 h-10 rounded-full z-10" @click="closeModal()" autofocus>
                    <Icon name="close" :size="40" class="text-foreground-accent" />
                </button>
                <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
                    <Slide v-for="galleryImage in gallery" :key="galleryImage">
                        <nuxt-img :src="galleryImage" class="rounded-2xl w-full h-full object-contain" fit="contain" />
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
                <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide" class="mt-3">
                    <Slide v-for="galleryImage in gallery" :key="galleryImage">
                        <template #default="{ currentIndex, isActive }">
                            <div
                                :class="`w-full h-full cursor-pointer transition-[filter] duration-300 ease-in-out ${isActive ? 'brightness-100' : 'brightness-75'} hover:brightness-100`"
                                @click="slideTo(currentIndex)"
                            >
                                <nuxt-img :src="galleryImage" class="rounded-lg w-full h-full object-cover" fit="cover" />
                            </div>
                        </template>
                    </Slide>
                </Carousel>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
    const { gallery, image, startSlideIndex } = defineProps<{gallery: string[], image: string, startSlideIndex: number}>();
    const showModal = ref(false);

    const currentSlide = ref(startSlideIndex);
    const slideTo = (nextSlide: number) => (currentSlide.value = nextSlide);
    const closeModal = () => {
        showModal.value = false;
        currentSlide.value = startSlideIndex;
    };

    const galleryConfig = {
        itemsToShow: 1,
        wrapAround: true,
        slideEffect: "fade" as "fade",
        mouseDrag: false,
        touchDrag: false,
        width: "100%",
        height: "75%",
    };

    const thumbnailsConfig = {
        width: "100%",
        height: "20%",
        itemsToShow: 1.5,
        wrapAround: true,
        touchDrag: false,
        gap: 10,
        breakpoints: {
            640: {
                itemsToShow: 3
            },
            768: {
                itemsToShow: 4,
            },
            1024: {
                itemsToShow: 6,
            }
        }
    };
</script>

<style scoped>
    .carousel {
        --vc-nav-width: 50px;
        --vc-nav-height: 50px;
        --vc-nav-background: transparent;
        --vc-nav-color: rgba(255, 255, 255, 0.7);
        --vc-nav-color-hover: white;
        --vc-nav-border-radius: 100%;
    }

    :deep(.carousel__prev) {
        @media(min-width: 768px) {
            margin-left: 10px;
        }
    }
    
    :deep(.carousel__next) {
        @media(min-width: 768px) {
            margin-right: 10px;
        }
    }
</style>