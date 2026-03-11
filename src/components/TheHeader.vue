<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navigation } from '../data/siteContent'

const route = useRoute()
const isMenuOpen = ref(false)
const isElevated = ref(false)

const isHomeRoute = computed(() => route.name === 'home')
const isOverlayMode = computed(() => isHomeRoute.value && !isElevated.value && !isMenuOpen.value)
const mobileNavigation = computed(() => navigation.filter((item) => item.to !== '/application'))

const handleScroll = () => {
  isElevated.value = window.scrollY > 12
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  if (isMenuOpen.value) {
    closeMenu()
    return
  }

  isMenuOpen.value = true
}

const isRouteActive = (to) => {
  if (to === '/') {
    return route.path === '/'
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

watch(isMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
    <div
      :class="[
        'site-container rounded-2xl border transition-all duration-300',
        isElevated || !isHomeRoute || isMenuOpen
          ? 'border-white/50 bg-white/90 shadow-soft backdrop-blur'
          : 'border-white/20 bg-white/10 backdrop-blur-md',
      ]"
    >
      <div class="flex h-14 items-center justify-between gap-3 px-3 sm:h-16 sm:px-4">
        <RouterLink to="/" class="group inline-flex items-center gap-3">
          <div
            :class="[
              'relative size-12 overflow-hidden rounded-xl border bg-terracotta/30 shadow-sm sm:size-14',
              isOverlayMode ? 'border-white/40' : 'border-deepNavy/20',
            ]"
          >
            <img
              src="/branding/logo-sk-garant.png"
              alt="Логотип СК-Гарант"
              class="h-full w-full translate-y-[10%] scale-[1.55] object-contain object-center"
              loading="eager"
            />
          </div>
          <div class="leading-tight">
            <p :class="['font-heading text-sm font-extrabold sm:text-base', isOverlayMode ? 'text-white' : 'text-deepNavy']">
              ООО «СК-Гарант»
            </p>
            <p :class="['hidden text-[11px] min-[420px]:block', isOverlayMode ? 'text-white/80' : 'text-warmGray']">
              Строительно-монтажные работы
            </p>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-6 md:flex">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :class="[
              'text-sm font-medium transition',
              isRouteActive(item.to)
                ? isOverlayMode
                  ? 'text-terracotta'
                  : 'text-deepNavy'
                : isOverlayMode
                  ? 'text-white/88 hover:text-terracotta'
                  : 'text-deepNavy/80 hover:text-deepNavyHover',
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <RouterLink
            to="/application"
            :class="[
              'inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold transition',
              isOverlayMode
                ? 'bg-terracotta text-graphite hover:bg-terracotta/90'
                : 'bg-deepNavy text-white hover:bg-deepNavyHover',
            ]"
          >
            Оставить заявку
          </RouterLink>
        </div>

        <button
          type="button"
          :class="[
            'inline-flex size-11 items-center justify-center rounded-xl border md:hidden',
            isOverlayMode ? 'border-white/35 text-white bg-white/10' : 'border-deepNavy/20 text-deepNavy',
          ]"
          :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="toggleMenu"
        >
          <svg v-if="!isMenuOpen" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          </svg>
          <svg v-else class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 z-[60] md:hidden">
        <button
          type="button"
          class="absolute inset-0 bg-deepNavy/45 backdrop-blur-[2px]"
          aria-label="Закрыть меню"
          @click="closeMenu"
        ></button>

        <div class="absolute inset-x-3 top-[calc(env(safe-area-inset-top)+4.2rem)] rounded-2xl border border-white/55 bg-white/95 p-3 shadow-soft backdrop-blur">
          <nav class="grid gap-2">
            <RouterLink
              v-for="item in mobileNavigation"
              :key="`mobile-${item.to}`"
              :to="item.to"
              :class="[
                'flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition',
                isRouteActive(item.to)
                  ? 'border-deepNavy/30 bg-deepNavy/10 text-deepNavy'
                  : 'border-deepNavy/10 bg-white text-deepNavy/85',
              ]"
              @click="closeMenu"
            >
              <span>{{ item.label }}</span>
              <svg class="size-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </RouterLink>
          </nav>

          <RouterLink
            to="/application"
            class="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-4 text-sm font-semibold text-white"
            @click="closeMenu"
          >
            Оставить заявку
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>
