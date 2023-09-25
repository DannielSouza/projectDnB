import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/emptyState/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;
  return <ListingClient reservations={reservations} listing={listing} />;
};

export default page;
