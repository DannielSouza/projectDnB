"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  function goHome() {
    router.push("/");
  }

  return (
    <Image
      onClick={goHome}
      width={100}
      height={100}
      alt="Logo"
      src={"/images/logo.svg"}
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
