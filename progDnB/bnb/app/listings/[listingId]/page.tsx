import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/emptyState/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import { Metadata } from "next";

interface IParams {
  listingId: string;
}

export const metadata: Metadata = {
  title: "DnB | Inicio",
  icons: {
    icon: "../public/images/favicon-16x16.png",
  },
};

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;
  return <ListingClient reservations={reservations} listing={listing} />;
};

export default page;
