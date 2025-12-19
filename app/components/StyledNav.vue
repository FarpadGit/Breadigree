<template>
    <NuxtLink :href="href">
        <span>
            <slot />
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
    const { href } = defineProps<{  href: string }>();
</script>

<style scoped>
    a {
        span {
            position: relative;
            display: flex;
            justify-content: center;
            text-align: center;
            transition: color 0.5s ease;
            
            &::after {
                content: "";
                position: absolute;
                bottom: -10%;
                width: 0px;
                height: 2px;
                pointer-events: none;
                background-color: var(--color-link-active);
                transition: width 0.5s ease;
            }
        }

        &:focus, &:focus-visible, &:hover {
          outline: none;
          text-decoration: none;
          color: var(--color-link-active);

          span::after {
            width: 100%;
          }
        }
      }

      .router-link-active > span::after {
            width: 100%;
      }
</style>