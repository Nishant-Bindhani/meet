import React from "react";

const Hero = () => {
  return (
    <div className="relative top-[76.5px] h-full w-full font-display">
      <img
        src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Background Image"
        className="object-cover object-center w-full h-[500px]"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-end bottom-40">
        <h1 className="text-4xl text-white font-bold">
          One Stop For All The Popular Events
        </h1>
        <p className="text-xl text-white mt-4">Explore Our events</p>
      </div>
    </div>
  );
};

export default Hero;
