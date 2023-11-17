import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import { errorHandler, uniqueErrorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const signup = async (req, res, next) => {
    const { username, password, email } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.json({ newUser })
    } catch (err) {
        const error = uniqueErrorHandler(err.code, err.message)
        res.json({ success: false, error })
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const userExist = await User.findOne({ email: email })
        if (!userExist) return next(errorHandler(404, "User Not Found"))
        const validPassword = bcrypt.compareSync(password, userExist.password)
        if (!validPassword) return next(errorHandler(401, "Wrong credentials"))
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = userExist._doc
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const { username, email, imgUrl } = req.body
    try {
        const userExist = await User.findOne({
            email: email
        })
        if (userExist) {
            const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = userExist._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = User.create({
                username:username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) ,password:hashedPassword,imgUrl,email
            })
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = userExist._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
    } catch (error) {
        next(error)
    }
}