"use client";

import React, { useEffect, useState } from "react";
import useUserAuth from "../hooks/useUserAuth";
import Loader from "../components/loader/Loader";
import Container from "../components/container/Container";
import Heading from "../components/heading/Heading";

import ChangeInfo from "./components/ChangeInfo";
import ChangePassword from "./components/ChangePassword";
import ImageInfo from "./components/ChangeImage";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const userAuth = useUserAuth();
  const router = useRouter();
  const { currentUser, isLogged, isLoaded } = userAuth;

  useEffect(() => {
    if (!isLogged && isLoaded) return router.replace("/");
  }, [isLogged]);

  if (!currentUser) return <Loader />;

  return (
    <Container>
      <div className="w-fit flex flex-col m-auto">
        <Heading
          title="Informações de usuário e segurança."
          subtitle="Aqui você pode visualizar, alterar as informações do seu usuário e sua senha."
          center
        />
        <hr />
      </div>

      <div className="mt-12 flex gap-[5rem] justify-center">
        <ImageInfo currentUser={currentUser} />

        <div className="w-[550px]">
          <ChangeInfo />
          <ChangePassword />
        </div>
      </div>
    </Container>
  );
};

export default UserPage;
