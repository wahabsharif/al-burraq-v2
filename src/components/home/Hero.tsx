import React from "react";

const Hero = () => {
  return (
    <section
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/images/home-banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5">
            Your <span className="text-gradient">Dream Property</span>,
            <br /> Our{" "}
            <span className="text-gradient">Marketing Expertise</span>.
          </h1>
          <p className="mb-5 text-white">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
