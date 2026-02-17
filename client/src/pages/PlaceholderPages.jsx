import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Construction, 
  Plane,
  Building2,
  Home,
  Train,
  Bus,
  Car,
  Lightbulb,
  FileText,
  Ship,
  CreditCard,
  Shield,
  MapPin,
  Hotel,
  Mountain,
  Navigation,
  Calendar
} from 'lucide-react';

// Generic placeholder page component
const PlaceholderPage = ({ title, icon: Icon, description, features }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-10 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Icon className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Under Development Banner */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Construction className="w-6 h-6 text-yellow-600" />
              <span className="text-yellow-800 font-bold text-lg">Coming Soon!</span>
            </div>
            <p className="text-center sm:text-left text-yellow-700 font-medium">
              This feature is under active development and will be available soon.
            </p>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="w-full max-w-md bg-yellow-100 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {features && features.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Exciting Features Coming Soon
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    {index % 4 === 0 && <MapPin className="w-5 h-5 text-blue-600" />}
                    {index % 4 === 1 && <Calendar className="w-5 h-5 text-green-600" />}
                    {index % 4 === 2 && <Hotel className="w-5 h-5 text-purple-600" />}
                    {index % 4 === 3 && <Navigation className="w-5 h-5 text-red-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-700">1000+</div>
            <div className="text-sm text-blue-600">Options</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-700">24/7</div>
            <div className="text-sm text-green-600">Support</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-700">Best</div>
            <div className="text-sm text-purple-600">Prices</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-700">Easy</div>
            <div className="text-sm text-orange-600">Booking</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center gap-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors w-full sm:w-auto"
          >
            Notify Me When Live
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-gray-200">
          We're working hard to bring you an amazing experience. Estimated launch: Q2 2024
        </p>
      </div>
    </div>
  );
};

// Individual page exports with features
export const FlightsPage = () => (
  <PlaceholderPage
    title="Flight Booking"
    icon={Plane}
    description="Search and book domestic & international flights with exclusive deals and real-time availability."
    features={[
      { title: "Real-time Prices", description: "Live flight fares and seat availability" },
      { title: "Flexible Dates", description: "View fares across multiple dates" },
      { title: "Loyalty Rewards", description: "Earn points on every booking" },
      { title: "Easy Cancellation", description: "Simple refund and rescheduling process" }
    ]}
  />
);

export const HotelsPage = () => (
  <PlaceholderPage
    title="Hotel Booking"
    icon={Building2}
    description="Find and book hotels, resorts, and accommodations worldwide with verified reviews."
    features={[
      { title: "Verified Reviews", description: "Real guest reviews and ratings" },
      { title: "Best Price Guarantee", description: "Lowest prices or we match it" },
      { title: "Free Cancellation", description: "Cancel for free until check-in" },
      { title: "Member Discounts", description: "Exclusive deals for members" }
    ]}
  />
);

export const HomestaysPage = () => (
  <PlaceholderPage
    title="Villas & Homestays"
    icon={Home}
    description="Book unique stays in villas and homestays for an authentic local experience."
    features={[
      { title: "Unique Properties", description: "Carefully curated local stays" },
      { title: "Local Hosts", description: "Connect with friendly local hosts" },
      { title: "Full Privacy", description: "Enjoy complete privacy and space" },
      { title: "Kitchen Access", description: "Cook your own meals with full kitchens" }
    ]}
  />
);

export const TrainsPage = () => (
  <PlaceholderPage
    title="Train Tickets"
    icon={Train}
    description="Book train tickets across India with real-time PNR status and seat selection."
    features={[
      { title: "Live PNR Status", description: "Real-time seat confirmation updates" },
      { title: "Seat Selection", description: "Choose your preferred seats" },
      { title: "Food in Train", description: "Pre-book meals for your journey" },
      { title: "Train Tracking", description: "Live train running status" }
    ]}
  />
);

export const BusesPage = () => (
  <PlaceholderPage
    title="Bus Booking"
    icon={Bus}
    description="Search and book bus tickets for intercity and interstate travel with seat selection."
    features={[
      { title: "Multiple Operators", description: "Choose from top bus operators" },
      { title: "Seat Selection", description: "Pick your preferred seat on the bus" },
      { title: "Live Tracking", description: "Real-time bus tracking" },
      { title: "Bus Amenities", description: "View bus type and facilities" }
    ]}
  />
);

