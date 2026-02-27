# Deployment Guide - IEEE GCET SB Website

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variables (if needed)
   - Deploy!

3. **Update API URL**
   - After backend deployment, update `frontend/src/utils/api.js`:
   ```javascript
   export const API_BASE_URL = "https://your-backend-url.com/api/ieeegcetsb";
   ```

#### Backend Deployment (Render)

1. **Prepare Backend**
   - Ensure `package.json` has start script:
   ```json
   "scripts": {
     "start": "node bootstrap.js"
   }
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `PORT=8000`
     - `MONGO_URI=<your-mongodb-uri>`
     - `JWT_SECRET=<your-secret>`
     - `CLOUDINARY_CLOUD_NAME=<your-name>`
     - `CLOUDINARY_API_KEY=<your-key>`
     - `CLOUDINARY_API_SECRET=<your-secret>`

3. **Update CORS**
   - Update `backend/index.js`:
   ```javascript
   const corsOptions = {
     origin: "https://your-frontend-url.vercel.app",
     credentials: true,
   };
   ```

### Option 2: Netlify (Frontend) + Railway (Backend)

#### Frontend (Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder to Netlify
3. Add `_redirects` file in `public`:
   ```
   /*    /index.html   200
   ```

#### Backend (Railway)
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

### Option 3: DigitalOcean / AWS / Azure

#### Using Docker

1. **Create Dockerfile for Backend**
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 8000
   CMD ["npm", "start"]
   ```

2. **Create Dockerfile for Frontend**
   ```dockerfile
   FROM node:18 as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     backend:
       build: ./backend
       ports:
         - "8000:8000"
       environment:
         - MONGO_URI=${MONGO_URI}
         - JWT_SECRET=${JWT_SECRET}
     
     frontend:
       build: ./frontend
       ports:
         - "80:80"
       depends_on:
         - backend
   ```

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Add rate limiting to API
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Add helmet.js for security headers
- [ ] Validate all user inputs
- [ ] Add CSRF protection
- [ ] Set up error logging (Sentry)
- [ ] Add API request logging
- [ ] Set up monitoring (UptimeRobot)

## 🔧 Production Configuration

### Backend (`backend/index.js`)

```javascript
// Add security middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Update CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://your-domain.com",
  credentials: true,
};
```

### Frontend Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api/ieeegcetsb
```

Update `frontend/src/utils/api.js`:
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/ieeegcetsb";
```

## 📊 Monitoring & Analytics

### Add Google Analytics
```html
<!-- Add to frontend/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Error Tracking (Sentry)
```bash
npm install @sentry/react @sentry/node
```

## 🚀 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Add deployment script

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          # Add deployment script
```

## 🔄 Database Backup

### MongoDB Atlas Backup
- Enable automatic backups in Atlas dashboard
- Set backup frequency (daily recommended)
- Test restore procedure

### Manual Backup
```bash
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/dbname"
```

## 📈 Performance Optimization

### Frontend
- Enable gzip compression
- Optimize images (use WebP)
- Lazy load components
- Code splitting
- CDN for static assets

### Backend
- Enable response compression
- Add Redis caching
- Database indexing
- Connection pooling

## 🧪 Pre-Deployment Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Build test
npm run build
```

## 📝 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test user registration
- [ ] Test user login
- [ ] Test event creation
- [ ] Test image upload
- [ ] Test on mobile devices
- [ ] Check SSL certificate
- [ ] Verify API endpoints
- [ ] Test error handling
- [ ] Check loading times
- [ ] Verify email notifications (if implemented)
- [ ] Test database connections
- [ ] Monitor error logs

## 🆘 Rollback Plan

If deployment fails:
1. Revert to previous Git commit
2. Redeploy previous version
3. Check error logs
4. Fix issues locally
5. Test thoroughly
6. Redeploy

## 📞 Support

For deployment issues:
- Check deployment platform docs
- Review error logs
- Contact platform support
- Reach out to development team

## 🎉 Success!

Once deployed, your website will be live at:
- Frontend: `https://your-domain.com`
- Backend API: `https://api.your-domain.com`

Remember to:
- Monitor performance
- Check error logs regularly
- Keep dependencies updated
- Backup database regularly
- Test new features before deploying
