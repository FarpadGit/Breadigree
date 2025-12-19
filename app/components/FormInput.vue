<template>
    <div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    :deep(div:has(>input)), :deep(div:has(>textarea)) {
		position: relative;
		display: flex;
		overflow: hidden;
		z-index: 1;

		&::after {
			content: "";
			position: absolute;
			right: 0;
			width: 200%;
			height: 100%;
			background-image: linear-gradient(to right, var(--color-foreground-accent) 50%, var(--color-secondary) 50%);
			pointer-events: none;
			transition: right 0.5s ease;
			z-index: -1;
		}

		input, textarea {
			width: 100%;
			height: 3.5rem;
			padding: 0.25rem 0.25rem 0.25rem 1rem;
			color: white;
			background-color: transparent;
			outline: none;
		}

		&:has(input:focus)::after, 
        &:has(input:focus-visible)::after, 
        &:has(textarea:focus)::after, 
        &:has(textarea:focus-visible)::after {
			right: -100%;
		}
	}

    :deep(div:has(input:focus)), 
    :deep(div:has(input:focus-visible)),
    :deep(div:has(textarea:focus)), 
    :deep(div:has(textarea:focus-visible)) {
        outline: 2px solid var(--color-primary);
		outline-offset: 2px;
    }
</style>