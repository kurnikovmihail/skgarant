<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import { invalidateProjectsCache, useProjects } from '../composables/useProjects'
import { useAdminAuth } from '../composables/useAdminAuth'

const router = useRouter()
const { checkSession, logout } = useAdminAuth()
const { projects, reloadProjects } = useProjects()

const isAuthorized = ref(false)
const isCheckingAccess = ref(true)
const isSubmitting = ref(false)
const deletingSlug = ref('')
const submitError = ref('')
const submitSuccess = ref('')

const form = ref({
  title: '',
  slug: '',
  area: '',
  city: '',
  timeline: '',
  summary: '',
  location: '',
  family: '',
  technology: '',
  featuresInput: '',
  buildStagesInput: '',
})

const files = ref({
  image: null,
  heroImage: null,
  gallery: [],
})

const previewUrls = ref({
  image: '',
  heroImage: '',
  gallery: [],
})

const normalizeSlug = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')

const splitLines = (value) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

const computedSlug = computed(() => normalizeSlug(form.value.slug || form.value.title))

const previewData = computed(() => {
  const title = form.value.title || 'Название проекта'
  const summary = form.value.summary || 'Краткое описание проекта будет отображаться здесь.'
  const area = form.value.area || 'Тип работ'
  const city = form.value.city || 'Город'
  const timeline = form.value.timeline || 'Сроки/заказчик'

  const coverImage = previewUrls.value.image || '/portfolio/zhk-skandinaviya.jpg'
  const heroImage = previewUrls.value.heroImage || coverImage
  const features = splitLines(form.value.featuresInput)
  const stages = splitLines(form.value.buildStagesInput)

  return {
    title,
    summary,
    area,
    city,
    timeline,
    coverImage,
    heroImage,
    features: features.length > 0 ? features : ['Пункты будут отображаться после заполнения поля «Что реализовано».'],
    stages: stages.length > 0 ? stages : ['Этапы работ появятся после заполнения соответствующего поля.'],
    gallery:
      previewUrls.value.gallery.length > 0
        ? previewUrls.value.gallery
        : [coverImage, '/portfolio/odinburg-kladka.jpg', '/portfolio/odingrad-yard.jpg'],
  }
})

const updateSinglePreview = (type, file) => {
  if (!file) {
    previewUrls.value[type] = ''
    return
  }

  previewUrls.value[type] = URL.createObjectURL(file)
}

const onCoverChange = (event) => {
  const file = event.target.files?.[0] || null
  files.value.image = file
  updateSinglePreview('image', file)
}

const onHeroChange = (event) => {
  const file = event.target.files?.[0] || null
  files.value.heroImage = file
  updateSinglePreview('heroImage', file)
}

const onGalleryChange = (event) => {
  const selectedFiles = Array.from(event.target.files || [])
  files.value.gallery = selectedFiles
  previewUrls.value.gallery = selectedFiles.map((file) => URL.createObjectURL(file))
}

