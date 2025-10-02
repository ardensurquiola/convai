const functions = require('firebase-functions')
const admin = require('firebase-admin')
const twilio = require('twilio')

admin.initializeApp()

// Twilio credentials - Set these in Firebase Functions config
// Run: firebase functions:config:set twilio.account_sid="YOUR_ACCOUNT_SID" twilio.auth_token="YOUR_AUTH_TOKEN" twilio.phone_number="YOUR_TWILIO_NUMBER"
const accountSid = functions.config().twilio?.account_sid || process.env.TWILIO_ACCOUNT_SID
const authToken = functions.config().twilio?.auth_token || process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = functions.config().twilio?.phone_number || process.env.TWILIO_PHONE_NUMBER

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
    // Make the call using Twilio
    const call = await client.calls.create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      // TwiML URL that will handle the call
      // You can host this on Firebase Hosting or use Twilio's TwiML bins
      url: 'https://your-firebase-app.web.app/twiml/demo-greeting',
      // Alternative: Use inline TwiML
      twiml: `
        <Response>
          <Say voice="alice" language="en-US">
            Hello! Thanks for trying ConvAI, your A I powered voice assistant. 
            This is a demo call to show you how our technology works. 
            With ConvAI, you can handle customer calls automatically, 24/7. 
            Our A I can answer questions, schedule appointments, qualify leads, and much more. 
            Imagine never missing an important customer call again! 
            If you'd like to learn more, visit our website to get started. 
            Thank you for your time, and have a great day!
          </Say>
          <Pause length="1"/>
          <Say voice="alice" language="en-US">
            Goodbye!
          </Say>
        </Response>
      `
    })

    // Log the call in Firestore
    await admin.firestore().collection('calls').add({
      phoneNumber,
      callSid: call.sid,
      status: call.status,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })

    return {
      success: true,
      callSid: call.sid,
      message: 'Call initiated successfully'
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
 * Handle speech input from user
 */
exports.handleSpeech = functions.https.onRequest(async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse()
  const speechResult = req.body.SpeechResult

  console.log('User said:', speechResult)

  // Here you would integrate with your AI/NLP service
  // For demo purposes, we'll just echo back
  twiml.say(
    {
      voice: 'alice',
      language: 'en-US'
    },
    `I heard you say: ${speechResult}. This is where our A I would process your request and provide a helpful response. Thank you for trying ConvAI!`
  )

  res.type('text/xml')
  res.send(twiml.toString())
})



