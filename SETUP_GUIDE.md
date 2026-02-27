# IEEE GCET SB Website - Complete Setup Guide

## 🚀 Quick Start

Your website is **ALMOST READY**! Just one step remaining:

### ⚠️ CRITICAL: Update MongoDB Password

1. Open `backend/.env` file
2. Find this line:
   ```
   MONGO_URI=mongodb+srv://achuthparisha005_db_user:<db_password>@task-manager.wcogpe2.mongodb.net/?appName=Task-Manager
   ```
3. Replace `<db_password>` with your actual MongoDB Atlas password
4. Save the file

The backend server will automatically restart and connect to your database!

## ✅ What's Already Done

### Backend (Port 8000)
- ✅ Express server running
- ✅ MongoDB connection configured
- ✅ All API endpoints ready
- ✅ JWT authentication implemented
- ✅ Cloudinary integration for images
- ✅ Node.js v24 compatibility fixed

### Frontend (Port 5173)
- ✅ React app running
- ✅ All pages created (Home, About, Events, Societies)
- ✅ User authentication (Login/Register)
- ✅ Event creation form with validation
- ✅ Event listing and detail views
- ✅ Responsive design
- ✅ Redux state management

## 📋 Features Completed

### 1. User Management
- **Registration Page** (`/register`)
  - Full name, email, password
  - Role selection (Chair/Advisor)
  - Department and year selection
  - Form validation

- **Login Page** (`/login`)
  - Email and password authentication
  - Role-based login
  - Session management
  - Redirect to home after login

### 2. Event Management
- **Event Creation** (`/event/upload`)
  - Multi-step form with 4 sections:
    1. Basic Information (title, venue, dates, societies)
    2. Stakeholders (dignitaries, coordinators, affiliations)
    3. Description (intro, sections, conclusion)
    4. Winners (optional)
  - Auto-save functionality
  - Form validation
  - Image upload support
  - Submits to backend API

- **Event Listing** (`/event`)
  - Grid view of all events
  - Event cards with images
  - Click to view details

- **Event Detail View** (`/event/:eventId`)
  - Full event information
  - Image gallery
  - Stakeholder details
  - Winners display

### 3. Other Pages
- **Home** (`/`)
  - Hero section
  - About section
  - Features showcase
  - Footer

- **About** (`/about`)
  - IEEE GCET SB information
  - Leadership team
  - Vision and mission

- **Societies** (`/society`)
  - List of all societies
  - Society cards

## 🔧 Configuration Files Created

### 1. API Configuration (`frontend/src/utils/api.js`)
Centralized API endpoint management:
```javascript
export const API_ENDPOINTS = {
  USER_REGISTER: '/user/register',
  USER_LOGIN: '/user/login',
  EVENT_REGISTER: '/event/register',
  // ... all endpoints
};
```

### 2. Environment Variables (`backend/.env`)
```env
PORT=8000
MONGO_URI=<YOUR_MONGODB_URI>
JWT_SECRET=ieee_gcet_sb_secret_key_2024_secure_token
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_key>
CLOUDINARY_API_SECRET=<your_cloudinary_secret>
```

## 🎯 How to Use the Website

### For New Users:
1. Go to http://localhost:5173/register
2. Fill in your details
3. Select your role (Chair/Advisor)
4. Click "Register"
5. Login with your credentials

### For Creating Events:
1. Login to your account
2. Click "New Event" in the navbar
3. Fill in the 4-step form:
   - Basic Info
   - Stakeholders
   - Description
   - Winners (optional)
4. Click "Submit Event"
5. Event will be created and you'll be redirected to the event page

### For Viewing Events:
1. Go to http://localhost:5173/event
2. Browse all events
3. Click on any event card to view details

## 🔐 User Roles

### Chair (Student)
- Can create events
- Can view all events
- Can manage their own events

### Advisor (Faculty)
- Can create events
- Can view all events
- Can manage all events
- Can approve/edit events

## 📱 Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/about` | About | Public |
| `/event` | Event List | Public |
| `/event/:id` | Event Detail | Public |
| `/society` | Societies | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/event/upload` | Create Event | Protected (Login Required) |

## 🛠️ Technical Details

### Frontend Stack:
- React 18.3 + Vite
- Redux Toolkit (State Management)
- React Router v7 (Routing)
- Material-UI (Components)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Axios (API Calls)
- Formik + Yup (Forms)

### Backend Stack:
- Node.js + Express
- MongoDB + Mongoose
- JWT (Authentication)
- Bcryptjs (Password Hashing)
- Cloudinary (Image Storage)
- Multer (File Upload)

## 🐛 Troubleshooting

### Backend won't start?
- Check if MongoDB password is correct in `.env`
- Make sure port 8000 is not in use
- Run `npm install` in backend folder

### Frontend won't start?
- Make sure port 5173 is not in use
- Run `npm install` in frontend folder
- Clear browser cache

### Can't login?
- Make sure backend is running
- Check browser console for errors
- Verify user is registered

### Images not uploading?
- Add Cloudinary credentials to `.env`
- Check Cloudinary dashboard for API limits

## 📊 Database Collections

### Users
- fullname, email, password (hashed)
- role (chair/advisor/admin)
- academics (year, dept, position)
- timestamps

### Events
- title, venue, description
- organizedBy (societies)
- dignitaries, coordinators
- images, winners
- timestamps

### Societies
- name, description
- advisor, chair, members
- events
- timestamps

## 🎨 Customization

### Change Colors:
Edit `frontend/tailwind.config.js` and `frontend/src/App.css`

### Add New Pages:
1. Create component in `frontend/src/components/`
2. Add route in `frontend/src/App.jsx`
3. Add link in navbar

### Add New API Endpoints:
1. Create controller in `backend/controllers/`
2. Add route in `backend/routes/`
3. Register route in `backend/index.js`

## 📞 Support

For issues or questions:
1. Check this guide first
2. Check browser console for errors
3. Check backend terminal for errors
4. Contact IEEE GCET SB development team

## 🎉 You're All Set!

Once you update the MongoDB password, your website will be fully functional!

**Next Steps:**
1. Update MongoDB password in `.env`
2. Register your first user
3. Create your first event
4. Customize the content
5. Deploy to production

Happy coding! 🚀