const createProject = async () => {
  submitError.value = ''
  submitSuccess.value = ''

  if (!form.value.title.trim() || !form.value.summary.trim() || !form.value.area.trim() || !form.value.city.trim() || !form.value.timeline.trim()) {
    submitError.value = 'Заполните обязательные поля: название, описание, тип работ, город, сроки.'
    return
  }

  if (!files.value.image) {
    submitError.value = 'Загрузите главное изображение проекта.'
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('title', form.value.title.trim())
    formData.append('slug', computedSlug.value)
    formData.append('area', form.value.area.trim())
    formData.append('city', form.value.city.trim())
    formData.append('timeline', form.value.timeline.trim())
    formData.append('summary', form.value.summary.trim())
    formData.append('location', form.value.location.trim())
    formData.append('family', form.value.family.trim())
    formData.append('technology', form.value.technology.trim())
    formData.append('features', JSON.stringify(splitLines(form.value.featuresInput)))
    formData.append('buildStages', JSON.stringify(splitLines(form.value.buildStagesInput)))

    formData.append('image', files.value.image)
    if (files.value.heroImage) {
      formData.append('heroImage', files.value.heroImage)
    }

    for (const file of files.value.gallery) {
      formData.append('gallery', file)
    }

    const response = await fetch('/api/admin/projects', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    const payload = await response.json()
    if (!response.ok) {
      throw new Error(payload?.message || 'Не удалось создать проект')
    }

    invalidateProjectsCache()
    await reloadProjects()
    submitSuccess.value = `Проект создан: /projects/${payload.project.slug}`

    form.value = {
      title: '',
      slug: '',
      area: '',
      city: '',
      timeline: '',
      summary: '',
      location: '',
      family: '',
      technology: '',
      featuresInput: '',
      buildStagesInput: '',
    }
    files.value = { image: null, heroImage: null, gallery: [] }
    previewUrls.value = { image: '', heroImage: '', gallery: [] }
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Ошибка создания проекта'
  } finally {
    isSubmitting.value = false
  }
}

const deleteProject = async (project) => {
  const confirmation = window.confirm(`Удалить проект «${project.title}»? Это действие необратимо.`)
  if (!confirmation) {
    return
  }

  submitError.value = ''
  submitSuccess.value = ''
  deletingSlug.value = project.slug

  try {
    const response = await fetch(`/api/admin/projects/${encodeURIComponent(project.slug)}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    const payload = await response.json()
    if (response.status === 401) {
      await router.replace('/admin/login?redirect=/admin/projects/new')
      return
    }

    if (!response.ok) {
      throw new Error(payload?.message || 'Не удалось удалить проект')
    }

    invalidateProjectsCache()
    await reloadProjects()
    submitSuccess.value = `Проект удален: /projects/${project.slug}`
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Ошибка удаления проекта'
  } finally {
    deletingSlug.value = ''
  }
}

const handleLogout = async () => {
  await logout()
  await router.replace('/admin/login')
}

onMounted(async () => {
  const authenticated = await checkSession()
  if (!authenticated) {
    await router.replace('/admin/login?redirect=/admin/projects/new')
    return
  }

  await reloadProjects()
  isAuthorized.value = true
  isCheckingAccess.value = false
})
</script>

<template>
  <main class="pb-24 pt-24 md:pb-0 md:pt-28">
    <section class="section-block pt-8 sm:pt-10">
      <div class="site-container space-y-8">
        <RevealBlock v-if="isCheckingAccess" class="card-surface p-6 text-sm text-warmGray">Проверяем доступ...</RevealBlock>

        <template v-else-if="isAuthorized">
          <RevealBlock class="card-surface p-6 sm:p-8">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 class="font-heading text-2xl font-extrabold text-deepNavy sm:text-3xl">Создание нового проекта</h1>
                <p class="mt-2 text-sm text-warmGray">
                  Форма повторяет структуру карточки проекта на сайте: сразу видно, где будет отображаться каждый блок.
                </p>
              </div>
              <button
                type="button"
                class="inline-flex h-10 items-center justify-center rounded-xl border border-deepNavy/20 px-4 text-sm font-semibold text-deepNavy transition hover:border-deepNavyHover hover:text-deepNavyHover"
                @click="handleLogout"
              >
                Выйти из админки
              </button>
            </div>
          </RevealBlock>

          <div class="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <RevealBlock class="card-surface p-5 sm:p-6">
              <form class="space-y-4" @submit.prevent="createProject">
                <h2 class="font-heading text-xl font-bold text-deepNavy">Данные проекта</h2>

                <label class="block text-sm font-medium text-graphite">
                  Название проекта *
                  <input v-model="form.title" type="text" class="form-input mt-2" placeholder="ЖК Пример" required />
                </label>

                <label class="block text-sm font-medium text-graphite">
                  Slug (URL)
                  <input v-model="form.slug" type="text" class="form-input mt-2" placeholder="zhk-primer" />
                  <p class="mt-1 text-xs text-warmGray">Итоговый URL: <span class="font-semibold text-deepNavy">/projects/{{ computedSlug || 'slug-proekta' }}</span></p>
                </label>

                <div class="grid gap-3 sm:grid-cols-2">
                  <label class="block text-sm font-medium text-graphite">
                    Тип работ *
                    <input v-model="form.area" type="text" class="form-input mt-2" placeholder="Монолитные работы" required />
                  </label>
                  <label class="block text-sm font-medium text-graphite">
                    Город *
                    <input v-model="form.city" type="text" class="form-input mt-2" placeholder="Москва" required />
                  </label>
                </div>

                <label class="block text-sm font-medium text-graphite">
                  Сроки / заказчик *
                  <input v-model="form.timeline" type="text" class="form-input mt-2" placeholder="Заказчик: ... / 6 месяцев" required />
                </label>

                <label class="block text-sm font-medium text-graphite">
                  Краткое описание *
                  <textarea v-model="form.summary" class="form-area mt-2" placeholder="Короткое описание проекта" required></textarea>
                </label>

                <div class="grid gap-3 sm:grid-cols-2">
                  <label class="block text-sm font-medium text-graphite">
                    Локация
                    <input v-model="form.location" type="text" class="form-input mt-2" placeholder="Адрес или ЖК" />
                  </label>
                  <label class="block text-sm font-medium text-graphite">
                    Заказчик
                    <input v-model="form.family" type="text" class="form-input mt-2" placeholder="ГК ..." />
                  </label>
                </div>

                <label class="block text-sm font-medium text-graphite">
                  Технология
                  <input v-model="form.technology" type="text" class="form-input mt-2" placeholder="Монолитные конструкции" />
                </label>

                <label class="block text-sm font-medium text-graphite">
                  Что реализовано (по строкам)
                  <textarea
                    v-model="form.featuresInput"
                    class="form-area mt-2"
                    placeholder="Пункт 1\nПункт 2\nПункт 3"
                  ></textarea>
                </label>

                <label class="block text-sm font-medium text-graphite">
                  Этапы работ (по строкам)
                  <textarea
                    v-model="form.buildStagesInput"
                    class="form-area mt-2"
                    placeholder="Этап 1\nЭтап 2\nЭтап 3"
                  ></textarea>
                </label>

                <div class="space-y-3 rounded-xl border border-deepNavy/10 bg-fog p-4">
                  <p class="text-sm font-semibold text-deepNavy">Изображения</p>

                  <label class="block text-sm font-medium text-graphite">
                    Главное изображение *
                    <input type="file" accept="image/*" class="mt-2 block w-full text-sm text-warmGray" @change="onCoverChange" />
                  </label>

                  <label class="block text-sm font-medium text-graphite">
                    Hero-изображение (опционально)
                    <input type="file" accept="image/*" class="mt-2 block w-full text-sm text-warmGray" @change="onHeroChange" />
                  </label>

                  <label class="block text-sm font-medium text-graphite">
                    Галерея (можно несколько файлов)
                    <input type="file" accept="image/*" multiple class="mt-2 block w-full text-sm text-warmGray" @change="onGalleryChange" />
                  </label>
                </div>

                <button
                  type="submit"
                  class="inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover disabled:opacity-60"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Сохраняем проект...' : 'Создать проект' }}
                </button>

                <p v-if="submitError" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{{ submitError }}</p>
                <p v-if="submitSuccess" class="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{{ submitSuccess }}</p>
              </form>
            </RevealBlock>

            <RevealBlock class="space-y-4" :delay="90">
              <div class="card-surface overflow-hidden">
                <div class="relative bg-deepNavy p-4 text-white">
                  <img :src="previewData.heroImage" alt="Preview hero" class="absolute inset-0 h-full w-full object-cover opacity-30" />
                  <div class="relative space-y-3">
                    <p class="text-xs uppercase tracking-[0.14em] text-white/80">Hero проекта</p>
                    <h3 class="font-heading text-2xl font-extrabold leading-tight">{{ previewData.title }}</h3>
                    <p class="text-sm text-white/90">{{ previewData.summary }}</p>
                    <div class="flex flex-wrap gap-2 text-xs">
                      <span class="rounded-full bg-white/15 px-3 py-1">{{ previewData.area }}</span>
                      <span class="rounded-full bg-white/15 px-3 py-1">{{ previewData.city }}</span>
                      <span class="rounded-full bg-white/15 px-3 py-1">{{ previewData.timeline }}</span>
                    </div>
                  </div>
                </div>

                <div class="space-y-4 p-4 sm:p-5">
                  <p class="text-xs uppercase tracking-[0.14em] text-warmGray">Что реализовано</p>
                  <ul class="space-y-2 text-sm text-warmGray">
                    <li v-for="feature in previewData.features.slice(0, 4)" :key="feature" class="flex gap-2">
                      <span class="text-terracotta">●</span>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>

                  <p class="text-xs uppercase tracking-[0.14em] text-warmGray">Этапы</p>
                  <ol class="space-y-2 text-sm text-warmGray">
                    <li v-for="(stage, index) in previewData.stages.slice(0, 4)" :key="stage" class="rounded-lg bg-fog px-3 py-2">
                      Этап {{ index + 1 }}: {{ stage }}
                    </li>
                  </ol>
                </div>
              </div>

              <div class="card-surface p-4">
                <p class="text-xs uppercase tracking-[0.14em] text-warmGray">Галерея проекта</p>
                <div class="mt-3 grid grid-cols-3 gap-2">
                  <img
                    v-for="(image, index) in previewData.gallery.slice(0, 6)"
                    :key="`${image}-${index}`"
                    :src="image"
                    alt="Preview gallery"
                    class="aspect-square w-full rounded-lg object-cover"
                  />
                </div>
              </div>

              <div class="card-surface p-4">
                <p class="text-xs uppercase tracking-[0.14em] text-warmGray">Текущие проекты в базе</p>
                <ul class="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1 text-sm text-warmGray">
                  <li v-for="project in projects" :key="project.slug" class="rounded-lg bg-fog px-3 py-2">
                    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span class="font-semibold text-deepNavy">{{ project.title }}</span>
                        <span class="ml-2 text-xs">/projects/{{ project.slug }}</span>
                      </div>
                      <button
                        type="button"
                        class="inline-flex h-8 items-center justify-center rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                        :disabled="deletingSlug === project.slug"
                        @click="deleteProject(project)"
                      >
                        {{ deletingSlug === project.slug ? 'Удаляем...' : 'Удалить' }}
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealBlock>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
