<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { projects } from '../data/siteContent'

const route = useRoute()

const project = computed(() => projects.find((item) => item.slug === route.params.slug))

const projectForm = ref({
  name: '',
  phone: '',
  comment: '',
})

const isProjectFormSent = ref(false)

const submitProjectForm = () => {
  if (!projectForm.value.name.trim() || !projectForm.value.phone.trim()) {
    return
  }

  isProjectFormSent.value = true
  projectForm.value = {
    name: '',
    phone: '',
    comment: '',
  }

  window.setTimeout(() => {
    isProjectFormSent.value = false
  }, 4000)
}
</script>

<template>
  <main class="pb-24 pt-24 md:pt-28">
    <section v-if="project" class="space-y-12">
      <div class="relative isolate overflow-hidden pb-8">
        <div class="absolute inset-0 bg-gradient-to-br from-deepNavy via-deepNavyHover to-graphite"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,174,99,0.24),transparent_42%)]"></div>
        <div
          class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:26px_26px]"
        ></div>

        <div class="site-container relative z-10 grid gap-6 py-14 text-white sm:py-20 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-end">
          <RevealBlock class="space-y-5 rounded-2xl border border-white/20 bg-black/30 p-5 backdrop-blur-[2px] sm:p-6">
            <RouterLink
              :to="{ path: '/', hash: '#projects' }"
              class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              К проектам
            </RouterLink>

            <h1 class="font-heading text-3xl font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl">
              {{ project.title }}
            </h1>
            <p class="max-w-2xl text-base text-white/95 drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)] sm:text-lg">
              {{ project.summary }}
            </p>

            <div class="flex flex-wrap gap-2 text-sm">
              <span class="rounded-full bg-white/15 px-4 py-2">{{ project.area }}</span>
              <span class="rounded-full bg-white/15 px-4 py-2">{{ project.city }}</span>
              <span class="rounded-full bg-white/15 px-4 py-2">{{ project.timeline }}</span>
            </div>
          </RevealBlock>

          <RevealBlock class="lg:justify-self-end" :delay="90">
            <figure
              class="overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-2 shadow-[0_18px_44px_rgba(0,0,0,0.4)] backdrop-blur"
            >
              <img
                :src="project.heroImage"
                :alt="`${project.title} превью`"
                class="aspect-[4/3] w-full rounded-xl object-cover"
                loading="eager"
              />
            </figure>
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
            title="Как выполнялись работы"
            description="Пошаговый процесс реализации проекта на объекте."
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

          <a
            href="#project-application"
            class="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-6 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
          >
            Оставить заявку по проекту
          </a>
        </RevealBlock>
      </div>

      <section class="site-container space-y-6">
        <RevealBlock>
          <SectionTitle
            eyebrow="Галерея"
            title="Фото выполненных работ"
            description="Подборка снимков по этапам и зонам проекта."
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

      <section id="project-application" class="site-container scroll-mt-28">
        <RevealBlock class="relative isolate overflow-hidden rounded-3xl border border-deepNavy/15 bg-deepNavy text-white">
          <div class="absolute inset-0 bg-gradient-to-br from-deepNavy via-deepNavyHover to-graphite"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,174,99,0.22),transparent_42%)]"></div>

          <div class="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-10">
            <div class="space-y-4 rounded-2xl border border-white/20 bg-black/20 p-5 backdrop-blur-[2px] sm:p-6">
              <span class="section-chip border-white/30 bg-white/10 text-white">Заявка по проекту</span>
              <h2 class="font-heading text-2xl font-extrabold leading-tight sm:text-3xl">Обсудим проект «{{ project.title }}»</h2>
              <p class="text-sm leading-relaxed text-white/90 sm:text-base">
                Оставьте контакты, и мы свяжемся с вами по срокам, стоимости и формату выполнения работ по этому
                объекту.
              </p>
              <ul class="space-y-2 text-sm text-white/90">
                <li>✓ Перезвоним и уточним задачу</li>
                <li>✓ Предложим оптимальный состав работ</li>
                <li>✓ Согласуем следующий шаг без лишней бюрократии</li>
              </ul>
            </div>

            <form class="card-surface p-5 sm:p-6" @submit.prevent="submitProjectForm">
              <div class="space-y-4">
                <label class="block text-sm font-medium text-graphite">
                  Имя
                  <input
                    v-model="projectForm.name"
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
                    v-model="projectForm.phone"
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
                    v-model="projectForm.comment"
                    name="comment"
                    :placeholder="`Комментарий по проекту «${project.title}»`"
                    class="form-area mt-2"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  class="inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
                >
                  Получить консультацию
                </button>

                <p v-if="isProjectFormSent" class="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Спасибо! Мы получили заявку по проекту и скоро свяжемся с вами.
                </p>
              </div>
            </form>
          </div>
        </RevealBlock>
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
