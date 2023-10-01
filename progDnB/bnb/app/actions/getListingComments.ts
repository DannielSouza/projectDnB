import axios from "axios";

export const getListingComments = async (listingId: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/comment/listing-comments/${listingId}`)
    const data = response.data.map((item: any) => {
    
      const safeUser = {
        ...item.user,
        id: item.user._id
      }

      const safeListing = {
        ...item.listing,
        id: item.listing._id
      }

      return {
        ...item, 
        id: item._id,
        user: safeUser,
        listing: safeListing
      }

    })
    return data
  } catch (error) {
    console.error(error)
  }
}