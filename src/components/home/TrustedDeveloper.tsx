// TrustedDeveloper.tsx

import React from "react";
import styles from "@/styles/TrustedDeveloper.module.css";
import Image from "next/image";
import Logo1 from "@/assets/images/trusted-developers/Azizi-Developments.jpg";

const TrustedDeveloper = () => {
  return (
    <section>
      <div className="text-white mt-6 mb-3 text-center">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-3xl font-bold text-gradient">
            Our Trusted Developers
          </h2>
        </div>
      </div>
      <div className="w-full max-w-screen-md sm:w-screen-md mx-auto text-white bg-black mb-4 mt-4 shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 z-50">
        <div className={styles.logosSlider}>
          <div className={styles.logosSliderContainer}>
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
            <Image src={Logo1} alt="Logo 1" width={150} height={100} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedDeveloper;
