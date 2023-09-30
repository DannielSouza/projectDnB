import axios from "axios";

export const getListingRating = async (listingId: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/comment/${listingId}`)
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}