'use client';

import { useState, useEffect } from 'react';
import LeftPanel from '@/Components/leftPanel';
import RightPanel from '@/Components/rightPanel.';
import { useWeatherAndForecast } from '@/hooks/useWeather';

export default function DetailPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; lat?: string; lon?: string }>;
}) {
  const [location, setLocation] = useState<{ city?: string; lat?: number; lon?: number }>({
    city: 'Karachi'
  });

  // Handle searchParams in client component
  useEffect(() => {
    searchParams.then((params) => {
      const { city, lat, lon } = params;
      if (lat && lon) {
        // Use coordinates if available (more accurate)
        setLocation({
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          city: city // Keep city name for display
        });
      } else if (city?.trim()) {
        // Fallback to city name only
        setLocation({ city: city.trim() });
      }
    });
  }, [searchParams]);

  const { weather, forecast, loading } = useWeatherAndForecast(
    location.city || 'Karachi',
    location.lat,
    location.lon
  );

  // You can implement Prismic slices fetching in a separate hook or slice
  const slices: any[] = [];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex gap-6 max-[1024px]:flex-col min-h-screen bg-black p-4">
      <LeftPanel weather={weather} forecast={forecast} slices={slices} />
      <RightPanel weather={weather} forecast={forecast} slices={slices} />
    </div>
  );
}
