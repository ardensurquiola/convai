<template>
  <div class="min-h-screen gradient-bg">
    <!-- Header -->
    <Header />

    <!-- Main Content - Centered Demo Box -->
    <main class="flex items-center justify-center min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <DemoCallBox />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import DemoCallBox from './components/DemoCallBox.vue'
</script>



