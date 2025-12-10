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
  useEffect(() => {
    searchParams.then((params) => {
      const { city, lat, lon } = params;
      if (lat && lon) {
        setLocation({
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          city: city
        });
      } else if (city?.trim()) {
        setLocation({ city: city.trim() });
      }
    });
  }, [searchParams]);

  const { weather, forecast, loading } = useWeatherAndForecast(
    location.city || 'Karachi',
    location.lat,
    location.lon
  );

  const slices: unknown[] = [];

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
