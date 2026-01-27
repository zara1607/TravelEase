# TravelEase API - Backend Server

RESTful API for the TravelEase travel booking platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Flight Booking**: Search and book flights with real-time availability
- **Hotel Booking**: Browse hotels with filters and amenities
- **Tour Packages**: Complete holiday packages with itineraries
- **Booking Management**: Create, view, and cancel bookings
- **Admin Dashboard**: Manage users, flights, hotels, and tours
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling middleware
- **Security**: Password hashing, JWT tokens, CORS protection

## 📦 Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/travel_booking
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For Windows (if installed as service)
   net start MongoDB
   
   # For Mac/Linux
   mongod
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will be available at `http://localhost:5000`

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.js        # Database connection
│   │   └── env.js       # Environment variables
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.js
│   │   ├── flight.controller.js
│   │   ├── hotel.controller.js
│   │   ├── tour.controller.js
│   │   ├── booking.controller.js
│   │   └── admin.controller.js
│   ├── middlewares/      # Custom middlewares
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Flight.js
│   │   ├── Hotel.js
│   │   ├── Tour.js
│   │   ├── Booking.js
│   │   ├── Payment.js
│   │   └── Review.js
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── flight.routes.js
│   │   ├── hotel.routes.js
│   │   ├── tour.routes.js
│   │   ├── booking.routes.js
│   │   └── admin.routes.js
│   ├── utils/           # Utility functions
│   │   ├── generateToken.js
│   │   ├── validators.js
│   │   └── seedData.js
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── .env                 # Environment variables
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/change-password` - Change password (Protected)

### Flights
- `GET /api/flights/search` - Search flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get flight by ID

### Hotels
- `GET /api/hotels/search` - Search hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/featured` - Get featured hotels
- `GET /api/hotels/:id` - Get hotel by ID

### Tours (Packages)
- `GET /api/tours/search` - Search tour packages
- `GET /api/tours` - Get all tours
- `GET /api/tours/featured` - Get featured tours
- `GET /api/tours/:id` - Get tour by ID

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/user` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get booking by ID (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)
- `GET /api/bookings` - Get all bookings (Admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `POST /api/admin/flights` - Create flight (Admin)
- `PUT /api/admin/flights/:id` - Update flight (Admin)
- `DELETE /api/admin/flights/:id` - Delete flight (Admin)
- `POST /api/admin/hotels` - Create hotel (Admin)
- `POST /api/admin/tours` - Create tour (Admin)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Login to get token:**
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Use token in requests:**
```bash
Authorization: Bearer <your_jwt_token>
```

## 👤 Default Admin Account

After seeding the database, you can login with:
- **Email**: admin@travelease.com
- **Password**: admin123

⚠️ **Change the default admin password immediately in production!**

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/travel_booking |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:3000 |

## 🧪 Testing

Test the API using tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": []
}
```

## 📊 Database Models

### User
- Name, Email, Password (hashed)
- Phone, Address
- Role (user/admin)

### Flight
- Airline, Flight Number
- Departure/Arrival details
- Price, Class, Stops
- Available Seats

### Hotel
- Name, Description, Location
- Rating, Reviews
- Price per night
- Amenities, Rooms

### Tour
- Name, Description, Destination
- Duration, Itinerary
- Price, Category
- Max Group Size

### Booking
- User, Type (flight/hotel/package)
- Item Details
- Passenger Details
- Status, Payment Status

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Request validation
- CORS protection
- Rate limiting (recommended for production)
- Helmet.js security headers (recommended for production)

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Add rate limiting
5. Add security headers with Helmet.js
6. Use MongoDB Atlas for cloud database
7. Deploy to services like:
   - Heroku
   - Railway
   - Render
   - AWS
   - DigitalOcean

## 📄 License

MIT License

## 👥 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ by TravelEase Team