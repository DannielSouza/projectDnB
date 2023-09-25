import {create} from "zustand"
import { SafeUser } from "../types"
import Cookies from "js-cookie";

interface UserAuthStore {
  isLoaded: boolean
  isLogged: boolean
  currentUser: SafeUser | null
  onChangeUser: (data: SafeUser)=> void
  onLogin: (data: SafeUser)=> void
  onLogOut: ()=> void
  onSuccessLoad: () => void
  addFavorite: (listingId: string,  user: SafeUser) => void
  removeFavorite: (listingId: string,  user: SafeUser) => void
}


const useUserAuth = create<UserAuthStore>((set)=>({
  isLoaded: false,
  currentUser: null,
  isLogged: false,
  onSuccessLoad: () => set({isLoaded: true}),
  onChangeUser: (data: SafeUser)=>set({currentUser: data}),
  onLogin: (data: SafeUser)=>set({currentUser: data, isLogged: true}),
  onLogOut: ()=> {
    set({currentUser: null, isLogged: false})
    Cookies.remove("DNB-AUTH");
  },
  addFavorite: (listingId: string, user: SafeUser)=> {
    const updatedUser = {
      ...user,
      favoriteIds: [...user.favoriteIds, listingId]
    }
    set({currentUser: updatedUser})
  }
  ,
  removeFavorite: (listingId: string, user: SafeUser)=> {
    const updatedUser = {
      ...user,
      favoriteIds: user.favoriteIds.filter(item=> item !== listingId)
    }
    set({currentUser: updatedUser})
  }
}))

export default useUserAuth