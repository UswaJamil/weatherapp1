'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SliceZone } from '@prismicio/react';
import { components as Slices } from '@/slices';
import { WEATHER_ICONS, BACKGROUND_IMAGES } from '@/constants/images';
import UnitToggle from '@/Components/UnitToggle';
import { useUnitToggle } from '../hooks/useUnit';
import { useLocationSearch, useLocationSelect } from '../hooks/useSearch';
import { SearchResult } from '@/constants/types';
import { COLORS } from '@/constants/colors';

const {
  clearDay,
  clearNight,
  cloudyDay,
  cloudyNight,
  fewcloudsDay,
  fewcloudsNight,
  rainDay,
  rainNight,
  snowDay,
  snowNight,
  stormDay,
  stormNight,
} = WEATHER_ICONS;

const backgrounds = BACKGROUND_IMAGES;

const getBackgroundImage = (weather: any) => {
  if (!weather || !weather.weather?.[0]) return backgrounds['Clear-Day'];
  const main = weather.weather[0].main.toLowerCase();
  const desc = weather.weather[0].description.toLowerCase();
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;
  const time = isNight ? 'Night' : 'Day';

  if (main.includes('thunderstorm') || desc.includes('storm'))
    return backgrounds[`Storm-${time}`];
  if (main.includes('rain') || main.includes('drizzle'))
    return backgrounds[`Rain-${time}`];
  if (main.includes('snow')) return backgrounds[`Snow-${time}`];
  if (main.includes('cloud')) {
    if (desc.includes('few clouds') || desc.includes('scattered'))
      return backgrounds[`FewClouds-${time}`];
    return backgrounds[`Cloudy-${time}`];
  }
  return backgrounds[`Clear-${time}`];
};

const getWeatherIcon = (weather: any) => {
  if (!weather || !weather.weather?.[0]) return clearDay;
  const main = weather.weather[0].main.toLowerCase();
  const desc = weather.weather[0].description.toLowerCase();
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;

  if (main.includes('thunderstorm') || desc.includes('storm'))
    return isNight ? stormNight : stormDay;
  if (main.includes('rain') || main.includes('drizzle'))
    return isNight ? rainNight : rainDay;
  if (main.includes('snow')) return isNight ? snowNight : snowDay;
  if (main.includes('cloud')) {
    if (desc.includes('few clouds') || desc.includes('scattered'))
      return isNight ? fewcloudsNight : fewcloudsDay;
    return isNight ? cloudyNight : cloudyDay;
  }
  return isNight ? clearNight : clearDay;
};

export default function LeftPanel({
  weather,
  forecast,
  slices
}: {
  weather: any;
  forecast: any;
  slices: any[];
}) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('--:--');
  const { convertTemperature, getSymbol } = useUnitToggle();

  // Search Logic
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

  useEffect(() => {
    const update = () =>
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const todayTempMax =
    forecast?.list?.[0]?.main?.temp_max ?? weather?.main?.temp ?? 0;
  const todayTempMin =
    forecast?.list?.[0]?.main?.temp_min ?? weather?.main?.temp ?? 0;

  return (
    <div className="flex flex-col gap-4 w-full lg:w-1/2 p-4 rounded-xl relative" style={{ backgroundColor: COLORS.panelBg }}>
      {/* Logo + Search */}
      <div className="flex items-center gap-3 w-full h-14">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          style={{ backgroundColor: COLORS.inputBg }}
          onClick={() => (window.location.href = '/')}
        >
          <img
            src={
              weather?.logo?.url ||
              'https://images.prismic.io/weather-ap/aSByIWGnmrmGqHrZ_logoIcon.png?auto=format,compress'
            }
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div ref={wrapperRef} className="relative flex-1 h-14">
          <input
            type="text"
            placeholder="Buscar local..."
            className="w-full h-full rounded-lg px-5 focus:outline-none"
            style={{
              backgroundColor: COLORS.inputBg,
              color: COLORS.textMuted,
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
      </div>

      {/* SliceZone */}
      <SliceZone slices={slices} components={Slices} />

      {/* Weather Card */}
      <div
        className="relative rounded-lg overflow-hidden h-[632px] md:h-[460px] sm:h-[335px] xs:h-[300px]"
        style={{
          backgroundImage: `url(${getBackgroundImage(weather)?.default?.src ||
            getBackgroundImage(weather)?.src
            })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}
      >
        {/* City & Time */}
        <div className="absolute top-4 left-4 right-4 flex justify-between text-sm sm:text-base" style={{ color: COLORS.textPrimary }}>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {weather?.name || 'Karachi'}
            </h1>
            <p className="text-xs sm:text-sm opacity-90">{formattedDate}</p>
          </div>
          <div className="text-xl sm:text-2xl font-semibold">{currentTime}</div>
        </div>

        {/* Temp + Condition */}
        <div className="absolute bottom-16 sm:bottom-10 left-4 flex flex-col" style={{ color: COLORS.textPrimary }}>
          <div className="flex items-center gap-2">
            <span className="text-6xl sm:text-8xl md:text-8xl font-extrabold leading-none">
              {weather ? convertTemperature(weather.main.temp) : '--'}
            </span>
            <UnitToggle />
          </div>

          <div className="text-sm sm:text-xl opacity-90 mt-1">
            <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-2">
              <span>{`${convertTemperature(todayTempMax)}${getSymbol()} / ${convertTemperature(
                todayTempMin
              )}${getSymbol()}`}</span>
              <span>•</span>
              <span className="capitalize">{weather?.weather[0].description}</span>
            </div>
            <div className="flex flex-col sm:hidden">
              <span>{`${convertTemperature(todayTempMax)}${getSymbol()} / ${convertTemperature(
                todayTempMin
              )}${getSymbol()}`}</span>
              <span className="capitalize">{weather?.weather[0].description}</span>
            </div>
          </div>
        </div>

        {/* Weather Icon */}
        <Image
          src={getWeatherIcon(weather)}
          alt="Weather"
          width={148}
          height={148}
          className="absolute right-1 sm:right-1 bottom-6 sm:bottom-1 w-[148px] h-[148px] sm:w-[248px] sm:h-[248px] drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}

