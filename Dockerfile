# Dockerfile for building CerealPro Android APK
# Usage: docker build -t cerealpro-builder . && docker run -v $(pwd)/output:/output cerealpro-builder

FROM openjdk:17-jdk-slim

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Android SDK
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools

RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    cd ${ANDROID_SDK_ROOT}/cmdline-tools && \
    curl -o cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && \
    unzip cmdline-tools.zip && \
    rm cmdline-tools.zip && \
    mv cmdline-tools latest

# Accept licenses and install required SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build
RUN npx cap sync android

# Build APK
WORKDIR /app/android
RUN chmod +x gradlew
RUN ./gradlew assembleDebug

# Copy APK to output directory
RUN mkdir -p /output && \
    cp app/build/outputs/apk/debug/app-debug.apk /output/CerealPro-debug.apk

CMD ["cp", "app/build/outputs/apk/debug/app-debug.apk", "/output/CerealPro-debug.apk"]
