<script setup>
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { services } from '../data/siteContent'
</script>

<template>
  <main class="page-main">
    <section class="section-block pt-8 sm:pt-10">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Услуги"
            title="Основные направления работ"
            description="Страница с краткой структурой услуг компании без лишней перегрузки."
          />
        </RevealBlock>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RevealBlock
            v-for="(service, index) in services"
            :key="service.code"
            class="group card-surface h-full overflow-hidden"
            :delay="index * 70"
          >
            <div class="relative aspect-[16/10] overflow-hidden">
              <img :src="service.image" :alt="service.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-deepNavy/85 via-deepNavy/45 to-transparent"></div>
              <p class="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-heading text-[11px] font-bold tracking-[0.16em] text-deepNavy">{{ service.code }}</p>
              <h3 class="absolute inset-x-4 bottom-3 font-heading text-lg font-bold text-white">{{ service.title }}</h3>
            </div>

            <div class="space-y-3 p-5 sm:p-6">
              <p class="text-sm leading-relaxed text-warmGray">{{ service.description }}</p>
              <ul class="space-y-2 text-sm text-warmGray">
                <li v-for="point in service.points" :key="point" class="flex gap-2">
                  <span class="mt-[2px] text-terracotta">●</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock>
          <RouterLink to="/application" class="inline-flex h-11 items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover">
            Обсудить ваш проект
          </RouterLink>
        </RevealBlock>
      </div>
    </section>
  </main>
</template>
