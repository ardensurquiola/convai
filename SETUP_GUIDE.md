# Quick Setup Guide - ConvAI

## Step-by-Step Setup (15 minutes)

### Step 1: Install Node Packages (2 min)

```bash
npm install
cd functions && npm install && cd ..
```

### Step 2: Create Firebase Project (5 min)

1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name it (e.g., "convai-calling")
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 3: Enable Firebase Services (3 min)

In your Firebase project:

1. **Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a location (closest to your users)

2. **Cloud Functions**
   - Go to Functions tab
   - Click "Upgrade project" to Blaze plan
   - (Required for external API calls to Twilio)
   - Don't worry - you only pay for usage, free tier is generous

3. **Get Firebase Config**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click "</>" (Web) icon
   - Register app (name: "convai-web")
   - Copy the firebaseConfig object

### Step 4: Configure Firebase in Code (2 min)

Open `src/firebase.js` and replace:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

### Step 5: Setup Twilio (5 min)

1. Go to https://www.twilio.com/try-twilio
2. Sign up for free trial ($15 credit)
3. Verify your email and phone
4. Get a phone number:
   - Go to Phone Numbers → Buy a Number
   - Search for numbers with "Voice" capability
   - Purchase one (free with trial credit)

5. Get credentials:
   - Go to Console Dashboard
   - Copy your "Account SID"
   - Copy your "Auth Token"
   - Note your Twilio phone number

### Step 6: Configure Twilio in Firebase (3 min)

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init

# Select:
# - Firestore (press space to select)
# - Functions (press space to select)
# - Hosting (press space to select)
# Press Enter

# For Firestore: accept defaults (firestore.rules, firestore.indexes.json)
# For Functions: JavaScript, use existing functions folder
# For Hosting: use 'dist' as public directory, configure as SPA: Yes

# Set Twilio config
firebase functions:config:set \
  twilio.account_sid="ACxxxxxxxxxxxxxxxxxxxx" \
  twilio.auth_token="your_auth_token_here" \
  twilio.phone_number="+1234567890"
```

### Step 7: Test Locally (2 min)

```bash
# Start development server
npm run dev
```

Open http://localhost:3000 and you should see your landing page!

### Step 8: Deploy to Production (3 min)

```bash
# Build the app
npm run build

# Deploy everything
firebase deploy

# Your app will be live at:
# https://your-project-id.web.app
```

## 🎉 You're Done!

Your landing page is now live! Users can enter their phone number and receive an AI demo call.

## Testing Your Demo Call

1. Open your deployed site
2. Enter your phone number
3. Click "Call Me Now"
4. Wait 3-5 seconds
5. Answer your phone and hear the AI demo!

## Next Steps

### Customize the AI Script

Edit `functions/index.js` line 38-52 to change what the AI says:

```javascript
twiml: `
  <Response>
    <Say voice="alice" language="en-US">
      Your custom message here!
    </Say>
  </Response>
`
```

Available voices: alice, man, woman, Polly.* (AWS Polly voices)

### Add More Intelligence

Integrate with:
- OpenAI GPT-4 for dynamic conversations
- Google Dialogflow for intent detection
- Twilio Autopilot for conversation flows

### Monitor Calls

View call logs in Firebase Console:
1. Go to Firestore Database
2. Check the "calls" collection
3. See all demo calls with timestamps

## Troubleshooting

**Problem**: Calls not working
- Solution: Check Firebase Functions logs: `firebase functions:log`
- Verify Twilio config: `firebase functions:config:get`

**Problem**: "Insufficient permissions"
- Solution: Make sure you're on Firebase Blaze plan

**Problem**: Phone number validation failing
- Solution: Try with country code (e.g., +1 555-123-4567)

## Cost Estimate

- Firebase Hosting: Free (up to 10GB/month)
- Firebase Functions: Free tier covers ~2M calls/month
- Firestore: Free tier covers 50K reads/day
- Twilio: $0.013/minute for calls ($15 free trial credit)

For 100 demo calls/month (1 min each): ~$1.30/month

## Domain Registration

Register your domain at:
- Namecheap.com - Best for .com domains ($8-12/year)
- Google Domains - Easy Firebase integration
- Spaceship.com - Best for .ai domains ($69/year)

Connect to Firebase:
1. Go to Hosting settings
2. Click "Add custom domain"
3. Follow DNS setup instructions

---

Need help? Check the main README.md or open an issue on GitHub!



