import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import connection from "./db/connection"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import listingRoutes from "./routes/listingRoutes"
import reservationRoutes from "./routes/reservationRoutes"
import commentRoutes from "./routes/commentRoutes"

const app = express()

// CONFIG
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// ROUTES
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/listings", listingRoutes)
app.use("/reservations", reservationRoutes)
app.use("/comment", commentRoutes)

// STARTING SERVER AND DB
const server = http.createServer(app)
server.listen(4000, ()=> 
  console.log("server running on port 4000")
)
connection()