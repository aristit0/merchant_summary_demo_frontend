#!/bin/bash

# 🔧 Complete Fix for Tailwind CSS Build Error
# This script will completely fix the Tailwind CSS issue

set -e

echo "=========================================="
echo "🔧 Fixing Tailwind CSS Build Error"
echo "=========================================="
echo ""

# Step 1: Clean everything
echo "📦 Step 1: Cleaning old dependencies..."
rm -rf node_modules package-lock.json
echo "✅ Cleaned"
echo ""

# Step 2: Remove Tailwind 4 packages
echo "📦 Step 2: Uninstalling Tailwind 4 packages..."
npm uninstall tailwindcss @tailwindcss/postcss @tailwindcss/node
echo "✅ Uninstalled"
echo ""

# Step 3: Install Tailwind 3.4
echo "📦 Step 3: Installing Tailwind CSS 3.4..."
npm install -D tailwindcss@3.4.15 autoprefixer postcss
echo "✅ Installed Tailwind 3.4"
echo ""

# Step 4: Install all dependencies
echo "📦 Step 4: Installing all dependencies..."
npm install
echo "✅ All dependencies installed"
echo ""

echo "=========================================="
echo "✅ Fix Complete!"
echo "=========================================="
echo ""
echo "Now you can:"
echo "  npm run dev    → Start development server"
echo "  npm run build  → Build for production"
echo ""
