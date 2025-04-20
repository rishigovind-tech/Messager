import React from "react";
import bg from "../assets/bg.png";

const AuthImage = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* <div className="grid grid-cols-3 gap-3 mb-8">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-2xl bg-primary/10 ${
              i % 2 === 0 ? "animate-pulse" : ""
            }`}
          />
        ))}
      </div> */}

        <div className="mb-8">
          <img
            src={bg}
            alt="Auth visual"
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImage;
