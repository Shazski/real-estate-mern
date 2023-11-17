import express from "express"
import dotenv from "dotenv"
import connection from "./config/connection.js"
import { userRouter } from "./router/userRouter.js"
import { authRouter } from "./router/authRouter.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT


app.use(cors())

//json parsing middleware
app.use(express.json())

// routing middleware
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err,"my err")
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


//port listening
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))