import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'

// Firebase configuration for HolaAI project
const firebaseConfig = {
  apiKey: "AIzaSyDq3ZOGES18i2eWQOnIoiXk-R4pDnQcI6E",
  authDomain: "holaai-790b0.firebaseapp.com",
  projectId: "holaai-790b0",
  storageBucket: "holaai-790b0.firebasestorage.app",
  messagingSenderId: "143254988925",
  appId: "1:143254988925:web:c8530cb12c06fd23dda914",
  measurementId: "G-SXNLM51VJ9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const functions = getFunctions(app)

// Function to initiate call via Firebase Cloud Function
export const initiateCall = async (phoneNumber) => {
  try {
    const makeCall = httpsCallable(functions, 'makeOutboundCall')
    const result = await makeCall({ phoneNumber })
    return result.data
  } catch (error) {
    console.error('Error calling Firebase function:', error)
    throw error
  }
}

export { app, functions }



