# 🚀 Quick Start - IEEE GCET SB Website

## ⚡ 1-Minute Setup

### Step 1: Update MongoDB Password
```bash
# Open backend/.env and replace <db_password> with your actual password
MONGO_URI=mongodb+srv://achuthparisha005_db_user:YOUR_PASSWORD@task-manager.wcogpe2.mongodb.net/?appName=Task-Manager
```

### Step 2: Servers are Already Running! ✅
- Backend: http://localhost:8000 ✅
- Frontend: http://localhost:5173 ✅

### Step 3: Start Using!
1. Open http://localhost:5173
2. Click "Register" to create an account
3. Login with your credentials
4. Start creating events!

## 📋 Quick Commands

### If Servers Stopped:

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

## 🎯 Quick Test Checklist

- [ ] Open http://localhost:5173
- [ ] Register a new user
- [ ] Login with credentials
- [ ] Click "New Event" in navbar
- [ ] Fill event form
- [ ] Submit event
- [ ] View event in list
- [ ] Click event to see details

## 🔑 Default Test User (Create via Register)

```
Email: test@gcet.edu
Password: test123
Role: Chair
Department: CSE
Year: 3
```

## 📱 Key URLs

| URL | Page |
|-----|------|
| http://localhost:5173 | Home |
| http://localhost:5173/register | Register |
| http://localhost:5173/login | Login |
| http://localhost:5173/event | Events List |
| http://localhost:5173/event/upload | Create Event |
| http://localhost:5173/about | About |
| http://localhost:5173/society | Societies |

## 🐛 Quick Fixes

### Backend won't connect to MongoDB?
→ Update password in `backend/.env`

### Can't see new event after creating?
→ Refresh the events page

### Images not uploading?
→ Add Cloudinary credentials to `backend/.env`

### Port already in use?
→ Kill the process or change port in `.env`

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check `PROJECT_SUMMARY.md` for complete overview
3. Check browser console for errors (F12)
4. Check backend terminal for errors

## 🎉 That's It!

Your website is ready to use. Just update the MongoDB password and you're good to go!

**Happy coding! 🚀**
