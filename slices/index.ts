import dynamic from "next/dynamic";

export const components = {
  weather_overview: dynamic(() => import("./WeatherOverview")), // ✅ exact match with slice_type
  weather_facts: dynamic(() => import("./WeatherFacts")),
  weather_forecast: dynamic(() => import("./WeatherForecast")),
};
