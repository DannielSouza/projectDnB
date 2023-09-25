import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  imageSrc: {type: String, required: true},
  category: {type: String, required: true},
  roomCount: {type: String, required: true},
  bathroomCount: {type: String, required: true},
  guestCount: {type: String, required: true},
  locationValue: {type: String, required: false},
  price: {type: Number, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  reviews: [{
    _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stars: {type: Number, required: true},
    comment: {type: String}
  }]
}, { timestamps: true }
)

export const ListingModel = mongoose.model("Listing", ListingSchema)

export const getListings = () => ListingModel.find().populate('user');
//export const getListingsByUserId = () => ListingModel.find().populate('user');
export const getListingById = (id: string) => ListingModel.findById(id).populate('user');
