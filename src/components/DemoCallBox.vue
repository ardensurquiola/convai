<template>
  <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6 max-w-md mx-auto">
    <div class="flex items-center space-x-3">
      <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
        <Zap class="h-6 w-6 text-primary-600" />
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-900">Try It Now - Free Demo Call!</h3>
        <p class="text-gray-600">Enter your number and experience AI magic in seconds</p>
      </div>
    </div>

    <form @submit.prevent="handleCallRequest" class="space-y-4">
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          Your Phone Number
        </label>
        <vue-tel-input
          v-model="phoneNumber"
          mode="international"
          :inputOptions="{
            placeholder: 'Enter your phone number',
            styleClasses: 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg'
          }"
          @validate="onPhoneValidate"
        ></vue-tel-input>
        <p v-if="!isValidPhone && phoneNumber" class="mt-2 text-sm text-red-600">
          Please enter a valid phone number
        </p>
      </div>

      <button 
        type="submit" 
        :disabled="isLoading || !isValidPhone"
        class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <PhoneCall v-if="!isLoading" class="h-5 w-5" />
        <Loader v-else class="h-5 w-5 animate-spin" />
        <span>{{ isLoading ? 'Calling...' : 'Call Me Now' }}</span>
      </button>
    </form>

    <!-- Success Message -->
    <div v-if="callSuccess" class="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center space-x-3">
      <CheckCircle class="h-6 w-6 text-green-600" />
      <p class="text-green-800 font-medium">Great! You'll receive a call shortly. Get ready for your aha moment! 🎉</p>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center space-x-3">
      <AlertCircle class="h-6 w-6 text-red-600" />
      <p class="text-red-800 font-medium">{{ errorMessage }}</p>
    </div>

    <p class="text-xs text-gray-500 text-center">
      By requesting a call, you agree to receive a demo call from HolaAI. Standard rates may apply.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { 
  PhoneCall, Zap, CheckCircle, AlertCircle, Loader
} from 'lucide-vue-next'
import { initiateCall } from '../firebase'

const phoneNumber = ref('')
const isValidPhone = ref(false)
const isLoading = ref(false)
const callSuccess = ref(false)
const errorMessage = ref('')

const onPhoneValidate = (validation) => {
  isValidPhone.value = validation.valid
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
