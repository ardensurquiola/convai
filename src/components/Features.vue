<template>
  <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose HolaAI?</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Powerful features that help you convert more leads and delight customers
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="card group hover:border-primary-200 border-2 border-transparent">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Brain class="h-6 w-6 text-primary-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Natural AI Conversations</h3>
          <p class="text-gray-600">Advanced AI that understands context and responds naturally, just like a human agent.</p>
        </div>

        <div class="card group hover:border-primary-200 border-2 border-transparent">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Clock class="h-6 w-6 text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
          <p class="text-gray-600">Never miss a call again. Your AI assistant works around the clock, every day of the year.</p>
        </div>

        <div class="card group hover:border-primary-200 border-2 border-transparent">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp class="h-6 w-6 text-purple-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Boost Conversions</h3>
          <p class="text-gray-600">Respond instantly to leads and qualify prospects automatically to increase your sales.</p>
        </div>

        <div class="card group hover:border-primary-200 border-2 border-transparent">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Globe class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Multi-Language Support</h3>
          <p class="text-gray-600">Serve customers worldwide with support for 50+ languages and regional accents.</p>
        </div>

        <div class="card group hover:border-primary-200 border-2 border-transparent">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BarChart class="h-6 w-6 text-orange-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Real-Time Analytics</h3>
          <p class="text-gray-600">Track every conversation with detailed insights and performance metrics.</p>
        </div>

        <div class="card group hover:border-primary-200 border-2 border-transparent">
          <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plug class="h-6 w-6 text-pink-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Easy Integration</h3>
          <p class="text-gray-600">Connect with your CRM, calendar, and tools you already use in minutes.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Brain, Clock, TrendingUp, Globe, BarChart, Plug } from 'lucide-vue-next'
</script>
