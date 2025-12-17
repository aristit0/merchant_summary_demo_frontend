# 🎨 Merchant Dashboard Frontend - Setup Guide

Modern banking-style dashboard built with React + Vite + Tailwind CSS 4 + shadcn/ui

---

## 📋 Prerequisites

### 1. Node.js & npm
Check if installed:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

If not installed, install via Homebrew:
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

### 2. Backend API Running
Make sure your Go backend is running:
```bash
# In backend directory
go run main.go

# Should see:
# 🚀 Server starting on port :8080
```

---

## 🚀 Quick Start (Step-by-Step)

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- ✅ React 18.3
- ✅ Vite 6.0
- ✅ Tailwind CSS 4.0
- ✅ Framer Motion (animations)
- ✅ Recharts (charts)
- ✅ Lucide React (icons)

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s
```

### Step 3: Start Development Server
```bash
npm run dev
```

**Expected output:**
```
  VITE v6.0.1  ready in 342 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 4: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

You should see the beautiful merchant dashboard! 🎉

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── StatCard.jsx           # Transaction stat cards
│   │   ├── MerchantSelector.jsx   # Merchant selection UI
│   │   ├── SummaryChart.jsx       # Bar chart visualization
│   │   ├── LoadingState.jsx       # Loading skeleton
│   │   └── ErrorState.jsx         # Error handling UI
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── lib/
│   │   └── utils.js               # Utility functions
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles + Tailwind
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies
```

---

## 🎯 Features

### ✨ Modern Banking Design
- **Glass-morphism effects** with backdrop blur
- **Gradient accents** throughout the UI
- **Smooth animations** using Framer Motion
- **Responsive design** for all screen sizes
- **Professional typography** with Inter font family

### 📊 Interactive Components
1. **Merchant Selector**
   - Add/remove merchants dynamically
   - Visual merchant cards with gradients
   - Select all / Clear all functionality

2. **Stat Cards**
   - Animated number counting
   - Gradient backgrounds
   - Hover effects
   - Icon indicators

3. **Bar Chart**
   - Today/Weekly/Monthly comparison
   - Interactive tooltips
   - Responsive design
   - Smooth animations

4. **Real-time Updates**
   - Refresh button with animation
   - Last updated timestamp
   - Loading states
   - Error handling

---

## 🔧 Configuration

### API Proxy Configuration
The Vite config includes a proxy to avoid CORS issues:

```javascript
// vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

This means:
- Frontend: `http://localhost:3000`
- API calls to `/api/*` are proxied to `http://localhost:8080/api/*`

### Tailwind Configuration
Custom colors for banking theme:

```javascript
colors: {
  'bank-navy': '#0A1F44',
  'bank-blue': '#1E3A8A',
  'bank-gold': '#D4AF37',
  'bank-silver': '#C0C0C0',
  'bank-accent': '#3B82F6',
}
```

---

## 🧪 Testing the Application

### 1. Check Backend is Running
```bash
# In another terminal
curl http://localhost:8080/health
```

Should return:
```json
{"status":"healthy","time":"..."}
```

### 2. Test Frontend Features

**a) Select Merchants:**
1. Click "Add Merchant" button
2. Select merchants from the modal
3. Click "Load Summary"

**b) View Statistics:**
- Today's total
- Weekly total (Mon-Fri)
- Monthly total

**c) Refresh Data:**
- Click refresh button (⟳)
- Watch smooth loading animation

**d) Clear Selections:**
- Click "Clear All"
- Add new merchants

---

## 🎨 Design System

### Color Palette
```
Primary:   Blue (#3B82F6) → Indigo (#6366F1)
Success:   Green (#10B981)
Warning:   Amber (#F59E0B)
Error:     Red (#EF4444)
Neutral:   Slate (50-900)
```

### Typography
```
Display:   Inter (Bold, 700)
Headings:  Inter (SemiBold, 600)
Body:      Inter (Regular, 400)
Mono:      System Mono (for merchant IDs)
```

