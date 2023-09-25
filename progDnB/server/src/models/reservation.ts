import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  totalPrice: {type: Number, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
}, { timestamps: true })

export const ReservationModel = mongoose.model("Reservation", reservationSchema)

export const getReservations = () => ReservationModel.find()
export const getReservationsById = (id: string) => ReservationModel.findById(id)