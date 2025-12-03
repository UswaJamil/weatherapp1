'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationSearch, useLocationSelect } from '../hooks/useSearch';
import { SearchResult, SearchInputProps } from '@/constants/types';
import { COLORS } from '@/constants/colors';

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
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `
      }} />
      <div ref={wrapperRef} className="relative w-full max-w-[360px] mx-auto">
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-[52px] rounded-xl px-5 pr-12 font-nunito shadow-[0_4px_30px_rgba(0,0,0,0.25)] outline-none text-left"
          style={{
            backgroundColor: COLORS.inputBg,
            color: COLORS.textLightAlt,
          }}
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
            <div
              style={{
                width: '22px',
                height: '22px',
                display: 'inline-block',
                borderRadius: '50%',
                border: '3px solid rgba(150, 170, 200, 0.35)',
                borderTopColor: 'rgba(150, 170, 200, 0.9)',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      {isOpen && query.length > 0 && !loading && (
        <div className="absolute top-[60px] left-0 w-full rounded-xl backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.35)] animate-fadeIn overflow-hidden z-50" style={{ backgroundColor: `${COLORS.cardBg}95` }}>
          {results.length === 0 ? (
            <div className="px-4 py-3 font-nunito opacity-70" style={{ color: COLORS.textLight }}>
              No matching locations
            </div>
          ) : (
            <ul className="text-[15px] font-nunito text-left" style={{ color: COLORS.textLight }}>
              {results.map((city: SearchResult) => (
                <li
                  key={`${city.lat}-${city.lon}`}
                  className="px-4 py-3 cursor-pointer transition"
                  style={{
                    borderBottomColor: COLORS.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
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
    </>
  );
}
