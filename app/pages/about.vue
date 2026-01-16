<template>
    <section class="fixed-bg-section w-full h-[110vh] bg-[url('/about_1.jpg')] px-4 md:pl-[10%] flex flex-col justify-center max-md:items-center">
        <h1 class="text-heading-about">"Kézműves"</h1>
        <p class="text-heading-sub md:max-w-72">Ahogy a nagyvilágban értik...</p>
    </section>
    <section class="w-full text-paragraph text-[#461e00] bg-background flex justify-center items-center">
        <p class="max-w-[1280px] mx-auto p-8 max-sm:text-center md:py-32 italic">
            Hosszú évek tapasztalatával, 2015. augusztus 1-jén megnyitottuk a Breadigree Kézműves Pékséget, hogy Ön is élvezhesse az igazi nemzetközi konyha péksüteményeinek ízét. 
            Alapítóink bejárták a világot ahol magyar, francia, belga és indonéz pék iskolákban szereztek tapasztalatot, 
            hogy megismerjék mivel lehet a legemlékezetesebb és legkiemelkedőbb fogásokat elkészíteni ami csak egy kemencén kifér.
        </p>
    </section>
    <section class="fixed-bg-section w-full h-[110vh] bg-[url('/about_4.jpg')] bg-center px-4 md:pl-[10%] flex flex-col justify-center max-md:items-center">
        <h2 class="text-heading-about">A kezdetek.</h2>
        <p class="text-heading-sub md:max-w-xl">Egy cserediák lehetőség a párizsi Le Cordon Bleu iskolába</p>
    </section>
    <section class="fixed-bg-section relative w-full md:h-[calc(3600px+100vh+10vw)] bg-[url('/about_5.jpg')] !bg-bottom overflow-x-clip">
        <div ref="section" class="md:sticky md:top-0 w-full md:w-[3600px] md:h-screen md:ml-[var(--ot)] flex max-md:flex-col bg-background text-black z-10" :style="{'--ot': `-${offsetTop}px`}">
            <div class="timeline-section-element">
                <p class="title">2015.</p>
                <p class="text-paragraph-tight italic">A Breadigree megalapítása, két okleveles pékkel és francia malmokból hazahozott alapanyagokkal.</p>
            </div>
            <div class="fixed-bg-section h-[300px] md:w-[calc(100%/7)] md:h-full bg-[url('/about_3.jpg')] !bg-blend-normal"></div>
            <div class="timeline-section-element">
                <p class="title">2017.</p>
                <p class="text-paragraph-tight italic">Műhelyünk kibővült 4 új mestercukrásszal, új gépi eszközök beszerzése.</p>
            </div>
            <div class="timeline-section-element">
                <p class="title">2019.</p>
                <p class="text-paragraph-tight italic">Továbbfejlődés egy belga patisserie-nél, új receptek és alapanyagok behozatala.</p>
            </div>
            <div class="fixed-bg-section h-[300px] md:w-[calc(100%/7)] md:h-full bg-[url('/about_2.jpg')] !bg-blend-normal"></div>
            <div class="timeline-section-element">
                <p class="title">2022.</p>
                <p class="text-paragraph-tight italic">Szerződéskötés egy maláj forgalmazóval, ázsiai péksütemények a kínálatunk között.</p>
            </div>
            <div class="timeline-section-element">
                <p class="title">2025.</p>
                <p class="text-paragraph-tight italic">Új gyártói üzem alapítása, Európában az egyik első a saját kategóriájában.</p>
            </div>
        </div>
        <div class="max-md:flex flex-col justify-center items-center max-md:h-screen md:sticky md:top-1/4 md:pb-20 md:pl-[10%] ">
            <p class="text-5xl sm:text-[6rem] leading-[1.4] font-bold">Breadigree</p>
            <p class="text-heading-sub max-w-72">A legfinomabb falatok otthona</p>
        </div>
    </section>
    <section class="w-full text-paragraph text-[#461e00] bg-background flex flex-col justify-center items-center py-8">
        <div class="max-w-[1280px] mx-auto max-sm:text-center p-8 md:py-32">
            <p class="md:py-10 italic">
		        Az alapanyagokat megbízható nemzetközi termelőktől szerezzük be, így garantáljuk a minőséget és a természetes ízeket. 
                Péksüteményeinket és kenyereinket kézzel formázzuk, hogy azok ne csak finomak, hanem különlegesek is legyenek. 
                Számunkra fontos, hogy vásárlóink mindig elégedetten térjenek vissza, mert hisszük, hogy a jó kenyér mindenkinek jár.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8 w-full mb-10">
                <div class="bullet-point-circle">
                    <p class="number">4</p>
                    <p>Ország konyhája</p>
                </div>
                <div class="bullet-point-circle">
                    <p class="number">30+</p>
                    <p>Termék</p>
                </div>
                <div class="bullet-point-circle">
                    <p class="number">15</p>
                    <p>Alkalmazott</p>
                </div>
                <div class="bullet-point-circle">
                    <p class="number">10+</p>
                    <p class="text-center">Éve veletek</p>
                </div>
            </div>
        </div>
    </section>
    <section class="fixed-bg-section w-full h-screen bg-[url('/about_6.jpg')] sm:px-[10%] flex flex-col justify-center">
        <h3 class="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.4] md:max-w-[40%] font-bold max-md:text-center">A Breadigree három vezető filozófiája</h3>
    </section>
    <section class="w-full leading-[25px] text-[#461e00] bg-background p-8 ">
        <div class="max-w-[1280px] mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-between w-full py-20">
                <div class="grid grid-rows-[auto_1fr] gap-10 w-full">
                    <p class="text-[2rem] leading-9 font-bold italic">A legjobb alapanyagok</p>
                    <p class="text-[1.1rem]">Péksüteményeinkhez a legkiválóbb minőségű hazai alapanyagokat, francia vajat és belga csokoládét, adalékanyag mentes lekvárokat és aszalványokat használjuk. Arra törekszünk, hogy megtaláljuk a legtisztább forrásból származó hozzávalókat. A minőségben nem ismerünk kompromisszumot: csak a legkiválóbb összetevők kerülnek be műhelyünkbe.</p>
                </div>
                <div class="grid grid-rows-[auto_1fr] gap-10 w-full">
                    <p class="text-[2rem] leading-9 font-bold italic">A legjobb minőség</p>
                    <p class="text-[1.1rem]">Az igazán jó kenyér elkészítéséhez időre van szükség, éppen ezért az összes kenyerünk lassú érleléssel készül, így a minőségi lisztek zamatát átveszi a tészta és az ízek ki tudnak bontakozni a kisült kenyereinkben. Vannak olyan termékeink, melyeket akár három napig készítünk elő a sütésig.</p>
                </div>
                <div class="grid grid-rows-[auto_1fr] gap-10 w-full">
                    <p class="text-[2rem] leading-9 font-bold italic">Innovácó</p>
                    <p class="text-[1.1rem]">A pékművészet nem csak a jól ismert kedvencek elkészítését jelenti. Ugyanúgy ahogy a festők soha nem futnak ki új ötletekből, mi is folyamatosan arra törekszünk, hogy a meglévő receptjeinket tovább fejlessszük és olyat tudjunk bemutatni a hazai közönségnek, amit máshol egész biztosan nem kaphatnak meg.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    useSeoMeta({ title: "Breadigree | Történetünk" });
    const sectionRef = useTemplateRef("section");
    const offsetTop = ref(sectionRef.value?.offsetTop);

    function handleScroll() {
        offsetTop.value = sectionRef.value?.offsetTop;
    }

    onMounted(() => document.addEventListener("scroll", handleScroll));
    onUnmounted(() => document.removeEventListener("scroll", handleScroll));
