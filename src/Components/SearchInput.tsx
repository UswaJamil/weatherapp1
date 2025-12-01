'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = 'Search Location',
}: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Fetch cities from OpenWeatherMap Geocoding API
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const fetchCities = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=8&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );

        const data = await res.json();

        // 🔥 IMPORTANT FIX → ensure data is an array
        if (!Array.isArray(data)) {
          setResults([]);
          setIsLoading(false);
          return;
        }

        const formatted = data.map((item: any) => ({
          name: `${item.name}${item.state ? ', ' + item.state : ''} - ${item.country}`,
          lat: item.lat,
          lon: item.lon,
        }));

        setResults(formatted);
      } catch {
        setResults([]);
      }

      setIsLoading(false);
    };

    const timeout = setTimeout(fetchCities, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (city: any) => {
    setQuery(city.name);
    setIsOpen(false);

    router.push(
      `/detail?city=${encodeURIComponent(city.name)}&lat=${city.lat}&lon=${city.lon}`
    );
  };

  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="
            w-full 
            h-[52px]
            rounded-xl
            px-5
            pr-12
            bg-[#1E1E29]
            text-[#F1F1F5]
            font-nunito
            shadow-[0_4px_30px_rgba(0,0,0,0.25)]
            outline-none
            placeholder:text-[#7F7F98]
            text-left
          "
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim().length > 0) {
              if (results[0]) {
                router.push(
                  `/detail?city=${encodeURIComponent(results[0].name)}&lat=${results[0].lat}&lon=${results[0].lon}`
                );
              }
            }
          }}
          onFocus={() => setIsOpen(true)}
        />

        {/* RIGHT LOADER */}
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="loader-spinner" />
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      {isOpen && query.length > 0 && !isLoading && (
        <div
          className="
            absolute 
            top-[60px]
            left-0
            w-full
            rounded-xl
            bg-[#3B3B54]/95
            backdrop-blur-xl
            shadow-[0_4px_30px_rgba(0,0,0,0.35)]
            animate-fadeIn
            overflow-hidden
            z-50
          "
        >
          {results.length === 0 && (
            <div className="px-4 py-3 text-[#FAFAFA] font-nunito opacity-70">
              No matching locations
            </div>
          )}

          {results.length > 0 && (
            <ul className="text-[#FAFAFA] text-[15px] font-nunito text-left">
              {results.map((city, i) => (
                <li
                  key={i}
                  className="
                    px-4 
                    py-3
                    border-b 
                    border-[#1E1E29]
                    cursor-pointer
                    hover:bg-[#4A4A66]
                    transition
                  "
                  onMouseDown={() => handleSelect(city)}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
