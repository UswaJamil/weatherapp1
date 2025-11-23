"use client";

import React from "react";
import Image from "next/image";
import SearchInput from "../SearchInput";

const Hero = ({ page }: any) => {
  return (
    <div className="bg-new">
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
            src={page.data.logo.url || "/logo.png"}
            alt={page.data.logo.alt || "icon"}
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
          <div className="w-full max-w-[360px] md:max-w-[504px] text-center">
            <h1 className="welcome-title no-break">
              {page.data.heading}
            </h1>

            <p className="subtitle">
              {page.data.subtitle}
            </p>

            {/* Search Input */}
            <div className="search-input-wrap">
              <SearchInput placeholder={page.data.search_placeholder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
