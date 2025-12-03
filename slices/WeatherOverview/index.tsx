import { FC } from 'react';
import { SliceComponentProps } from '@prismicio/react';
import { Content } from '@prismicio/client';
import { WeatherOverviewProps } from '@/constants/types';
import { COLORS } from '@/constants/colors';

const WeatherOverview: FC<WeatherOverviewProps> = ({ slice }) => {
  return (
    <div className="flex items-center gap-3 w-full h-14">
      {/* Logo from Prismic */}
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition"
        style={{ backgroundColor: COLORS.inputBg }}
        onClick={() => (window.location.href = '/')}
      >
        {slice.primary.logo?.url ? (
          <img
            src={slice.primary.logo.url}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        ) : (
          <span className="text-xs opacity-60" style={{ color: COLORS.textPrimary }}>No Logo</span>
        )}
      </div>

      {/* Search input placeholder from Prismic */}
      <input
        type="text"
        placeholder={slice.primary.search_placeholder || 'Buscar local...'}
        className="flex-1 h-14 rounded-lg px-5 focus:outline-none"
        style={{
          backgroundColor: COLORS.inputBg,
          color: COLORS.textMuted,
        }}
      />
    </div>
  );
};

export default WeatherOverview;
