'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SliceZone } from '@prismicio/react';
import { components as Slices } from '@/slices';
import { useUnitToggle } from '../hooks/useUnit';

import { DETAIL_ICONS, FORECAST_ICONS } from '@/constants/images';
import { COLORS } from '@/constants/colors';

const {
  thermometer: thermometerIcon,
  rain: rainIcon,
  wind: windLight,
  humidity: humidityIcon,
  uv: uvIcon,
} = DETAIL_ICONS;

const { cloudy, rainCloud, sunDim, rain } = FORECAST_ICONS;

export default function RightPanel({
  weather,
  forecast,
  slices,
}: {
  weather: any;
  forecast: any;
  slices: any[];
}) {
  const [fiveDayData, setFiveDayData] = useState<any[]>([]);

  // Use hook for unit handling
  const { convertTemperature: convert, getSymbol: tempSymbol } = useUnitToggle();

  useEffect(() => {
    if (forecast?.list) {
      const daily = forecast.list
        .filter((item: any) => item.dt_txt.includes('12:00:00'))
        .slice(0, 5)
        .map((day: any, index: number) => {
          const condition = day.weather[0].main.toLowerCase();
          const desc = day.weather[0].description.toLowerCase();

          let icon = sunDim;
          if (condition.includes('rain') || condition.includes('drizzle')) {
            icon = rain;
          } else if (condition.includes('cloud')) {
            if (desc.includes('few') || desc.includes('scattered')) {
              icon = rainCloud;
            } else {
              icon = cloudy;
            }
          } else if (condition.includes('clear')) {
            icon = sunDim;
          }

          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

          return {
            day: index === 0 ? 'Tomorrow' : dayName,
            icon,
            desc:
              day.weather[0].description.charAt(0).toUpperCase() +
              day.weather[0].description.slice(1),
            max: convert(day.main.temp_max),
            min: convert(day.main.temp_min),
          };
        });

      setFiveDayData(daily);
    }
  }, [forecast, convert]); // Recalculate when forecast or convert changes

  const displayForecast =
    fiveDayData.length > 0
      ? fiveDayData
      : [
          {
            day: 'Tomorrow',
            icon: rain,
            desc: 'Rain',
            max: convert(32),
            min: convert(26),
          },
          {
            day: 'Wednesday',
            icon: rain,
            desc: 'Rain',
            max: convert(31),
            min: convert(25),
          },
          {
            day: 'Thursday',
            icon: rainCloud,
            desc: 'Few Clouds',
            max: convert(29),
            min: convert(24),
          },
          {
            day: 'Friday',
            icon: cloudy,
            desc: 'Cloudy',
            max: convert(30),
            min: convert(23),
          },
          {
            day: 'Saturday',
            icon: sunDim,
            desc: 'Sunny',
            max: convert(33),
            min: convert(27),
          },
        ];

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4 ">
      <SliceZone slices={slices} components={Slices} />

      <div className="p-6 pb-2 rounded-xl sm:p-3" style={{ backgroundColor: COLORS.panelBg }}>
        <h2 className="hidden sm:block text-[16px] font-normal mb-4" style={{ color: COLORS.placeholderPrimary }}>
          Detalhes do clima hoje
        </h2>

        <div className="flex flex-col">
          {[
            {
              icon: thermometerIcon,
              label: 'Feels Like',
              value: weather?.main?.feels_like
                ? `${convert(weather.main.feels_like)}${tempSymbol()}`
                : '—',
            },
            {
              icon: rainIcon,
              label: 'Probability of Rain',
              value:
                weather?.clouds?.all > 70
                  ? 'High'
                  : weather?.clouds?.all > 40
                  ? 'Medium'
                  : 'Low',
            },
            {
              icon: windLight,
              label: 'Wind Speed',
              value: weather?.wind?.speed
                ? `${Math.round(weather.wind.speed * 3.6)} km/h`
                : '—',
            },
            {
              icon: humidityIcon,
              label: 'Air Humidity',
              value: weather?.main?.humidity
                ? `${weather.main.humidity}%`
                : '—',
            },
            {
              icon: uvIcon,
              label: 'UV Index',
              value: weather
                ? Math.max(1, Math.round(11 - (weather.clouds?.all || 0) / 10))
                : '5',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex justify-between items-center py-4 ${
                i === 4 ? 'border-none' : ''
              }`}
              style={{
                borderBottomColor: i === 4 ? 'transparent' : COLORS.borderMuted,
              }}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.icon}
                  alt=""
                  className="w-8 sm:w-6"
                  width={32}
                  height={32}
                />
                <span className="text-[14px] font-bold" style={{ color: COLORS.textAccent }}>
                  {item.label}
                </span>
              </div>
              <span className="text-[20px] font-bold sm:text-[16px]" style={{ color: COLORS.textPrimary }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl" style={{ backgroundColor: COLORS.panelBg }}>
        <h2 className="hidden sm:block text-[16px] font-normal mb-4" style={{ color: COLORS.placeholderPrimary }}>
          Previsão para 5 dias
        </h2>

        <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 auto-rows-auto">
          {displayForecast.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 sm:gap-2 p-1 sm:p-2 min-w-0"
            >
              <span className="text-[10px] sm:text-[14px] font-bold text-center truncate" style={{ color: COLORS.textAccent }}>
                {item.day}
              </span>
              <Image
                src={item.icon}
                alt={item.desc}
                className="w-[35px] h-[35px] sm:w-[55px] sm:h-[55px] object-contain"
                width={55}
                height={55}
              />
              <span className="hidden sm:block text-[9px] sm:text-[14px] text-center truncate" style={{ color: COLORS.textAccent }}>
                {item.desc}
              </span>
              <div className="flex flex-col sm:flex-row gap-1 font-bold text-[10px] sm:text-[14px]">
                <span style={{ color: COLORS.textPrimary }}>
                  {item.max}
                  {tempSymbol()}
                </span>
                <span style={{ color: COLORS.placeholderPrimary }}>
                  {item.min}
                  {tempSymbol()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
