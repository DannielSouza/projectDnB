import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../heading/Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useRatingModal from "@/app/hooks/useRatingModal";
import StarRatings from "react-star-ratings";
import Textarea from "../inputs/TextArea";
import axios from "axios";
import toast from "react-hot-toast";
import useUserAuth from "@/app/hooks/useUserAuth";

const RatingModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, listingId, currentRating, onChangeRating, onClose } =
    useRatingModal();
  const { currentUser } = useUserAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      stars: "",
    },
  });

  const handleChangeRating = (newRating: number) => {
    onChangeRating(newRating);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/comment/${listingId}`,
        { ...data, userId: currentUser?.id, stars: currentRating }
      );
      toast.success("Avaliação criada com sucesso");
      onClose();
    } catch (error: any) {
      console.error(error);
      return toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Avaliar propriedade"
        subtitle="Adicione sua avaliação nesta propriedade"
        center
      />

      <div className="flex self-center mt-4">
        <StarRatings
          rating={currentRating}
          starRatedColor="#F4D03F"
          changeRating={handleChangeRating}
          numberOfStars={5}
          name="rating"
          starDimension="15px"
          starSpacing="2px"
          starHoverColor="#F4D03F"
          starEmptyColor="#D5D8DC"
        />
      </div>
      <Textarea
        id="comment"
        label="Comentário"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Avaliação"
      actionLabel="Adicionar avaliação"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RatingModal;
