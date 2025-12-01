// Weather Icons - Day/Night
import clearDay from '@/assets/icons/clear-day.png';
import clearNight from '@/assets/icons/clear-night.png';
import cloudyDay from '@/assets/icons/cloudy-day.png';
import cloudyNight from '@/assets/icons/cloudy-night.png';
import fewcloudsDay from '@/assets/icons/fewclouds-day.png';
import fewcloudsNight from '@/assets/icons/fewclouds-night.png';
import rainDay from '@/assets/icons/rain-day.png';
import rainNight from '@/assets/icons/rain-night.png';
import snowDay from '@/assets/icons/snow-day.png';
import snowNight from '@/assets/icons/snow-night.png';
import stormDay from '@/assets/icons/storm-day.png';
import stormNight from '@/assets/icons/storm-night.png';

// Detail Icons
import thermometerIcon from '@/assets/icons/thermometer.png';
import rainIcon from '@/assets/icons/cloud-rain-light.png';
import windLight from '@/assets/icons/wind-light.png';
import humidityIcon from '@/assets/icons/drop-light.png';
import uvIcon from '@/assets/icons/sun-dim-light.png';

// Forecast Icons
import cloudy from '@/assets/icons/cloudy.png';
import rainCloud from '@/assets/icons/fewcloud.png';
import sunDim from '@/assets/icons/sunny.png';
import rain from '@/assets/icons/rain.png';

// Background Images
const clearDayBg = require('@/assets/images/clearDay.png');
const clearNightBg = require('@/assets/images/clearNight.png');
const cloudyDayBg = require('@/assets/images/cloudyDay.png');
const cloudyNightBg = require('@/assets/images/cloudyNight.png');
const fewcloudsDayBg = require('@/assets/images/fewcloudsDay.png');
const fewcloudsNightBg = require('@/assets/images/fewcloudsNight.png');
const rainDayBg = require('@/assets/images/rainDay.png');
const rainNightBg = require('@/assets/images/rainNight.png');
const snowDayBg = require('@/assets/images/snowDay.png');
const snowNightBg = require('@/assets/images/snowNight.png');
const stormDayBg = require('@/assets/images/stormDay.png');
const stormNightBg = require('@/assets/images/stormNight.png');

export const WEATHER_ICONS = {
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
};

export const DETAIL_ICONS = {
  thermometer: thermometerIcon,
  rain: rainIcon,
  wind: windLight,
  humidity: humidityIcon,
  uv: uvIcon,
};

export const FORECAST_ICONS = {
  cloudy,
  rainCloud,
  sunDim,
  rain,
};

export const BACKGROUND_IMAGES = {
  'Clear-Day': clearDayBg,
  'Clear-Night': clearNightBg,
  'Cloudy-Day': cloudyDayBg,
  'Cloudy-Night': cloudyNightBg,
  'FewClouds-Day': fewcloudsDayBg,
  'FewClouds-Night': fewcloudsNightBg,
  'Rain-Day': rainDayBg,
  'Rain-Night': rainNightBg,
  'Snow-Day': snowDayBg,
  'Snow-Night': snowNightBg,
  'Storm-Day': stormDayBg,
  'Storm-Night': stormNightBg,
};
