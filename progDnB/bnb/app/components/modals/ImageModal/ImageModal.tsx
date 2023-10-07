/* eslint-disable @next/next/no-img-element */
import { useImageModal } from "@/app/hooks/useImageModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./ImageModal.css";

const ImageModal = () => {
  const { isOpen, onClose, images, imageIndex } = useImageModal();
  const [showModal, setShowModal] = useState(isOpen);
  const bgModalRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === bgModalRef.current) return onClose();
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (isOpen && images && images.length > 0)
    return (
      <div
        onClick={handleClick}
        ref={bgModalRef}
        className="flex select-none justify-center items-center p-4 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      >
        <Carousel
          showThumbs={false}
          showArrows
          showIndicators={false}
          showStatus={false}
          className="relative w-full flex items-center !justify-center !justify-self-center sm:max-w-[85vw] lg:max-w-[55vw]"
          selectedItem={imageIndex}
          renderArrowPrev={(onClickHandler, hasPrev) => {
            const handlePrev = (e: any) => {
              e.stopPropagation();
              onClickHandler();
            };
            return (
              hasPrev && (
                <div
                  onClick={handlePrev}
                  className="h-full w-10 cursor-pointer absolute top-0 flex items-center z-20 left-[-2px] py-4 px-1"
                >
                  <IoIosArrowBack color={"white"} size={24} />
                </div>
              )
            );
          }}
          renderArrowNext={(onClickHandler, hasNext) => {
            const handleNext = (e: any) => {
              e.stopPropagation();
              onClickHandler();
            };

            return (
              hasNext && (
                <div
                  onClick={handleNext}
                  className="h-full w-10 cursor-pointer absolute top-0 flex items-center z-20 !right-[-2px] py-4 px-1"
                >
                  <IoIosArrowForward color={"white"} size={24} />
                </div>
              )
            );
          }}
        >
          {images.map((image, index) => {
            return (
              <div key={index} className="flex max-w-full">
                <img
                  className="h-full m-auto object-cover max-lg:!h-[100%] max-lg:!max-h-screen !rounded-lg !flex !justify-self-center"
                  alt="adicione imagens"
                  src={image}
                  style={{
                    objectFit: "cover",
                    maxHeight: "70vh",
                    width: "auto",
                  }}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    );
};

export default ImageModal;
