# ⚡ Quick Reference Card

## 🚀 Start Everything (3 Commands)

```bash
# Terminal 1: Backend
go run main.go

# Terminal 2: Frontend  
cd frontend && npm install && npm run dev

# Browser
open http://localhost:3000
```

---

## 📍 URLs

```
Frontend:  http://localhost:3000
Backend:   http://localhost:8080
Couchbase: http://localhost:8091
```

---

## 🔑 Commands Cheat Sheet

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Quick setup (one command)
./setup.sh
```

### Backend
```bash
# Run
go run main.go

# Build
go build -o merchant-api

# Install dependencies
go mod download
```

### Couchbase
```bash
# Generate data
python generate_merchant_data.py

# Verify setup
python verify_setup.py
```

---

## 🐛 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| npm install fails | `rm -rf node_modules && npm install` |
| Backend not responding | Check if `go run main.go` is running |
| No data showing | Run `python generate_merchant_data.py` |
| Blank page | Check browser console (Cmd+Opt+J) |
| CORS errors | Restart backend and frontend |

---

## 📊 File Structure

```
frontend/
├── src/
│   ├── components/      ← React components
│   ├── services/        ← API calls
│   ├── lib/            ← Utilities
│   ├── App.jsx         ← Main app
│   └── index.css       ← Styles
├── package.json        ← Dependencies
├── vite.config.js      ← Vite config
└── tailwind.config.js  ← Tailwind config
```

---

## 🎨 Key Features

✅ Merchant selection UI  
✅ Real-time data refresh  
✅ Animated stat cards  
✅ Interactive charts  
✅ Responsive design  
✅ Loading states  
✅ Error handling  
✅ Glass-morphism effects  

---

## 🔍 Verify Everything Works

```bash
# 1. Backend health
curl http://localhost:8080/health

# 2. Frontend running
curl http://localhost:3000

# 3. Test API
curl -X POST http://localhost:8080/api/merchant/summary \
  -H "Content-Type: application/json" \
  -d '{"mid": ["000000000001"]}'

# 4. Check Couchbase
# Open: http://localhost:8091
```

---

## 📱 Browser DevTools

```
Open DevTools:     Cmd + Option + I
Console:           Cmd + Option + J
Device Toolbar:    Cmd + Shift + M
Refresh:           Cmd + R
Hard Refresh:      Cmd + Shift + R
```

---

## 🎯 Testing Workflow

1. ✅ Start backend
2. ✅ Start frontend
3. ✅ Open http://localhost:3000
4. ✅ Select merchants
5. ✅ Click "Load Summary"
6. ✅ Verify data displays
7. ✅ Test refresh button
8. ✅ Test mobile view

---

## 📦 Dependencies

### Frontend
- React 18.3
- Vite 6.0
- Tailwind CSS 4.0
- Framer Motion
- Recharts
- Lucide React

### Backend
- Go 1.21+
- Gorilla Mux
- Gocb v2.7

---

## 🔐 Default Credentials

```
Couchbase:
  Host:     localhost
  Username: admin
  Password: T1ku$H1t4m
  Bucket:   ms_demo
  Scope:    merchant
```

---

## 📖 Documentation

```
PROJECT_README.md           → Overview
frontend/README.md          → Frontend docs
frontend/DEPLOYMENT_GUIDE.md → Step-by-step setup
frontend/UI_PREVIEW.md      → Design system
```

---

## ⚙️ Configuration

### Change Frontend Port
`vite.config.js`:
```javascript
server: { port: 3001 }
```

### Change Backend Port
`main.go`:
```go
const ServerPort = ":8080"
```

### Change API Proxy
`vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080'
  }
}
```

---

## 🎨 Custom Styling

### Colors
`tailwind.config.js`:
```javascript
colors: {
  'bank-navy': '#0A1F44',
  'bank-blue': '#1E3A8A',
  // Add your colors
}
```

### Fonts
`tailwind.config.js`:
```javascript
fontFamily: {
  'display': ['Your Font', 'sans-serif'],
}
```

---

## 📊 Sample API Response

```json
{
  "error_schema": {
    "error_code": "D000",
    "error_message": {
      "english": "Success"
    }
  },
  "output_schema": {
    "merchant_ids": ["000000000001"],
    "current_date": "2025-12-17",
    "today_total_amount": "77803622",
    "weekly_total_amount": "584236342",
    "monthly_total_amount": "2513784014"
  }
}
```

---

## 🚨 Emergency Commands

### Kill All Node Processes
```bash
killall node
```

### Reset Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Restart Everything
```bash
# Stop all (Ctrl+C in each terminal)
# Then restart:
go run main.go
cd frontend && npm run dev
```

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] Backend running (:8080)
- [ ] Frontend running (:3000)
- [ ] Data generated
- [ ] Eventing deployed
- [ ] Browser opens
- [ ] Dashboard loads
- [ ] Data displays
- [ ] No console errors

---

## 💡 Pro Tips

1. **Keep both terminals open** (backend + frontend)
2. **Check console** for errors first
3. **Hard refresh** if styles don't load (Cmd+Shift+R)
4. **Mobile view** → DevTools → Cmd+Shift+M
5. **Backend logs** show API requests
6. **Frontend logs** in browser console

---

## 🎉 You're Ready!

Everything you need is here. Good luck! 🚀

**Quick Start:**
```bash
go run main.go
cd frontend && npm run dev
open http://localhost:3000
```
