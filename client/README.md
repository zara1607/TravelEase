# TravelEase - Premium Travel Booking Platform

A modern, full-stack travel booking application built with React, Vite, and Tailwind CSS. Book flights, hotels, and holiday packages with a beautiful, responsive UI.

## 🚀 Features

- **Flight Booking**: Search and book flights with detailed information
- **Hotel Booking**: Browse hotels with image galleries and amenities
- **Holiday Packages**: Complete travel packages with accommodations
- **User Dashboard**: Manage bookings and profile
- **Authentication**: Secure login and registration
- **Responsive Design**: Mobile-first approach with smooth animations
- **Search & Filters**: Advanced filtering and sorting options
- **Real-time Updates**: Instant booking confirmations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── app/               # App configuration
│   │   ├── layouts/       # Layout components
│   │   ├── providers.jsx  # Context providers
│   │   └── routes.jsx     # Route definitions
│   ├── assets/            # Images, fonts, icons
│   ├── features/          # Feature-based modules
│   │   ├── auth/         # Authentication
│   │   ├── bookings/     # Booking management
│   │   ├── dashboard/    # User dashboard
│   │   ├── flights/      # Flight features
│   │   ├── hotels/       # Hotel features
│   │   └── search/       # Search functionality
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and config
│   ├── pages/            # Page components
│   ├── sections/         # Page sections
│   ├── styles/           # Global styles
│   ├── ui/               # Reusable UI components
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global CSS
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind configuration
```

## 🎨 UI Components

### Reusable Components
- **Button**: Variants (primary, secondary, outline, ghost, danger)
- **Card**: Modular card with header, content, footer
- **Badge**: Status indicators with color variants
- **Modal**: Accessible modal dialogs
- **Skeleton**: Loading placeholders

### Feature Components
- **SearchBar**: Dynamic search with filters
- **FlightCard**: Flight listing card
- **HotelCard**: Hotel listing card
- **BookingForm**: Multi-step booking form
- **PriceSummary**: Booking price breakdown

## 🔐 Authentication

The app uses JWT-based authentication:
- Login with email and password
- Register new account
- Protected routes for authenticated users
- Persistent sessions with localStorage

## 🎯 Key Features Implementation

### Search & Filtering
```javascript
// Advanced search with debouncing
const debouncedSearch = useDebounce(searchTerm, 500)
const { data } = useQuery(['search', debouncedSearch], fetchResults)
```

### Animations
```javascript
// Smooth page transitions with Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

### API Integration
```javascript
// React Query for data fetching
const { data, isLoading } = useQuery({
  queryKey: ['flights', searchParams],
  queryFn: () => fetchFlights(searchParams)
})
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling Guidelines

- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing (4px grid)
- Use design tokens from theme
- Keep animations subtle and professional

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 🐛 Bug Reports

Found a bug? Please open an issue with detailed reproduction steps.

## 📞 Support

For support, email support@travelease.com or join our Slack channel.

---

Built with ❤️ by TravelEase Team