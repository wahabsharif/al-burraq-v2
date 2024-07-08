// TrustedDeveloper.tsx

import React from "react";
import styles from "@/styles/TrustedDeveloper.module.css";
import Image from "next/image";
import trustedDevelopers, {
  TrustedDeveloperData,
} from "@/data/trustedDevelopers";

const TrustedDeveloper = () => {
  return (
    <section>
      <div className="text-white mt-6 mb-3 text-center">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-3xl font-bold text-gradient sm:text-sm">
            Our Trusted Developers
          </h2>
        </div>
      </div>
      <div className="w-full max-w-screen-lg sm:max-w-screen-sm mx-auto text-white bg-black mb-4 mt-4 shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 z-50">
        <div className={`${styles.logosSlider} overflow-x-auto`}>
          <div className={styles.logosSliderContainer}>
            {trustedDevelopers.map((developer: TrustedDeveloperData) => (
              <div
                key={developer.id}
                className="inline-block mx-4 sm:mx-2 md:mx-3 lg:mx-4 xl:mx-5"
              >
                <Image
                  src={developer.logo}
                  alt={developer.name}
                  width={150}
                  height={100}
                  layout="responsive"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedDeveloper;
