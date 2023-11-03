/* eslint-disable @next/next/no-img-element */
"use client";

import useCountries from "@/app/hooks/useCountry";
import React, { useEffect, useState } from "react";
import Heading from "../heading/Heading";
import HearthButton from "../hearthButton/HearthButton";
import StarRatings from "react-star-ratings";
import useRatingModal from "@/app/hooks/useRatingModal";
import { getListingRating } from "@/app/actions/getListingRating";
import useUserAuth from "@/app/hooks/useUserAuth";
import useLoginModal from "@/app/hooks/useLoginModal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useImageModal } from "@/app/hooks/useImageModal";
import { MdPhotoLibrary } from "react-icons/md";

interface ListingHeadProps {
  title: string;
  images: string[];
  locationValue: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  images,
  locationValue,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const { onOpen, onChangeRating } = useRatingModal();
  const [rating, setRating] = useState(0);
  const { currentUser } = useUserAuth();
  const loginModal = useLoginModal();
  const imageModal = useImageModal();

  const handleChangeRating = (newRating: number) => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    onChangeRating(newRating);
    onOpen(id);
  };

  useEffect(() => {
    const getRating = async () => {
      const data = await getListingRating(id);
      setRating(data.rating);
    };
    getRating();
  }, []);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
        center
      />
      <div className="flex self-center mt-[-1.5rem] items-center gap-2">
        <StarRatings
          rating={rating}
          starRatedColor="#F4D03F"
          changeRating={handleChangeRating}
          numberOfStars={5}
          name="rating"
          starDimension="15px"
          starSpacing="2px"
          starHoverColor="#F4D03F"
          starEmptyColor="#D5D8DC"
        />
        <p className="font-light font-neutral-500 text-[.8rem]">
          ({rating.toFixed(1)})
        </p>
      </div>
      <div className="w-full max-h-[60vh] gap-2 overflow-hidden rounded-xl grid grid-cols-3 grid-rows-2 relative">
        <div className="grid row-span-2 h-full col-span-2">
          <img
            className="object-cover h-full bg-center"
            alt="adicione imagens"
            src={images[0]}
          />
        </div>

        <div className=" h-full">
          <img
            className="object-cover w-full h-full bg-center"
            alt="adicione imagens"
            src={images[1]}
          />
        </div>

        <div className=" h-full">
          <img
            className="object-cover w-full h-full bg-center"
            alt="adicione imagens"
            src={images[2]}
          />
        </div>

        <div
          onClick={() => imageModal.onOpen(images)}
          className="absolute cursor-pointer bottom-3 right-3 bg-white rounded-full px-3 py-1 flex gap-2 items-center"
        >
          <MdPhotoLibrary color="#334155" size={15} />
          <p className="text-[0.75rem] lg:text-[1rem] text-slate-700">
            Mostrar mais fotos
          </p>
        </div>

        <div className="absolute top-5 right-5">
          <HearthButton listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
