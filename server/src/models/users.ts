import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  gender: {type: String},
  birthdate: {type: String},
  image: {type: String},
  favoriteIds: {type: Array},
  authentication:{
    password: {type: String, required: true, select: false},
    sessionToken: {type: String, select: false}
  }
  
}, { timestamps: true })

export const UserModel = mongoose.model("User", UserSchema)

export const getUsers = () => UserModel.find()
export const getUserById = (id: string) => UserModel.findById(id)
export const getUserByEmail = (email: string) => UserModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({"authentication.sessionToken": sessionToken})