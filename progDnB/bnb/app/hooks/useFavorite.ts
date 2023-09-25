import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react" 
import {toast} from "react-hot-toast"

import { SafeUser } from "../types"

import useLoginModal from "./useLoginModal"
import useUserAuth from "./useUserAuth"

interface IUseFavorite {
  listingId: string
  currentUser: SafeUser | null
}

const useFavorite = ({listingId, currentUser}: IUseFavorite)=>{
  const router = useRouter()
  const loginModal =  useLoginModal()
  const {addFavorite, removeFavorite} = useUserAuth()

  const hasFavorite = useMemo(()=>{
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  },[currentUser, listingId])


  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation()

    if(!currentUser){
      return loginModal.onOpen()
    }

    try {
      let request
      let message

      if(hasFavorite){
        removeFavorite(listingId, currentUser)
        message = "Removido dos favoritos"
        request = ()=> axios.delete(`http://localhost:4000/user/favorite/${listingId}`)
      } else {
        addFavorite(listingId, currentUser)
        message = "Adicionado aos favoritos"
        request = ()=> axios.post(`http://localhost:4000/user/favorite/${listingId}`)
      }

      await request()
      router.refresh()
      toast.success(message)

    } catch (error) {
      if(hasFavorite){
        addFavorite(listingId, currentUser)
      } else {
        removeFavorite(listingId, currentUser)
      }
      toast.error("Ops... Algo deu errado")
    }
  },[currentUser, hasFavorite, listingId, loginModal, router])

  return {hasFavorite, toggleFavorite}
}

export default useFavorite