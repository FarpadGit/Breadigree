<template>
    <section class="font-bakerhouse">
        <nuxt-img 
            src="/hero.jpg" 
            width="2500"
            height="2500"
            class="max-sm:hidden absolute -z-10 w-full" 
        />
        <nuxt-img 
            src="/hero_mobile.jpg" 
            width="2500"
            height="2500"
            class="sm:hidden absolute -z-10 w-full" 
        />
        <div class="max-w-[1400px] sm:min-h-[500px] mx-auto grid grid-cols-[5fr_6fr]">
            <div class="col-span-2 sm:col-span-1 sm:col-start-2 pt-[15vw] sm:pt-[16.5vw] md:max-lg:pt-[20vw] px-8 text-center">
                <h1 class="text-secondary text-heading pb-[5vw] md:pb-8 lg:pb-[5vw] font-bakerhouse-full drop-shadow-[2px_2px_black]">
                    <p class="text-[40px] md:text-[57px] lg:text-[87px] leading-none">Breadigree</p> 
                    kézműves pékség
                </h1>
                <p class="text-foreground-accent max-md:text-sm md:text-[20px] lg:text-[26px] xl:text-[33px]">
                    Több mint 10 év holisztikus tapasztalat és elhivatottság a kemencétől a konyhaasztalig.
                </p>
            </div>
            <div class="sm:col-start-2 w-full sm:w-3/5 md:py-[9vw] pt-[10vw] sm:max-xl:!pt-8 xl:pt-[4vw] sm:ml-2 2xl:ml-12 text-center leading-tight">
                <h2 class="text-foreground-accent md:max-lg:text-[24px] lg:text-[34px] xl:text-heading font-bakerhouse-full">“Magyarország legkimagaslóbb pékműhelye.”</h2>
                <p class="text-foreground-accent max-md:text-xs md:text-sm lg:text-[20px]">Ismerd meg milyen a kenyérsütő világ magasfoka</p>
            </div>
        </div>
    </section>
    <div>
        <nuxt-img 
            src="/separator-featured.png"
            width="2500"
            height="2500"
            class="w-full h-[33vw] object-cover object-bottom mt-[10vw] sm:mt-12"
        />
    </div>
    <section class="bg-primary">
        <h3 class="text-heading font-bakerhouse text-center text-foreground-light pt-12 pb-16">Kiemelt Ajánlataink</h3>
        <div class="mx-12 lg:mx-24 pb-20">
            <Carousel :ref="carouselRef" v-bind="carouselConfig">
                <Slide v-for="product in featured" :key="product.slug">
                    <div class="carousel__item w-full"><ProductModal :product="product" text-align="left" text-color="light" /></div>
                </Slide>
                <template #addons>
                    <Pagination />
                    <Navigation />
                </template>
            </Carousel>
        </div>
        <div v-if="categories.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[240px] md:auto-rows-[500px]">
            <h3 class="flex justify-center items-center max-sm:text-center sm:justify-start sm:items-start text-[38px] font-bold text-foreground-light pb-8 sm:pl-8">Keress igényeidnek megfelelően</h3>
            <NuxtLink v-for="category in categories" :href="`/collections/${category.slug}`" class="relative flex justify-center items-center overflow-hidden group">
                <span class="absolute text-[38px] font-bakerhouse text-foreground-light text-center group-hover:opacity-0 transition-opacity duration-500 z-10">{{ category.name }}</span>
                <img :src="category.image" alt="" class="w-full h-full brightness-50 group-hover:scale-110 group-hover:brightness-100 select-none object-cover transition-all duration-500" draggable="false" />
            </NuxtLink>
            <StyledNav 
                href="/products" 
                class="flex justify-center items-center text-[38px] font-bakerhouse text-foreground-light py-24"
                :class="'sm:col-start-[var(--s2)] lg:col-start-[var(--s3)] xl:col-start-[var(--s4)]'"
                :style="gridSpans"
            >
                Összes termék
            </StyledNav>
        </div>
    </section>
    <section class="relative h-[530px] sm:h-[700px] flex flex-col justify-center items-center">
        <nuxt-img src="/blob_1.png" width="150" class="absolute top-[20%] left-[20%] w-[75px] sm:w-[150px]"/>
        <nuxt-img src="/blob_2.png" width="100" class="absolute top-[10%] left-[40%] w-[50px] sm:w-[100px]"/>
        <nuxt-img src="/blob_3.png" width="100" class="absolute top-[20%] left-[60%] w-[50px] sm:w-[100px]"/>
        <nuxt-img src="/blob_4.png" width="75" class="absolute top-[10%] left-[80%] w-[35px] sm:w-[75px]"/>
        <nuxt-img src="/blob_5.png" width="75" class="absolute top-3/4 left-[20%] w-[35px] sm:w-[75px]"/>
        <nuxt-img src="/blob_6.png" width="100" class="absolute top-[65%] left-[40%] w-[50px] sm:w-[100px]"/>
        <nuxt-img src="/blob_7.png" width="150" class="absolute top-3/4 left-[60%] w-[75px] sm:w-[150px]"/>
        <nuxt-img src="/blob_8.png" width="100" class="absolute top-[65%] left-[80%] w-[50px] sm:w-[100px]"/>
        <p class="text-sm sm:text-lg md:text-xl lg:text-[22px] xl:text-[28px] 2xl:text-[34px] lg:leading-[revert] text-center pb-4">
            <span class="text-foreground-accent">A modern pékművészet egyik első úttörő <br/> üzletháza Magyarországon.</span> 
            2015-ben indultunk a budapesti kertváros <br/> szívében, ahol a mai napig igyekszünk megfelelni saját <br/>és vendégeink igényeinek is.
        </p>
        <StyledNav href="/about" class="px-4 py-2 bg-primary max-sm:text-sm text-foreground-light rounded-lg hover:text-secondary transition-colors duration-500">Tötrénetünk</StyledNav>
    </section>
    <nuxt-img 
        src="/separator-gallery-top.png"
        width="2500"
        height="2500"
        class="w-full h-[30vw] object-cover object-bottom"
    />
    <section class="relative bg-primary">
        <h3 class="text-heading font-bakerhouse text-center text-foreground-light pb-8">Galéria</h3>
        <nuxt-img 
            src="decor.png"
            width="665"
            height="815"
            class="hidden sm:block absolute w-96 rotate-45 -left-24 -top-40 opacity-10"
        />
        <div class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-8 z-10">
            <GalleryModal 
                v-for="(galleryImage, index) in galleryImages" :key="galleryImage" 
                :gallery="galleryImages"
                :image="galleryImage" 
                :start-slide-index="index"
            />
        </div>
    </section>
    <nuxt-img 
        src="/separator-bottom.png"
        width="2500"
        height="150"
        class="w-full h-full object-cover"
    />
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[600px] p-8">
        <ArticleCard v-if="articles.length > 0" :article="articles[0]!" />
        <div :class="`grid ${articles.length > 2 ? 'grid-rows-2' : 'grid-rows-1'} gap-4 h-full`">
            <ArticleCard v-if="articles.length > 1" :article="articles[1]!" />
            <ArticleCard v-if="articles.length > 2" :article="articles[2]!" />
        </div>
    </section>
