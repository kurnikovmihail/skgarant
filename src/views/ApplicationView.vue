<script setup>
import { ref } from 'vue'
import RevealBlock from '../components/RevealBlock.vue'

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
  form.value = {
    name: '',
    phone: '',
    comment: '',
  }

  window.setTimeout(() => {
    isFormSent.value = false
  }, 4000)
}
</script>

<template>
  <main class="page-main">
    <section class="section-block pt-8 sm:pt-10">
      <div class="site-container">
        <RevealBlock class="relative isolate overflow-hidden rounded-3xl border border-deepNavy/15">
          <img
            src="https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Обсуждение строительного проекта"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-deepNavy/95 via-deepNavyHover/90 to-graphite/86"></div>
          <div class="absolute inset-0 bg-black/20"></div>

          <div class="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-12">
            <div class="space-y-4 rounded-2xl border border-white/20 bg-black/25 p-5 text-white backdrop-blur-[2px] sm:p-6">
              <span class="section-chip border-white/30 bg-white/10 text-white">Страница заявки</span>
              <h1 class="font-heading text-2xl font-extrabold leading-tight sm:text-3xl">Обсудим ваш проект</h1>
              <p class="text-sm leading-relaxed text-white/90 sm:text-base">
                Оставьте заявку, и мы свяжемся с вами для уточнения задач, сроков и формата сотрудничества.
              </p>
              <ul class="space-y-2 text-sm text-white/95">
                <li>✓ Первичная консультация бесплатно</li>
                <li>✓ Подготовка предложения по вашему запросу</li>
                <li>✓ Быстрая обратная связь по телефону</li>
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
                    inputmode="tel"
                    enterkeyhint="send"
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
                    placeholder="Кратко опишите объект и задачу"
                    class="form-area mt-2"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  class="inline-flex h-12 w-full items-center justify-center rounded-xl bg-deepNavy px-5 text-sm font-semibold text-white transition hover:bg-deepNavyHover"
                >
                  Отправить заявку
                </button>

                <p v-if="isFormSent" class="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Спасибо! Заявка отправлена, мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            </form>
          </div>
        </RevealBlock>
      </div>
    </section>
  </main>
</template>
