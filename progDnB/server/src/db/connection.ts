import mongoose from "mongoose";
require("dotenv").config()

const start = async () =>{
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected on database")
  } catch (error) {
    console.error(`"Error to connect on to database: ${error}`)
  }
}

export default start