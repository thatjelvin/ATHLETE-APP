# 📱 Apex Athletic Training App - Review Guide

This guide will help you run, test, and review the Apex Athletic Training App before Play Store deployment.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Running the App](#running-the-app)
4. [Testing on Physical Device](#testing-on-physical-device)
5. [App Features to Review](#app-features-to-review)
6. [Building for Production](#building-for-production)
7. [Play Store Deployment Checklist](#play-store-deployment-checklist)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

```bash
# Navigate to the app directory
cd Apex/app

# Install dependencies
npm install

# Start the development server
npm start

# Or run directly on a specific platform
npm run android  # For Android
npm run ios      # For iOS (Mac only)
npm run web      # For web browser
```

---

## 📝 Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   # Check your version
   node --version
   ```

2. **npm** or **yarn**
   ```bash
   npm --version
   ```

3. **Expo CLI** (installed automatically via npx, but can be installed globally)
   ```bash
   npm install -g expo-cli
   ```

4. **Expo Go App** (for testing on physical device)
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

### For Building Native Apps

5. **EAS CLI** (for building production apps)
   ```bash
   npm install -g eas-cli
   ```

6. **Android Studio** (for Android emulator and local builds)
   - Download from [developer.android.com](https://developer.android.com/studio)

7. **Xcode** (for iOS - Mac only)
   - Available on Mac App Store

---

## 🏃 Running the App

### Option 1: Using Expo Go (Fastest - Recommended for Review)

1. Install Expo Go on your phone (Android or iOS)

2. Start the development server:
   ```bash
   cd Apex/app
   npm install
   npm start
   ```

3. Scan the QR code with:
   - **Android**: Expo Go app's QR scanner
   - **iOS**: Camera app (it will open Expo Go automatically)

4. The app will load on your phone!

### Option 2: Android Emulator

1. Open Android Studio and start an Android Virtual Device (AVD)

2. Run the app:
   ```bash
   npm run android
   ```

### Option 3: iOS Simulator (Mac Only)

```bash
npm run ios
```

### Option 4: Web Browser

```bash
npm run web
```
Note: Some features may look different on web.

---

## 📱 Testing on Physical Device

### Using Expo Go (Development)

This is the easiest way to test the app:

1. Download Expo Go from your app store
2. Run `npm start` in the app directory
3. Scan the QR code
4. Test all features in real-time

### Creating a Test APK (Android)

For a more realistic testing experience without Play Store:

```bash
# Login to Expo (create free account at expo.dev if needed)
eas login

# Build a development APK
eas build --platform android --profile preview
```

After the build completes (5-10 minutes), you'll get a download link for the APK.

### Creating a Test Build (iOS)

```bash
# Build for iOS (requires Apple Developer account for device testing)
eas build --platform ios --profile preview
```

---

## ✅ App Features to Review

### 1. Onboarding Flow
- [ ] Welcome screen displays correctly
- [ ] Goal selection works (multi-select)
- [ ] Sport selection (optional skip works)
- [ ] Experience level selection
- [ ] Equipment selection
- [ ] Days per week selector
- [ ] Injury flags selection
- [ ] Completion screen summary
- [ ] "Start Training" navigates to main app

### 2. Train Tab
- [ ] Weekly planner shows 7 days
- [ ] Today is highlighted
- [ ] Rest days show correctly
- [ ] Workout cards display properly
- [ ] Can tap days to see different workouts

### 3. Programs Tab
- [ ] All 3 programs display:
  - Speed Foundations (6 weeks, Beginner)
  - Vertical Jump Builder (8 weeks, Intermediate)
  - Explosive Athlete (4 weeks, Intermediate)
- [ ] Program cards show level, duration, sessions
- [ ] Can tap to view program details
- [ ] Can enroll in a program
- [ ] "Active" badge shows on enrolled program

### 4. Workout Session
- [ ] Preview screen shows exercises list
- [ ] Start button begins workout
- [ ] Exercise displays with sets/reps
- [ ] Form cues are visible
- [ ] "Done" advances to rest timer
- [ ] Rest timer counts down
- [ ] Skip rest works
- [ ] Skip exercise works
- [ ] Final feedback screen appears
- [ ] Difficulty picker works (Easy/Good/Hard)
- [ ] Completion celebration shows

### 5. Progress Tab
- [ ] Weekly progress ring displays
- [ ] Streak counter works
- [ ] Total sessions count
- [ ] Program progress (if enrolled)
- [ ] Difficulty distribution chart
- [ ] Recent activity list

### 6. Profile Tab
- [ ] Profile summary displays
- [ ] Athletic profile shows goals/sport/level
- [ ] Settings menu items display
- [ ] Reset profile confirmation works
- [ ] App version displays

### 7. Navigation
- [ ] Bottom tabs work correctly
- [ ] Back navigation works
- [ ] Modal screens (workout session) work
- [ ] Smooth transitions

### 8. UI/UX
- [ ] Dark theme consistent throughout
- [ ] Text is readable
- [ ] Touch targets are large enough
- [ ] Loading states work
- [ ] Error states handled gracefully

---

## 🏗️ Building for Production

### Setup EAS (First Time Only)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure the project (one-time setup)
eas build:configure
```

### Build for Android Play Store

```bash
# Build Android App Bundle (AAB) for Play Store
eas build --platform android --profile production
```

This creates an `.aab` file which you upload to Play Store.

### Build for iOS App Store

```bash
# Build for iOS App Store
eas build --platform ios --profile production
```

---

## 📋 Play Store Deployment Checklist

### Before Submission

#### Required Assets
- [ ] App icon (512x512 PNG)
- [ ] Feature graphic (1024x500 PNG)
- [ ] Screenshots (minimum 2, recommended 8)
  - Phone screenshots
  - Tablet screenshots (if supporting tablets)
- [ ] Short description (80 characters max)
- [ ] Full description (4000 characters max)

#### Required Documents
- [ ] Privacy Policy (hosted URL)
- [ ] Terms of Service (optional but recommended)

#### App Configuration
- [ ] Update `app.json` with your own:
  - `expo.android.package` - unique package name
  - `expo.ios.bundleIdentifier` - unique bundle ID
- [ ] Update `eas.json` with your credentials
- [ ] Create Google Play Console account ($25 one-time)
- [ ] Create Apple Developer account ($99/year for iOS)

### Play Store Listing

1. **Go to Google Play Console**: https://play.google.com/console

2. **Create new app**:
   - App name: "Apex Athletic"
   - Default language: English
   - App or game: App
   - Free or paid: Free (or Paid)

3. **Complete store listing**:
   - Title
   - Short description
   - Full description
   - Screenshots
   - Feature graphic
   - App icon

4. **Content rating questionnaire**

5. **Target audience and content**

6. **Privacy policy** (required)

7. **Upload AAB file** from EAS build

8. **Review and publish**

### Post-Launch

- [ ] Monitor crash reports
- [ ] Respond to reviews
- [ ] Plan update schedule
- [ ] Track downloads and engagement

---

## 🔧 Troubleshooting

### Common Issues

#### "npm install" fails
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules
npm install
```

#### Expo Go can't connect
- Ensure your phone and computer are on the same WiFi network
- Try using tunnel mode:
  ```bash
  npx expo start --tunnel
  ```

#### Build fails on EAS
- Check that all dependencies are compatible
- View build logs on expo.dev
- Ensure app.json is properly configured

#### Android emulator won't start
- Ensure Android Studio is properly installed
- Create a new AVD (Android Virtual Device)
- Increase emulator memory in AVD settings

#### iOS build issues
- Ensure Xcode is up to date
- Run `pod install` in the ios folder (if using bare workflow)

### Getting Help

- **Expo Documentation**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org/docs
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **GitHub Issues**: Report issues in this repository

---

## 📂 Project Structure Overview

```
Apex/app/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── package.json           # Dependencies
├── src/
│   ├── components/        # Reusable UI components
│   ├── constants/         # Theme, config constants
│   ├── models/            # TypeScript types
│   ├── navigation/        # Navigation setup
│   ├── screens/           # App screens
│   │   ├── onboarding/   # Onboarding flow
│   │   ├── train/        # Train tab screens
│   │   ├── programs/     # Programs tab screens
│   │   ├── progress/     # Progress tab screen
│   │   └── profile/      # Profile tab screen
│   └── store/            # Zustand state management
├── seed-data/            # Sample training data
└── assets/               # Images, fonts, icons
```

---

## 🎯 Next Steps After Review

1. **Customize branding**: Update colors, logo, and app name
2. **Add your own content**: Create more training programs
3. **Implement backend**: Connect to a real API (optional)
4. **Add authentication**: Implement user accounts
5. **Add notifications**: Reminder notifications for workouts
6. **Submit to stores**: Follow the deployment checklist

---

**Happy Testing! 🏃‍♂️💪**

If you have questions or find issues, please open a GitHub issue or contact the development team.
