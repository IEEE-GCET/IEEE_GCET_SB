# 🚀 How to Run IEEE GCET SB Website

## ⚡ Quick Start (If Already Set Up)

### Start Backend:
```bash
cd backend
npm run dev
```
Backend will run on: **http://localhost:8000**

### Start Frontend (in a new terminal):
```bash
cd frontend
npm run dev
```
Frontend will run on: **http://localhost:5173**

---

## 📋 First Time Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create `backend/.env` file with:
```env
PORT=8000
MONGO_URI=mongodb+srv://ieeegcetsb:38e2kk6WbRlnjqQy@ieeegcetsbcluster.jhy12.mongodb.net/?retryWrites=true&w=majority&appName=ieeegcetsbcluster
JWT_SECRET=ieee_gcet_sb_secret_key_2024_secure_token
CLOUDINARY_CLOUD_NAME=dn8xwedu5
CLOUDINARY_API_KEY=949534572169214
CLOUDINARY_API_SECRET=EuudkmGShwOjWPxpe8BPwsJ9CtQ
```

### 3. Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🌐 Access the Website

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **MongoDB:** Connected to Atlas

---

## 📱 Available Pages

| URL | Page | Access |
|-----|------|--------|
| http://localhost:5173 | Home | Public |
| http://localhost:5173/register | Register | Public |
| http://localhost:5173/login | Login | Public |
| http://localhost:5173/about | About | Public |
| http://localhost:5173/event | Events List | Public |
| http://localhost:5173/society | Societies | Public |
| http://localhost:5173/event/upload | Create Event | Protected (Login Required) |
| http://localhost:5173/event/:id | Event Detail | Public |

---

## 🔧 Troubleshooting

### Backend won't start?
- Check if MongoDB URI is correct in `.env`
- Make sure port 8000 is not in use
- Run `npm install` in backend folder

### Frontend won't start?
- Make sure port 5173 is not in use
- Run `npm install` in frontend folder
- Clear browser cache

### Can't connect to MongoDB?
- Check MongoDB Atlas Network Access (IP whitelist)
- Verify username and password in `.env`
- Check if cluster is active

### Can't login/register?
- Make sure backend is running
- Check browser console for errors (F12)
- Verify API URLs in `frontend/src/utils/api.js`

---

## 🛑 Stop the Servers

Press `Ctrl + C` in each terminal to stop the servers.

---

## 📦 Project Structure

```
IEEE_GCET_SB/
├── backend/          # Express.js backend
│   ├── controllers/  # Request handlers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── middlewares/  # Auth middleware
│   └── utils/        # DB & Cloudinary config
│
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── features/    # Redux slices
│   │   ├── store/       # Redux store
│   │   └── utils/       # API config
│   └── public/       # Static assets
│
└── Documentation files (README, SETUP_GUIDE, etc.)
```

---

## 🎯 Next Steps

1. **Register a user:** http://localhost:5173/register
2. **Login:** http://localhost:5173/login
3. **Create an event:** Click "New Event" after login
4. **Explore:** Browse all pages and features

---

## 📚 More Help

- **Setup Guide:** See `SETUP_GUIDE.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Features:** See `PROJECT_SUMMARY.md`
- **Quick Reference:** See `QUICK_START.md`

---

**Enjoy your IEEE GCET SB Website! 🎉**
