"use client";

import useFavorite from "@/app/hooks/useFavorite";
import useUserAuth from "@/app/hooks/useUserAuth";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HearthButtonProps {
  listingId: string;
}

const HearthButton: React.FC<HearthButtonProps> = ({ listingId }) => {
  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HearthButton;
