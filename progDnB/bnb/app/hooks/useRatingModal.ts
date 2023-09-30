import { create } from "zustand"

interface RatingModalStore {
  isOpen: boolean
  currentRating: number
  listingId: string
  onOpen: (listingId: string)=> void
  onClose: ()=> void
  onChangeRating: (newRating: number)=> void
}

const useRatingModal = create<RatingModalStore>((set)=> ({
  isOpen: false,
  currentRating: 1,
  listingId: "",
  onOpen: (listingId: string)=>set({isOpen: true, listingId: listingId}),
  onClose: ()=>set({isOpen: false, listingId: ""}),
  onChangeRating: (newRating: number)=>set({currentRating: newRating})
}))

export default useRatingModal