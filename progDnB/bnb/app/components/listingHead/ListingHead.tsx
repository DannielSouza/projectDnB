"use client";

import useCountries from "@/app/hooks/useCountry";
import React, { useEffect, useState } from "react";
import Heading from "../heading/Heading";
import Image from "next/image";
import HearthButton from "../hearthButton/HearthButton";
import StarRatings from "react-star-ratings";
import useRatingModal from "@/app/hooks/useRatingModal";
import { getListingRating } from "@/app/actions/getListingRating";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const { onOpen, onChangeRating } = useRatingModal();
  const [rating, setRating] = useState(0);

  const handleChangeRating = (newRating: number) => {
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
          ({rating.toFixed(2)})
        </p>
      </div>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HearthButton listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
