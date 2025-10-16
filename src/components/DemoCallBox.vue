<template>
  <div class="bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6 max-w-md mx-auto border border-gray-700">
    <!-- Greeting with gradient text -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
        Hello, there!
      </h1>
      <p class="text-xl text-white font-medium">What do you want to experience?</p>
    </div>

    <!-- Demo Call Section -->
    <div class="space-y-6">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-white mb-2">Try our AI voice assistant</h3>
        <p class="text-gray-400 text-sm">Enter your number and experience AI magic in seconds</p>
      </div>

      <form @submit.prevent="handleCallRequest" class="space-y-4">
        <div>
           <input
             v-model="phoneNumber"
             type="tel"
             placeholder="Enter your phone number"
             class="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400 text-lg"
             @input="onPhoneInput"
           />
          <p v-if="!isValidPhone && phoneNumber" class="mt-2 text-sm text-red-400">
            Please enter a valid phone number
          </p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading || !isValidPhone"
          class="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <PhoneCall v-if="!isLoading" class="h-5 w-5" />
          <Loader v-else class="h-5 w-5 animate-spin" />
          <span>{{ isLoading ? 'Calling...' : 'Call Me Now' }}</span>
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="callSuccess" class="bg-green-900/50 border border-green-600 rounded-lg p-4 flex items-center space-x-3">
        <CheckCircle class="h-6 w-6 text-green-400" />
        <p class="text-green-300 font-medium">Great! You'll receive a call shortly. Get ready for your aha moment! 🎉</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-900/50 border border-red-600 rounded-lg p-4 flex items-center space-x-3">
        <AlertCircle class="h-6 w-6 text-red-400" />
        <p class="text-red-300 font-medium">{{ errorMessage }}</p>
      </div>

      <p class="text-xs text-gray-500 text-center">
        By requesting a call, you agree to receive a demo call from HolaAI. Standard rates may apply.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  PhoneCall, Zap, CheckCircle, AlertCircle, Loader
} from 'lucide-vue-next'
import { initiateCall } from '../firebase'

const phoneNumber = ref('')
const isValidPhone = ref(false)
const isLoading = ref(false)
const callSuccess = ref(false)
const errorMessage = ref('')

const onPhoneInput = () => {
  // Simple phone validation - at least 10 digits
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  isValidPhone.value = phoneRegex.test(phoneNumber.value.replace(/\s/g, '')) && phoneNumber.value.length >= 10
}

const handleCallRequest = async () => {
  if (!isValidPhone.value) return
  
  isLoading.value = true
  callSuccess.value = false
  errorMessage.value = ''

  try {
    // Call Firebase function to initiate the call via Twilio
    await initiateCall(phoneNumber.value)
    callSuccess.value = true
    
    // Reset form after 5 seconds
    setTimeout(() => {
      callSuccess.value = false
      phoneNumber.value = ''
    }, 5000)
  } catch (error) {
    console.error('Error initiating call:', error)
    errorMessage.value = 'Unable to initiate call. Please try again later.'
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  } finally {
    isLoading.value = false
  }
}
</script>
