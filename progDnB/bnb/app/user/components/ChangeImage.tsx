import { imageUploader } from "@/app/helpers/imageUploader";
import { SafeUser } from "@/app/types";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

interface ImageInfoProps {
  currentUser: SafeUser;
}

const ImageInfo: React.FC<ImageInfoProps> = ({ currentUser }) => {
  const [profileImage, setProfileImage] = useState<null | File>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log(file);
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!profileImage) return;
    try {
      /* await imageUploader(profileImage, "user"); */
      const form = new FormData();
      form.append("image", profileImage);
      await axios.post("http://localhost:4000/user/image", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Image
        className="rounded-full !w-[300px] !h-[300px] !relative"
        fill
        alt="Avatar"
        src={currentUser.image ? currentUser.image : "/images/placeholder.jpg"}
      />

      <input type="file" onChange={handleChangeImage} />
      <div onClick={handleSubmit}>Enviar</div>

      <p className="text-center mt-4">
        Usuário desde: {dayjs(currentUser.createdAt).format("DD/MM/YYYY")}
      </p>
    </div>
  );
};

export default ImageInfo;