</script>

<style scoped>
    @reference "~/assets/css/main.css";
    .fixed-bg-section {
        @apply md:bg-fixed bg-cover bg-no-repeat bg-center bg-[#0004] bg-blend-multiply text-foreground-light;
    }
    .text-heading-about {
        @apply text-5xl sm:text-8xl md:text-[7rem] lg:text-[9rem] leading-[1.4] font-bold;
    }
    .text-heading-sub {
        @apply text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-8 md:leading-[50px] font-bold pb-2 md:pb-10 border-b-4 border-[initial] max-md:text-center
    }
    .text-paragraph {
        @apply text-xl sm:text-2xl md:text-[1.7rem] leading-9 sm:leading-10 md:leading-[47px];
    }
    .text-paragraph-tight {
        @apply text-xl sm:text-2xl md:text-[1.7rem] leading-8 sm:leading-9 md:leading-[42px];
    }
    .timeline-section-element {
        @apply w-full md:w-[calc(100%/7)] md:h-full p-[64px_32px] md:p-[180px_80px_25px_160px] max-md:text-center;

        .title {
            @apply text-[2.5rem] md:text-[5.5rem] font-bold;
        }
    }
    .bullet-point-circle {
        @apply flex flex-col justify-center items-center bg-secondary rounded-full w-[185px] h-[185px] sm:w-[245px] sm:h-[245px] md:w-[285px] md:h-[285px] lg:w-[225px] lg:h-[225px] xl:w-[265px] xl:h-[265px];

        .number {
            @apply text-[2rem] md:text-[3rem] xl:text-[4rem] leading-[3.5rem];
        }
    }
</style>