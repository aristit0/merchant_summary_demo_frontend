#!/bin/bash

# 🎨 Merchant Dashboard - Quick Setup Script for MacBook
# This script automates the entire setup process

set -e  # Exit on error

echo "=========================================="
echo "🎨 Merchant Dashboard Setup"
echo "=========================================="
echo ""

# Check Node.js installation
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "  brew install node"
    echo ""
    echo "Or download from: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js installed: $NODE_VERSION"
echo ""

# Check npm installation
echo "📦 Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm installed: $NPM_VERSION"
echo ""

# Navigate to frontend directory
if [ ! -d "frontend" ]; then
    echo "❌ frontend directory not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

cd frontend

# Install dependencies
echo "=========================================="
echo "📥 Installing dependencies..."
echo "=========================================="
echo ""

npm install

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "🚀 To start the development server:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "📱 The app will open at: http://localhost:3000"
echo ""
echo "⚠️  Make sure the backend is running first:"
echo "   go run main.go"
echo ""
echo "=========================================="
echo "🎉 Happy coding!"
echo "=========================================="
