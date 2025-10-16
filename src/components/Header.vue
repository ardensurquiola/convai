<template>
  <nav class="fixed w-full bg-gray-900/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center items-center h-16">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Phone class="h-5 w-5 text-white" :stroke-width="2.5" />
          </div>
          <span class="text-2xl font-bold text-white">HolaAI</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Phone } from 'lucide-vue-next'
</script>
