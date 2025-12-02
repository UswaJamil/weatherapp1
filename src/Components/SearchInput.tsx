'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationSearch, useLocationSelect } from '../hooks/useSearch';
import { SearchResult } from '@/store/slices/searchSlice';

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ placeholder = 'Search Location' }: SearchInputProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { results, loading, query, search } = useLocationSearch();
  const { selectLocation } = useLocationSelect();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: SearchResult) => {
    const formatted = selectLocation(city);
    setIsOpen(false);
    router.push(
      `/detail?city=${encodeURIComponent(formatted)}&lat=${city.lat}&lon=${city.lon}`
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[360px] mx-auto">
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-[52px] rounded-xl px-5 pr-12 bg-[#1E1E29] text-[#F1F1F5] font-nunito shadow-[0_4px_30px_rgba(0,0,0,0.25)] outline-none placeholder:text-[#7F7F98] text-left"
          value={query}
          onChange={(e) => {
            search(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim().length > 0 && results[0]) {
              handleSelect(results[0]);
            }
          }}
          onFocus={() => setIsOpen(true)}
        />

        {/* LOADER */}
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="loader-spinner" />
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      {isOpen && query.length > 0 && !loading && (
        <div className="absolute top-[60px] left-0 w-full rounded-xl bg-[#3B3B54]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.35)] animate-fadeIn overflow-hidden z-50">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-[#FAFAFA] font-nunito opacity-70">
              No matching locations
            </div>
          ) : (
            <ul className="text-[#FAFAFA] text-[15px] font-nunito text-left">
              {results.map((city) => (
                <li
                  key={`${city.lat}-${city.lon}`}
                  className="px-4 py-3 border-b border-[#1E1E29] cursor-pointer hover:bg-[#4A4A66] transition"
                  onMouseDown={() => handleSelect(city)}
                >
                  {selectLocation(city)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
