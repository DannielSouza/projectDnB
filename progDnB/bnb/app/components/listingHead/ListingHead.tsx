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
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

  console.log(images);

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
      <div className="w-full h-[60vh] !max-h-[650px] overflow-hidden rounded-xl relative">
        <Carousel
          showThumbs={false}
          showArrows
          showIndicators={false}
          showStatus={false}
          renderArrowPrev={(onClickHandler, hasPrev) => {
            const handlePrev = (e: any) => {
              e.stopPropagation();
              onClickHandler();
            };
            return (
              hasPrev && (
                <div
                  onClick={handlePrev}
                  className="h-full z-10 max-h-[500px] hover:bg-[rgba(0_,0_,0_,_0.3)] transition-all cursor-pointer w-10 absolute top-0 flex items-center left-[-2px] px-1"
                >
                  <IoIosArrowBack color={"white"} size={24} />
                </div>
              )
            );
          }}
          renderArrowNext={(onClickHandler, hasNext) => {
            const handleNext = (e: any) => {
              e.stopPropagation();
              onClickHandler();
            };

            return (
              hasNext && (
                <div
                  onClick={handleNext}
                  className="h-full z-10 w-10 absolute max-h-[500px] hover:bg-[rgba(0_,0_,0_,_0.3)] transition-all cursor-pointer top-0 flex items-center !right-[-2px] px-1"
                >
                  <IoIosArrowForward color={"white"} size={24} />
                </div>
              )
            );
          }}
        >
          {images.map((image) => {
            return (
              <div key={Math.random() * 100}>
                <img
                  onClick={(e: any) => e.stopPropagation()}
                  className="object-cover w-full !max-h-[650px]"
                  alt="adicione imagens"
                  src={image}
                />
              </div>
            );
          })}
        </Carousel>
        <div className="absolute top-5 right-5 z-10">
          <HearthButton listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
