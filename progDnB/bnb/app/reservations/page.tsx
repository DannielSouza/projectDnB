"use client";

import React, { useEffect, useState } from "react";
import EmptyState from "../components/emptyState/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";
import useUserAuth from "../hooks/useUserAuth";
import { safeReservation } from "../types";
import { useRouter } from "next/navigation";

const ReservationsPage = () => {
  const router = useRouter();
  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;
  const [reservations, setReservations] = useState<safeReservation[]>([]);

  const getReservationsPage = async () => {
    const reservation = await getReservations({ authorId: currentUser?.id });
    setReservations(reservation);
  };

  useEffect(() => {
    if (!userAuth.isLogged && userAuth.isLoaded) return router.replace("/");
  }, [userAuth.isLogged]);

  useEffect(() => {
    if (currentUser) {
      getReservationsPage();
    }
  }, [currentUser]);

  if (reservations.length === 0)
    return (
      <EmptyState
        title="Não há reservas"
        subtitle="Parece que não há reservas em sua(s) propriedade(s)"
      />
    );

  return <ReservationsClient reservations={reservations} />;
};

export default ReservationsPage;
