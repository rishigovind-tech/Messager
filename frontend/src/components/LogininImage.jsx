import React from "react";
import bg1 from "../assets/bg1.png";

const LogininImage = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <img
            src={bg1}
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

export default LogininImage;
