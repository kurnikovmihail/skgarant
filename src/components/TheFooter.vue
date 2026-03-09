<script setup>
import { RouterLink } from 'vue-router'
import { contacts, navigation } from '../data/siteContent'

const currentYear = new Date().getFullYear()
const goToSection = (sectionId) => ({ path: '/', hash: `#${sectionId}` })
</script>

<template>
  <footer id="contacts" class="mt-10 scroll-mt-28 bg-deepNavy text-white">
    <div class="site-container py-10">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-3">
          <p class="font-heading text-xl font-bold">ООО «СК-Гарант»</p>
          <p class="text-sm text-white/70">
            Монолитные, фасадные, отделочные, инженерные работы и благоустройство объектов.
          </p>
        </div>

        <div class="space-y-3">
          <p class="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Навигация</p>
          <nav class="grid gap-2">
            <RouterLink
              v-for="item in navigation"
              :key="`footer-${item.id}`"
              :to="goToSection(item.id)"
              class="text-sm text-white/80 transition hover:text-white"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>

        <div class="space-y-3">
          <p class="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Контакты</p>
          <a :href="`tel:${contacts.phoneRaw}`" class="block text-sm text-white/85 transition hover:text-white">
            {{ contacts.phone }}
          </a>
          <a :href="`mailto:${contacts.email}`" class="block text-sm text-white/85 transition hover:text-white">
            {{ contacts.email }}
          </a>
          <p class="text-sm text-white/70">{{ contacts.office }}</p>
          <p class="text-sm text-white/70">{{ contacts.secondaryOffice }}</p>
        </div>
      </div>

      <div class="mt-8 border-t border-white/15 pt-5 text-xs text-white/55">
        © {{ currentYear }} ООО «СК-Гарант». Все права защищены.
      </div>
    </div>
  </footer>
</template>
