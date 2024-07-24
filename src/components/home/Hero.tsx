import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

const Hero = () => {
  return (
    <section
      className="hero min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/home-banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center px-4 md:px-8 lg:px-16">
        <div className="max-w-md mx-auto">
          <BlurFade delay={0.25} inView>
            <h1 className="mb-5 mt-5 text-3xl md:text-5xl lg:text-6xl">
              Your <span className="text-gradient">Dream Property</span>,
              <br /> Our{" "}
              <span className="text-gradient">Marketing Expertise</span>.
            </h1>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <p className="mb-5 text-lg md:text-xl text-slate-50">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
