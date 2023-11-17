import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"
import { useNavigate } from "react-router-dom"
function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: result.user.displayName, email: result.user.email, imgUrl: result.user.photoURL })
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log("we cannot login with google", error)
        }
    }
    return (
        <div>
            <button type="button" onClick={handleGoogleClick} className="bg-red-700 w-full text-white p-3 rounded-lg uppercase hover:opacity-95 "> Continue with google</button>
        </div>
    )
}

export default OAuth
