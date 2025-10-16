const functions = require('firebase-functions')
const admin = require('firebase-admin')
const twilio = require('twilio')

admin.initializeApp()

// Twilio credentials - Set these in Firebase Functions config
// Run: firebase functions:config:set twilio.account_sid="YOUR_ACCOUNT_SID" twilio.auth_token="YOUR_AUTH_TOKEN" twilio.phone_number="YOUR_TWILIO_NUMBER"
const accountSid = functions.config().twilio?.account_sid || process.env.TWILIO_ACCOUNT_SID
const authToken = functions.config().twilio?.auth_token || process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = functions.config().twilio?.phone_number || process.env.TWILIO_PHONE_NUMBER

// Your Heroku WebSocket URL
const WEBSOCKET_URL = 'wss://convai-websocket-15efd4906704.herokuapp.com/websocket'

// Initialize Twilio client only if credentials are available
let client = null
if (accountSid && authToken) {
  client = twilio(accountSid, authToken)
}

/**
 * Cloud Function to make an outbound call using Twilio
 */
exports.makeOutboundCall = functions.https.onCall(async (data, context) => {
  const { phoneNumber } = data

  if (!phoneNumber) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Phone number is required'
    )
  }

  // Check if Twilio is configured
  if (!client) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Twilio credentials not configured. Please set up Twilio account and configure credentials.'
    )
  }

  try {
    // Make the call using Twilio with ConversationRelay
    const call = await client.calls.create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      twiml: `
        <Response>
          <Connect>
            <ConversationRelay 
              url="${WEBSOCKET_URL}"
              welcomeGreeting="Buenos días. Soy el asistente de seguridad de su banco."
            />
          </Connect>
        </Response>
      `,
      record: true, // Enable recording for Conversational Intelligence
      recordingStatusCallback: 'https://us-central1-holaai-790b0.cloudfunctions.net/handleRecordingCallback'
    })

    // Log the call in Firestore
    await admin.firestore().collection('calls').add({
      phoneNumber,
      callSid: call.sid,
      status: call.status,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      websocketUrl: WEBSOCKET_URL
    })

    return {
      success: true,
      callSid: call.sid,
      message: 'AI call initiated successfully'
    }
  } catch (error) {
    console.error('Error making call:', error)
    throw new functions.https.HttpsError(
      'internal',
      'Failed to initiate call',
      error.message
    )
  }
})

/**
 * HTTP endpoint to handle incoming calls (optional)
 */
exports.handleIncomingCall = functions.https.onRequest((req, res) => {
  const twiml = new twilio.twiml.VoiceResponse()

  twiml.say(
    {
      voice: 'alice',
      language: 'en-US'
    },
    'Hello! Thank you for calling ConvAI. How can I help you today?'
  )

  // Gather user input
  const gather = twiml.gather({
    input: 'speech',
    action: '/handle-speech',
    method: 'POST',
    speechTimeout: 'auto',
    language: 'en-US'
  })

  gather.say(
    'Please tell me what you need help with, and I will assist you.'
  )

  res.type('text/xml')
  res.send(twiml.toString())
})

/**
 * Handle recording callbacks for Conversational Intelligence
 */
exports.handleRecordingCallback = functions.https.onRequest((req, res) => {
  const { CallSid, RecordingUrl, RecordingStatus } = req.body
  
  console.log('Recording callback:', {
    CallSid,
    RecordingUrl,
    RecordingStatus
  })
  
  // Store recording info in Firestore
  admin.firestore().collection('recordings').add({
    callSid: CallSid,
    recordingUrl: RecordingUrl,
    status: RecordingStatus,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  })
  
  res.status(200).send('OK')
})



