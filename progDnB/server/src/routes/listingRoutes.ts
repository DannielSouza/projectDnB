import { create, getAllUsersListings, getListing, deleteListing, getFavoriteListings, getListings, saveListingsImages } from "../controllers/listingController"
import express from "express"
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware"
import multer from "multer"

const router = express.Router()
const upload = multer()

router.post("/", isAuthenticated, create)
router.get("/user/:id", isAuthenticated, getAllUsersListings)
router.get("/:id", getListing)
router.get("/", getListings)
router.delete("/:id", isAuthenticated, deleteListing)
router.get("/favorites/:id", isAuthenticated, getFavoriteListings)
router.post("/image", isAuthenticated, upload.array("images"), saveListingsImages)


export default router