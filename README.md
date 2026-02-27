# IEEE GCET Student Branch Website

A full-stack web application for IEEE GCET Student Branch to manage events, societies, and members.

## Features

- 🎯 Event Management (Create, View, Update events)
- 👥 User Authentication (Login, Register with role-based access)
- 🏛️ Society Management
- 📸 Image Upload with Cloudinary
- 🎨 Modern UI with Material-UI and Tailwind CSS
- 📱 Responsive Design
- 🔐 JWT-based Authentication
- 💾 MongoDB Database

## Tech Stack

### Frontend
- React 18.3 with Vite
- Redux Toolkit for state management
- React Router v7 for routing
- Material-UI (MUI) components
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls
- Formik + Yup for form validation

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- Cloudinary for image storage
- Multer for file uploads

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd IEEE_GCET_SB
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=8000
MONGO_URI=mongodb+srv://achuthparisha005_db_user:YOUR_PASSWORD_HERE@task-manager.wcogpe2.mongodb.net/?appName=Task-Manager
JWT_SECRET=ieee_gcet_sb_secret_key_2024_secure_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important:** Replace `YOUR_PASSWORD_HERE` with your actual MongoDB password.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:8000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

## Project Structure

```
IEEE_GCET_SB/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Authentication middleware
│   ├── utils/           # Utility functions (DB, Cloudinary)
│   ├── bootstrap.js     # Node.js v24 compatibility fix
│   └── index.js         # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── auth/    # Login, Register
│   │   │   ├── partials/# Home, About, Events, Societies
│   │   │   └── ui/      # Reusable UI components
│   │   ├── features/    # Redux slices
│   │   ├── store/       # Redux store
│   │   ├── Context/     # React Context (Auth)
│   │   ├── utils/       # API configuration
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── public/          # Static assets
│
└── README.md
```

## API Endpoints

### User Routes
- `POST /api/ieeegcetsb/user/register` - Register new user
- `POST /api/ieeegcetsb/user/login` - User login
- `GET /api/ieeegcetsb/user/logout` - User logout
- `GET /api/ieeegcetsb/user/session-status` - Check session
- `GET /api/ieeegcetsb/user/all` - Get all users (authenticated)
- `GET /api/ieeegcetsb/user/:userId` - Get user by ID (authenticated)
- `PUT /api/ieeegcetsb/user/update/:userId` - Update user (authenticated)

### Event Routes
- `POST /api/ieeegcetsb/event/register` - Create event (authenticated)
- `GET /api/ieeegcetsb/event/all` - Get all events
- `GET /api/ieeegcetsb/event/:eventId` - Get event by ID
- `PUT /api/ieeegcetsb/event/update/:eventId` - Update event (authenticated)
- `POST /api/ieeegcetsb/event/upload-images` - Upload images (authenticated)
- `GET /api/ieeegcetsb/event/delete-images/:publicId` - Delete image (authenticated)

### Society Routes
- `POST /api/ieeegcetsb/society/register` - Create society (authenticated)
- `GET /api/ieeegcetsb/society/all` - Get all societies (authenticated)
- `GET /api/ieeegcetsb/society/:societyId` - Get society by ID (authenticated)
- `PUT /api/ieeegcetsb/society/update/:societyId` - Update society (authenticated)

## User Roles

- **Chair**: Student members who can create and manage events
- **Advisor**: Faculty advisors with elevated permissions
- **Admin**: Full system access (future implementation)

## Features Implemented

✅ User Registration and Login
✅ Event Creation with multi-step form
✅ Event Listing and Detail View
✅ Image Upload to Cloudinary
✅ JWT Authentication
✅ Role-based Access Control
✅ Responsive Design
✅ Form Validation
✅ Toast Notifications
✅ Redux State Management
✅ Protected Routes

## Known Issues & Fixes

### Node.js v24 Compatibility
The project includes a fix for Node.js v24 compatibility in `backend/bootstrap.js` which handles the removal of `SlowBuffer` in newer Node versions.

### MongoDB Connection
Make sure to replace the placeholder password in the `.env` file with your actual MongoDB Atlas password.

## Development Notes

- The backend uses `nodemon` for auto-restart during development
- Frontend uses Vite's hot module replacement (HMR)
- All API calls use centralized configuration in `frontend/src/utils/api.js`
- Images are stored in Cloudinary, not locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is developed for IEEE GCET Student Branch.

## Support

For issues and questions, please contact the IEEE GCET SB development team.
