import React from "react";
import VisionIcon from "@/assets/icons/vision-icon.svg";
import MissionIcon from "@/assets/icons/mission-icon.svg";
import HistoryIcon from "@/assets/icons/history-icon.svg";
import Image from "next/image";

const AboutIntro: React.FC = () => {
  return (
    <section>
      <div className="h-full min-h-screen w-full bg-gray-800 mt-10 p-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
            <div className="mx-auto flex h-20 w-20 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-lightGold shadow-slate-100/40">
              <Image
                src={VisionIcon}
                alt="Vision Icon"
                width={100}
                height={100}
                className="p-2"
              />
            </div>
            <h1 className="text-darken mb-3 text-3xl font-medium lg:px-14">
              Vision
            </h1>
            <p className="px-4 text-gray-500">
              Al Burraq Real Estate aims to be the leading real estate agency in
              Dubai, recognized for its exceptional customer service, innovative
              solutions, and commitment to excellence. We envision a future
              where every client finds their dream property with ease and
              confidence, supported by our dedicated team of professionals.
            </p>
          </div>

          <div className="text-center bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
            <div className="mx-auto flex h-20 w-20 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-lightGold shadow-slate-100/40">
              <Image
                src={MissionIcon}
                alt="Mission Icon"
                width={100}
                height={100}
                className="p-2"
              />
            </div>
            <h1 className="text-darken mb-3 text-3xl font-medium lg:px-14">
              Mission
            </h1>
            <p className="px-4 text-gray-500">
              Our mission is to provide comprehensive real estate services that
              exceed client expectations. We strive to deliver personalized,
              transparent, and efficient solutions, ensuring a seamless
              experience in buying, selling, and renting properties. At Al
              Burraq Real Estate, we prioritize client satisfaction and
              long-term relationships built on trust and integrity.
            </p>
          </div>

          <div className="text-center bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
            <div className="mx-auto flex h-20 w-20 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-lightGold shadow-slate-100/40">
              <Image
                src={HistoryIcon}
                alt="History Icon"
                width={100}
                height={100}
                className="p-2"
              />
            </div>
            <h1 className="text-darken mb-3 text-3xl font-medium lg:px-14">
              History
            </h1>
            <p className="px-4 text-gray-500">
              Founded in 2010, Al Burraq Real Estate has grown from a small
              agency into a prominent player in Dubai&apos;s real estate market.
              Over the years, we have successfully assisted numerous clients in
              finding their ideal homes and investment properties. Our journey
              is marked by a relentless pursuit of excellence, continuous
              innovation, and an unwavering dedication to meeting the diverse
              needs of our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
