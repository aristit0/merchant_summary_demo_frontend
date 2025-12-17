# 🚀 Step-by-Step Deployment Guide - MacBook

Complete guide untuk deploy Merchant Dashboard di MacBook lokal Anda.

---

## 📋 Preparation Checklist

Sebelum mulai, pastikan Anda punya:
- [x] MacBook dengan macOS (any version)
- [x] Terminal access
- [x] Internet connection
- [x] Backend API sudah running (Go server)

---

## 🎯 Step 1: Check Prerequisites

### 1.1 Check Node.js Installation
```bash
node --version
```

**Expected output:** `v18.x.x` atau lebih tinggi

**Jika belum installed:**
```bash
# Install Homebrew (jika belum ada)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

### 1.2 Verify Backend is Running
```bash
# Test backend health
curl http://localhost:8080/health
```

**Expected output:**
```json
{"status":"healthy","time":"2025-12-17T..."}
```

**Jika backend belum running:**
```bash
# Navigate to backend directory
cd /path/to/backend

# Start Go server
go run main.go
```

Keep this terminal open and open new terminal for frontend.

---

## 🎯 Step 2: Extract & Navigate to Frontend

### 2.1 Navigate to Frontend Directory
```bash
cd frontend
```

### 2.2 Verify Files
```bash
ls -la
```

**Should see:**
```
package.json
vite.config.js
tailwind.config.js
src/
index.html
README.md
```

---

## 🎯 Step 3: Install Dependencies

### 3.1 Clean Install
```bash
npm install
```

**This will take 1-2 minutes.**

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s

68 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 3.2 Verify Installation
```bash
# Check if node_modules created
ls -la node_modules | head -5

# Check package-lock.json created
ls -la package-lock.json
```

---

## 🎯 Step 4: Start Development Server

### 4.1 Start Vite Dev Server
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

### 4.2 Verify Server is Running
Open another terminal and run:
```bash
curl http://localhost:3000
```

Should return HTML content.

---

## 🎯 Step 5: Open in Browser

### 5.1 Open Browser
```bash
# macOS: Open default browser
open http://localhost:3000
```

Or manually open browser and go to: **http://localhost:3000**

### 5.2 What You Should See

**Dashboard with:**
- ✅ Header with "Merchant Dashboard" title
- ✅ Merchant selector section
- ✅ 3 pre-selected merchants
- ✅ "Load Summary" button
- ✅ Beautiful gradient background

---

## 🎯 Step 6: Test Functionality

### 6.1 Load Initial Data
1. Click **"Load Summary"** button
2. Wait for loading animation (~1-2 seconds)
3. See 3 stat cards appear:
   - Today's Transactions
   - This Week
   - This Month
4. See bar chart with data

### 6.2 Test Merchant Selection
1. Click **"Add Merchant"** button
2. Modal opens with all 10 merchants
3. Select/deselect merchants
4. Click anywhere outside to close modal
5. Click **"Load Summary"** again

### 6.3 Test Refresh
1. Click **refresh button** (⟳) in header
2. Watch data reload
3. Timestamp updates

### 6.4 Test Responsive Design
1. Resize browser window
2. Check mobile view (narrow)
3. Check tablet view (medium)
4. Check desktop view (wide)

Or use DevTools:
```
Cmd + Option + I (Open DevTools)
Cmd + Shift + M (Toggle device toolbar)
```

---

## 🎯 Step 7: Verify All Features

### Checklist:
- [ ] Backend API responding (check logs)
- [ ] Frontend loads without errors
- [ ] Can select/deselect merchants
- [ ] Load Summary shows data
- [ ] Stat cards display amounts
- [ ] Chart renders correctly
- [ ] Refresh button works
- [ ] Numbers animate (count up effect)
- [ ] Hover effects work on cards
- [ ] Mobile responsive works
- [ ] No console errors

**Check Console for Errors:**
```
Cmd + Option + J (Open Console)
```

Should see no red errors.

---

## 🔧 Troubleshooting

### Issue 1: npm install fails

**Error:** `EACCES: permission denied`

**Fix:**
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

---

### Issue 2: Port 3000 already in use

**Error:** `Port 3000 is already in use`

**Fix Option 1 - Kill existing process:**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Fix Option 2 - Use different port:**
Edit `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to 3001
}
```

---

### Issue 3: Cannot fetch data / API errors

**Symptoms:**
- "Failed to fetch" error
- No data loads
- Console shows network errors

**Check:**
```bash
# Is backend running?
curl http://localhost:8080/health

