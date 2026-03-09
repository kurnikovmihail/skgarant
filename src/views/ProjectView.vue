<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { projects } from '../data/siteContent'

const route = useRoute()

const project = computed(() => projects.find((item) => item.slug === route.params.slug))
</script>

<template>
  <main class="pb-24 pt-24 md:pt-28">
    <section v-if="project" class="space-y-12">
      <div class="relative isolate overflow-hidden pb-8">
        <img :src="project.heroImage" :alt="project.title" class="absolute inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-deepNavy/92 via-deepNavyHover/82 to-graphite/68"></div>

        <div class="site-container relative z-10 py-16 text-white sm:py-20">
          <RevealBlock class="max-w-3xl space-y-5">
            <RouterLink
              :to="{ path: '/', hash: '#projects' }"
              class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              К проектам
            </RouterLink>

            <h1 class="font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{{ project.title }}</h1>
            <p class="max-w-2xl text-base text-white/85 sm:text-lg">{{ project.summary }}</p>

            <div class="flex flex-wrap gap-2 text-sm">
              <span class="rounded-full bg-white/15 px-4 py-2">{{ project.area }}</span>
              <span class="rounded-full bg-white/15 px-4 py-2">{{ project.city }}</span>
              <span class="rounded-full bg-white/15 px-4 py-2">Срок: {{ project.timeline }}</span>
            </div>
          </RevealBlock>
        </div>
      </div>

      <div class="site-container grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <RevealBlock class="card-surface p-5 sm:p-7">
          <SectionTitle
            eyebrow="Описание"
            :title="`Характеристики ${project.title}`"
            description="Собрали ключевые параметры и инженерные решения, которые были реализованы на объекте."
          />

          <dl class="mt-6 grid gap-3 text-sm sm:grid-cols-2 sm:text-base">
            <div class="rounded-xl border border-fog bg-milk px-4 py-3">
              <dt class="text-warmGray">Локация</dt>
              <dd class="mt-1 font-semibold text-graphite">{{ project.location }}</dd>
            </div>
            <div class="rounded-xl border border-fog bg-milk px-4 py-3">
              <dt class="text-warmGray">Заказчик</dt>
              <dd class="mt-1 font-semibold text-graphite">{{ project.family }}</dd>
            </div>
            <div class="rounded-xl border border-fog bg-milk px-4 py-3 sm:col-span-2">
              <dt class="text-warmGray">Технология</dt>
              <dd class="mt-1 font-semibold text-graphite">{{ project.technology }}</dd>
            </div>
          </dl>

          <h3 class="mt-7 font-heading text-lg font-bold text-graphite">Что реализовано в проекте</h3>
          <ul class="mt-3 space-y-2 text-sm text-warmGray sm:text-base">
            <li v-for="feature in project.features" :key="feature" class="flex gap-3">
              <span class="mt-1 text-terracotta">●</span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </RevealBlock>

        <RevealBlock class="card-surface p-5 sm:p-7" :delay="80">
          <SectionTitle
            eyebrow="Этапы"
            title="Как шло строительство"
            description="Пошаговый процесс по объекту от стартовых работ до готового дома."
          />

          <ol class="mt-6 space-y-3">
            <li
              v-for="(stage, index) in project.buildStages"
              :key="stage"
              class="rounded-xl border border-fog bg-milk px-4 py-4"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.12em] text-deepNavy/70">Этап {{ index + 1 }}</p>
              <p class="mt-1 text-sm font-medium text-graphite sm:text-base">{{ stage }}</p>
            </li>
          </ol>

          <RouterLink
            :to="{ path: '/', hash: '#application' }"
            class="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-6 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
          >
            Хочу похожий дом
          </RouterLink>
        </RevealBlock>
      </div>

      <section class="site-container space-y-6">
        <RevealBlock>
          <SectionTitle
            eyebrow="Галерея"
            title="Фото построенного объекта"
            description="Подборка снимков фасадов и ключевых зон дома."
          />
        </RevealBlock>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RevealBlock
            v-for="(image, index) in project.gallery"
            :key="image"
            :delay="index * 70"
            class="overflow-hidden rounded-2xl"
          >
            <img :src="image" :alt="`${project.title} фото ${index + 1}`" class="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
          </RevealBlock>
        </div>
      </section>
    </section>

    <section v-else class="site-container py-20">
      <div class="card-surface mx-auto max-w-xl space-y-4 p-8 text-center">
        <h1 class="font-heading text-2xl font-bold text-deepNavy">Проект не найден</h1>
        <p class="text-sm text-warmGray">Возможно, ссылка устарела. Вернитесь на главную и выберите проект из портфолио.</p>
        <RouterLink
          to="/"
          class="inline-flex h-11 items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
        >
          На главную
        </RouterLink>
      </div>
    </section>
  </main>
</template>
