<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-white/95 p-3 shadow-soft backdrop-blur md:hidden">
    <div class="mx-auto flex max-w-lg gap-2">
      <RouterLink
        :to="{ path: '/', hash: '#projects' }"
        class="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-deepNavy/25 text-sm font-semibold text-deepNavy"
      >
        Проекты
      </RouterLink>
      <RouterLink
        :to="{ path: '/', hash: '#application' }"
        class="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-deepNavy text-sm font-semibold text-white"
      >
        Оставить заявку
      </RouterLink>
    </div>
  </div>
</template>
