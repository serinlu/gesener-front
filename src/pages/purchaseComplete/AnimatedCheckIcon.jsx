import React from "react";

const AnimatedCheckIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-60 h-60 text-green-500"
      >
        {/* Circle animation */}
        <circle
          cx="12"
          cy="12"
          r="10"
          className="stroke-current text-gray-300"
          style={{
            strokeDasharray: 62.8,
            strokeDashoffset: 62.8,
            animation: "circle-draw 1s ease forwards",
          }}
        />

        {/* Checkmark animation */}
        <path
          d="M9 12l2 2 4-4"
          className="stroke-current"
          style={{
            strokeDasharray: 10,
            strokeDashoffset: 10,
            animation: "check-draw 0.5s 1s ease forwards",
          }}
        />
      </svg>

      {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes circle-draw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes check-draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedCheckIcon;
