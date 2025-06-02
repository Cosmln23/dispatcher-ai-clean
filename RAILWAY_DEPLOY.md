# 🚀 DispatcherAI - Railway Deployment Guide

## Quick Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=nextjs)

## Manual Railway Deployment

### 1. Setup Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### 2. Initialize Project
```bash
cd dispatcher-ai-web
railway init
```

### 3. Deploy
```bash
npm run deploy:railway
```

## Environment Variables (Railway Dashboard)

Set these in Railway Dashboard:

### Core Configuration
- `NODE_ENV` = `production`
- `NEXT_TELEMETRY_DISABLED` = `1`
- `NEXT_PUBLIC_APP_URL` = `https://your-app.railway.app`

### Security Keys
- `JWT_SECRET` = `your-jwt-secret-2030`
- `ENCRYPTION_KEY` = `your-quantum-encryption-key`
- `NEXTAUTH_SECRET` = `your-nextauth-secret`

### Feature Flags
- `ENABLE_QUANTUM_OPTIMIZATION` = `true`
- `ENABLE_BLOCKCHAIN` = `false`
- `ENABLE_VOICE_COMMANDS` = `true`

## Custom Domain

1. Go to Railway Dashboard
2. Click on your service
3. Go to Settings → Networking
4. Add custom domain: `dispatcher-ai.your-domain.com`

## Database Setup

1. Add PostgreSQL addon in Railway
2. Copy DATABASE_URL from Railway Dashboard
3. Run migrations:
```bash
railway run prisma db push
```

## Monitoring

- Railway provides built-in logs and metrics
- Access via: Railway Dashboard → Your Service → Logs

## 🎯 Matrix Neural System Status

After deployment, your cyberpunk AGI system will be live with:

✅ **Neural Dashboard** - Real-time AI agent monitoring  
✅ **Quantum Optimization** - Route calculations  
✅ **Blockchain Transparency** - Transaction logs  
✅ **Voice Commands** - Speech recognition  
✅ **Matrix UI** - Cyberpunk interface  

## 🛠️ Troubleshooting

### Build Issues
```bash
railway logs
```

### Database Connection
```bash
railway run npm run db:generate
```

### Environment Variables
```bash
railway variables
```

---

**🔮 DispatcherAI 2030** - *Neural Transport Matrix Activated* 