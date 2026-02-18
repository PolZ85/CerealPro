# CerealPro Android App - Build Instructions

## Overview
This is a complete Android application built with React + Capacitor, ready to be compiled into an APK for Google Play Store submission.

## Project Structure
```
app/
├── android/          # Android native project
├── src/              # React source code
├── dist/             # Built web assets
├── capacitor.config.ts
└── package.json
```

## Prerequisites
- Node.js 18+ 
- Java JDK 17
- Android SDK (API 34)
- Gradle 8.11.1

## Quick Build

### Option 1: Using Android Studio (Recommended)
1. Open the `android` folder in Android Studio
2. Let Gradle sync complete
3. Go to Build → Build Bundle(s) / APK(s) → Build APK(s)
4. The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 2: Using Command Line
```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 3: Build Release APK (for Play Store)
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Play Store Submission

### 1. Generate Signing Keystore
```bash
keytool -genkey -v -keystore cerealpro.keystore -alias cerealpro -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure Signing
Edit `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            keyAlias 'cerealpro'
            keyPassword 'your-key-password'
            storeFile file('cerealpro.keystore')
            storePassword 'your-store-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 3. Build Signed Release APK
```bash
cd android
./gradlew assembleRelease
```

Signed APK location: `android/app/build/outputs/apk/release/app-release.apk`

## App Configuration

### App ID
- Package: `com.cerealpro.app`
- Version: 1.0
- Version Code: 1

### Permissions
- INTERNET
- ACCESS_NETWORK_STATE

### Features
- Login/Register with local storage
- Dashboard with farm statistics
- Weather display
- Activity tracking
- Responsive design

## Web Assets Update
If you modify the React code:
```bash
npm run build
npx cap sync android
```

Then rebuild the APK.

## Troubleshooting

### Gradle Sync Issues
1. File → Invalidate Caches / Restart
2. Check internet connection for first sync

### Build Errors
1. Ensure JAVA_HOME is set to JDK 17
2. Check Android SDK path in local.properties

### App Crashes
1. Check logcat for errors
2. Verify all permissions in AndroidManifest.xml
