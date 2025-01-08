import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-400 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Spinner;
