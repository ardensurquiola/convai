# ConvAI - AI Voice Calling Platform

A modern AI-powered voice calling platform for banking transaction verification. I calls customers to validate identity in case of a banking alert.

## 🚀 Features

- **Beautiful Landing Page** - Modern, responsive design with smooth animations
- **Phone Number Input** - International phone number validation with country selection
- **Instant Demo Calls** - Users can request a demo call immediately
- **AI-Powered Conversations** - Integration ready for Twilio Conversational AI
- **Firebase Backend** - Serverless functions and real-time database
- **Real-time Analytics** - Track calls and user interactions

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (free tier is fine)
- Twilio account with a phone number

## 🛠️ Installation

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Cloud Functions (Blaze plan required for external API calls)
5. Get your Firebase config from Project Settings

### 3. Configure Environment Variables

Update `src/firebase.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 4. Twilio Setup

1. Sign up at [Twilio](https://www.twilio.com/)
2. Get a phone number with voice capabilities
3. Get your Account SID and Auth Token from the Twilio Console

### 5. Configure Firebase Functions

Set Twilio credentials in Firebase Functions:

```bash
firebase functions:config:set \
  twilio.account_sid="YOUR_ACCOUNT_SID" \
  twilio.auth_token="YOUR_AUTH_TOKEN" \
  twilio.phone_number="YOUR_TWILIO_PHONE_NUMBER"
```

### 6. Initialize Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Select:
# - Functions
# - Firestore
# - Hosting
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Deployment

### Deploy to Firebase Hosting

```bash
# Build the frontend
npm run build

# Deploy everything
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore
```

## 🌐 Recommended Domain Names

Based on current availability and pricing (as of October 2025):

### Budget-Friendly Options ($10-15/year):
1. **callwithAI.com** - Direct and descriptive
2. **voiceAIhub.com** - Professional sounding
3. **smartcallAI.com** - Emphasizes intelligence
4. **aicallagent.com** - Clear purpose
5. **talktoAI.io** - Modern and tech-focused
6. **convai.app** - Short and memorable (.app domain)
7. **aivoicemate.com** - Friendly and approachable

### Premium .AI Domains ($69+/year):
1. **call.ai** - Short and premium (if available)
2. **voice.ai** - Direct and valuable
3. **conv.ai** - Matches your project name
4. **talk.ai** - Simple and effective

### Creative Alternatives:
1. **callgenius.io** - Highlights intelligence
2. **voicifyAI.com** - Modern branding
3. **dialAI.com** - Action-oriented
4. **phonegpt.com** - Leverages GPT recognition
5. **callassist.ai** - Clear service description

## 🔧 Customization

### Modify AI Voice Script

Edit the TwiML in `functions/index.js`:

```javascript
twiml: `
  <Response>
    <Say voice="alice" language="en-US">
      Your custom greeting here...
    </Say>
  </Response>
`
```

### Change Color Scheme

Update `tailwind.config.js` primary colors:

```javascript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

### Add More Features

The codebase is ready for:
- User authentication (Firebase Auth)
- Call history dashboard
- Custom AI training
- CRM integrations
- Payment processing (Stripe)

## 📱 Twilio Conversational AI Integration

To integrate advanced AI capabilities:

1. Enable Twilio Autopilot or use GPT-4 via OpenAI API
2. Update the `handleSpeech` function in `functions/index.js`
3. Add natural language processing for intent detection
4. Implement context-aware responses

## 🔐 Security Notes

- Never commit `.env` files or API keys
- Use Firebase Security Rules (already configured)
- Enable CORS properly for production
- Validate all phone numbers server-side
- Implement rate limiting for the call function

## 📊 Analytics & Monitoring

All calls are logged to Firestore in the `calls` collection with:
- Phone number
- Call SID (Twilio identifier)
- Status
- Timestamp

You can query these for analytics and reporting.

## 🆘 Troubleshooting

### Calls not working?
- Check Twilio credentials in Firebase config
- Verify phone number has voice capabilities
- Check Firebase Functions logs: `firebase functions:log`

### Build errors?
- Clear node_modules and reinstall
- Check Node version (needs v18+)

### Firebase deployment issues?
- Ensure you're on Blaze plan for Cloud Functions
- Check Firebase quota limits

## 📄 License

MIT License - feel free to use for commercial projects

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

**Quick Start Guide**: See `SETUP_GUIDE.md` for detailed step-by-step instructions!

Built with ❤️ using Vue.js, Tailwind CSS, Firebase, and Twilio
