import express from "express"
import { isAuthenticated } from "../middlewares/authMiddleware"
import { createComment, deleteComment, getRating } from "../controllers/commentController"
const router = express.Router()

router.get("/:listingId", getRating)
router.post("/:listingId", isAuthenticated, createComment)
router.delete("/:listingId", isAuthenticated, deleteComment)


export default router