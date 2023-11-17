import  { Router } from "express"
import { test } from "../controller/userController.js"
const router = Router()


router.route('/test').get(test)

export  { router as userRouter }