export const CabsPage = () => (
  <PlaceholderPage
    title="Cab Services"
    icon={Car}
    description="Book cabs and airport transfers for convenient local travel with transparent pricing."
    features={[
      { title: "Instant Booking", description: "Book cabs in under 60 seconds" },
      { title: "Transparent Pricing", description: "No hidden charges or surge pricing" },
      { title: "Ride Tracking", description: "Live tracking of your cab" },
      { title: "Multiple Options", description: "Economy, Premium, and SUV options" }
    ]}
  />
);

export const ToursPage = () => (
  <PlaceholderPage
    title="Tours & Attractions"
    icon={Lightbulb}
    description="Discover and book exciting tours and popular attractions with local guides."
    features={[
      { title: "Local Guides", description: "Experienced local tour guides" },
      { title: "Flexible Itineraries", description: "Customize your tour experience" },
      { title: "Skip-the-Line", description: "Priority access to attractions" },
      { title: "Group Discounts", description: "Special rates for group bookings" }
    ]}
  />
);

export const VisaPage = () => (
  <PlaceholderPage
    title="Visa Services"
    icon={FileText}
    description="Get expert assistance with visa applications and documentation for hassle-free travel."
    features={[
      { title: "Expert Guidance", description: "Visa specialists to assist you" },
      { title: "Document Checklist", description: "Complete checklist for each country" },
      { title: "Application Tracking", description: "Track your visa application" },
      { title: "Interview Preparation", description: "Mock interviews and tips" }
    ]}
  />
);

export const CruisePage = () => (
  <PlaceholderPage
    title="Cruise Packages"
    icon={Ship}
    description="Explore and book luxury cruise packages worldwide with all-inclusive deals."
    features={[
      { title: "All-Inclusive", description: "Food, drinks, and entertainment included" },
      { title: "Cabin Selection", description: "Choose from various cabin types" },
      { title: "Shore Excursions", description: "Curated port city tours" },
      { title: "Family Packages", description: "Special deals for families" }
    ]}
  />
);

export const ForexPage = () => (
  <PlaceholderPage
    title="Forex Card & Currency"
    icon={CreditCard}
    description="Get forex cards and currency exchange services with competitive rates for travel."
    features={[
      { title: "Zero Markup", description: "Best exchange rates guaranteed" },
      { title: "Multi-Currency", description: "Single card for multiple currencies" },
      { title: "Instant Reload", description: "Reload your card anytime online" },
      { title: "Global Acceptance", description: "Accepted worldwide" }
    ]}
  />
);

export const InsurancePage = () => (
  <PlaceholderPage
    title="Travel Insurance"
    icon={Shield}
    description="Protect your trip with comprehensive travel insurance coverage from top providers."
    features={[
      { title: "COVID Cover", description: "Medical expenses for COVID-19" },
      { title: "Trip Cancellation", description: "Coverage for trip cancellations" },
      { title: "Medical Emergency", description: "Worldwide medical coverage" },
      { title: "Instant Policy", description: "Get your policy instantly online" }
    ]}
  />
);

// Default export (for backward compatibility)
const PlaceholderPages = ({ title = "Coming Soon" }) => {
  // Map title to appropriate icon
  const getIcon = () => {
    switch(title.toLowerCase()) {
      case 'flights': return Plane;
      case 'hotels': return Building2;
      case 'homestays': return Home;
      case 'trains': return Train;
      case 'buses': return Bus;
      case 'cabs': return Car;
      case 'tours': return Lightbulb;
      case 'visa': return FileText;
      case 'cruise': return Ship;
      case 'forex': return CreditCard;
      case 'insurance': return Shield;
      default: return Mountain;
    }
  };

  return (
    <PlaceholderPage
      title={`${title} Section`}
      icon={getIcon()}
      description={`We're working hard to bring you the best ${title.toLowerCase()} booking experience with amazing features and competitive pricing.`}
      features={[
        { title: "Easy Booking", description: "Simple and intuitive booking process" },
        { title: "Best Prices", description: "Competitive pricing guaranteed" },
        { title: "24/7 Support", description: "Round-the-clock customer support" },
        { title: "Secure Payments", description: "Safe and secure payment options" }
      ]}
    />
  );
};

export default PlaceholderPages;