# Roamgo Travels

<center><img src="frontend/src/assets/roamtravel_logo.png" alt="Roamgo Portfolio"></center>

A full-stack travel booking platform built with React (Vite) frontend and NestJS/Express backend. This application provides a complete travel agency experience with user authentication, trip management, booking system, and admin functionality.

## Features

- **User Authentication**: Signup, login, and role-based access control
- **Trip Management**: Browse, create, and manage travel packages
- **Booking System**: Users can book trips with flexible options
- **Admin Dashboard**: Manage users, trips, and bookings
- **Responsive Design**: Modern UI that works on all devices
- **Image Upload**: Cloudinary integration for trip images
- **Database**: SQLite/MySQL support with TypeORM

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- React Router for navigation
- Modern CSS with responsive design

### Backend
- Express.js with TypeScript
- TypeORM for database management
- JWT for authentication
- Joi for validation
- Multer for file uploads
- Cloudinary for image storage

### Database
- SQLite (development)
- MySQL (production)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Environment Variables

### Backend (.env in root directory)
```env
# Database
DB_TYPE=sqlite # For development `mysql` for production
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=roamgotravels


# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
```

### Frontend (.env in frontend directory)
```env
# Backend API URL
VITE_BACKEND_API_URL=http://localhost:5000/api
# For production, Use the actual url for the backend 
```

## Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:luggardubochi/Roamgotravels.git
   cd roamgotravels
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Running the Application

### Option 1: Run Frontend Only
```bash
npm run start:frontend
```
The frontend will be available at `http://localhost:5173`

### Option 2: Run Backend Only
```bash
npm run start:backend
```
The backend API will be available at `http://localhost:5000`

The API documentation will be available at `http://localhost:5000/api-docs`

### Option 3: Run Both Together
```bash
npm start
```
This will start both frontend and backend simultaneously:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Development Scripts

### Backend Scripts
```bash
npm run start:backend    # Start backend server
npm run dev:backend      # Start backend with nodemon (if available)
```

### Frontend Scripts
```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Database Setup

The application uses SQLite by default for development. The database file will be created automatically when you first run the application.

For MySQL production setup:
1. Create a MySQL database
2. Update the environment variables with your MySQL credentials
3. Set `DB_TYPE=mysql` in your .env file

## Deployment

### Frontend (Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy to Netlify using the provided `netlify.toml` configuration
3. Set environment variables in Netlify dashboard

### Backend (Render/Railway/Heroku)
1. Deploy to your preferred Node.js hosting platform
2. Set environment variables in the platform dashboard
3. Configure database connection

## Testing

Run the test suite:
```bash
npx jest
```
**Note**: The test is still being worked on

## Project Structure

```
roamgotravels/
├── src/                    # Backend source code
│   ├── controllers/        # API controllers
│   ├── models/            # Database models
│   ├── services/          # Business logic
│   ├── middlewares/       # Express middlewares
│   ├── routes/            # API routes
│   └── config/            # Configuration files
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── tests/                 # Test files
└── database.sqlite        # SQLite database file
```

## License

This project is proprietary and not open for contributions.
