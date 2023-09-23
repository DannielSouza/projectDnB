import { create, getAllReservations, deleteReservation } from "../controllers/reservationController"
import express from "express"
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware"
const router = express.Router()

router.post("/", isAuthenticated, create)
router.get("/", getAllReservations)
router.delete("/:id", isAuthenticated, deleteReservation)


export default router