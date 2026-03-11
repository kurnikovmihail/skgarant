<script setup>
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { aboutContent, companyDocuments, contacts, teamDepartments } from '../data/siteContent'
</script>

<template>
  <main class="page-main">
    <section class="section-block pt-8 sm:pt-10">
      <div class="site-container space-y-8">
        <RevealBlock class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div class="space-y-4">
            <SectionTitle
              eyebrow="О компании"
              title="Команда, структура и документы ООО «СК-Гарант»"
              :description="aboutContent.text"
            />
            <p class="text-sm leading-relaxed text-warmGray sm:text-base">{{ aboutContent.extra }}</p>

            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div v-for="stat in aboutContent.stats" :key="stat.label" class="rounded-xl border border-deepNavy/10 bg-fog p-4">
                <p class="font-heading text-2xl font-extrabold text-deepNavy sm:text-3xl">{{ stat.value }}</p>
                <p class="mt-1 text-xs text-warmGray sm:text-sm">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <div class="overflow-hidden rounded-3xl border border-deepNavy/10">
            <img :src="aboutContent.image" alt="Команда на объекте" class="h-full min-h-72 w-full object-cover" loading="lazy" />
          </div>
        </RevealBlock>
      </div>
    </section>

    <section class="section-block bg-fog">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Отделы"
            title="Сотрудники распределены по профильным отделам"
            description="Структура покрывает полный цикл: от договорной и инженерной подготовки до выполнения работ на площадке."
          />
        </RevealBlock>

        <div class="space-y-4">
          <RevealBlock
            v-for="(department, deptIndex) in teamDepartments"
            :key="department.name"
            class="card-surface p-5 sm:p-6"
            :delay="deptIndex * 60"
          >
            <h3 class="font-heading text-xl font-extrabold text-deepNavy">{{ department.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-warmGray">{{ department.description }}</p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <article
                v-for="employee in department.employees"
                :key="`${department.name}-${employee.name}`"
                class="rounded-xl border border-deepNavy/10 bg-fog p-4"
              >
                <div class="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-deepNavy text-sm font-bold text-white">
                  {{ employee.name.split(' ')[0][0] }}{{ employee.name.split(' ')[1]?.[0] || '' }}
                </div>
                <p class="font-heading text-base font-bold text-deepNavy">{{ employee.name }}</p>
                <p class="mt-1 text-sm font-medium text-deepNavy/75">{{ employee.position }}</p>
                <p class="mt-2 text-xs text-warmGray">{{ employee.experience }}</p>
              </article>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="site-container space-y-8">
        <RevealBlock>
          <SectionTitle
            eyebrow="Документы"
            title="Скачать документы компании"
            description="На этой странице собраны основные файлы для первичного ознакомления с компанией и реквизитами."
          />
        </RevealBlock>

        <div class="grid gap-4 md:grid-cols-2">
          <RevealBlock
            v-for="(document, index) in companyDocuments"
            :key="document.file"
            class="card-surface h-full p-5 sm:p-6"
            :delay="index * 70"
          >
            <h3 class="font-heading text-lg font-bold text-deepNavy">{{ document.title }}</h3>
            <p class="mt-2 text-sm text-warmGray">{{ document.description }}</p>

            <a
              :href="document.file"
              download
              class="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-deepNavy/20 px-4 text-sm font-semibold text-deepNavy transition hover:border-deepNavyHover hover:text-deepNavyHover"
            >
              Скачать документ
            </a>
          </RevealBlock>
        </div>

        <RevealBlock class="card-surface p-5 sm:p-6">
          <h3 class="font-heading text-lg font-bold text-deepNavy">Нужны дополнительные материалы?</h3>
          <p class="mt-2 text-sm text-warmGray">
            Запросите у нас актуальные подписанные версии документов и расширенное портфолио по вашему направлению.
          </p>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a :href="`mailto:${contacts.email}`" class="inline-flex h-11 items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover">
              Запросить по email
            </a>
            <RouterLink to="/application" class="inline-flex h-11 items-center justify-center rounded-xl border border-deepNavy/20 px-5 text-sm font-semibold text-deepNavy transition hover:border-deepNavyHover hover:text-deepNavyHover">
              Оставить заявку
            </RouterLink>
          </div>
        </RevealBlock>
      </div>
    </section>
  </main>
</template>
