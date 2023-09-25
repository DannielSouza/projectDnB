import axios from "axios";
axios.defaults.withCredentials = true;

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;
    const queryParams = [];

    if (listingId) {
      queryParams.push(`listingId=${listingId}`);
    }

    if (userId) {
      queryParams.push(`userId=${userId}`);
    }

    if (authorId) {
      queryParams.push(`authorId=${authorId}`);
    }

    const queryString = queryParams.join("&");

    const response = await axios.get(`http://localhost:4000/reservations/?${queryString}`);
    const reservations = response.data;

    const safeReservations = reservations.map((reservation: any) => ({
      ...reservation,
      id: reservation._id,
      listing: {
        ...reservation?.listing,
        id: reservation?.listing?._id
      }
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
