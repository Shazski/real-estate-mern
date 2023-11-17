import { FC, useEffect, useRef, useState, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { SignUpFormTypes } from "../types/types"
import { logoutUser } from "../redux/user/userSlice"

export const Profile: FC = () => {
    const dispatch = useDispatch()
    const imgUrlRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const { currentUser } = useSelector((state: any) => state.user)
    const [file, setFile] = useState<undefined | File>(undefined)
    useEffect(() => {
        if (currentUser === null) {
            navigate('/sign-in')
        }
        if (file) {
            handleFileUpload(file)
        }
    }, [currentUser, navigate,file])
    const [progress, setProgress] = useState<number>(0)
    const [_, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState<SignUpFormTypes>({
        username:"",
        email:"",
        password:"",
        imgUrl:""
    })
    

    const handleFileUpload = (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progress))
        },
        (error:any) => {
            setFileUploadError(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => setFormData({...formData, imgUrl:downloadUrl}))
        },
        )
    }
    return (
        <>
            <div className="max-w-lg mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
                <form className="flex flex-col gap-3">
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target?.files?.[0])} hidden type="file" name="imgUrl" id="imgUrl" ref={imgUrlRef} accept="image/*" />
                    <img onClick={() => imgUrlRef?.current?.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src={formData.imgUrl || currentUser.imgUrl || null} alt="profile" />
                    <p className="text-center">{
                        progress > 0 && progress < 100 ? (<span className="text-slate-700 text-center">{`uploading ${progress}%`}</span>) : progress === 100 ? (<span className="text-green-700 text-center">Image uploaded successfully</span>):""}</p>
                    <input type="text" placeholder="username" className="p-3 border rounded-lg " id="username" />
                    <input type="email" placeholder="email" className="p-3 border rounded-lg " id="email" />
                    <input type="password" placeholder="password" className="p-3 border rounded-lg" id="password" />
                    <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
                </form>
                <div className="flex justify-between mt-5">
                    <span className="text-red-700 cursor-pointer">Delete Account</span>
                    <span onClick={() => dispatch(logoutUser())} className="text-red-700 cursor-pointer">Logout</span>
                </div>
            </div>
        </>
    )
}