import { create, getAllUsersListings, getListing, deleteListing, getFavoriteListings, getListings, addListingReview, deleteListingReview } from "../controllers/listingController"
import express from "express"
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware"
const router = express.Router()

router.post("/", isAuthenticated, create)
router.get("/user/:id", isAuthenticated, getAllUsersListings)
router.get("/:id", getListing)
router.get("/", getListings)
router.delete("/:id", isAuthenticated, deleteListing)
router.get("/favorites/:id", isAuthenticated, getFavoriteListings)
router.post("/:listingId", isAuthenticated, addListingReview)
router.delete("/review/:listingId", isAuthenticated, deleteListingReview)

export default router