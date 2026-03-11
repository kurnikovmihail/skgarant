<script setup>
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { useProjects } from '../composables/useProjects'

const { projects, isLoading } = useProjects()
</script>

<template>
  <main class="page-main">
    <section class="section-block pt-8 sm:pt-10">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Проекты"
            title="Детализированное портфолио реализованных объектов"
            description="Каждый объект открыт как отдельная страница с описанием, этапами и галереей выполненных работ."
          />
        </RevealBlock>

        <RevealBlock class="card-surface p-5 sm:p-6" :delay="60">
          <h3 class="font-heading text-lg font-bold text-deepNavy">Добавление новых проектов без дорогой админки</h3>
          <p class="mt-2 text-sm text-warmGray">
            Для сотрудников доступна админ-форма с загрузкой изображений и интуитивным превью структуры проекта.
            Контент сохраняется через API и сразу доступен в каталоге.
          </p>
          <RouterLink to="/admin/projects/new" class="mt-4 inline-flex text-sm font-semibold text-terracotta">
            Перейти в админку проектов
          </RouterLink>
        </RevealBlock>

        <div v-if="isLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 6" :key="`project-skeleton-${n}`" class="h-72 animate-pulse rounded-2xl bg-fog"></div>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RevealBlock
            v-for="(project, index) in projects"
            :key="project.slug"
            :delay="index * 60"
            class="card-surface overflow-hidden"
          >
            <RouterLink :to="`/projects/${project.slug}`" class="group block h-full">
              <div class="relative aspect-[4/3] overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5"></div>
                <p class="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-graphite">
                  {{ project.area }}
                </p>
              </div>

              <div class="space-y-3 p-4 sm:p-5">
                <h3 class="font-heading text-lg font-bold text-deepNavy">{{ project.title }}</h3>
                <p class="text-sm text-warmGray">{{ project.summary }}</p>
                <div class="flex flex-wrap gap-2 text-xs font-medium text-deepNavy/80">
                  <span class="rounded-full bg-deepNavy/10 px-3 py-1">{{ project.city }}</span>
                  <span class="rounded-full bg-deepNavy/10 px-3 py-1">{{ project.timeline }}</span>
                </div>
                <span class="inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                  Открыть кейс
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
            </RouterLink>
          </RevealBlock>
        </div>
      </div>
    </section>
  </main>
</template>
