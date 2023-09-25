"use client";

import React from "react";
import { safeListing } from "../types";
import Heading from "../components/heading/Heading";
import Container from "../components/container/Container";
import ListingCard from "../components/listingCard/ListingCard";
import useUserAuth from "../hooks/useUserAuth";

interface FavoritesClientProps {
  listings: safeListing[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings }) => {
  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;

  return (
    <Container>
      <Heading
        title="Favoritos"
        subtitle="Lista de lugares que você marcou como favorito"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return <ListingCard data={listing} key={listing.id} />;
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
