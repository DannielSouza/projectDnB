"use client";

import React, { useState } from "react";
import { SafeUser, safeListing } from "../types";
import Container from "../components/container/Container";
import Heading from "../components/heading/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listingCard/ListingCard";
import useUserAuth from "../hooks/useUserAuth";

interface PropertiesClientProps {
  listings: safeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(`http://localhost:4000/listings/${id}`);
      toast.success("Propriedade excluida");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Ops... Houve um erro ao cancelar a reserva");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <Container>
      <Heading title="Propriedade" subtitle="Lista de sua(s) propriedade(s)" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Excluir propriedade"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
