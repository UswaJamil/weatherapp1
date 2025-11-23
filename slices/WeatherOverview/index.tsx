import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

export type WeatherOverviewProps =
  SliceComponentProps<Content.WeatherOverviewSlice>;

const WeatherOverview: FC<WeatherOverviewProps> = ({ slice }) => {
  return (
    <div className="flex items-center gap-3 w-full h-14">

      {/* Logo from Prismic */}
      <div
        className="w-14 h-14 bg-[#1e1e29] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition"
        onClick={() => (window.location.href = "/")}
      >
        {slice.primary.logo?.url ? (
          <img
            src={slice.primary.logo.url}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        ) : (
          <span className="text-white text-xs opacity-60">No Logo</span>
        )}
      </div>

      {/* Search input placeholder from Prismic */}
      <input
        type="text"
        placeholder={
          slice.primary.search_placeholder || "Buscar local..."
        }
        className="flex-1 h-14 bg-[#1e1e29] rounded-lg text-[#cfcfcf] px-5 placeholder:text-[#7a7a8a] focus:outline-none"
      />
    </div>
  );
};

export default WeatherOverview;
