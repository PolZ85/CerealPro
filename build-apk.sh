#!/bin/bash

# CerealPro APK Build Script
# This script builds the Android APK for CerealPro

set -e

echo "=========================================="
echo "  CerealPro Android APK Builder"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."
    
    # Check Java
    if ! command -v java &> /dev/null; then
        echo -e "${RED}Error: Java is not installed${NC}"
        exit 1
    fi
    
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    echo -e "${GREEN}✓ Java version: $JAVA_VERSION${NC}"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed${NC}"
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js version: $NODE_VERSION${NC}"
    
    echo ""
}

# Build web assets
build_web() {
    echo "Building web assets..."
    npm install
    npm run build
    echo -e "${GREEN}✓ Web assets built${NC}"
    echo ""
}

# Sync with Capacitor
sync_capacitor() {
    echo "Syncing with Capacitor..."
    npx cap sync android
    echo -e "${GREEN}✓ Capacitor sync complete${NC}"
    echo ""
}

# Build APK
build_apk() {
    echo "Building Android APK..."
    cd android
    
    # Make gradlew executable
    chmod +x gradlew
    
    # Build debug APK
    ./gradlew assembleDebug
    
    echo -e "${GREEN}✓ APK built successfully!${NC}"
    echo ""
}

# Show results
show_results() {
    APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
    
    if [ -f "$APK_PATH" ]; then
        echo -e "${GREEN}==========================================${NC}"
        echo -e "${GREEN}  Build Successful!${NC}"
        echo -e "${GREEN}==========================================${NC}"
        echo ""
        echo "APK Location: $APK_PATH"
        echo "APK Size: $(du -h "$APK_PATH" | cut -f1)"
        echo ""
        echo "To install on device:"
        echo "  adb install $APK_PATH"
        echo ""
        echo "To build release version:"
        echo "  cd android && ./gradlew assembleRelease"
    else
        echo -e "${RED}Error: APK not found${NC}"
        exit 1
    fi
}

# Main execution
main() {
    check_prerequisites
    build_web
    sync_capacitor
    build_apk
    show_results
}

# Run main function
main
