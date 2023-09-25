"use client";

import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | undefined | null;
  height?: number;
  width?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, height, width }) => {
  return (
    <Image
      className="rounded-full "
      height={height ? height : 30}
      width={width ? width : 30}
      alt="Avatar"
      src={src ? src : "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
