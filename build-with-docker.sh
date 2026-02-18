#!/bin/bash

# Build CerealPro APK using Docker
# This script builds the Android APK using a Docker container

set -e

echo "=========================================="
echo "  CerealPro Docker APK Builder"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

echo -e "${GREEN}✓ Docker found${NC}"
echo ""

# Create output directory
mkdir -p output

# Build Docker image
echo "Building Docker image..."
docker build -t cerealpro-builder . 2>&1

echo ""
echo -e "${GREEN}✓ Docker image built${NC}"
echo ""

# Run container to extract APK
echo "Extracting APK..."
docker run --rm -v "$(pwd)/output:/output" cerealpro-builder

echo ""
echo "=========================================="
echo -e "${GREEN}  Build Complete!${NC}"
echo "=========================================="
echo ""
echo "APK Location: ./output/CerealPro-debug.apk"
echo ""
echo "To install on your device:"
echo "  adb install output/CerealPro-debug.apk"
echo ""
echo "To build release version:"
echo "  1. Edit android/app/build.gradle"
echo "  2. Configure signing config"
echo "  3. Run: cd android && ./gradlew assembleRelease"
