import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useSearchFilter = (items, serviceType) => {
  const location = useLocation();
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const parsedParams = {};
    
    for (let [key, value] of params.entries()) {
      try {
        // Try to parse JSON values (like passengers object)
        parsedParams[key] = JSON.parse(value);
      } catch {
        parsedParams[key] = value;
      }
    }
    
    setSearchParams(parsedParams);
  }, [location.search]);

  useEffect(() => {
    if (Object.keys(searchParams).length === 0) {
      setFilteredItems(items);
      return;
    }

    let filtered = [...items];

    switch (serviceType) {
      case 'flights':
        if (searchParams.from) {
          filtered = filtered.filter(flight => 
            flight.from?.city?.toLowerCase().includes(searchParams.from.toLowerCase()) ||
            flight.from?.code?.toLowerCase().includes(searchParams.from.toLowerCase())
          );
        }
        if (searchParams.to) {
          filtered = filtered.filter(flight => 
            flight.to?.city?.toLowerCase().includes(searchParams.to.toLowerCase()) ||
            flight.to?.code?.toLowerCase().includes(searchParams.to.toLowerCase())
          );
        }
        if (searchParams.departDate) {
          // Filter by date logic here
        }
        break;

      case 'hotels':
        if (searchParams.destination) {
          filtered = filtered.filter(hotel => 
            hotel.city?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
            hotel.name?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
            hotel.location?.toLowerCase().includes(searchParams.destination.toLowerCase())
          );
        }
        break;

      case 'packages':
        if (searchParams.destination) {
          filtered = filtered.filter(pkg => 
            pkg.destination?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
            pkg.name?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
            pkg.location?.toLowerCase().includes(searchParams.destination.toLowerCase())
          );
        }
        break;

      case 'trains':
        if (searchParams.from) {
          filtered = filtered.filter(train => 
            train.from?.city?.toLowerCase().includes(searchParams.from.toLowerCase()) ||
            train.from?.code?.toLowerCase().includes(searchParams.from.toLowerCase())
          );
        }
        if (searchParams.to) {
          filtered = filtered.filter(train => 
            train.to?.city?.toLowerCase().includes(searchParams.to.toLowerCase()) ||
            train.to?.code?.toLowerCase().includes(searchParams.to.toLowerCase())
          );
        }
        break;

      case 'buses':
        if (searchParams.from) {
          filtered = filtered.filter(bus => 
            bus.from?.city?.toLowerCase().includes(searchParams.from.toLowerCase())
          );
        }
        if (searchParams.to) {
          filtered = filtered.filter(bus => 
            bus.to?.city?.toLowerCase().includes(searchParams.to.toLowerCase())
          );
        }
        break;

      case 'cabs':
        if (searchParams.pickup) {
          filtered = filtered.filter(cab => 
            cab.location?.toLowerCase().includes(searchParams.pickup.toLowerCase())
          );
        }
        break;

      case 'cruises':
        if (searchParams.destination) {
          filtered = filtered.filter(cruise => 
            cruise.destination?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
            cruise.name?.toLowerCase().includes(searchParams.destination.toLowerCase())
          );
        }
        break;

      case 'visa':
        if (searchParams.country) {
          filtered = filtered.filter(visa => 
            visa.name?.toLowerCase().includes(searchParams.country.toLowerCase()) ||
            visa.country?.toLowerCase().includes(searchParams.country.toLowerCase())
          );
        }
        break;

      default:
        break;
    }

    setFilteredItems(filtered);
  }, [items, searchParams, serviceType]);

  return { filteredItems, searchParams, hasSearch: Object.keys(searchParams).length > 0 };
};