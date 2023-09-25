import axios from "axios"
import prisma from "../libs/prismadb"
import { SafeUser, safeListing } from "../types"

interface IParams {
  listingId: string
}

export default async function getListingById(params: IParams) {
  
  try {
    const {listingId} = params
    const response = await axios.get(`http://localhost:4000/listings/${listingId}`)
const listing = response.data
    if(!listing) return null

    const safeListing: safeListing & {user: SafeUser} = {
      ...listing,
      id: listing?._id,
      user:{
        ...listing.user,
        id: listing?.user?._id,
      }
    }

    return safeListing
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}