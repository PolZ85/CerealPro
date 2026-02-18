# CerealPro - Android Application

A professional agricultural management app for cereal crop farmers. Built with React, Capacitor, and Android Native.

![CerealPro Logo](public/logo.png)

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of farm statistics and activities
- **Weather Information**: Real-time weather data for your location
- **Activity Tracking**: Keep track of all farming activities
- **Field Management**: Manage multiple fields and crops
- **Responsive Design**: Works on all Android devices

## Screenshots

### Login Screen
Clean and modern login interface with email/password authentication.

### Dashboard
Comprehensive dashboard showing:
- Total fields count
- Active crops
- Monthly activities
- Weather information
- Recent activities

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Mobile**: Capacitor 6
- **Platform**: Android (API 24-34)

## Quick Start

### Prerequisites
- Node.js 18+
- Java JDK 17
- Android SDK
- Gradle 8.11+

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cerealpro
```

2. **Install dependencies**
```bash
npm install
```

3. **Build web assets**
```bash
npm run build
```

4. **Sync with Capacitor**
```bash
npx cap sync android
```

5. **Build APK**
```bash
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Build Options

### Option 1: Using Android Studio (Recommended)
1. Open the `android` folder in Android Studio
2. Wait for Gradle sync
3. Build → Build Bundle(s) / APK(s) → Build APK(s)

### Option 2: Using Docker
```bash
./build-with-docker.sh
```

### Option 3: Using Build Script
```bash
./build-apk.sh
```

## Play Store Submission

### 1. Generate Signing Keystore
```bash
keytool -genkey -v -keystore cerealpro.keystore -alias cerealpro -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure Signing
Edit `android/app/build.gradle` and add your keystore details.

### 3. Build Release APK
```bash
cd android
./gradlew assembleRelease
```

### 4. Upload to Play Store
- Go to [Google Play Console](https://play.google.com/console)
- Create a new app
- Upload your signed APK/AAB
- Fill in store listing details
- Publish!

## App Configuration

| Property | Value |
|----------|-------|
| Package Name | `com.cerealpro.app` |
| Version | 1.0 |
| Version Code | 1 |
| Min SDK | 24 (Android 7.0) |
| Target SDK | 34 (Android 14) |

## Project Structure

```
app/
├── android/              # Android native project
│   ├── app/              # App module
│   ├── gradle/           # Gradle wrapper
│   └── build.gradle      # Build configuration
├── src/
│   ├── pages/            # React pages
│   │   ├── Login.tsx     # Login screen
│   │   ├── Register.tsx  # Registration screen
│   │   └── Dashboard.tsx # Main dashboard
│   ├── components/       # UI components
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── dist/                 # Built web assets
├── capacitor.config.ts   # Capacitor configuration
└── package.json          # Dependencies
```

## Development

### Run in browser
```bash
npm run dev
```

### Run on Android device
```bash
npx cap run android
```

### Sync changes to Android
```bash
npm run build
npx cap sync android
```

## Customization

### Change App Name
Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appName: 'Your App Name',
  // ...
};
```

### Change Package ID
Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  // ...
};
```

### Update Icons
Replace files in `android/app/src/main/res/mipmap-*/`

## Troubleshooting

### Build Issues
- **Gradle sync fails**: Check internet connection, clear Gradle cache
- **Java version mismatch**: Ensure JAVA_HOME points to JDK 17
- **SDK not found**: Set ANDROID_SDK_ROOT environment variable

### Runtime Issues
- **App crashes**: Check logcat for errors
- **White screen**: Verify web assets are properly synced
- **Network errors**: Check internet permission in AndroidManifest.xml

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues and feature requests, please create an issue in the repository.

---

Built with ❤️ for farmers worldwide.
