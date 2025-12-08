'use client';

import React from 'react';
import Image from 'next/image';
import SearchInput from '@/Components/SearchInput';
import { COLORS } from '@/constants/colors';

const Hero = ({ page }: any) => {
  return (
    <div
      className={`w-full bg-cover bg-top bg-no-repeat`}
      style={{
        backgroundImage: "url('/Bckground image.png')",
        backgroundColor: COLORS.background
      }}
    >
      <div
        className="
          w-full
          flex
          flex-col
          items-center
          justify-start
          pt-6
        "
      >
        {/* Logo */}
        <div className="mb-8">
          <Image
            src={page.data.logo.url || '/logo.png'}
            alt={page.data.logo.alt || 'icon'}
            width={186}
            height={32}
            className="logo block mx-auto"
            priority
          />
        </div>

        <div
          className="
            min-h-screen
            w-full
            flex
            flex-col
            items-center
            justify-start
            pt-20
            md:pt-32
            lg:pt-40
            px-5
          "
        >
          {/* Content wrapper */}
          <div className="w-full max-w-sm md:max-w-2xl text-center">
            <h1 className="text-[clamp(32px,6vw,32px)] font-bold text-center leading-tight -tracking-[0.3px]" style={{ color: COLORS.textPrimary }}>
              {page.data.heading}
            </h1>

            <p className="text-[clamp(20px,3.5vw,20px)] opacity-[0.88] mt-2 mb-5 text-center leading-[1.35] -tracking-[0.2px]" style={{ color: COLORS.textSecondary }}>
              {page.data.subtitle}
            </p>

            {/* Search Input */}
            <div className="w-full max-w-sm md:max-w-2xl mx-auto">
              <SearchInput placeholder={page.data.search_placeholder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
