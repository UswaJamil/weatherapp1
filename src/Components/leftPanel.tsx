'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SliceZone } from '@prismicio/react';
import { components as Slices } from '@/slices';
import { useSelector } from 'react-redux';

import { WEATHER_ICONS, BACKGROUND_IMAGES } from '@/constants/images';
import UnitToggle from '@/Components/UnitToggle';
import { RootState } from '@/store';

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
  slices,
}: {
  weather: any;
  forecast: any;
  slices: any;
}) {
  const [currentTime, setCurrentTime] = useState('--:--');
  const unit = useSelector((state: RootState) => state.unit.unit);
  const symbol = unit === 'metric' ? '°C' : '°F';

  const convert = (temp: number) => {
    return unit === 'metric'
      ? Math.round(temp)
      : Math.round((temp * 9) / 5 + 32);
  };

  useEffect(() => {
    const update = () =>
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
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

  // Get today's max/min from forecast if available
  const todayTempMax =
    forecast?.list?.[0]?.main?.temp_max ?? weather?.main?.temp ?? 0;
  const todayTempMin =
    forecast?.list?.[0]?.main?.temp_min ?? weather?.main?.temp ?? 0;

  return (
    <div className="flex flex-col gap-4 w-full lg:w-1/2 bg-[#16161F] p-4 rounded-xl relative">
      {/* Logo + Search */}
      <div className="flex items-center gap-3 w-full h-14">
        <div
          className="w-14 h-14 bg-[#1e1e29] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition"
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
        <input
          type="text"
          placeholder="Buscar local..."
          className="flex-1 h-14 bg-[#1e1e29] rounded-lg text-[#cfcfcf] px-5 placeholder:text-[#7a7a8a] focus:outline-none"
        />
      </div>

      {/* SliceZone */}
      <SliceZone slices={slices} components={Slices} />

      {/* Weather Card */}
      <div
        className="relative rounded-lg overflow-hidden h-[520px] md:h-[460px] sm:h-[380px] xs:h-[300px]"
        style={{
          backgroundImage: `url(${
            getBackgroundImage(weather)?.default?.src ||
            getBackgroundImage(weather)?.src
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* City & Time */}
        <div className="absolute top-4 left-4 right-4 flex justify-between text-white text-sm sm:text-base">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {weather?.name || 'Karachi'}
            </h1>
            <p className="text-xs sm:text-sm opacity-90">{formattedDate}</p>
          </div>
          <div className="text-xl sm:text-2xl font-semibold">{currentTime}</div>
        </div>

        {/* Temp + Condition with inline toggle */}
        {/* Temp + Condition with inline smaller toggle */}
        <div className="absolute bottom-16 sm:bottom-10 left-4 text-white flex flex-col">
          <div className="flex items-center gap-2">
            {/* Temperature number */}
            <span className="text-6xl sm:text-8xl md:text-8xl font-extrabold leading-none">
              {weather ? `${convert(weather.main.temp)}` : `31`}
            </span>

            {/* Inline UnitToggle matching temp size */}
            <UnitToggle />
          </div>

          <div className="text-sm sm:text-xl opacity-90 mt-1">
            {/* Max / Min and description */}
            <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-2">
              <span>{`${convert(weather.main.temp_max)}${unit === 'metric' ? '°C' : '°F'} / ${convert(
                weather.main.temp_min
              )}${unit === 'metric' ? '°C' : '°F'}`}</span>
              <span>•</span>
              <span className="capitalize">
                {weather.weather[0].description}
              </span>
            </div>

            <div className="flex flex-col sm:hidden">
              <span>{`${convert(weather.main.temp_max)}${unit === 'metric' ? '°C' : '°F'} / ${convert(
                weather.main.temp_min
              )}${unit === 'metric' ? '°C' : '°F'}`}</span>
              <span className="capitalize">
                {weather.weather[0].description}
              </span>
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
