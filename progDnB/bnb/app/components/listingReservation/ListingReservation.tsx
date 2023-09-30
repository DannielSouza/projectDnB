"use client";

import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../button/Button";

interface listingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<listingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="text-2xl font-semibold">R$ {price}</p>
        <p className="font-light text-neutral-600"> /noite</p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reservar" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p>R$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
