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

      <div className="pt-24 flex flex-wrap gap-8 max-sm:justify-center">
        {listings.map((listing) => {
          return <ListingCard data={listing} key={listing.id} />;
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
