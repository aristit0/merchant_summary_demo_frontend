# 🎨 Jenkins CI/CD Pipeline - Frontend Setup Guide

Complete guide untuk setup Jenkins CI/CD pipeline untuk deploy React frontend dari GitHub ke Docker.

---

## 📋 Overview

**Pipeline ini akan:**
- ✅ Clone React frontend dari GitHub
- ✅ Build production-ready bundle
- ✅ Create optimized Docker image dengan Nginx
- ✅ Deploy ke port 2112
- ✅ Connect ke backend via API proxy
- ✅ Auto-deploy on git push

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              GitHub Repository                          │
│   https://github.com/aristit0/merchant_summary_...     │
└──────────────────────┬──────────────────────────────────┘
                       │ git clone
                       ▼
┌─────────────────────────────────────────────────────────┐
│                 Jenkins Pipeline                        │
│  ┌────────────────────────────────────────────────┐    │
│  │ 1. Clone → 2. Build → 3. Deploy               │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │ docker run
                       ▼
┌─────────────────────────────────────────────────────────┐
│         Docker Container (Port 2112)                    │
│              merchant-frontend                          │
│         Network: grafana-mysql-network                  │
│  ┌────────────────────────────────────────────────┐    │
│  │           Nginx + React Bundle                 │    │
│  │  /         → index.html                        │    │
│  │  /api/*    → proxy to backend:8080             │    │
│  │  /health   → health check                      │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │ API calls
                       ▼
┌─────────────────────────────────────────────────────────┐
│         Backend Container (Port 8080)                   │
│              merchant-backend                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Prerequisites

### 1. Jenkins Running
```bash
# Check Jenkins is running
docker ps | grep jenkins

# If not running, start it
docker start jenkins
```

### 2. Backend Running
```bash
# Check backend is running
docker ps | grep merchant-backend

# Test backend
curl http://localhost:8080/health
```

### 3. Network Exists
```bash
# Check network
docker network ls | grep grafana-mysql-network

# Create if needed
docker network create grafana-mysql-network
```

---

## 🚀 Step 1: Create Jenkins Pipeline Job

### 1.1 Create New Job

1. Open Jenkins: `http://localhost:8088`
2. Click **"New Item"**
3. Enter name: `merchant-frontend-deploy`
4. Select **"Pipeline"**
5. Click **OK**

### 1.2 Configure Job

**General Section:**
- ✅ Check "GitHub project"
- Project url: `https://github.com/aristit0/merchant_summary_demo_frontend`
- Description: `Deploy merchant summary frontend to Docker`

**Build Triggers:**
- ✅ Check "Poll SCM"
- Schedule: `H/5 * * * *` (check every 5 minutes)

**Pipeline Section:**

**Option A: Pipeline from SCM (Recommended if you own the repo)**
- Definition: **"Pipeline script from SCM"**
- SCM: **Git**
- Repository URL: `https://github.com/aristit0/merchant_summary_demo_frontend.git`
- Branch: `*/main`
- Script Path: `Jenkinsfile`

**Option B: Direct Pipeline Script (If you don't own the repo)**
- Definition: **"Pipeline script"**
- Script: Copy entire Jenkinsfile content
- Paste into script box

### 1.3 Save Configuration

Click **"Save"**

---

## 📦 Step 2: Add Required Files to Repository

### Option A: If You Own The Repo

```bash
# Clone repo
git clone https://github.com/aristit0/merchant_summary_demo_frontend.git
cd merchant_summary_demo_frontend

# Add Jenkinsfile
# (copy Jenkinsfile content dari file yang saya berikan)

# Add Dockerfile
# (copy Dockerfile content)

# Add nginx.conf
# (copy nginx.conf content)

# Commit and push
git add Jenkinsfile Dockerfile nginx.conf
git commit -m "Add Jenkins CI/CD pipeline"
git push origin main
```

### Option B: If You Don't Own The Repo

Use **"Pipeline script"** directly in Jenkins (Option B above)

---

## 🚀 Step 3: Run The Pipeline

### 3.1 Manual Trigger

1. Go to job: `merchant-frontend-deploy`
2. Click **"Build Now"**
3. Watch the build progress

### 3.2 View Console Output

- Click on build number (e.g., #1)
- Click **"Console Output"**
- Watch real-time logs

### 3.3 Expected Pipeline Stages

```
✅ 1. Cleanup Workspace      → Clean workspace
✅ 2. Clone Repository       → git clone
✅ 3. Verify Files          → Check package.json, src/
✅ 4. Create Required Files → Add Dockerfile, nginx.conf
✅ 5. Build Docker Image    → npm build + docker build
✅ 6. Stop Old Container    → docker stop + rm
✅ 7. Create Network        → Ensure network exists
✅ 8. Deploy Container      → docker run
✅ 9. Health Check          → Test /health endpoint
✅ 10. Verify API Proxy     → Test backend connection
✅ 11. Cleanup Old Images   → Remove old builds
```

---

## 🔍 Step 4: Verify Deployment

### 4.1 Check Container Status

```bash
# List containers
docker ps | grep merchant-frontend

