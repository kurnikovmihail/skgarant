<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0,
  },
  as: {
    type: String,
    default: 'div',
  },
})

const rootRef = ref(null)
const isVisible = ref(false)
let observer

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.16 },
  )

  if (rootRef.value) {
    observer.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <component
    :is="props.as"
    ref="rootRef"
    :style="{ transitionDelay: `${props.delay}ms` }"
    :class="[
      'transition-all duration-700 ease-out will-change-transform',
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
    ]"
  >
    <slot />
  </component>
</template>
