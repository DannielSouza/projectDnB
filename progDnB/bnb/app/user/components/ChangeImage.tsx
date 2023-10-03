import { SafeUser } from "@/app/types";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState, useRef } from "react";
import toast from "react-hot-toast";

interface ImageInfoProps {
  currentUser: SafeUser;
}

const ImageInfo: React.FC<ImageInfoProps> = ({ currentUser }) => {
  const [profileImage, setProfileImage] = useState<null | File>(null);
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImage(file);
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);
      setUrlImage(url);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!profileImage) return;

    try {
      const form = new FormData();
      form.append("image", profileImage);
      await axios.post("http://localhost:4000/user/image", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.refresh();
      setProfileImage(null);
      setUrlImage(null);
      toast.success("Informações atualizadas com sucesso!");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const handleChooseImageClick = () => {
    inputRef?.current?.click();
  };

  return (
    <div className="max-md:flex max-md:flex-col max-md:items-center max-md:w-full">
      <div className="relative w-full">
        <Image
          className="rounded-full !w-[300px] !h-[300px] !relative object-cover"
          fill
          alt="Avatar"
          src={
            currentUser.image
              ? urlImage
                ? urlImage
                : currentUser.image
              : "/images/placeholder.jpg"
          }
        />

        <input
          className="top-0 left-0 absolute ounded-full !w-[300px] !h-[300px] opacity-0 cursor-pointer"
          type="file"
          ref={inputRef}
          onChange={handleChangeImage}
        />

        {!profileImage && !urlImage ? (
          <p
            className="text-[1rem] rounded-lg cursor-pointer text-center w-[50%] self-center m-auto mt-6 border-2 border-neutral-300"
            onClick={handleChooseImageClick}
          >
            Mudar foto
          </p>
        ) : (
          <div
            className="text-[1rem] rounded-lg cursor-pointer text-center w-[50%] self-center m-auto mt-6 border-2 border-neutral-300"
            onClick={handleSubmit}
          >
            Salvar
          </div>
        )}
      </div>

      <p className="text-center mt-4">
        Usuário desde: {dayjs(currentUser.createdAt).format("DD/MM/YYYY")}
      </p>
    </div>
  );
};

export default ImageInfo;
