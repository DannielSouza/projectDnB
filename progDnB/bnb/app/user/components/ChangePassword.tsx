import React, { useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const infoData = watch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/auth/reset",
        data
      );

      toast.success(response.data.message);
      setIsShowPassword(false);
      setValue("oldPassword", "");
      setValue("password", "");
      setValue("confirmPassword", "");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchSecurityConfigs = () => {
    setIsShowPassword((prev) => !prev);
  };

  const isValidForm =
    isShowPassword &&
    infoData.oldPassword &&
    infoData.password &&
    infoData.confirmPassword;

  const slideDownTransitionClasses =
    "transition-all duration-500 ease-in-out transform translate-y-0 opacity-100";

  return (
    <>
      <h3
        onClick={handleSwitchSecurityConfigs}
        className="mb-8 font-bold text-[1.5rem] mt-12 cursor-pointer"
      >
        Informações de segurança:
      </h3>

      <div
        className={`${isShowPassword && slideDownTransitionClasses} ${
          isShowPassword
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
      >
        {isShowPassword && (
          <>
            <p className="mt-[-2rem] mb-4 font-light">
              Acha que sua senha não está forte o bastante ou foi descoberta?
              Troque ela agora mesmo.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              <Input
                id="oldPassword"
                label="Senha antiga"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id="password"
                label="Nova senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />

              <Input
                id="confirmPassword"
                label="Confirmação de senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>

            {isValidForm && (
              <Button label="Salvar" onClick={handleSubmit(onSubmit)} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
