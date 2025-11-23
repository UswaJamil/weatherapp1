"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SliceZone } from "@prismicio/react";
import { components as Slices } from "@/slices";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

// icons
import thermometerIcon from "../assets/icons/thermometer.png";
import rainIcon from "../assets/icons/cloud-rain-light.png";
import windLight from "../assets/icons/wind-light.png";
import humidityIcon from "../assets/icons/drop-light.png";
import uvIcon from "../assets/icons/sun-dim-light.png";

import cloudy from "../assets/icons/cloudy.png";
import rainCloud from "../assets/icons/fewcloud.png";
import sunDim from "../assets/icons/sunny.png";
import rain from "../assets/icons/rain.png";

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
  const unit = useSelector((state: RootState) => state.unit.unit); // Redux unit
  const tempSymbol = unit === "metric" ? "°C" : "°F";

  const convert = (temp: number) =>
    unit === "metric" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);

  useEffect(() => {
    if (forecast?.list) {
      const daily = forecast.list
        .filter((item: any) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5)
        .map((day: any, index: number) => {
          const condition = day.weather[0].main.toLowerCase();
          const desc = day.weather[0].description.toLowerCase();

          let icon = sunDim;
          if (condition.includes("rain") || condition.includes("drizzle")) {
            icon = rain;
          } else if (condition.includes("cloud")) {
            if (desc.includes("few") || desc.includes("scattered")) {
              icon = rainCloud;
            } else {
              icon = cloudy;
            }
          } else if (condition.includes("clear")) {
            icon = sunDim;
          }

          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          return {
            day: index === 0 ? "Tomorrow" : dayName,
            icon,
            desc: day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1),
            max: convert(day.main.temp_max),
            min: convert(day.main.temp_min),
          };
        });

      setFiveDayData(daily);
    }
  }, [forecast, unit]); // Recalculate when unit changes

  const displayForecast = fiveDayData.length > 0 ? fiveDayData : [
    { day: "Tomorrow", icon: rain, desc: "Rain", max: convert(32), min: convert(26) },
    { day: "Wednesday", icon: rain, desc: "Rain", max: convert(31), min: convert(25) },
    { day: "Thursday", icon: rainCloud, desc: "Few Clouds", max: convert(29), min: convert(24) },
    { day: "Friday", icon: cloudy, desc: "Cloudy", max: convert(30), min: convert(23) },
    { day: "Saturday", icon: sunDim, desc: "Sunny", max: convert(33), min: convert(27) },
  ];

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4 ">
      <SliceZone slices={slices} components={Slices} />

      <div className="bg-[#16161F] p-6 pb-2 rounded-xl sm:p-3">
        <h2 className="hidden sm:block text-[16px] font-normal text-[#7f7f98] mb-4">
          Detalhes do clima hoje
        </h2>

        <div className="flex flex-col">
          {[
            {
              icon: thermometerIcon,
              label: "Feels Like",
              value: weather?.main?.feels_like ? `${convert(weather.main.feels_like)}${tempSymbol}` : "—",
            },
            {
              icon: rainIcon,
              label: "Probability of Rain",
              value: weather?.clouds?.all > 70 ? "High" : weather?.clouds?.all > 40 ? "Medium" : "Low",
            },
            {
              icon: windLight,
              label: "Wind Speed",
              value: weather?.wind?.speed ? `${Math.round(weather.wind.speed * 3.6)} km/h` : "—",
            },
            {
              icon: humidityIcon,
              label: "Air Humidity",
              value: weather?.main?.humidity ? `${weather.main.humidity}%` : "—",
            },
            {
              icon: uvIcon,
              label: "UV Index",
              value: weather ? Math.max(1, Math.round(11 - (weather.clouds?.all || 0) / 10)) : "5",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex justify-between items-center py-4 border-b border-[#1C1C27] ${i === 4 ? "border-none" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Image src={item.icon} alt="" className="w-8 sm:w-6" width={32} height={32} />
                <span className="text-[14px] font-bold text-[#BFBFD4]">{item.label}</span>
              </div>
              <span className="text-[20px] font-bold sm:text-[16px] text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#16161F] p-4 sm:p-6 rounded-xl">
        <h2 className="hidden sm:block text-[16px] font-normal text-[#7f7f98] mb-4">
          Previsão para 5 dias
        </h2>

        <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 auto-rows-auto">
          {displayForecast.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 p-1 sm:p-2 min-w-0">
              <span className="text-[10px] sm:text-[14px] text-[#BFBFD4] font-bold text-center truncate">
                {item.day}
              </span>
              <Image
                src={item.icon}
                alt={item.desc}
                className="w-[35px] h-[35px] sm:w-[55px] sm:h-[55px] object-contain"
                width={55}
                height={55}
              />
              <span className="hidden sm:block text-[9px] sm:text-[14px] text-[#BFBFD4] text-center truncate">
                {item.desc}
              </span>
              <div className="flex flex-col sm:flex-row gap-1 font-bold text-[10px] sm:text-[14px]">
                <span className="text-white">{item.max}{tempSymbol}</span>
                <span className="text-[#7f7f98]">{item.min}{tempSymbol}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