</template>

<script setup lang="ts">
    useSeoMeta({ title: "Breadigree Kézműves Pékség" });
    const carouselRef = ref(undefined);
    const carouselConfig = {
        itemsToShow: 1,
        wrapAround: true,
        height: 350,
        gap: 50,
        autoplay: 3000,
        transition: 1000,
        pauseAutoplayOnHover: true,
        breakpoints: {
            640: {
                height: 500
            },
            768: {
                itemsToShow: 1.5,
                height: 600,
            },
            1024: {
                itemsToShow: 2.25,
                height: 600,
            }
        }
    }

    const categoryResponse = await useFetch<categoryType[]>("/api/categories");
    const categories = categoryResponse.data.value || [];
    const featuredResponse = await useFetch<productType[]>("/api/products/featured");
    const featured = featuredResponse.data.value || [];
    const galleryResponse = await useFetch<string[]>("/api/gallery");
    const galleryImages = galleryResponse.data.value || [];
    const articlesResponse = await useFetch<serverArticleType[]>("/api/articles");
    const articles = toArticles(articlesResponse.data.value || []);
    
    // shinanigan properties to make the last item in the categories grid fill up the rest of the row, regardless of its position
    // based on breakpoints and knowing when will it be 1/2/3/4 columns wide, as well as grid item count
    // (also the % operator in JS is a remainder operator, not modulo, so I also had to invent that)
    const mod = (a: number, b: number) => ((a % b) + b) % b;
    const gridSpans = [
        {"--s1": `span 1`},
        {"--s2": `span ${1 + mod(-(categories.length + 2), 2)}`},
        {"--s3": `span ${1 + mod(-(categories.length + 2), 3)}`},
        {"--s4": `span ${1 + mod(-(categories.length + 2), 4)}`}
    ];

    const error = categoryResponse.error.value || featuredResponse.error.value || galleryResponse.error.value;
    if(error?.statusCode === 500) throw error;
</script>

<style scoped>
    .carousel {
        --vc-pgn-border-radius: 10px;
        --vc-pgn-height: 10px;
        --vc-pgn-width: 10px;
        --vc-nav-width: 45px;
        --vc-nav-height: 45px;
        --vc-pgn-background-color: white;
        --vc-pgn-active-color: var(--color-secondary);
    }

    :deep(.carousel__slide--active) {
        background-image: url("/majesty-lines.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    :deep(.carousel__prev) {
        translate: -100%;
        color: white;
    }
    
    :deep(.carousel__next) {
        translate: 100%;
        color: white;
    }
</style>