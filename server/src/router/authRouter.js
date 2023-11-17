import { Router } from "express"
import { google, signin, signup } from "../controller/authController.js"

const router = Router()

router.route('/sign-up').post(signup)
router.route('/sign-in').post(signin)
router.route('/google').post(google)
export { router as authRouter }