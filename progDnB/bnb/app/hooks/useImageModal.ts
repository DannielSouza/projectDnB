import { create } from "zustand"

interface IImageModal {
  isOpen: boolean
  images: string[] | null
  imageIndex: number 
  onOpen: (newImages: string[], imageIndex?: number) => void
  onClose: () => void
}

export const useImageModal = create<IImageModal>((set) => ({
  isOpen: false,
  images: null,
  imageIndex: 0,
  onOpen: (newImages, imageIndex) => set({images: newImages, isOpen: true, imageIndex: imageIndex || 0}),
  onClose: ()=> set({images: null, isOpen: false})
}))