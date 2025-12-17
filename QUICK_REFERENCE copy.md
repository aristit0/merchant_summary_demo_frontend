# ⚡ Frontend Pipeline - Quick Reference

## 🚀 Quick Start

### One-Line Setup
```bash
# In Jenkins: Create Pipeline job → Paste Jenkinsfile → Build Now
```

---

## 📋 Essential Commands

### Container Management
```bash
# Start/Stop
docker start merchant-frontend
docker stop merchant-frontend

# View logs
docker logs -f merchant-frontend

# Execute commands
docker exec -it merchant-frontend sh

# Remove
docker rm -f merchant-frontend
```

### Testing
```bash
# Health check
curl http://localhost:2112/health

# Main page
curl http://localhost:2112/

# API test
curl -X POST http://localhost:2112/api/merchant/summary \
  -H "Content-Type: application/json" \
  -d '{"mid": ["000000000001"]}'

# Open in browser
open http://localhost:2112
```

### Build & Deploy
```bash
# Manual build
docker build -t merchant-summary-frontend:latest .

# Manual deploy
docker run -d \
  --name merchant-frontend \
  --network grafana-mysql-network \
  -p 2112:80 \
  merchant-summary-frontend:latest
```

---

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:2112 | React Dashboard |
| Health | http://localhost:2112/health | Health Check |
| API Proxy | http://localhost:2112/api/* | Routes to backend |
| Backend | http://localhost:8080 | Backend API |
| Jenkins | http://localhost:8088 | CI/CD Dashboard |

---

## 🔧 Pipeline Stages

```
1. Cleanup Workspace       → cleanWs()
2. Clone Repository        → git clone
3. Verify Files           → Check package.json
4. Create Required Files  → Dockerfile, nginx.conf
5. Build Docker Image     → npm build + docker build
6. Stop Old Container     → docker stop/rm
7. Create Network         → docker network create
8. Deploy Container       → docker run
9. Health Check           → curl /health
10. Verify API Proxy      → Test backend connection
11. Cleanup Old Images    → Remove old builds
```

---

## 🐛 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check `docker logs merchant-frontend` |
| Can't access | Check `docker ps \| grep merchant-frontend` |
| API fails | Check backend running: `docker ps \| grep merchant-backend` |
| Port in use | `docker stop merchant-frontend && docker rm merchant-frontend` |
| Network error | `docker network inspect grafana-mysql-network` |

---

## 📊 Monitoring

### Container Status
```bash
docker ps | grep merchant-frontend
docker stats merchant-frontend
```

### Logs
```bash
# Real-time logs
docker logs -f merchant-frontend

# Nginx access log
docker exec merchant-frontend tail -f /var/log/nginx/access.log

# Nginx error log
docker exec merchant-frontend tail -f /var/log/nginx/error.log
```

### Network
```bash
# Inspect network
docker network inspect grafana-mysql-network

# Test backend connectivity
docker exec merchant-frontend wget -q -O- http://merchant-backend:8080/health
```

---

## 🔄 Deployment Flow

```
GitHub Push → Jenkins Poll → Build → Deploy → Health Check
    ↓             ↓            ↓        ↓          ↓
  main        detect      docker    docker     curl
  branch      changes     build      run       /health
```

---

## ⚙️ Configuration

### Environment Variables (Jenkinsfile)
```groovy
GIT_REPO = 'https://github.com/aristit0/merchant_summary_demo_frontend.git'
GIT_BRANCH = 'main'
DOCKER_IMAGE = 'merchant-summary-frontend'
DOCKER_CONTAINER = 'merchant-frontend'
DOCKER_NETWORK = 'grafana-mysql-network'
DOCKER_PORT = '2112'
NODE_VERSION = '18'
```

### Nginx Config
```nginx
# React Router
location / {
    try_files $uri $uri/ /index.html;
}

# API Proxy
location /api/ {
    proxy_pass http://merchant-backend:8080/api/;
}

# Health Check
location /health {
    return 200 "healthy\n";
}
```

---

## 📦 Docker Image

### Multi-Stage Build
```dockerfile
# Stage 1: Build React app
FROM node:18-alpine
npm ci && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

---

## 🧪 Testing Complete Stack

```bash
# 1. Test backend
curl http://localhost:8080/health
# Should return: {"status":"healthy"}

# 2. Test frontend
curl http://localhost:2112/health
# Should return: healthy

# 3. Test API through frontend proxy
curl -X POST http://localhost:2112/api/merchant/summary \
  -H "Content-Type: application/json" \
  -d '{"mid": ["000000000001"]}'
# Should return: merchant summary JSON

# 4. Open dashboard
open http://localhost:2112
# Should display: Beautiful banking dashboard
```

---

## 🔧 Nginx Commands

```bash
# Test config
docker exec merchant-frontend nginx -t

# Reload config
docker exec merchant-frontend nginx -s reload

# View config
docker exec merchant-frontend cat /etc/nginx/conf.d/default.conf

# View running processes
docker exec merchant-frontend ps aux
```

---

## 📝 Files Required in Repo

```
frontend-repo/
├── src/                  ← React source code
├── public/               ← Static assets
├── package.json          ← Dependencies
├── vite.config.js        ← Vite config
├── Jenkinsfile           ← Pipeline (auto-created)
├── Dockerfile            ← Build (auto-created)
└── nginx.conf            ← Server config (auto-created)
```

**Note:** Pipeline auto-creates Dockerfile and nginx.conf if not present!

---

## ✅ Success Checklist

- [ ] Jenkins running on :8088
- [ ] Backend running on :8080
- [ ] Network `grafana-mysql-network` exists
- [ ] Pipeline job created
- [ ] Build triggered
- [ ] All stages pass
- [ ] Container running on :2112
- [ ] Health check passes
- [ ] Dashboard loads
- [ ] API calls work

---

## 🎯 One-Line Deploy

```bash
# Trigger manual deploy
# In Jenkins: Click "Build Now" on merchant-frontend-deploy job
```

---

## 🚀 Auto-Deploy Setup

### Poll SCM (Current)
```groovy
H/5 * * * *  // Check every 5 minutes
```

### GitHub Webhook (Better)
```
Payload URL: http://YOUR_IP:8088/github-webhook/
Content type: application/json
Events: Just the push event
```

---

## 📊 Container Specs

```yaml
Name: merchant-frontend
Image: merchant-summary-frontend:latest
Port: 2112:80
Network: grafana-mysql-network
Restart: unless-stopped
Health: /health endpoint
```

---

## 🎨 Features

- ✅ Multi-stage Docker build
- ✅ Nginx with gzip compression
- ✅ React Router support
- ✅ API proxy to backend
- ✅ Static asset caching
- ✅ Security headers
- ✅ Health check endpoint
- ✅ Auto-restart on failure
- ✅ Zero downtime deployment

---

**Everything you need for frontend CI/CD! 🚀**
