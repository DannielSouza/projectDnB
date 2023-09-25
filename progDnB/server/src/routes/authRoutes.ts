import { isAuthenticated } from "../middlewares/authMiddleware"
import { login, register, loginWithToken, changePassword } from "../controllers/authController"
import express from "express"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/token/:token", loginWithToken)
router.post("/reset", isAuthenticated, changePassword)


export default router