<script setup>
const props = defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  centered: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <header :class="['space-y-4', props.centered ? 'text-center' : 'text-left']">
    <span v-if="props.eyebrow" class="section-chip">{{ props.eyebrow }}</span>
    <h2 class="font-heading text-2xl font-extrabold leading-tight text-deepNavy sm:text-3xl lg:text-4xl">
      {{ props.title }}
    </h2>
    <p
      v-if="props.description"
      :class="[
        'max-w-2xl text-sm leading-relaxed text-warmGray sm:text-base',
        props.centered ? 'mx-auto' : '',
      ]"
    >
      {{ props.description }}
    </p>
  </header>
</template>