### Spacing
```
xs:  0.5rem (8px)
sm:  1rem (16px)
md:  1.5rem (24px)
lg:  2rem (32px)
xl:  3rem (48px)
```

### Border Radius
```
sm:  0.375rem (6px)
md:  0.5rem (8px)
lg:  0.75rem (12px)
xl:  1rem (16px)
2xl: 1.5rem (24px)
```

---

## 🚢 Building for Production

### Step 1: Build the Project
```bash
npm run build
```

This creates optimized production files in `dist/` folder.

### Step 2: Preview Production Build
```bash
npm run preview
```

Opens at: `http://localhost:4173`

### Step 3: Deploy
You can deploy the `dist/` folder to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Configure in repo settings
- **Your own server**: Copy `dist/` to web root

---

## 🐛 Troubleshooting

### Issue 1: "Cannot GET /api/merchant/summary"
**Cause:** Backend not running
**Fix:** Start Go backend first:
```bash
go run main.go
```

### Issue 2: Port 3000 already in use
**Fix:** Change port in `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to any available port
}
```

### Issue 3: npm install fails
**Fix:** Clear cache and retry:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Styles not loading
**Fix:** Rebuild Tailwind:
```bash
npm run dev
# Press Ctrl+C and restart
```

### Issue 5: CORS errors
**Fix:** Check proxy configuration in `vite.config.js`
Or update backend to allow CORS:
```go
// In main.go, add CORS middleware
w.Header().Set("Access-Control-Allow-Origin", "*")
```

---

## 📱 Mobile Responsive

The dashboard is fully responsive:

- **Desktop (≥1024px)**: 3-column grid
- **Tablet (768px-1023px)**: 2-column grid
- **Mobile (<768px)**: 1-column stack

Test responsive design:
1. Open DevTools (Cmd + Option + I)
2. Toggle device toolbar (Cmd + Shift + M)
3. Select different device sizes

---

## 🎬 Animations

### Framer Motion Effects:
1. **Page load**: Staggered fade-in
2. **Stat cards**: Number counting animation
3. **Merchant chips**: Scale in/out
4. **Hover states**: Scale + shadow
5. **Loading**: Rotating spinner
6. **Chart**: Smooth bar animation

### Custom CSS Animations:
- Shimmer effect for loading
- Gradient pulse
- Slide up from bottom
- Fade in

---

## ⚡ Performance Tips

### 1. Lazy Loading
Add lazy loading for heavy components:
```javascript
const SummaryChart = lazy(() => import('./components/SummaryChart'));
```

### 2. Memoization
Use React.memo for expensive components:
```javascript
export default React.memo(StatCard);
```

### 3. Debounce API Calls
Prevent multiple rapid requests:
```javascript
const debouncedFetch = debounce(fetchSummary, 500);
```

---

## 🔐 Security Notes

1. **API Proxy**: Never expose API keys in frontend
2. **HTTPS**: Use HTTPS in production
3. **Validation**: Validate all user inputs
4. **CORS**: Configure properly for production

---

## 📚 Additional Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org)

---

## ✅ Checklist

Before starting:
- [ ] Node.js installed (v18+)
- [ ] Backend API running on :8080
- [ ] Terminal open in `frontend/` directory

Installation:
- [ ] `npm install` completed successfully
- [ ] No error messages

Running:
- [ ] `npm run dev` started successfully
- [ ] Browser opens at localhost:3000
- [ ] Dashboard loads without errors

Testing:
- [ ] Can select merchants
- [ ] Can load summary data
- [ ] Charts display correctly
- [ ] Refresh button works
- [ ] Mobile responsive works

---

## 🎉 You're All Set!

Your modern banking dashboard is ready!

**Access the app:**
```
http://localhost:3000
```

**Need help?**
- Check browser console for errors (Cmd + Option + J)
- Check backend logs
- Review this guide

**Happy coding! 🚀**
# merchant_summary_demo_frontend
