<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/', label: 'Главная', icon: 'home' },
  { to: '/projects', label: 'Проекты', icon: 'folder' },
  { to: '/application', label: 'Заявка', icon: 'send' },
]

const isVisible = computed(() => !route.path.startsWith('/admin'))

const isRouteActive = (to) => {
  if (to === '/') {
    return route.path === '/'
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-x-0 bottom-0 z-40 border-t border-white/65 bg-white/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] pt-2 shadow-soft backdrop-blur md:hidden"
  >
    <div class="mx-auto grid max-w-lg grid-cols-3 gap-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'inline-flex min-h-12 flex-col items-center justify-center rounded-xl border text-[11px] font-semibold transition',
          isRouteActive(item.to)
            ? 'border-deepNavy/30 bg-deepNavy text-white'
            : 'border-deepNavy/12 bg-white text-deepNavy/80',
        ]"
      >
        <svg v-if="item.icon === 'home'" class="mb-1 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 10.5L12 3l9 7.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M5.5 9.5V21h13V9.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else-if="item.icon === 'folder'" class="mb-1 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 7h6l2 2h10v9.5A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5V7z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else class="mb-1 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </div>
</template>
