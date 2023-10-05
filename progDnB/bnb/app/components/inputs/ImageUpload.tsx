/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: File[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChooseImageClick = () => {
    inputRef?.current?.click();
  };

  return (
    <>
      <div
        className={`
      relative
      cursor-pointer
      transition
      border-dashed
      border-2
      ${value.length === 0 && "p-20"}
      border-neutral-300
      flex
      flex-col
      justify-center
      items-center
      gap-4
      text-neutral-600
      `}
      >
        {value.length === 0 ? (
          <>
            <input
              className="hidden"
              multiple
              ref={inputRef}
              type="file"
              onChange={onChange}
            />
            <div
              className="h-full w-full flex flex-col justify-center items-center"
              onClick={handleChooseImageClick}
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">
                Clique para adicionar sua foto
              </div>
            </div>
          </>
        ) : (
          <div className="h-full w-full relative">
            <input
              className="hidden"
              multiple
              ref={inputRef}
              type="file"
              onChange={onChange}
            />
            <Carousel
              showThumbs={false}
              showArrows
              showIndicators={false}
              showStatus={false}
            >
              {value.map((image) => {
                const url = URL.createObjectURL(image);

                return (
                  <div key={Math.random() * 100}>
                    <img
                      onClick={(e: any) => e.stopPropagation()}
                      className="w-full h-[250px] lg:h-[350px] object-cover"
                      alt="adicione imagens"
                      style={{ objectFit: "cover" }}
                      src={url}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
      {value.length > 0 && (
        <div className="mt-[-1rem] mb-[-2rem] flex justify-center">
          <p
            className="text-center cursor-pointer w-[50%]"
            onClick={handleChooseImageClick}
          >
            Adicionar mais imagens
          </p>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
