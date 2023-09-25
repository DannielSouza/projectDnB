import { getAllUsers, deleteUser, favoriteListing, removeFavoriteListing, editUserInfo, editUserImage } from "../controllers/userController"
import express from "express"
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware"
const router = express.Router()

router.get("/", isAuthenticated, getAllUsers)
router.delete("/:id", isAuthenticated, isOwner, deleteUser)
router.post("/", isAuthenticated, editUserInfo)
router.post("/image", isAuthenticated, editUserImage)
router.post("/favorite/:listingId", isAuthenticated, favoriteListing)
router.delete("/favorite/:listingId", isAuthenticated, removeFavoriteListing)

export default router