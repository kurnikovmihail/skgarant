<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navigation } from '../data/siteContent'

const route = useRoute()
const isMenuOpen = ref(false)
const isElevated = ref(false)

const goToSection = (sectionId) => ({ path: '/', hash: `#${sectionId}` })
const goToApplication = () => ({ path: '/', hash: '#application' })

const isHomeRoute = computed(() => route.name === 'home')
const isOverlayMode = computed(() => isHomeRoute.value && !isElevated.value && !isMenuOpen.value)
const headerNavigation = computed(() => navigation.filter((item) => item.id !== 'contacts'))

const handleScroll = () => {
  isElevated.value = window.scrollY > 12
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
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
              'relative size-10 overflow-hidden rounded-full border bg-white shadow-sm sm:size-11',
              isOverlayMode ? 'border-white/40' : 'border-deepNavy/20',
            ]"
          >
            <img
              src="/portfolio/logo.jpg"
              alt="Логотип СК-Гарант"
              class="h-full w-full scale-[1.22] object-cover object-top"
              loading="eager"
            />
          </div>
          <div class="leading-tight">
            <p :class="['font-heading text-sm font-extrabold sm:text-base', isOverlayMode ? 'text-white' : 'text-deepNavy']">
              ООО «СК-Гарант»
            </p>
            <p :class="['text-[11px]', isOverlayMode ? 'text-white/80' : 'text-warmGray']">Строительно-монтажные работы</p>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-6 md:flex">
          <RouterLink
            v-for="item in headerNavigation"
            :key="item.id"
            :to="goToSection(item.id)"
            :class="[
              'text-sm font-medium transition',
              isOverlayMode ? 'text-white/90 hover:text-terracotta' : 'text-deepNavy/85 hover:text-deepNavyHover',
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <RouterLink
            :to="goToApplication()"
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
            'inline-flex size-10 items-center justify-center rounded-xl border md:hidden',
            isOverlayMode ? 'border-white/35 text-white bg-white/10' : 'border-deepNavy/20 text-deepNavy',
          ]"
          aria-label="Открыть меню"
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

      <div v-if="isMenuOpen" class="space-y-3 border-t border-deepNavy/10 p-3 md:hidden">
        <RouterLink
          v-for="item in headerNavigation"
          :key="`mobile-${item.id}`"
          :to="goToSection(item.id)"
          class="block rounded-xl border border-deepNavy/10 px-4 py-3 text-sm font-medium text-deepNavy"
        >
          {{ item.label }}
        </RouterLink>

        <RouterLink
          :to="goToApplication()"
          class="block rounded-xl bg-deepNavy px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Оставить заявку
        </RouterLink>
      </div>
    </div>
  </header>
</template>