# Check backend logs
# Should see API requests in Go server logs
```

**Fix:**
```bash
# Restart backend
cd /path/to/backend
go run main.go
```

**Check proxy config** in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
}
```

---

### Issue 4: Blank page / White screen

**Check browser console:**
```
Cmd + Option + J
```

**Common causes:**
1. JavaScript errors
2. Missing dependencies
3. Build issues

**Fix:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### Issue 5: Styles not loading / Looks broken

**Symptoms:**
- No colors
- Broken layout
- Plain text only

**Fix:**
```bash
# Rebuild Tailwind
npm run dev
# Stop with Ctrl+C
# Restart
npm run dev
```

---

### Issue 6: Slow performance

**Optimize:**
1. Close other applications
2. Clear browser cache (Cmd + Shift + Delete)
3. Update Node.js to latest LTS:
```bash
brew upgrade node
```

---

## 🌐 Access from Other Devices (Optional)

### Enable Network Access
Edit `vite.config.js`:
```javascript
server: {
  host: '0.0.0.0',  // Add this
  port: 3000,
}
```

Restart dev server:
```bash
npm run dev
```

**Get your local IP:**
```bash
ipconfig getifaddr en0
```

**Access from other device:**
```
http://YOUR_IP:3000
```

---

## 🛑 Stopping the Server

### Stop Frontend:
```bash
# In frontend terminal
Ctrl + C
```

### Stop Backend:
```bash
# In backend terminal
Ctrl + C
```

---

## 🔄 Restart Everything

### Complete Restart Process:
```bash
# Terminal 1: Backend
cd /path/to/backend
go run main.go

# Terminal 2: Frontend
cd /path/to/frontend
npm run dev

# Terminal 3: Open browser
open http://localhost:3000
```

---

## 📊 Monitoring

### Watch Backend Logs:
```bash
# You'll see API requests like:
📊 Processing summary for 3 merchants
   📈 Daily 000000000001: 45678900
   📈 Weekly 000000000001: 234567890
   📈 Monthly 000000000001: 987654321
✅ Summary calculated
```

### Watch Frontend Logs:
Browser Console (Cmd + Option + J):
```
Loading merchant data...
Fetching summary for 3 merchants
Data loaded successfully
```

---

## ✅ Success Indicators

Everything is working when you see:

1. **Backend Terminal:**
   ```
   ✅ Connected to Couchbase
   🚀 Server starting on port :8080
   📊 Endpoint: POST http://localhost:8080/api/merchant/summary
   ```

2. **Frontend Terminal:**
   ```
   ➜  Local:   http://localhost:3000/
   ➜  ready in 342 ms
   ```

3. **Browser:**
   - Beautiful dashboard with gradients
   - Stats showing real numbers
   - Chart with colored bars
   - No errors in console

---

## 🎨 Customization (Optional)

### Change Colors:
Edit `tailwind.config.js`:
```javascript
colors: {
  'bank-navy': '#0A1F44',     // Change these
  'bank-blue': '#1E3A8A',
  'bank-gold': '#D4AF37',
}
```

### Change Port:
Edit `vite.config.js`:
```javascript
server: {
  port: 3001,  // Your preferred port
}
```

### Disable Animations:
Edit `src/index.css` - comment out animation styles.

---

## 📱 Testing Checklist

- [ ] Open http://localhost:3000
- [ ] Dashboard loads
- [ ] No console errors
- [ ] Backend responding
- [ ] Select merchants
- [ ] Load summary data
- [ ] See stat cards
- [ ] See chart
- [ ] Refresh works
- [ ] Hover effects work
- [ ] Mobile view works
- [ ] Can add/remove merchants
- [ ] Numbers animate

---

## 🎉 Congratulations!

Your Merchant Dashboard is now running locally! 🚀

**Quick Access:**
```bash
# Start everything (from project root)
# Terminal 1:
go run main.go

# Terminal 2:
cd frontend && npm run dev

# Browser:
open http://localhost:3000
```

**Need help?**
- Check README.md for detailed docs
- Review troubleshooting section above
- Check browser console for errors
- Verify backend is running

**Enjoy your beautiful banking dashboard! 💎**
