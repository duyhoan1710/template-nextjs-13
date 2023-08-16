"use client";

import { useEffect, useRef } from "react";
import Countdown from "./countdown";

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScrollBanner = () => {
      bannerRef.current?.style.setProperty(
        "background-position",
        `0 ${window.scrollY / 2.5}px`,
      );
    };
    window.addEventListener("scroll", onScrollBanner);

    return () => window.removeEventListener("scroll", onScrollBanner);
  }, []);

  return (
    <div
      className="relative h-[55vh] w-full md:h-screen"
      style={{
        backgroundImage: "url('/assets/main.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      ref={bannerRef}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-50"></div>

      <div className="absolute top-[25%] bottom-0 left-0 right-0 z-20 text-center text-white md:top-[18%]">
        <div className="animate-box">
          <h1 className="font-sacra text-5xl leading-tight md:text-8xl md:leading-normal">
            Mai Tran
          </h1>
          <h1 className="font-sacra text-5xl leading-tight md:text-8xl md:leading-normal">
            &
          </h1>
          <h1 className="font-sacra text-5xl leading-tight md:text-8xl md:leading-normal">
            Manh Nguyen
          </h1>
          <p className="mb-6 mt-3 text-base md:text-xl">
            We Are Getting Married In
          </p>
          <Countdown targetDate="2023-10-01T23:59:59" />
        </div>
      </div>
    </div>
  );
}
