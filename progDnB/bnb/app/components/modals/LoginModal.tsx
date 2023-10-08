"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../heading/Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../button/Button";
import { useRouter } from "next/navigation";
import useUserAuth from "@/app/hooks/useUserAuth";
import Cookies from "js-cookie";
import qs from "query-string";
import dotenv from "dotenv";
dotenv.config();

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const userAuth = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginData = watch();
  const disabledForm = !(loginData.email !== "" && loginData.password !== "");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );
      Cookies.set("DNB-AUTH", response.data.authentication.sessionToken, {
        domain: "localhost",
        path: "/",
      });
      const safeUser = {
        ...response.data,
        id: response.data._id,
        authentication: null,
      };

      userAuth.onLogin(safeUser);
      toast.success("Logado com sucesso");
      loginModal.onClose();
    } catch (error: any) {
      console.error(error);
      return toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    const GITHUB_URL = "https://github.com/login/oauth/authorize";
    const clientId = process.env.GITHUB_ID as string;
    const redirectUri = process.env.REDIRECT_URL as string;

    console.log(clientId, redirectUri);

    const params = {
      response_type: "code",
      scope: "user",
      client_id: clientId,
      redirect_uri: redirectUri,
    };

    const query = qs.stringify(params);
    const authUrl = `${GITHUB_URL}?${query}`;
    //router.push(authUrl);
  };

  const switchModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bem vindo de volta ao Air dnb"
        subtitle="Entre na sua conta"
      />
      <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex flex-row gap-4">
        <Button
          disabled
          outline
          label="Entrar com o Google"
          icon={FcGoogle}
          onClick={() => {}}
        />
        <Button
          outline
          disabled
          label="Entrar com o Github"
          icon={AiFillGithub}
          onClick={handleGithubLogin}
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Não possui uma conta?</div>
          <div
            onClick={switchModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Registre-se
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading || disabledForm}
      isOpen={loginModal.isOpen}
      title="Entrar"
      actionLabel="Continuar"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
