"use client";

import React, { useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import Button from "@/app/components/button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Select from "@/app/components/inputs/Select";
import Date from "@/app/components/inputs/Date";

const ChangeInfo = () => {
  const userAuth = useUserAuth();
  const router = useRouter();
  const { currentUser, onChangeUser } = userAuth;
  const [isLoading, setIsLoading] = useState(false);
  const [changedValues, setChangedValues] = useState(false);

  const genderOptions = [
    { value: "man", label: "Masculino" },
    { value: "woman", label: "Feminino" },
    { value: "other", label: "Outro" },
  ];

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      gender: "",
      birthdate: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:4000/user/${currentUser?.id}`,
        data
      );
      onChangeUser({ ...response.data, id: response.data._id });
      router.refresh();
      toast.success("Informações atualizadas com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    setValue("name", currentUser?.name);
    setValue("email", currentUser?.email);
    setValue("gender", currentUser.gender);
    setValue("birthdate", currentUser.birthdate);
  }, [currentUser]);

  const infoData = watch();

  useEffect(() => {
    if (
      getValues("name") !== currentUser?.name ||
      getValues("email") !== currentUser?.email ||
      getValues("gender") !== currentUser?.gender ||
      getValues("birthdate") !== currentUser?.birthdate
    ) {
      setChangedValues(true);
    } else {
      setChangedValues(false);
    }
  }, [infoData, currentUser]);

  return (
    <>
      <h3 className="mb-8 font-bold text-[1.5rem]">Informações básicas:</h3>

      <div className="flex flex-col gap-4 mb-8">
        <Input
          id="name"
          label="Nome"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="E-mail"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Select
          id="gender"
          label="Gênero"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          options={genderOptions}
        />

        <Date
          id="birthdate"
          label="Data de nascimento"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>

      {changedValues && (
        <Button label="Salvar" onClick={handleSubmit(onSubmit)} />
      )}
    </>
  );
};

export default ChangeInfo;
