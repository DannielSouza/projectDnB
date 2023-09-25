"use client";
import { PuffLoader } from "react-spinners";

import React from "react";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader size={100} color="#159a9c" />
    </div>
  );
};

export default Loader;
