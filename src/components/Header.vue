<template>
  <nav class="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center items-center h-16">
        <div class="flex items-center space-x-2">
          <Phone class="h-8 w-8 text-primary-600" :stroke-width="2.5" />
          <span class="text-2xl font-bold text-gray-900">HolaAI</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Phone } from 'lucide-vue-next'
</script>
