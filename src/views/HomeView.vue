<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import {
  aboutContent,
  advantages,
  contacts,
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
</script>

<template>
  <main class="pb-24 md:pb-0">
    <section id="hero" class="relative isolate min-h-[92svh] overflow-hidden pt-28 text-white sm:pt-32">
      <img
        :src="heroContent.image"
        alt="Современный частный дом"
        class="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-hero-gradient"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,106,44,0.35),transparent_40%)]"></div>

      <div class="site-container relative z-10 flex min-h-[80svh] flex-col justify-center pb-12">
        <RevealBlock class="max-w-2xl space-y-6">
          <span class="section-chip border-white/30 bg-white/10 text-white">Архитектура. Качество. Доверие.</span>
          <h1 class="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {{ heroContent.title }}
          </h1>
          <p class="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {{ heroContent.subtitle }}
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <RouterLink
              :to="{ path: '/', hash: '#application' }"
              class="inline-flex h-12 items-center justify-center rounded-xl bg-deepNavy px-6 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
            >
              Рассчитать стоимость строительства
            </RouterLink>
            <RouterLink
              :to="{ path: '/', hash: '#projects' }"
              class="inline-flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Посмотреть проекты
            </RouterLink>
          </div>
        </RevealBlock>

        <RevealBlock
          class="mt-9 grid max-w-xl gap-3 text-sm sm:grid-cols-3 sm:gap-4"
          :delay="130"
        >
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
            title="Надежный подрядчик с архитектурным подходом"
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
            <img :src="aboutContent.image" alt="Команда на строительном объекте" class="h-full min-h-72 w-full object-cover" />
          </RevealBlock>
        </div>
      </div>
    </section>

    <section id="services" class="section-block scroll-mt-28 bg-fog">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            centered
            eyebrow="Услуги"
            title="Закрываем весь цикл строительства"
            description="От идеи и проектирования до сдачи дома с инженерией и гарантией на работы."
          />
        </RevealBlock>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RevealBlock
            v-for="(service, index) in services"
            :key="service.title"
            class="card-surface h-full p-5 sm:p-6"
            :delay="index * 70"
          >
            <p class="font-heading text-xs font-bold tracking-[0.2em] text-terracotta">{{ service.code }}</p>
            <h3 class="mt-3 font-heading text-lg font-bold text-deepNavy">{{ service.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-warmGray">{{ service.description }}</p>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section id="projects" class="section-block scroll-mt-28">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Портфолио"
            title="Реальные проекты, построенные нашей командой"
            description="Каждый объект можно открыть и посмотреть детали, характеристики и этапы строительства."
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
                <div class="absolute inset-0 bg-gradient-to-t from-graphite/70 to-transparent"></div>
                <p class="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-graphite">
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
            eyebrow="Этапы строительства"
            title="Понятный процесс без скрытых шагов"
            description="Каждый этап фиксируется документально и сопровождается отчетностью для клиента."
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
          <span class="section-chip border-white/25 bg-white/10 text-white">Почему выбирают нас</span>
          <h2 class="font-heading text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            Спокойный сервис и инженерная точность на каждом объекте
          </h2>
          <p class="text-sm leading-relaxed text-white/75 sm:text-base">
            Мы не обещаем невозможное. Мы выстраиваем прогнозируемый процесс, где каждое решение обосновано,
            а результат подтвержден качеством работ.
          </p>
          <img
            src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Строительная площадка"
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
            eyebrow="Отзывы"
            title="Клиенты о работе с СК «Гаранд»"
            description="Репутация строится не обещаниями, а реализованными проектами и доверием семей, которые уже живут в своих домах."
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
            src="https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Строительство частного дома"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-deepNavy/88 via-deepNavyHover/80 to-graphite/75"></div>

          <div class="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-12">
            <div class="space-y-4 text-white">
              <span class="section-chip border-white/30 bg-white/10 text-white">Заявка на консультацию</span>
              <h2 class="font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                Обсудим строительство вашего дома
              </h2>
              <p class="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                Оставьте заявку и мы свяжемся с вами, чтобы обсудить задачи, бюджет и предложить оптимальный формат
                строительства.
              </p>
              <ul class="space-y-2 text-sm text-white/85">
                <li>✓ Консультация бесплатно</li>
                <li>✓ Без обязательств</li>
                <li>✓ Ответ в рабочее время в течение 15 минут</li>
              </ul>
            </div>

            <form class="card-surface p-5 sm:p-6" @submit.prevent="submitForm">
              <div class="space-y-4">
                <label class="block text-sm font-medium text-graphite">
                  Имя
                  <input v-model="form.name" type="text" name="name" autocomplete="name" placeholder="Как к вам обращаться" class="form-input mt-2" required />
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
                    placeholder="Площадь, участок, желаемые сроки"
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

    <section id="contacts" class="section-block scroll-mt-28 pt-4">
      <div class="site-container grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <RevealBlock class="card-surface p-5 sm:p-7">
          <SectionTitle
            eyebrow="Контакты"
            title="Свяжитесь с нами удобным способом"
            description="Офис работает в будни и субботу. Можно приехать на консультацию по предварительной записи."
          />

          <div class="mt-6 space-y-4 text-sm sm:text-base">
            <a
              :href="`tel:${contacts.phoneRaw}`"
              class="flex items-start justify-between rounded-xl border border-fog px-4 py-3 transition hover:border-terracotta/40"
            >
              <span class="text-warmGray">Телефон</span>
              <span class="font-semibold text-graphite">{{ contacts.phone }}</span>
            </a>
            <a
              :href="`mailto:${contacts.email}`"
              class="flex items-start justify-between rounded-xl border border-fog px-4 py-3 transition hover:border-terracotta/40"
            >
              <span class="text-warmGray">Email</span>
              <span class="font-semibold text-graphite">{{ contacts.email }}</span>
            </a>
            <div class="flex items-start justify-between rounded-xl border border-fog px-4 py-3">
              <span class="text-warmGray">Адрес</span>
              <span class="max-w-[55%] text-right font-semibold text-graphite">{{ contacts.office }}</span>
            </div>
            <div class="flex items-start justify-between rounded-xl border border-fog px-4 py-3">
              <span class="text-warmGray">Режим работы</span>
              <span class="font-semibold text-graphite">{{ contacts.schedule }}</span>
            </div>
          </div>
        </RevealBlock>

        <RevealBlock class="overflow-hidden rounded-2xl border border-fog bg-white" :delay="100">
          <iframe
            :src="contacts.mapEmbed"
            title="Карта офиса СК Гаранд"
            class="h-[340px] w-full border-0 sm:h-full sm:min-h-[430px]"
            loading="lazy"
          ></iframe>
        </RevealBlock>
      </div>
    </section>
  </main>
</template>
