"use client";

import React, { useState } from "react";
import { SafeUser, safeReservation } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "../components/container/Container";
import ListingCard from "../components/listingCard/ListingCard";
import Heading from "../components/heading/Heading";
import { useRouter } from "next/navigation";
import useUserAuth from "../hooks/useUserAuth";

interface ReservationsClientProps {
  reservations: safeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
}) => {
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
      <Heading title="Reservas" subtitle="Reservas em sua(s) propriedade(s)" />
      <div className="pt-24 flex flex-wrap gap-12 max-sm:justify-center">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancelar reserva do hospede"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
