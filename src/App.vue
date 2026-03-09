<script setup>
import { RouterView } from 'vue-router'
import MobileCtaBar from './components/MobileCtaBar.vue'
import TheFooter from './components/TheFooter.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="relative overflow-x-clip bg-milk">
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute -left-32 top-24 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl"></div>
      <div class="absolute -right-20 top-80 h-80 w-80 rounded-full bg-deepNavy/10 blur-3xl"></div>
      <div class="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-white blur-3xl"></div>
    </div>

    <TheHeader />
    <RouterView />
    <TheFooter />
    <MobileCtaBar />
  </div>
</template>
