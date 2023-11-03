/* eslint-disable @next/next/no-img-element */
"use client";

import useCountries from "@/app/hooks/useCountry";
import { safeListing, safeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import HearthButton from "../hearthButton/HearthButton";
import Button from "../button/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidBed } from "react-icons/bi";
import { FaShower } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface ListingCardProps {
  data: safeListing;
  reservation?: safeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return;
    onAction?.(actionId);
  };

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className={`w-[290px] h-[260px] select-none hover:!h-[288px] transition-all cursor-pointer group shadow-md rounded-lg listing-card
      ${reservation && "!h-[275px]"}
      ${reservation && "hover:!h-[302px]"}
      `}
    >
      <div className="flex flex-col w-full">
        <div className="w-full h-full relative overflow-hidden rounded-xl">
          <div className="relative">
            <Carousel
              showThumbs={false}
              showArrows
              showIndicators={false}
              showStatus={false}
              renderArrowPrev={(onClickHandler, hasPrev, label) => {
                const handlePrev = (e: any) => {
                  e.stopPropagation();
                  onClickHandler();
                };
                return (
                  hasPrev && (
                    <div
                      onClick={handlePrev}
                      className="h-full w-10 absolute group-hover:!opacity-100 opacity-0 top-0 flex items-center z-20 left-[-2px] py-4 px-1"
                    >
                      <IoIosArrowBack color={"white"} size={24} />
                    </div>
                  )
                );
              }}
              renderArrowNext={(onClickHandler, hasNext, label) => {
                const handleNext = (e: any) => {
                  e.stopPropagation();
                  onClickHandler();
                };

                return (
                  hasNext && (
                    <div
                      onClick={handleNext}
                      className="h-full w-10 absolute group-hover:!opacity-100 opacity-0 top-0 flex items-center z-20 !right-[-2px] py-4 px-1"
                    >
                      <IoIosArrowForward color={"white"} size={24} />
                    </div>
                  )
                );
              }}
            >
              {data.images.map((image) => {
                return (
                  <div key={Math.random() * 100}>
                    <img
                      onClick={(e: any) => e.stopPropagation()}
                      className="h-[180px] w-full group-hover:scale-100 !min-w-[290px] transition object-cover"
                      alt="adicione imagens"
                      style={{ objectFit: "cover" }}
                      src={image}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="absolute top-3 right-3">
            <HearthButton listingId={data.id} />
          </div>
        </div>
        <div className="p-1">
          <div className="font-semibold text-lg">{data.title}</div>
          <div className="w-[15%]">
            <hr />
          </div>

          <div className="flex items-center gap-4 mb-1 mt-[-1.5rem] group-hover:mt-1 opacity-0 group-hover:opacity-100 duration-200">
            <div className="flex items-center gap-1">
              <BsFillPersonFill color="#737373" />
              <p className="text-[#737373] text-[.8rem]">{data.guestCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <BiSolidBed color="#737373" />
              <p className="text-[#737373] text-[.8rem]">{data.roomCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaShower color="#737373" />
              <p className="text-[#737373] text-[.8rem]">{data.roomCount}</p>
            </div>
          </div>

          <div className="font-light text-neutral-500">
            {location?.region},{location?.label}
          </div>
          <div className="font-light text-neutral-500">
            <div className="mt-[-5px]">
              {reservationDate && reservationDate}
            </div>
            <div className="flex justify-between mt-[-5px]">
              {!reservationDate && data.category}
              <div className="flex flex-row items-center gap-1">
                <div className="font-semibold text-black">$ {price}</div>
                {!reservation && (
                  <div className="font-light text-black">/ noite</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
