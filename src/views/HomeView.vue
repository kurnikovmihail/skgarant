<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { advantages, heroContent, homeShowcase, services } from '../data/siteContent'
import { useProjects } from '../composables/useProjects'

const { projects } = useProjects()
const featuredProjects = computed(() => projects.value.slice(0, 3))
const featuredServices = computed(() => services.slice(0, 4))
</script>

<template>
  <main class="pb-[calc(5.8rem+env(safe-area-inset-bottom))] md:pb-0">
    <section class="relative isolate overflow-hidden pt-24 text-white sm:pt-28">
      <img :src="heroContent.image" alt="Строительный объект" class="absolute inset-0 h-full w-full object-cover object-center" loading="eager" />
      <div class="absolute inset-0 bg-[linear-gradient(118deg,rgba(8,24,24,0.92)_0%,rgba(15,42,42,0.8)_52%,rgba(15,42,42,0.62)_100%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(207,174,99,0.25),transparent_40%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_100%] opacity-30"></div>
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_80px] opacity-20"></div>

      <div class="site-container relative z-10">
        <div class="flex min-h-[78svh] items-start py-4 sm:min-h-[80svh] sm:py-6 lg:py-8">
          <RevealBlock class="relative w-full rounded-[34px] border border-white/25 bg-black/38 p-6 shadow-soft backdrop-blur-md sm:p-10 lg:p-14">
            <div class="pointer-events-none absolute inset-3 rounded-[26px] border border-white/10"></div>

            <div class="relative space-y-6 text-center">
              <span class="section-chip border-white/35 bg-white/10 text-white">Строительная компания полного цикла</span>
              <h1 class="mx-auto max-w-4xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {{ heroContent.title }}
              </h1>
              <p class="mx-auto max-w-3xl text-base leading-relaxed text-white/88 sm:text-lg">
                {{ heroContent.subtitle }}
              </p>
            </div>

            <div class="relative mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
              <RouterLink
                to="/projects"
                class="inline-flex h-12 w-full max-w-64 items-center justify-center rounded-xl bg-terracotta px-6 text-sm font-semibold text-graphite transition hover:bg-[#dec282]"
              >
                Смотреть проекты
              </RouterLink>
              <RouterLink
                to="/application"
                class="inline-flex h-12 w-full max-w-64 items-center justify-center rounded-xl border border-white/45 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Оставить заявку
              </RouterLink>
            </div>

            <div class="relative mt-8 grid gap-3 border-t border-white/18 pt-5 text-sm text-white/82 sm:grid-cols-3 sm:gap-4 sm:pt-6">
              <div
                v-for="(benefit, index) in heroContent.benefits"
                :key="benefit"
                :class="['flex items-start justify-center gap-2 text-center sm:px-3', index > 0 ? 'sm:border-l sm:border-white/15' : '']"
              >
                <span class="mt-[2px] text-terracotta">•</span>
                <span>{{ benefit }}</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section class="section-block bg-fog">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            centered
            eyebrow="Структура сайта"
            title="Вся ключевая информация разнесена по страницам"
            description="Сайт работает как имиджевый и одновременно как рабочая база: проекты, команда, документы и заявка."
          />
        </RevealBlock>

        <div class="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:hidden">
          <div class="flex snap-x snap-mandatory gap-3">
            <RevealBlock
              v-for="(item, index) in homeShowcase"
              :key="`mobile-${item.title}`"
              class="card-surface min-w-[17rem] snap-start p-5"
              :delay="index * 70"
            >
              <h3 class="font-heading text-lg font-bold text-deepNavy">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-warmGray">{{ item.description }}</p>
              <RouterLink :to="item.to" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                Перейти
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </RouterLink>
            </RevealBlock>
          </div>
        </div>

        <div class="hidden gap-4 sm:grid md:grid-cols-3">
          <RevealBlock v-for="(item, index) in homeShowcase" :key="item.title" class="card-surface h-full p-5 sm:p-6" :delay="index * 70">
            <h3 class="font-heading text-xl font-bold text-deepNavy">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-warmGray">{{ item.description }}</p>
            <RouterLink :to="item.to" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
              Перейти
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </RouterLink>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Услуги"
            title="Ключевые направления компании"
            description="Монолит, фасады, отделка, инженерия, благоустройство и управление проектами."
          />
        </RevealBlock>

        <div class="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:hidden">
          <div class="flex snap-x snap-mandatory gap-3">
            <RevealBlock
              v-for="(service, index) in featuredServices"
              :key="`mobile-${service.code}`"
              class="card-surface min-w-[17rem] snap-start p-5"
              :delay="index * 60"
            >
              <p class="font-heading text-xs font-bold tracking-[0.18em] text-terracotta">{{ service.code }}</p>
              <h3 class="mt-2 font-heading text-lg font-bold text-deepNavy">{{ service.title }}</h3>
              <p class="mt-2 text-sm text-warmGray">{{ service.description }}</p>
            </RevealBlock>
          </div>
        </div>

        <div class="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          <RevealBlock v-for="(service, index) in featuredServices" :key="service.code" class="card-surface p-5" :delay="index * 60">
            <p class="font-heading text-xs font-bold tracking-[0.18em] text-terracotta">{{ service.code }}</p>
            <h3 class="mt-2 font-heading text-lg font-bold text-deepNavy">{{ service.title }}</h3>
            <p class="mt-2 text-sm text-warmGray">{{ service.description }}</p>
          </RevealBlock>
        </div>

        <RevealBlock>
          <RouterLink to="/services" class="inline-flex h-11 items-center justify-center rounded-xl border border-deepNavy/20 px-5 text-sm font-semibold text-deepNavy transition hover:border-deepNavyHover hover:text-deepNavyHover">
            Все услуги
          </RouterLink>
        </RevealBlock>
      </div>
    </section>

    <section class="section-block bg-fog">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Проекты"
            title="Реализованные объекты"
            description="Детальные карточки проектов с этапами работ и техническими параметрами."
          />
        </RevealBlock>

        <div class="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:hidden">
          <div class="flex snap-x snap-mandatory gap-3">
            <RevealBlock
              v-for="(project, index) in featuredProjects"
              :key="`mobile-${project.slug}`"
              class="card-surface min-w-[17rem] snap-start overflow-hidden"
              :delay="index * 70"
            >
              <img :src="project.image" :alt="project.title" class="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
              <div class="space-y-3 p-5">
                <h3 class="font-heading text-lg font-bold text-deepNavy">{{ project.title }}</h3>
                <p class="text-sm text-warmGray">{{ project.summary }}</p>
                <RouterLink :to="`/projects/${project.slug}`" class="inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                  Открыть кейс
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </RouterLink>
              </div>
            </RevealBlock>
          </div>
        </div>

        <div class="hidden gap-4 sm:grid md:grid-cols-2 lg:grid-cols-3">
          <RevealBlock v-for="(project, index) in featuredProjects" :key="project.slug" class="card-surface overflow-hidden" :delay="index * 70">
            <img :src="project.image" :alt="project.title" class="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
            <div class="space-y-3 p-5">
              <h3 class="font-heading text-lg font-bold text-deepNavy">{{ project.title }}</h3>
              <p class="text-sm text-warmGray">{{ project.summary }}</p>
              <RouterLink :to="`/projects/${project.slug}`" class="inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                Открыть кейс
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </RouterLink>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock>
          <RouterLink to="/projects" class="inline-flex h-11 items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover">
            Все проекты
          </RouterLink>
        </RevealBlock>
      </div>
    </section>

    <section class="section-block bg-deepNavy text-white">
      <div class="site-container grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <RevealBlock class="space-y-4">
          <span class="section-chip border-white/25 bg-white/10 text-white">Имидж и доверие</span>
          <h2 class="font-heading text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            Клиент видит сильный бренд и сразу получает нужные документы
          </h2>
          <p class="text-sm leading-relaxed text-white/80 sm:text-base">
            Такой формат сайта работает и как презентация компании, и как рабочая точка контакта для заказчиков,
            партнеров и тендерных отделов.
          </p>
          <RouterLink
            to="/about"
            class="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-deepNavy transition hover:bg-fog"
          >
            Команда и документы
          </RouterLink>
        </RevealBlock>

        <div class="grid gap-3 sm:grid-cols-2">
          <RevealBlock v-for="(advantage, index) in advantages" :key="advantage" :delay="index * 60" class="rounded-2xl border border-white/15 bg-white/5 p-4">
            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">✓</span>
              <p class="text-sm leading-relaxed text-white/90">{{ advantage }}</p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  </main>
</template>
