/* eslint-disable @next/next/no-img-element */
import { useImageModal } from "@/app/hooks/useImageModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./ImageModal.css";
import { AiOutlineClose } from "react-icons/ai";

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

  if (isOpen && images && images.length > 0)
    return (
      <div
        onClick={handleClick}
        ref={bgModalRef}
        className="select-none justify-center p-4 overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-900/90 gap-8"
      >
        {images.map((image, index) => {
          return (
            <div key={index} className="flex max-w-full">
              <img
                className="mt-10 h-full m-auto object-cover max-lg:!h-[100%] max-lg:!max-h-screen !rounded-lg !flex !justify-self-center"
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

        <div
          onClick={() => onClose()}
          className="fixed cursor-pointer transform translate-x-1/2 right-1/2 top-[1rem] lg:top-[3.5rem] lg:!right-[6.5rem] bg-white rounded-full px-3 py-1 flex gap-2 items-center"
        >
          <AiOutlineClose color="#334155" size={15} />
          <p className="font-[0.8rem] text-slate-700">Fechar fotos</p>
        </div>
      </div>
    );
};

export default ImageModal;
