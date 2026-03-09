<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import {
  aboutContent,
  advantages,
  coreProjects,
  heroContent,
  processSteps,
  projects,
  reviews,
  services,
} from '../data/siteContent'

const form = ref({
  name: '',
  phone: '',
  comment: '',
})

const isFormSent = ref(false)

const submitForm = () => {
  if (!form.value.name.trim() || !form.value.phone.trim()) {
    return
  }

  isFormSent.value = true
  form.value = { name: '', phone: '', comment: '' }

  window.setTimeout(() => {
    isFormSent.value = false
  }, 4000)
}

onMounted(() => {
  if (!window.location.hash) {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  }
})
</script>

<template>
  <main class="pb-24 md:pb-0">
    <section id="hero" class="relative isolate min-h-[92svh] overflow-hidden pt-28 text-white sm:pt-32">
      <img
        :src="heroContent.image"
        alt="Реализованный жилой проект ООО СК-Гарант"
        class="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-hero-gradient"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,174,99,0.28),transparent_40%)]"></div>

      <div class="site-container relative z-10 flex min-h-[80svh] flex-col justify-center pb-12">
        <RevealBlock class="max-w-2xl space-y-6">
          <span class="section-chip border-white/30 bg-white/10 text-white">Монолит. Фасады. Инженерия.</span>
          <h1 class="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {{ heroContent.title }}
          </h1>
          <p class="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {{ heroContent.subtitle }}
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <RouterLink
              :to="{ path: '/', hash: '#application' }"
              class="inline-flex h-12 items-center justify-center rounded-xl bg-deepNavy px-6 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
            >
              Обсудить проект
            </RouterLink>
            <RouterLink
              :to="{ path: '/', hash: '#projects' }"
              class="inline-flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Смотреть портфолио
            </RouterLink>
          </div>
        </RevealBlock>

        <RevealBlock class="mt-9 grid max-w-xl gap-3 text-sm sm:grid-cols-3 sm:gap-4" :delay="130">
          <div
            v-for="benefit in heroContent.benefits"
            :key="benefit"
            class="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur"
          >
            <div class="flex items-center gap-2 font-medium">
              <span class="text-terracotta">✓</span>
              <span>{{ benefit }}</span>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>

    <section id="about" class="section-block scroll-mt-28">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="О компании"
            title="Надежный подрядчик для жилых и коммерческих объектов"
            :description="aboutContent.text"
          />
        </RevealBlock>

        <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealBlock class="card-surface p-6 sm:p-8" :delay="80">
            <p class="text-sm leading-relaxed text-warmGray sm:text-base">{{ aboutContent.extra }}</p>
            <div class="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div
                v-for="metric in aboutContent.stats"
                :key="metric.label"
                class="rounded-xl border border-deepNavy/10 bg-fog p-4"
              >
                <p class="font-heading text-2xl font-extrabold text-deepNavy sm:text-3xl">{{ metric.value }}</p>
                <p class="mt-1 text-xs text-warmGray sm:text-sm">{{ metric.label }}</p>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock class="overflow-hidden rounded-3xl" :delay="120">
            <img
              :src="aboutContent.image"
              alt="Объект в процессе строительства"
              class="h-full min-h-72 w-full object-cover"
              loading="lazy"
            />
          </RevealBlock>
        </div>

        <RevealBlock class="card-surface p-6 sm:p-8" :delay="160">
          <SectionTitle
            eyebrow="Внутренние данные"
            title="Основные реализованные проекты"
            description="Список ключевых проектов ООО «СК-Гарант» по основным направлениям работ."
          />

          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="item in coreProjects"
              :key="`${item.name}-${item.location}`"
              class="rounded-xl border border-deepNavy/10 bg-fog p-4"
            >
              <p class="font-heading text-base font-bold text-deepNavy">{{ item.name }}</p>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-warmGray">{{ item.location }}</p>
              <p class="mt-2 text-sm text-warmGray">{{ item.description }}</p>
            </article>
          </div>
        </RevealBlock>
      </div>
    </section>

    <section id="services" class="section-block scroll-mt-28 bg-fog">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            centered
            eyebrow="Виды работ"
            title="Шесть профильных направлений ООО «СК-Гарант»"
            description="От монолита и фасадов до инженерии и благоустройства территорий."
          />
        </RevealBlock>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RevealBlock
            v-for="(service, index) in services"
            :key="service.title"
            class="group card-surface h-full overflow-hidden"
            :delay="index * 70"
          >
            <div class="relative aspect-[16/10] overflow-hidden">
              <img
                :src="service.image"
                :alt="`Услуга: ${service.title}`"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-deepNavy/85 via-deepNavy/45 to-transparent"></div>
              <p class="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-heading text-[11px] font-bold tracking-[0.16em] text-deepNavy">
                {{ service.code }}
              </p>
              <h3 class="absolute inset-x-4 bottom-3 font-heading text-lg font-bold text-white">{{ service.title }}</h3>
            </div>

            <div class="flex h-full flex-col p-5 sm:p-6">
              <p class="text-sm leading-relaxed text-warmGray">{{ service.description }}</p>

              <ul class="mt-4 space-y-2 text-sm text-warmGray">
                <li v-for="point in service.points" :key="point" class="flex gap-2">
                  <span class="mt-[2px] text-terracotta">●</span>
                  <span>{{ point }}</span>
                </li>
              </ul>

              <p class="mt-5 rounded-xl bg-fog px-3 py-2 text-xs font-semibold text-deepNavy/80">
                {{ service.result }}
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section id="projects" class="section-block scroll-mt-28">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Портфолио"
            title="Реальные объекты компании"
            description="Каждый проект открыт с характеристиками, этапами и фото выполненных работ."
          />
        </RevealBlock>

        <div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          <RevealBlock
            v-for="(project, index) in projects"
            :key="project.slug"
            :delay="index * 70"
            class="min-w-[85%] snap-start md:min-w-0"
          >
            <RouterLink
              :to="`/projects/${project.slug}`"
              class="group block overflow-hidden rounded-2xl border border-fog bg-fog shadow-card"
            >
              <div class="relative aspect-[4/3] overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5"></div>
                <p
                  class="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-graphite shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                >
                  {{ project.area }}
                </p>
              </div>

              <div class="space-y-3 p-4 sm:p-5">
                <h3 class="font-heading text-lg font-bold text-deepNavy">{{ project.title }}</h3>
                <p class="text-sm text-warmGray">{{ project.summary }}</p>
                <div class="flex flex-wrap items-center gap-2 text-xs font-medium text-deepNavy/80">
                  <span class="rounded-full bg-deepNavy/10 px-3 py-1">{{ project.city }}</span>
                  <span class="rounded-full bg-deepNavy/10 px-3 py-1">{{ project.timeline }}</span>
                </div>
                <span class="inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                  Смотреть проект
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

    <section class="section-block bg-fog">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Этапы работы"
            title="Понятное взаимодействие от заявки до сдачи"
            description="Каждый этап фиксируется в рабочей коммуникации с заказчиком и генподрядчиком."
          />
        </RevealBlock>

        <div class="relative space-y-4">
          <div class="absolute left-[17px] top-4 h-[calc(100%-2rem)] w-px bg-deepNavy/20"></div>

          <RevealBlock
            v-for="(step, index) in processSteps"
            :key="step.title"
            :delay="index * 70"
            class="relative rounded-2xl border border-deepNavy/10 bg-white p-4 pl-14 shadow-card sm:p-5 sm:pl-16"
          >
            <span
              class="absolute left-4 top-5 inline-flex size-7 items-center justify-center rounded-full bg-deepNavy font-heading text-xs font-bold text-white"
            >
              {{ index + 1 }}
            </span>
            <h3 class="font-heading text-lg font-bold text-deepNavy">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-warmGray">{{ step.description }}</p>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section class="section-block bg-deepNavy text-white">
      <div class="site-container grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <RevealBlock class="space-y-4">
          <span class="section-chip border-white/25 bg-white/10 text-white">Конкурентные преимущества</span>
          <h2 class="font-heading text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            Лидирующие позиции за счет качества, опыта и адаптивности
          </h2>
          <p class="text-sm leading-relaxed text-white/75 sm:text-base">
            По внутреннему сравнительному анализу компания выделяется профильной экспертизой, системным контролем
            качества и гибкостью в работе с заказчиками.
          </p>
          <img
            src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Инженерные работы на парковке"
            class="mt-5 h-56 w-full rounded-2xl object-cover sm:h-64"
            loading="lazy"
          />
        </RevealBlock>

        <div class="grid gap-3 sm:grid-cols-2">
          <RevealBlock
            v-for="(advantage, index) in advantages"
            :key="advantage"
            :delay="index * 60"
            class="rounded-2xl border border-white/15 bg-white/5 p-4"
          >
            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
                ✓
              </span>
              <p class="text-sm leading-relaxed text-white/90">{{ advantage }}</p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            centered
            eyebrow="Кейсы"
            title="Ключевые результаты по реализованным объектам"
            description="Факты из портфолио компании: крупные объемы, сложные инженерные и отделочные задачи."
          />
        </RevealBlock>

        <div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          <RevealBlock
            v-for="(review, index) in reviews"
            :key="review.name"
            class="min-w-[88%] snap-start card-surface p-4 sm:min-w-[70%] lg:min-w-0"
            :delay="index * 70"
          >
            <img :src="review.image" :alt="review.project" class="h-40 w-full rounded-xl object-cover" loading="lazy" />
            <h3 class="mt-4 font-heading text-lg font-bold text-deepNavy">{{ review.name }}</h3>
            <p class="text-sm font-medium text-deepNavy/70">{{ review.project }}</p>
            <p class="mt-3 text-sm leading-relaxed text-warmGray">{{ review.text }}</p>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section id="application" class="section-block scroll-mt-28">
      <div class="site-container">
        <RevealBlock class="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Инженерные работы на объекте"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-deepNavy/95 via-deepNavyHover/90 to-graphite/86"></div>
          <div class="absolute inset-0 bg-black/25"></div>

          <div class="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-12">
            <div class="space-y-4 rounded-2xl border border-white/20 bg-black/25 p-5 text-white backdrop-blur-[2px] sm:p-6">
              <span class="section-chip border-white/35 bg-white/15 text-white">Запрос на расчет</span>
              <h2 class="font-heading text-2xl font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] sm:text-3xl">
                Обсудим ваш строительный проект
              </h2>
              <p class="max-w-md text-sm leading-relaxed text-white/95 drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)] sm:text-base">
                Оставьте контакты, и мы свяжемся с вами для консультации по объекту, составу работ и формату
                сотрудничества.
              </p>
              <ul class="space-y-2 text-sm text-white/95 drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]">
                <li>✓ Консультация бесплатно</li>
                <li>✓ Работаем с частными и корпоративными заказчиками</li>
                <li>✓ Быстрая обратная связь по заявке</li>
              </ul>
            </div>

            <form class="card-surface p-5 sm:p-6" @submit.prevent="submitForm">
              <div class="space-y-4">
                <label class="block text-sm font-medium text-graphite">
                  Имя
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    placeholder="Как к вам обращаться"
                    class="form-input mt-2"
                    required
                  />
                </label>

                <label class="block text-sm font-medium text-graphite">
                  Телефон
                  <input
                    v-model="form.phone"
                    type="tel"
                    name="phone"
                    autocomplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    class="form-input mt-2"
                    required
                  />
                </label>

                <label class="block text-sm font-medium text-graphite">
                  Комментарий
                  <textarea
                    v-model="form.comment"
                    name="comment"
                    placeholder="Тип объекта, локация, задачи"
                    class="form-area mt-2"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  class="inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
                >
                  Получить консультацию
                </button>

                <p v-if="isFormSent" class="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Спасибо! Мы получили заявку и скоро свяжемся с вами.
                </p>
              </div>
            </form>
          </div>
        </RevealBlock>
      </div>
    </section>

  </main>
</template>
