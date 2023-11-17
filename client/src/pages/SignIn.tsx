import { FC, FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignUpFormTypes } from "../types/types"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { signInStart, signInSuccess, signInfailure } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"
export const SignIn: FC = () => {
    const userState = useSelector((state: any) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (userState.currentUser) {
            navigate('/')
        }
    }, [userState.currentUser])
    const [formData, setFormData] = useState<SignUpFormTypes>({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            dispatch(signInStart())
            await axios.post('/api/auth/sign-in', formData).then((res) => {
                if (res.data.success === false) {
                    setFormData({
                        email: "",
                        password: ""
                    });
                    dispatch(signInfailure(res.data.message))
                    return
                }
                dispatch(signInSuccess(res.data))
                navigate('/')
            })
        } catch (error: any) {
            dispatch(signInfailure(error.response.data.message))
        }
    }
    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
                {userState.err && <p className="text-red-700">{userState.err}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input required className="border p-3 rounded-lg" type="email" name="email" value={formData.email} placeholder="Email" id="email" onChange={handleChange} />
                    <input value={formData.password} required className="border p-3 rounded-lg" type="password" name="password" placeholder="Password" id="password" onChange={handleChange} />
                    <button disabled={userState.loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{userState.loading ? "loading..." : "Sign In"}</button>
                    <OAuth />
                </form>
                <div className="flex gap-2 mt-5">
                    <p>Dont have an Account?</p>
                    <Link className="text-blue-700" to='/sign-up'>Sign up</Link>
                </div>
            </div>
        </>
    )
}