# Should show:
# CONTAINER ID   IMAGE                    ...   PORTS                    ...
# abc123...      merchant-summary-frontend...   0.0.0.0:2112->80/tcp    ...
```

### 4.2 Check Container Logs

```bash
# View logs
docker logs merchant-frontend

# Should show Nginx start messages
```

### 4.3 Check Network

```bash
# Inspect network
docker network inspect grafana-mysql-network

# Should show both frontend and backend containers
```

### 4.4 Test Frontend

```bash
# Test health endpoint
curl http://localhost:2112/health

# Test main page
curl -I http://localhost:2112/

# Open in browser
open http://localhost:2112
```

### 4.5 Test API Proxy

```bash
# Test API through frontend proxy
curl -X POST http://localhost:2112/api/merchant/summary \
  -H "Content-Type: application/json" \
  -d '{"mid": ["000000000001"]}'
```

---

## 📊 Pipeline Details

### Stage Breakdown

#### **1. Cleanup Workspace**
```groovy
cleanWs()
```
Cleans Jenkins workspace for fresh build.

#### **2. Clone Repository**
```groovy
git branch: "main", url: "https://github.com/aristit0/..."
```
Clones latest code from GitHub.

#### **3. Verify Files**
Checks for:
- `package.json` exists
- `src/` directory exists
- Build scripts present

#### **4. Create Required Files**
Auto-creates if missing:
- `Dockerfile` (multi-stage build)
- `nginx.conf` (with API proxy)

#### **5. Build Docker Image**
```dockerfile
# Stage 1: Build React app
FROM node:18-alpine
npm ci && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

#### **6. Stop Old Container**
```bash
docker stop merchant-frontend
docker rm merchant-frontend
```

#### **7. Deploy Container**
```bash
docker run -d \
  --name merchant-frontend \
  --network grafana-mysql-network \
  -p 2112:80 \
  --restart unless-stopped \
  merchant-summary-frontend:latest
```

#### **8-11. Health Check & Cleanup**
- Tests endpoints
- Verifies connectivity
- Removes old images

---

## 🌐 Nginx Configuration

### Features:

**1. React Router Support**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
All routes serve `index.html` for client-side routing.

**2. API Proxy to Backend**
```nginx
location /api/ {
    proxy_pass http://merchant-backend:8080/api/;
    # ... proxy headers
}
```
Routes `/api/*` requests to backend container.

**3. Static Asset Caching**
```nginx
location ~* \.(js|css|png|jpg|...)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**4. Gzip Compression**
```nginx
gzip on;
gzip_types text/plain text/css text/xml ...;
```

**5. Security Headers**
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
```

---

## 🔧 Environment Variables

Pipeline uses:
```groovy
environment {
    GIT_REPO = 'https://github.com/aristit0/merchant_summary_demo_frontend.git'
    GIT_BRANCH = 'main'
    
    DOCKER_IMAGE = 'merchant-summary-frontend'
    DOCKER_CONTAINER = 'merchant-frontend'
    DOCKER_NETWORK = 'grafana-mysql-network'
    DOCKER_PORT = '2112'
    
    NODE_VERSION = '18'
}
```

**Customize sesuai kebutuhan!**

---

## 🐛 Troubleshooting

### Issue 1: Build fails at npm install

**Error:** `npm install failed`

**Fix:**
```bash
# Check package.json exists in repo
# Check package-lock.json exists
# Verify Node version compatibility

# Or manually test build:
docker run --rm -v $(pwd):/app -w /app node:18-alpine npm install
```

### Issue 2: Container exits immediately

**Error:** `Container exits right after start`

**Fix:**
```bash
# Check logs
docker logs merchant-frontend

# Verify nginx.conf syntax
docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf nginx:alpine nginx -t

# Check dist folder was created
docker run --rm merchant-summary-frontend:latest ls -la /usr/share/nginx/html
```

### Issue 3: Can't access frontend

**Error:** `Connection refused on port 2112`

**Fix:**
```bash
# Check container is running
docker ps | grep merchant-frontend

# Check port binding
docker port merchant-frontend

# Check firewall
# macOS: System Preferences → Security & Privacy → Firewall

# Test from container
docker exec merchant-frontend wget -q -O- http://localhost
```

### Issue 4: API calls fail

**Error:** `API returns 404 or connection refused`

**Fix:**
```bash
# Check backend is running
docker ps | grep merchant-backend

# Check both containers are in same network
docker network inspect grafana-mysql-network

# Test from frontend container
docker exec merchant-frontend wget -q -O- http://merchant-backend:8080/health

# Check nginx.conf proxy settings
docker exec merchant-frontend cat /etc/nginx/conf.d/default.conf
```

### Issue 5: Build is very slow

**Optimization:**
```bash
# Use npm ci instead of npm install (already done)
# Add .dockerignore file
echo "node_modules
.git
.env
*.log" > .dockerignore

# Use Docker build cache
# Rebuild
```

