import axios from "axios"

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

interface IParams {
  userId?: string
  roomCount?: number
  guestCount?: number
  bathroomCount?: number
  locationValue?: number
  category?: string
  startDate?: string
  endDate?: string
}

export default async function getListings(params: IParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      category,
      startDate,
      endDate,
    } = params;

    const queryParams = [];

    if (userId) {
      queryParams.push(`userId=${userId}`);
    }

    if (roomCount) {
      queryParams.push(`roomCount=${roomCount}`);
    }

    if (guestCount) {
      queryParams.push(`guestCount=${guestCount}`);
    }

    if (bathroomCount) {
      queryParams.push(`bathroomCount=${bathroomCount}`);
    }

    if (locationValue) {
      queryParams.push(`locationValue=${locationValue}`);
    }

    if (category) {
      queryParams.push(`category=${category}`);
    }

    if (startDate && endDate) {
      queryParams.push(`startDate=${startDate}`);
      queryParams.push(`endDate=${endDate}`);
    }

    const queryString = queryParams.join("&");

    const response = await axios.get(`http://localhost:4000/listings/?${queryString}`);
    const listings = response.data;

    const safeListings = listings.map((listing: any) => ({
      ...listing,
      id: listing._id,
      user:{
        ...listing.user,
        id: listing.user._id
      }
    }));

    return safeListings;
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}