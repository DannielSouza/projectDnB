"use client";

import useCountries from "@/app/hooks/useCountry";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HearthButton from "../hearthButton/HearthButton";
import Button from "../button/Button";
import useUserAuth from "@/app/hooks/useUserAuth";

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
      className="col-span-1 cursor-pointer group shadow-md rounded-lg"
    >
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Catalogo"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HearthButton listingId={data.id} />
          </div>
        </div>
        <div className="p-1">
          <div className="font-semibold text-lg">{data.title}</div>
          <div className="w-[15%]">
            <hr />
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
