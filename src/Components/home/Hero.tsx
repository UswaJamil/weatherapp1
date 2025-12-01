'use client';

import React from 'react';
import Image from 'next/image';
import SearchInput from '@/Components/SearchInput';

const Hero = ({ page }: any) => {
  return (
    <div
      className="w-full bg-cover bg-top bg-no-repeat bg-[#0b0b13]"
      style={{ backgroundImage: "url('/Bckground image.png')" }}
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
            <h1 className="text-[clamp(22px,6vw,32px)] font-bold text-white text-center leading-tight -tracking-[0.3px]">
              {page.data.heading}
            </h1>

            <p className="text-[clamp(13px,3.5vw,16px)] text-[#b0b3c0] opacity-[0.88] mt-2 mb-5 text-center leading-[1.35] -tracking-[0.2px]">
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
