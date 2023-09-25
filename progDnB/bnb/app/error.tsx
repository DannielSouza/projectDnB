"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/emptyState/EmptyState";

interface StateErrorProps {
  error: Error;
}

const Error: React.FC<StateErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Ops..." subtitle="Algo deu errado!" />;
};

export default Error;
