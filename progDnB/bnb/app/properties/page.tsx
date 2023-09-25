"use client";

import EmptyState from "../components/emptyState/EmptyState";
import React, { useEffect, useState } from "react";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
import useUserAuth from "../hooks/useUserAuth";
import { safeListing } from "../types";
import { useRouter } from "next/navigation";

const PropertiesPage = () => {
  const router = useRouter();
  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;
  const [listings, setListings] = useState<safeListing[]>([]);

  const getListingsPage = async () => {
    const listings = await getListings({ userId: currentUser?.id });
    setListings(listings);
  };

  useEffect(() => {
    if (!userAuth.isLogged && userAuth.isLoaded) return router.replace("/");
  }, [userAuth.isLogged]);

  useEffect(() => {
    if (currentUser) {
      getListingsPage();
    }
  }, [currentUser]);

  if (listings.length === 0)
    return (
      <EmptyState
        title="Não há propriedades"
        subtitle="Parece que você ainda não tem nenhuma propriedade cadastrada"
      />
    );

  return <PropertiesClient listings={listings} />;
};

export default PropertiesPage;
