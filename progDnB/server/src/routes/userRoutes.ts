import { getAllUsers, deleteUser, favoriteListing, removeFavoriteListing, editUserInfo, editUserImage } from "../controllers/userController"
import express from "express"
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware"
import multer from "multer"

const router = express.Router()
const upload = multer()

router.get("/", isAuthenticated, getAllUsers)
router.delete("/:id", isAuthenticated, isOwner, deleteUser)
router.post("/", isAuthenticated, editUserInfo)
router.post("/image", isAuthenticated, upload.array("image"), editUserImage)
router.post("/favorite/:listingId", isAuthenticated, favoriteListing)
router.delete("/favorite/:listingId", isAuthenticated, removeFavoriteListing)

export default router