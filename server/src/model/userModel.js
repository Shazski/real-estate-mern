import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
        default:"https://up.yimg.com/ib/th?id=OIP.rs4RRfLTSA44vJRDpJmMBAHaHi&%3Bpid=Api&rs=1&c=1&qlt=95&w=115&h=117"
    }
},{timestamps: true});

export default mongoose.model("users",userSchema)