<template>
    <section class="min-h-page bg-background">
		<h2 class="font-bakerhouse uppercase text-center text-heading-sm p-8">Elérhetőségeink</h2>
		<div class="flex flex-col md:grid grid-cols-2 gap-y-8 justify-items-end max-w-6xl h-full mx-auto p-8">
			<div class="flex flex-col gap-4">
				<div class="flex justify-between gap-12">
					<div class="flex flex-col w-full">
						<label for="name">Név</label>
						<FormInput><input id="name" v-model="form.name" /></FormInput>
					</div>
					<div class="flex flex-col w-full">
						<label for="email">Email</label>
						<FormInput><input id="email" v-model="form.email" /></FormInput>
					</div>
				</div>
				<div class="flex flex-col">
					<label for="subject">Tárgy</label>
					<FormInput><input id="subject" v-model="form.subject" /></FormInput>
				</div>
				<div class="flex flex-col">
					<label for="phone">Telefon</label>
					<FormInput><input id="phone" v-model="form.phone" /></FormInput>
				</div>
				<div class="flex flex-col">
					<label for="message">Üzenet</label>
					<FormInput><textarea 
						name="" 
						id="message" 
						rows="6"
						spellcheck="false"
						class="resize-none !h-auto"
						v-model="form.message"
						></textarea></FormInput>
				</div>
				<p 
					class="text-sm !p-0 text-center max-h-0 transition-all duration-300 overflow-hidden opacity-0"
					:class="{'max-h-20 opacity-100': form.name || form.email || form.subject || form.message}"
				>
					(Ez csak egy díszlet form, a Küldés gomb az oldalamra navigál. Írj nekem levelet ott :)
				</p>
				
				<NuxtLink to="https://fabokarpad.hu" 
					external 
					class="p-2 bg-primary text-foreground-light rounded-lg hover:text-secondary transition-colors duration-500 uppercase text-center font-bold"
				>
					Küldés
				</NuxtLink>
			</div>
			<div class="flex flex-col justify-center items-start gap-8 h-fit self-center bg-[color-mix(in_srgb,var(--color-primary),black_20%)] text-foreground-light rounded-lg p-14">
				<div class="grid grid-cols-[auto_1fr] gap-4">
					<Icon name="location" />
					<div class="flex flex-col">					
						<p class="font-bold text-lg">Címünk</p>
						<p>1145 Budapest Sikér utca 1. magasföldszint</p>
					</div>
				</div>
				<div class="grid grid-cols-[auto_1fr] gap-4">
					<Icon name="email" />
					<div class="flex flex-col">
						<NuxtLink to="https://fabokarpad.hu" target="_blank" class="font-bold text-lg">
							Közvetlen Elérhetőség
						</NuxtLink>
						<p>Email: farpadmail@gmail.com</p>
					</div>
				</div>
				<div class="grid grid-cols-[auto_1fr] gap-4">
					<Icon name="phone" />
						<div class="flex flex-col">
						<p class="font-bold text-lg">Telefon</p>				
						<p>06 30 555 5555</p>
					</div>
				</div>
				<div class="flex flex-col">
					<p class="font-bold text-lg">Kövess Minket</p>
					<div class="grid grid-cols-4 gap-2">
						<NuxtLink to="https://www.fabokarpad.hu" external>
							<Icon name="facebook" :size="40" />
						</NuxtLink>
						<NuxtLink to="https://www.fabokarpad.hu" external>
							<Icon name="instagram" :size="40" />
						</NuxtLink>
						<NuxtLink to="https://www.fabokarpad.hu" external>
							<Icon name="bsky" :size="40" />
						</NuxtLink>
						<NuxtLink to="https://www.fabokarpad.hu" external>
							<Icon name="tiktok" :size="40" />
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	useSeoMeta({ title: "Breadigree | Kapcsolat" });
    const form = ref({
		name: "",
		email: "",
		subject: "",
		phone: "",
		message: ""
	});
</script>