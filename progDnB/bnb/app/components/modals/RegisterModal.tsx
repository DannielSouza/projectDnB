"use client";

import React from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../heading/Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const loginData = watch();
  const disabledForm = !(
    loginData.email !== "" &&
    loginData.password !== "" &&
    loginData.name !== ""
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/auth/register", data);
      toast.success("Registrado com sucesso!");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  const switchModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem vindo ao Air dnb" subtitle="Crie uma conta" />
      <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Nome"
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
      <Input
        id="confirmPassword"
        label="Confirmação de senha"
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
          outline
          label="Registrar-se com o Google"
          icon={FcGoogle}
          onClick={() => {}}
        />
        <Button
          outline
          label="Registrar-se com o Github"
          icon={AiFillGithub}
          onClick={() => signIn("github")}
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Já possui uma conta?</div>
          <div
            onClick={switchModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Entrar
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading || disabledForm}
      isOpen={registerModal.isOpen}
      title="Registre-se"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
