import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  stars: {type: Number, required: true},
  comment: {type: String}
}, { timestamps: true }
)

export const CommentModel = mongoose.model("Comment", CommentSchema)

export const getListings = () => CommentModel.find().populate('user').populate('listing');
export const getListingById = (id: string) => CommentModel.findById(id).populate('user').populate('listing');
