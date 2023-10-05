type User = {
  id: string
  name: string
  email: string
  gender: string
  birthdate: Date
  image: string
  favoriteIds: string[]
  updatedAt: Date
  createdAt: Date
}

type Listing = {
  id: string
  title: string
  description: string
  images: string[]
  updatedAt: Date
  createdAt: Date
  category: string
  roomCount: number
  bathroomCount: number
  guestCount: number
  locationValue: string
  price: number
  userId: string
}

type Reservation = {
  id: string
  userId: string
  listingId: string
  startDate: Date
  endDate: Date
  totalPrice: number
  updatedAt: Date
  createdAt: Date
}

export type SafeUser = Omit<User,"createdAt" | "updatedAt" | "birthdate"> & {
  createdAt: string
  updatedAt: string
  birthdate: string
  password: null
}

export type safeListing = Omit<Listing, "createdAt"> & {
  createdAt: string
}

export type safeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
  createdAt: string
  startDate: string
  endDate: string
  listing: safeListing
}

export interface IComment {
  id: string
  comment: string
  stars: number
  user: SafeUser
  listing: safeListing
  createdAt: string
  updatedAt: string
}