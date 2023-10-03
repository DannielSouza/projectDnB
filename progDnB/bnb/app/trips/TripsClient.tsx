"use client";

import React, { useState } from "react";
import { SafeUser, safeReservation } from "../types";
import Container from "../components/container/Container";
import Heading from "../components/heading/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listingCard/ListingCard";
import useUserAuth from "../hooks/useUserAuth";

interface TripsClientProps {
  reservations: safeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(`http://localhost:4000/reservations/${id}`);
      toast.success("Reserva cancelada");
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
      <Heading
        title="Viagens"
        subtitle="Onde você tem estado e onde vai estar"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancelar reserva"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
