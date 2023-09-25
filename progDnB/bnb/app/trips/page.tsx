"use client";

import EmptyState from "../components/emptyState/EmptyState";
import getReservations from "../actions/getReservations";
import React, { useEffect, useState } from "react";
import TripsClient from "./TripsClient";
import { safeReservation } from "../types";
import useUserAuth from "../hooks/useUserAuth";
import { useRouter } from "next/navigation";

const TripsPage = () => {
  const router = useRouter();
  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;
  const [reservations, setReservations] = useState<safeReservation[]>([]);

  useEffect(() => {
    if (!userAuth.isLogged && userAuth.isLoaded) return router.replace("/");
  }, [userAuth.isLogged]);

  const getReservationsPage = async () => {
    const reservation = await getReservations({ userId: currentUser?.id });
    setReservations(reservation);
  };

  useEffect(() => {
    if (currentUser) {
      getReservationsPage();
    }
  }, [currentUser]);

  if (reservations.length === 0)
    return (
      <EmptyState
        title="Não há reservas"
        subtitle="Parece que você ainda não fez nenhuma reserva"
      />
    );

  return <TripsClient reservations={reservations} />;
};

export default TripsPage;
