<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'
import { useAdminAuth } from '../composables/useAdminAuth'

const route = useRoute()
const router = useRouter()
const { checkSession, isCheckingSession, login } = useAdminAuth()

const form = ref({
  username: 'admin',
  password: '',
})
const errorMessage = ref('')
const isSubmitting = ref(false)

onMounted(async () => {
  const authenticated = await checkSession()
  if (authenticated) {
    const redirectTo = route.query.redirect?.toString() || '/admin/projects/new'
    router.replace(redirectTo)
  }
})

const submit = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await login(form.value.username.trim(), form.value.password)
    const redirectTo = route.query.redirect?.toString() || '/admin/projects/new'
    await router.replace(redirectTo)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Ошибка авторизации'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="pb-24 pt-24 md:pb-0 md:pt-28">
    <section class="section-block pt-8 sm:pt-10">
      <div class="site-container max-w-xl">
        <RevealBlock class="card-surface p-6 sm:p-8">
          <h1 class="font-heading text-2xl font-extrabold text-deepNavy sm:text-3xl">Вход в админ-панель</h1>
          <p class="mt-2 text-sm text-warmGray">Только для сотрудников компании с доступом к управлению проектами.</p>

          <p v-if="isCheckingSession" class="mt-4 text-sm text-warmGray">Проверяем сессию...</p>

          <form class="mt-5 space-y-4" @submit.prevent="submit">
            <label class="block text-sm font-medium text-graphite">
              Логин
              <input v-model="form.username" type="text" class="form-input mt-2" autocomplete="username" required />
            </label>

            <label class="block text-sm font-medium text-graphite">
              Пароль
              <input v-model="form.password" type="password" class="form-input mt-2" autocomplete="current-password" required />
            </label>

            <button
              type="submit"
              class="inline-flex h-11 w-full items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover disabled:opacity-60"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Входим...' : 'Войти' }}
            </button>

            <p v-if="errorMessage" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{{ errorMessage }}</p>
          </form>

          <div class="mt-6 border-t border-fog pt-4 text-xs text-warmGray">
            <p>
              После входа доступна форма создания проекта с визуальной структурой, соответствующей странице кейса.
            </p>
            <RouterLink to="/projects" class="mt-2 inline-flex text-deepNavy hover:text-deepNavyHover">Вернуться к проектам</RouterLink>
          </div>
        </RevealBlock>
      </div>
    </section>
  </main>
</template>
