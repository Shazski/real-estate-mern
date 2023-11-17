import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
        console.log("database connected succesfully")
    })
    .catch((err) => {
        console.log(err)
    })

export default mongoose