### Issue 6: Old containers not stopping

**Fix:**
```bash
# Force stop and remove
docker stop merchant-frontend -t 1
docker rm -f merchant-frontend

# Or restart pipeline
```

---

## 🔄 Auto-Deploy Configuration

### Option 1: GitHub Webhook (Best)

**In GitHub:**
1. Repo → Settings → Webhooks
2. Add webhook
3. Payload URL: `http://YOUR_JENKINS_URL:8088/github-webhook/`
4. Content type: `application/json`
5. Events: `Just the push event`

**In Jenkins:**
Already configured with Poll SCM.

### Option 2: Poll SCM (Current)

Already set to check every 5 minutes:
```groovy
H/5 * * * *
```

---

## 📋 Useful Commands

### Container Management

```bash
# View logs (real-time)
docker logs -f merchant-frontend

# View last 50 lines
docker logs merchant-frontend --tail 50

# Execute command in container
docker exec -it merchant-frontend sh

# View nginx config
docker exec merchant-frontend cat /etc/nginx/conf.d/default.conf

# Test nginx config
docker exec merchant-frontend nginx -t

# Reload nginx
docker exec merchant-frontend nginx -s reload

# View container stats
docker stats merchant-frontend
```

### Build & Deploy

```bash
# Manual build (without Jenkins)
docker build -t merchant-summary-frontend:latest .

# Manual deploy
docker run -d \
  --name merchant-frontend \
  --network grafana-mysql-network \
  -p 2112:80 \
  merchant-summary-frontend:latest

# Stop and remove
docker stop merchant-frontend && docker rm merchant-frontend

# View images
docker images | grep merchant-summary-frontend
```

### Testing

```bash
# Health check
curl http://localhost:2112/health

# Main page
curl http://localhost:2112/

# API test through proxy
curl -X POST http://localhost:2112/api/merchant/summary \
  -H "Content-Type: application/json" \
  -d '{"mid": ["000000000001"]}'

# Check headers
curl -I http://localhost:2112/
```

---

## 📊 Monitoring & Logs

### View All Logs

```bash
# Pipeline logs
# In Jenkins: Click build → Console Output

# Container logs
docker logs -f merchant-frontend

# Nginx access logs
docker exec merchant-frontend tail -f /var/log/nginx/access.log

# Nginx error logs
docker exec merchant-frontend tail -f /var/log/nginx/error.log
```

### Container Stats

```bash
# Resource usage
docker stats merchant-frontend

# Detailed info
docker inspect merchant-frontend

# Network connections
docker exec merchant-frontend netstat -tuln
```

---

## ✅ Success Indicators

Pipeline successful when:

1. ✅ All 11 stages pass (green)
2. ✅ Container running: `docker ps | grep merchant-frontend`
3. ✅ Health endpoint returns 200: `curl http://localhost:2112/health`
4. ✅ Main page loads: `curl http://localhost:2112/`
5. ✅ API proxy works: Test merchant summary endpoint
6. ✅ Dashboard opens in browser: `http://localhost:2112`

---

## 🎯 Complete Stack Test

```bash
# 1. Test backend
curl http://localhost:8080/health

# 2. Test frontend
curl http://localhost:2112/health

# 3. Test API through frontend
curl -X POST http://localhost:2112/api/merchant/summary \
  -H "Content-Type: application/json" \
  -d '{"mid": ["000000000001","000000000002"]}'

# 4. Open in browser
open http://localhost:2112

# Should see:
# ✅ Beautiful dashboard
# ✅ Can select merchants
# ✅ Can load summary data
# ✅ Charts display correctly
```

---

## 🚀 Full Deployment Workflow

```
1. Developer pushes code to GitHub
   ↓
2. Jenkins polls GitHub (every 5 min)
   ↓
3. Jenkins detects changes
   ↓
4. Pipeline triggered automatically
   ↓
5. Clone repository
   ↓
6. Build React app (npm run build)
   ↓
7. Create Docker image with Nginx
   ↓
8. Stop old container
   ↓
9. Deploy new container
   ↓
10. Run health checks
   ↓
11. Deployment complete! ✅
   ↓
12. Users see new version at http://localhost:2112
```

---

## 📦 Files Overview

```
jenkins-frontend/
├── Jenkinsfile                 ← Pipeline definition
├── Dockerfile                  ← Multi-stage build
├── nginx.conf                  ← Nginx config with proxy
├── FRONTEND_SETUP_GUIDE.md     ← This file
└── QUICK_REFERENCE.md          ← Command cheat sheet
```

---

## 🎉 You're Done!

Your Jenkins CI/CD pipeline for frontend is ready!

**Access Points:**
- Jenkins: http://localhost:8088
- Frontend: http://localhost:2112
- Backend: http://localhost:8080

**Next Steps:**
1. Test the pipeline
2. Make a code change
3. Push to GitHub
4. Watch auto-deploy!

**Enjoy your automated frontend deployment! 🚀**
