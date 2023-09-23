import { create, getAllUsersListings, getListing, deleteListing, getFavoriteListings, getListings } from "../controllers/listingController"
import express from "express"
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware"
const router = express.Router()

router.post("/", isAuthenticated, create)
router.get("/user/:id", isAuthenticated, getAllUsersListings)
router.get("/:id", getListing)
router.get("/", getListings)
router.delete("/:id", isAuthenticated, deleteListing)
router.get("/favorites/:id", isAuthenticated, getFavoriteListings)

export default router