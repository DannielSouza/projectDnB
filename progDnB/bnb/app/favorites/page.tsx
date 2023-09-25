"use client";

import React, { useEffect, useState } from "react";
import EmptyState from "../components/emptyState/EmptyState";
import FavoritesClient from "./FavoritesClient";
import axios from "axios";
import useUserAuth from "../hooks/useUserAuth";
import { safeListing } from "../types";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";
import { useRouter } from "next/navigation";
import Head from "next/head";

const FavoritePage = () => {
  const router = useRouter();
  const userAuth = useUserAuth();
  const { currentUser, isLogged, isLoaded } = userAuth;
  const [listings, setListings] = useState<safeListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDatas();
  }, [currentUser]);

  useEffect(() => {
    if (!isLogged && isLoaded) return router.replace("/");
  }, [isLogged]);

  async function getDatas() {
    if (!currentUser) return;
    try {
      setIsLoading(true);
      const listings = await axios.get(
        `http://localhost:4000/listings/favorites/${currentUser.id}`
      );
      setListings(
        listings.data.map((listing: any) => ({ ...listing, id: listing._id }))
      );
    } catch (error) {
      console.error(error);
      toast.error("Ops... Houve um erro ao buscar seus favoritos.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader />;

  if (listings.length === 0)
    return (
      <EmptyState
        title="Sem favoritos"
        subtitle="Parece que você ainda não salvou nada como favorito"
      />
    );

  return (
    <>
      <Head>
        <title>Air dnb</title>
      </Head>
      <FavoritesClient listings={listings} />;
    </>
  );
};

export default FavoritePage;
